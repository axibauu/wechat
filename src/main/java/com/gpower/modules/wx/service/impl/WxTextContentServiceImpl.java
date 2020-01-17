package com.gpower.modules.wx.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.gpower.modules.wx.dao.WxAccountDao;
import com.gpower.modules.wx.dao.WxTextContentDao;
import com.gpower.modules.wx.entity.WxAccount;
import com.gpower.modules.wx.entity.WxTextContent;
import com.gpower.modules.wx.service.WxAccountService;
import com.gpower.modules.wx.service.WxTextContentService;
import org.springframework.stereotype.Service;

/**
 * @description:
 * @author: jingff
 * @date: 2019-07-24 13:55
 */
@Service
public class WxTextContentServiceImpl extends ServiceImpl<WxTextContentDao, WxTextContent> implements
        WxTextContentService {
}
