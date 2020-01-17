package com.gpower.modules.data.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.gpower.modules.data.entity.WbInfo;
import com.gpower.modules.data.entity.WxData;
import com.gpower.modules.wb.entity.WbAccount;
import com.gpower.modules.wx.entity.WxArticleInfo;

import java.util.List;

/**
 * @description:
 * @author: jingff
 * @date: 2019-08-05 17:38
 */
public interface DataService  {

    List <WbInfo> getUserDetail( String  list,String time,String  fromtime,String  totime);

    List <WxData> getArticleImageDetail(String  list, String time, String  fromtime, String  totime);

    List <WbInfo> getAllWbData();
}
