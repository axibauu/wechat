package com.gpower.modules.wx.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.gpower.modules.wx.dao.UserWbDao;
import com.gpower.modules.wx.dao.UserWxDao;
import com.gpower.modules.wx.entity.UserWb;
import com.gpower.modules.wx.entity.UserWx;
import com.gpower.modules.wx.service.UserWbService;
import com.gpower.modules.wx.service.UserWxService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * @description:
 * @author: jingff
 * @date: 2019-09-16 17:57
 */
@Service
public class UserWbServiceImpl  extends ServiceImpl<UserWbDao, UserWb> implements UserWbService  {

    @Autowired
    UserWbDao  userWbDao;

}
