package com.gpower.common.utils;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.gpower.common.exception.GpException;
import com.gpower.modules.user.dao.UserDao;
import com.gpower.modules.user.entity.User;
import com.gpower.startup.shiro.realms.GpowerDefaultRealm;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authz.AuthorizationInfo;
import org.apache.shiro.session.Session;
import org.apache.shiro.subject.Subject;
import org.apache.shiro.web.mgt.DefaultWebSecurityManager;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.Collection;

/**
 * Created by wenpu_Di on 2018/12/28.
 */
public class ShiroUtil {

    private static Logger log = LoggerFactory.getLogger(ShiroUtil.class);

    public static Session getSession() {
        return SecurityUtils.getSubject().getSession();
    }

    public static Subject getSubject() {
        return SecurityUtils.getSubject();
    }

    public static String getLoginUsername() {
        Subject subject = SecurityUtils.getSubject();
        return (String) subject.getPrincipal();
    }

    public static User getCurrentUser() {
        UserDao userDao = SpringContextUtil.getBean(UserDao.class);
        return userDao.selectOne(new QueryWrapper<User>().lambda().eq(User::getName, getLoginUsername()));
    }

    public static String getUserId() {
        return getCurrentUser().getId();
    }

    public static void setSessionAttribute(Object key, Object value) {
        getSession().setAttribute(key, value);
    }

    public static Object getSessionAttribute(Object key) {
        return getSession().getAttribute(key);
    }

    public static boolean isLogin() {
        return SecurityUtils.getSubject().getPrincipal() != null;
    }

    // 清除用户在shiro中的权限缓存,清除后再次访问时会再次缓存
    public static void clearUserShiroCache(String username) {
        try {
            DefaultWebSecurityManager manager = (DefaultWebSecurityManager) SecurityUtils.getSecurityManager();
            GpowerDefaultRealm myRealm = (GpowerDefaultRealm) manager.getRealms().iterator().next();
            myRealm.clearCachedAuthorizationInfo(username);
            log.info("clear shiro user permission caches success.");
        } catch (Exception e) {
            log.error("clear shiro user permission caches failed:" + e.getMessage());
        }
    }

    // 获取当前realm
    public static GpowerDefaultRealm getMyRealm(String username) {
        DefaultWebSecurityManager manager = (DefaultWebSecurityManager) SecurityUtils.getSecurityManager();
        GpowerDefaultRealm myRealm = (GpowerDefaultRealm) manager.getRealms().iterator().next();
        return myRealm;
    }

    // 获取当前登录用户所有角色
    public static Collection<String> getAllRoles(String username) {
        AuthorizationInfo authorizationInfo = getMyRealm(username).doGetAuthorizationInfo(SecurityUtils.getSubject().getPrincipals());
        return authorizationInfo.getRoles();
    }

    // 获取当前登录用户所有权限
    public static Collection<String> getAllPermissions(String username) {
        AuthorizationInfo authorizationInfo = getMyRealm(username).doGetAuthorizationInfo(SecurityUtils.getSubject().getPrincipals());
        return authorizationInfo.getStringPermissions();
    }

    public static String getKaptcha(String key) {
        Object kaptcha = getSessionAttribute(key);
        if(kaptcha == null){
            throw new GpException("验证码已失效");
        }
        getSession().removeAttribute(key);
        return kaptcha.toString();
    }
}
