package com.gpower.modules.user.dao;


import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.gpower.modules.user.entity.Permission;

import java.util.List;

public interface PermissionDao extends BaseMapper<Permission> {

    /**
     * 根据用户名获取所有权限
     */
    List<Permission> selectPermissionByUserId(String userId);

}
