package com.gpower.modules.user.dao;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.gpower.modules.user.entity.Permission;
import com.gpower.modules.user.entity.RolePermisson;

import java.util.List;

public interface RolePermissionDao extends BaseMapper<RolePermisson> {

    List<Permission> selectPermissionByRoleId(String roleId);
}
