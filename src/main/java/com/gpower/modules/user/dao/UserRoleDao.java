package com.gpower.modules.user.dao;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.gpower.modules.user.entity.Role;
import com.gpower.modules.user.entity.UserRole;

import java.util.List;

public interface UserRoleDao  extends BaseMapper<UserRole> {

    List<Role> selectRolesByUserId(String userID);
    Role selectRoleByUserId(String userID);

    void deleteByUserId(String userId);
}
