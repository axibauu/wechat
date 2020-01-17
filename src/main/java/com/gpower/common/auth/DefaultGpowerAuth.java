package com.gpower.common.auth;

import java.util.Set;

public class DefaultGpowerAuth implements GpowerAuthInterface {
    @Override
    public Set<String> getRoles(String username) {
        throw new RuntimeException("没有找到GpowerAuth的实现类，请在配置文件中设置gpower.shiro.auth.class的值");
    }

    @Override
    public Set<String> getPermissions(String username) {
        throw new RuntimeException("没有找到GpowerAuth的实现类，请在配置文件中设置gpower.shiro.auth.class的值");
    }

    @Override
    public GpowerAuthc getUserAuthc(String username) {
        throw new RuntimeException("没有找到GpowerAuth的实现类，请在配置文件中设置gpower.shiro.auth.class的值");
    }

}
