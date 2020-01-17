package com.gpower.common.auth;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.gpower.common.exception.GpException;
import com.gpower.common.utils.SpringContextUtil;
import com.gpower.modules.user.dao.PermissionDao;
import com.gpower.modules.user.dao.UserDao;
import com.gpower.modules.user.dao.UserRoleDao;
import com.gpower.modules.user.entity.Permission;
import com.gpower.modules.user.entity.Role;
import com.gpower.modules.user.entity.User;
import org.apache.shiro.authc.UnknownAccountException;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

public class MyAuth implements GpowerAuthInterface {

    @Override
    public Set<String> getRoles(String username) {
        User user = getUser(username);
        String userId = user.getId();
        try {
            UserRoleDao userRoleDao = SpringContextUtil.getBean(UserRoleDao.class);
            Set<String> roles = new HashSet<>();
            List<Role> roleList = userRoleDao.selectRolesByUserId(userId);
            roleList.stream().forEach(role -> {
                roles.add(role.getCode());
            });
            return roles;
        } catch (GpException e) {
            e.printStackTrace();
        }

        return null;
    }

    @Override
    public Set<String> getPermissions(String username) {
        UserDao userDao = SpringContextUtil.getBean(UserDao.class);
        PermissionDao permissionDao = SpringContextUtil.getBean(PermissionDao.class);
        User user = userDao.selectOne(new QueryWrapper<User>().lambda().eq(User::getName,username));
        try {
            Set<String> permissions = new HashSet<>();
            // 使用permissonDao
            List<Permission> permissionList = permissionDao.selectPermissionByUserId(user.getId());
            permissionList.stream().forEach(permission -> {
                permissions.add(permission.getCode());
            });
            return permissions;
        } catch (GpException e) {
            e.printStackTrace();
        }
        return null;
    }

    @Override
    public GpowerAuthc getUserAuthc(String username) {
        User user = getUser(username);
        //账号不存在
        if (user == null) {
            throw new UnknownAccountException("账号或密码不正确");
        }

        return new GpowerAuthc(user.getName(), user.getPassword());
    }

    private User getUser(String username) {
        UserDao userDao = SpringContextUtil.getBean(UserDao.class);
        return userDao.selectOne(new QueryWrapper<User>().lambda().eq(User::getName, username));
    }

}
