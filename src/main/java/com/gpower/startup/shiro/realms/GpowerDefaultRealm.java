package com.gpower.startup.shiro.realms;

import com.gpower.common.auth.GpowerAuthInterface;
import com.gpower.common.auth.GpowerAuthc;
import com.gpower.common.auth.MyAuth;
import com.gpower.common.utils.SpringContextUtil;
import org.apache.shiro.authc.*;
import org.apache.shiro.authz.AuthorizationInfo;
import org.apache.shiro.authz.SimpleAuthorizationInfo;
import org.apache.shiro.realm.AuthorizingRealm;
import org.apache.shiro.subject.PrincipalCollection;
import org.apache.shiro.subject.SimplePrincipalCollection;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.Set;

public class GpowerDefaultRealm extends AuthorizingRealm {
    private final Logger log = LoggerFactory.getLogger(GpowerDefaultRealm.class);

    public void clearCachedAuthorizationInfo(String username) {
        PrincipalCollection principals = new SimplePrincipalCollection(username, this.getName());
        super.clearCachedAuthorizationInfo(principals);
    }

    @Override
    protected void clearCachedAuthorizationInfo(PrincipalCollection principals) {
        super.clearCachedAuthorizationInfo(principals);
    }

    @Override
    protected void clearCachedAuthenticationInfo(PrincipalCollection principals) {
        super.clearCachedAuthenticationInfo(principals);
    }

    /**
     * 权限认证，为当前登录的Subject授予角色和权限
     */
    @Override
    public AuthorizationInfo doGetAuthorizationInfo(PrincipalCollection arg0) {
        String username = (String) super.getAvailablePrincipal(arg0);
		/*String authClass = SpringContextUtil.getEnvironment().getProperty(GpowerAuthInterface.CUSTOMIZE_AUTH_PROPERTY_KEY);
		authClass = StringUtils.isBlank(authClass)?GpowerAuthInterface.DEFAULT_AUTH:authClass;
		GpowerAuthInterface auth = null;
		try {
			auth = (GpowerAuthInterface) Class.forName(authClass).newInstance();
		} catch (InstantiationException | IllegalAccessException | ClassNotFoundException e) {
			e.printStackTrace();
		}
		if(auth==null){
			log.error("没有找到GpowerAuth的实现类，请在配置文件中设置"+GpowerAuthInterface.CUSTOMIZE_AUTH_PROPERTY_KEY+"的值");
			return null;
		}*/
        GpowerAuthInterface auth = SpringContextUtil.getBean(GpowerAuthInterface.class);
        Set<String> permissions = auth.getPermissions(username);
        Set<String> roles = auth.getRoles(username);

        SimpleAuthorizationInfo info = new SimpleAuthorizationInfo();
        info.setRoles(roles);
        info.setStringPermissions(permissions);
        return info;
    }

    /**
     * 登录认证
     */
    @Override
    protected AuthenticationInfo doGetAuthenticationInfo(AuthenticationToken arg0) throws AuthenticationException {
        UsernamePasswordToken token = (UsernamePasswordToken) arg0;
		/*String authClass = SpringContextUtil.getEnvironment().getProperty(GpowerAuthInterface.CUSTOMIZE_AUTH_PROPERTY_KEY);
		authClass = StringUtils.isBlank(authClass)?GpowerAuthInterface.DEFAULT_AUTH:authClass;
		GpowerAuthInterface authI = null;
		try {
			authI = (GpowerAuthInterface) Class.forName(authClass).newInstance();
		} catch (InstantiationException | IllegalAccessException | ClassNotFoundException e) {
			e.printStackTrace();
		}
		if(authI==null){
			log.error("没有找到GpowerAuth的实现类，请在配置文件中设置"+GpowerAuthInterface.CUSTOMIZE_AUTH_PROPERTY_KEY+"的值");
			return null;
		}*/
        GpowerAuthInterface authI = SpringContextUtil.getBean(MyAuth.class);
        GpowerAuthc userAuthc = authI.getUserAuthc(token.getUsername());
        if (userAuthc != null) {
            return new SimpleAuthenticationInfo(userAuthc.getUsername(), userAuthc.getPassword(), getName());
        }
        return null;
    }

    /**************************方法重写，shiro 添加 and or not权限过滤关键字**********************************/

    /**
     * 作者：liangxh
     * 日期：2018年7月23日
     * 描述：
     * 返回值：
     */

    private static final String OR_OPERATOR = " or ";
    private static final String AND_OPERATOR = " and ";
    private static final String NOT_OPERATOR = "not ";

    /**
     * 支持or and not 关键词  不支持and or混用
     *
     * @param principals
     * @param permission
     * @return
     */
    @Override
    public boolean isPermitted(PrincipalCollection principals, String permission) {
        if (permission.contains(OR_OPERATOR)) {
            String[] permissions = permission.split(OR_OPERATOR);
            for (String orPermission : permissions) {
                if (isPermittedWithNotOperator(principals, orPermission)) {
                    return true;
                }
            }
            return false;
        } else if (permission.contains(AND_OPERATOR)) {
            String[] permissions = permission.split(AND_OPERATOR);
            for (String orPermission : permissions) {
                if (!isPermittedWithNotOperator(principals, orPermission.trim())) {
                    return false;
                }
            }
            return true;
        } else {
            return isPermittedWithNotOperator(principals, permission);
        }
    }

    private boolean isPermittedWithNotOperator(PrincipalCollection principals, String permission) {
        if (permission.startsWith(NOT_OPERATOR)) {
            return !super.isPermitted(principals, permission.substring(NOT_OPERATOR.length()));
        } else {
            return super.isPermitted(principals, permission);
        }
    }
    /********************方法重写，shiro 添加 AND OR 权限过滤关键字******************************/
}
