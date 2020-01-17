package com.gpower.modules.wx.dao;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.gpower.modules.wx.entity.WxContent;
import com.gpower.modules.wx.entity.WxTextContent;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.Date;
import java.util.List;
import java.util.Map;

/**
 * @description:
 * @author: jingff
 * @date: 2019-07-24 14:19
 */

public interface WxContentDao extends BaseMapper<WxContent> {
    List<WxContent> selectByCondition(Map<String, Object> map);

     void updatePublishStatus(@Param("date")Date date, @Param("status")int status);

   WxTextContent getText(String id);


}
