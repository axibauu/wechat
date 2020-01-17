package com.gpower.modules.user.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.gpower.modules.user.dao.UserInfoDao;
import com.gpower.modules.user.entity.UserInfo;
import com.gpower.modules.user.service.UserInfoService;
import org.springframework.stereotype.Service;

@Service("userInfoService")
public class UserInfoServiceImpl extends ServiceImpl<UserInfoDao, UserInfo> implements UserInfoService {

}
