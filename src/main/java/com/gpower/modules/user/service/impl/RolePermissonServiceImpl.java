package com.gpower.modules.user.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.gpower.modules.user.dao.RolePermissionDao;
import com.gpower.modules.user.entity.RolePermisson;
import com.gpower.modules.user.service.RolePermissonService;
import org.springframework.stereotype.Service;

@Service("rolePermissonService")
public class RolePermissonServiceImpl extends ServiceImpl<RolePermissionDao, RolePermisson> implements RolePermissonService {


}
