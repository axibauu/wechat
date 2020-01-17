package com.gpower.common.auth;

import java.util.Set;

public interface GpowerAuthInterface {
    /**
     * 默认的认证实现类
     */
    public static final String DEFAULT_AUTH = "com.gpower.base.auth.DefaultGpowerAuth";
    /**
     * 自定义的认证实现类在properties配置文件中的key
     */
    public static final String CUSTOMIZE_AUTH_PROPERTY_KEY = "gpower.shiro.auth.class";

    Set<String> getRoles(String username);

    Set<String> getPermissions(String username);

    GpowerAuthc getUserAuthc(String username);

}
