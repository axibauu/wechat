package com.gpower.modules.user.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.gpower.modules.user.dao.PermissionDao;
import com.gpower.modules.user.dao.RolePermissionDao;
import com.gpower.modules.user.entity.Permission;
import com.gpower.modules.user.service.PermissionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service("permissionService")
public class PermissionServiceImpl extends ServiceImpl<PermissionDao, Permission> implements PermissionService {

    @Autowired
    private RolePermissionDao rolePermissionDao;

}
