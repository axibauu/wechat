package com.gpower.modules.user.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.gpower.modules.user.dao.UserRoleDao;
import com.gpower.modules.user.entity.UserRole;
import com.gpower.modules.user.service.UserRoleService;
import org.springframework.stereotype.Service;

@Service("userRoleService")
public class UserRoleServiceImpl extends ServiceImpl<UserRoleDao, UserRole> implements UserRoleService {


}
