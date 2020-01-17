package com.gpower.startup.config;

import at.pollux.thymeleaf.shiro.dialect.ShiroDialect;
import com.gpower.common.auth.GpowerAuthInterface;
import com.gpower.common.utils.SpringContextUtil;
import com.gpower.startup.shiro.RetryLimitCredentialsMatcher;
import com.gpower.startup.shiro.ShiroConfigBean;
import com.gpower.startup.shiro.cache.MyShiroCacheManager;
import com.gpower.startup.shiro.cache.MyShiroSessionDAO;
import com.gpower.startup.shiro.filter.CmsAccessFilter;
import com.gpower.startup.shiro.filter.KickoutSessionControlFilter;
import com.gpower.startup.shiro.realms.GpowerDefaultRealm;
import net.sf.ehcache.CacheManager;
import org.apache.commons.lang.StringUtils;
import org.apache.shiro.mgt.SecurityManager;
import org.apache.shiro.realm.AuthorizingRealm;
import org.apache.shiro.session.mgt.SessionManager;
import org.apache.shiro.spring.LifecycleBeanPostProcessor;
import org.apache.shiro.spring.security.interceptor.AuthorizationAttributeSourceAdvisor;
import org.apache.shiro.spring.web.ShiroFilterFactoryBean;
import org.apache.shiro.web.filter.authz.SslFilter;
import org.apache.shiro.web.mgt.DefaultWebSecurityManager;
import org.apache.shiro.web.servlet.SimpleCookie;
import org.apache.shiro.web.session.mgt.DefaultWebSessionManager;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.env.Environment;

import javax.servlet.Filter;
import java.util.LinkedHashMap;
import java.util.Map;

@Configuration
@SuppressWarnings("rawtypes")
public class ShiroConfiguration {
    private static Logger log = LoggerFactory.getLogger(ShiroConfiguration.class);

    @Autowired
    CacheManager cacheManager;

    @Autowired
    private Environment env;

    @Autowired
    private ShiroConfigBean shiroConfig;

    @Autowired(required = false)
    private RetryLimitCredentialsMatcher retryLimitCredentialsMatcher;

    @Value("${gpower.session.expire}")
    private long globalSessionTimeout;

    @Value("${gpower.session.cache.prefix}")
    private String gpowerSessionCachePrefix;

    @Bean
    public GpowerAuthInterface getGpowerAuthInterface() {
        String authClass = SpringContextUtil.getEnvironment().getProperty(GpowerAuthInterface.CUSTOMIZE_AUTH_PROPERTY_KEY);
        authClass = StringUtils.isBlank(authClass) ? GpowerAuthInterface.DEFAULT_AUTH : authClass;
        GpowerAuthInterface auth = null;
        try {
            auth = (GpowerAuthInterface) Class.forName(authClass).newInstance();
        } catch (InstantiationException | IllegalAccessException | ClassNotFoundException e) {
            e.printStackTrace();
        }
        if (auth == null) {
            String msg = "没有找到GpowerAuth的实现类，请在配置文件中设置" + GpowerAuthInterface.CUSTOMIZE_AUTH_PROPERTY_KEY + "的值";
            log.error(msg);
            throw new RuntimeException(msg);
        }
        return auth;
    }

    @Bean(name = "sessionDAO")
    public MyShiroSessionDAO sessionDAO() {
        MyShiroSessionDAO mySessionDAO = new MyShiroSessionDAO();
        // 这里传入秒, 1800代表30分钟
        mySessionDAO.setExpire(1800);
        return mySessionDAO;
    }

    @Bean
    public SimpleCookie sessionIdCookie() {
        SimpleCookie simpleCookie = new SimpleCookie();
        simpleCookie.setHttpOnly(true);
        simpleCookie.setName("sessionIdCookie");
        return simpleCookie;
    }

    /**
     * session交由shiro管理
     */
    @Bean("sessionManager")
    public DefaultWebSessionManager sessionManager(MyShiroSessionDAO mySessionDAO) {
        DefaultWebSessionManager sessionManager = new DefaultWebSessionManager();
        // 设置全局session超时时间
        sessionManager.setGlobalSessionTimeout(1800 * 1000);
        // 自定义SessionDao
        sessionManager.setSessionDAO(mySessionDAO);
        sessionManager.setSessionIdCookie(sessionIdCookie());
        sessionManager.setSessionIdCookieEnabled(true);
        sessionManager.setSessionIdUrlRewritingEnabled(false);

        return sessionManager;
    }


    @Bean
    public MyShiroCacheManager getCacheManager() {
        MyShiroCacheManager cacheManager = new MyShiroCacheManager();
        return cacheManager;
    }

    /**
     * Shiro生命周期处理器:
     * 用于在实现了Initializable接口的Shiro bean初始化时调用Initializable接口回调(例如:UserRealm)
     * 在实现了Destroyable接口的Shiro bean销毁时调用 Destroyable接口回调(例如:DefaultSecurityManager)
     */
    @Bean(name = "lifecycleBeanPostProcessor")
    public static LifecycleBeanPostProcessor getLifecycleBeanPostProcessor() {
        return new LifecycleBeanPostProcessor();
    }

    @Bean(name = "securityManager")
    public SecurityManager securityManager(SessionManager sessionManager) {
        DefaultWebSecurityManager dwsm = new DefaultWebSecurityManager();
        AuthorizingRealm realm = new GpowerDefaultRealm();
        if (retryLimitCredentialsMatcher != null) {
            realm.setCredentialsMatcher(retryLimitCredentialsMatcher);
        }
        dwsm.setRealm(realm);
        dwsm.setCacheManager(getCacheManager());
        dwsm.setSessionManager(sessionManager);
        return dwsm;
    }

    /**
     * 启用shrio授权注解拦截方式，
     * AOP式方法级权限检查
     */
    @Bean
    public AuthorizationAttributeSourceAdvisor authorizationAttributeSourceAdvisor(SecurityManager securityManager) {
        AuthorizationAttributeSourceAdvisor aasa = new AuthorizationAttributeSourceAdvisor();
        aasa.setSecurityManager(securityManager);
        return aasa;
    }

    @Bean(name = "shiroFilter")
    public ShiroFilterFactoryBean getShiroFilterFactoryBean(SecurityManager securityManager, SessionManager sessionManager) {
        ShiroFilterFactoryBean shiroFilterFactoryBean = new ShiroFilterFactoryBean();
        shiroFilterFactoryBean.setSecurityManager(securityManager);
        String loginUrl = env.getProperty("shiro.url.login");
        String successUrl = env.getProperty("shiro.url.success");
        String sessionTimeoutUrl = env.getProperty("shiro.url.sessionTimeout");
        shiroFilterFactoryBean.setLoginUrl(loginUrl);
        shiroFilterFactoryBean.setSuccessUrl(successUrl);

        Map<String, Filter> filters = shiroConfig.getFilters();
        if (shiroConfig.getFilters() == null) {
            filters = new LinkedHashMap<>();
        }
        // 添加ssl
        if (Boolean.parseBoolean(env.getProperty("server.ssl.enabled", "false"))) {
            SslFilter slFilter = new SslFilter();
            slFilter.setPort(Integer.parseInt(env.getProperty("server.port", "8443")));
            filters.put("ssl", slFilter);
        }
        // 添加cmsFilter
        filters.put("accessFilter", new CmsAccessFilter(sessionTimeoutUrl));
        // 记录用户行为filter，此外还有@SysLog记录两种都可以
        // filters.put("behaviorFilter", new BehaviorRecordAdviceFilter());
        // 添加KickoutFilter
        int maxSession = Integer.parseInt(env.getProperty("shiro.kickout.maxSession", "0"));
        if (maxSession > 0) {
            String url = env.getProperty("shiro.kickout.url", "login?kickout=true");
            boolean after = Boolean.parseBoolean(env.getProperty("shiro.kickout.after", "true"));
            KickoutSessionControlFilter kickoutSessionControlFilter = new KickoutSessionControlFilter();
            kickoutSessionControlFilter.setCacheManager(getCacheManager());
            kickoutSessionControlFilter.setSessionManager(sessionManager);
            kickoutSessionControlFilter.setKickoutAfter(after);
            kickoutSessionControlFilter.setMaxSession(maxSession);
            kickoutSessionControlFilter.setKickoutUrl(url);
            filters.put("kickout", kickoutSessionControlFilter);
        }
        shiroFilterFactoryBean.setFilters(filters);


        Map<String, String> map = shiroConfig.getFilterChainDefinitionMap();
        map.remove("/**");
        if (Boolean.parseBoolean(env.getProperty("server.ssl.enabled", "false"))) {
            map.put("/login", "ssl,anon");
            map.put("/**", "ssl,accessFilter");//,resourceFilter,csrfFilter
            if (maxSession > 0) {
                map.put("/**", "ssl,kickout,accessFilter");
            }
        } else {
            map.put("/login", "anon");
            map.put("/**", "accessFilter");//,resourceFilter,csrfFilter
            if (maxSession > 0) {
                map.put("/**", "kickout,accessFilter");
            }
        }
        log.info("shiroFilterFactoryBean.map====>" + map);
        shiroFilterFactoryBean.setFilterChainDefinitionMap(map);
        return shiroFilterFactoryBean;
    }

    /**
     * thymeleaf模板引擎和shiro框架的整合
     */
    @Bean
    public ShiroDialect shiroDialect() {
        return new ShiroDialect();
    }
}
