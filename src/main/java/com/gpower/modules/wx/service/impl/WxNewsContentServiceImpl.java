package com.gpower.modules.wx.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.gpower.modules.wx.dao.WxNewsContentDao;
import com.gpower.modules.wx.entity.WxNewsContent;
import com.gpower.modules.wx.service.WxNewsContentService;
import org.springframework.stereotype.Service;

/**
 * @description:
 * @author: jingff
 * @date: 2019-07-24 14:12
 */
@Service
public class WxNewsContentServiceImpl extends ServiceImpl<WxNewsContentDao,WxNewsContent> implements
        WxNewsContentService {
}
