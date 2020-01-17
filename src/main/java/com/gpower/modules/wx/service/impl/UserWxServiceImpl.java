package com.gpower.modules.wx.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.gpower.modules.wx.dao.UserWxDao;
import com.gpower.modules.wx.dao.WxAccountDao;
import com.gpower.modules.wx.entity.UserWx;
import com.gpower.modules.wx.entity.WxAccount;
import com.gpower.modules.wx.service.UserWxService;
import com.gpower.modules.wx.service.WxAccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * @description:
 * @author: jingff
 * @date: 2019-09-16 17:53
 */
@Service
public class UserWxServiceImpl extends ServiceImpl<UserWxDao, UserWx> implements UserWxService {

        @Autowired
    private UserWxDao  userWxDao;
}
