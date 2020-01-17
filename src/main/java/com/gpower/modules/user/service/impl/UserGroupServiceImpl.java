package com.gpower.modules.user.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.gpower.modules.user.dao.UserGroupDao;
import com.gpower.modules.user.dao.UserInfoDao;
import com.gpower.modules.user.entity.UserGroup;
import com.gpower.modules.user.service.UserGroupService;
import com.gpower.modules.user.service.UserInfoService;
import org.springframework.stereotype.Service;

/**
 * @description:
 * @author: jingff
 * @date: 2019-08-15 14:46
 */
@Service("userGroupService")
public class UserGroupServiceImpl   extends ServiceImpl <UserGroupDao, UserGroup> implements UserGroupService {
}
