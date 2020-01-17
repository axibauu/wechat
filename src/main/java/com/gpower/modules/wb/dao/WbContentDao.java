package com.gpower.modules.wb.dao;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;

import com.gpower.modules.wb.entity.WbAccount;
import com.gpower.modules.wb.entity.WbContent;
import com.gpower.modules.wx.entity.WxAccount;

import java.util.List;
import java.util.Map;

/**
 * @description:
 * @author: jingff
 * @date: 2019-08-02 13:52
 */
public interface WbContentDao  extends BaseMapper<WbContent> {


    List<WbContent> selectByCondition(Map<String, Object> map);

    List<String>  selectIds();
}
