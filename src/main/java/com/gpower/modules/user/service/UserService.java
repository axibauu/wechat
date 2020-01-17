package com.gpower.modules.user.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.gpower.common.result.PageInfo;
import com.gpower.modules.user.entity.User;

import java.util.Collection;
import java.util.List;
import java.util.Map;

public interface UserService extends IService<User> {

    PageInfo queryPage(Map <String, Object> params, Collection <String> allPermissions, String loginUsername);

    /**
     * 保存用户
     */
    boolean create(User user);

    /**
     * 删除用户
     */
    void delete(String id);

    /**
     * 修改密码
     *
     * @param userId      用户ID
     * @param password    原密码
     * @param newPassword 新密码
     */
    boolean updatePassword(Long userId, String password, String newPassword);

    void grantRoles(String userId, String[] roleIds);

    void updatePassword(String id, String oldPassword, String password);

    User selectUserById(String userId);
    List<User> selectAll();
}
