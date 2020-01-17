package com.gpower.modules.wx.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.gpower.modules.wx.dao.WxImageContentDao;
import com.gpower.modules.wx.entity.WxImageContent;
import com.gpower.modules.wx.service.WxImageContentService;
import org.springframework.stereotype.Service;

/**
 * @description:
 * @author: jingff
 * @date: 2019-07-24 14:02
 */
@Service
public class WxImageContentServiceImpl extends ServiceImpl<WxImageContentDao,WxImageContent> implements
        WxImageContentService {
}
