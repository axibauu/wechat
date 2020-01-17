package com.gpower.modules.wb.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;


import com.gpower.modules.wb.dao.WbEmotionDao;


import com.gpower.modules.wb.entity.WbEmotion;


import com.gpower.modules.wb.service.WbEmotionService;
import com.gpower.modules.wx.util.WbUtils;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;



/**
 * @description:
 * @author: jingff
 * @date: 2019-08-16 9:09
 */
@Service("WbEmotionService")
public class WbEmotionServiceImpl   extends ServiceImpl<WbEmotionDao, WbEmotion> implements WbEmotionService {


    @Autowired
    WbEmotionDao  wbEmotionDao;
    @Override
    public void createEmotion() {
        String emoditions = WbUtils.getEmodition();
        JSONArray jsonArray=new JSONArray(emoditions);
        for (int i = 0; i < jsonArray.length(); i++) {
            WbEmotion  wbEmotion=new WbEmotion();

            JSONObject jsonObject = jsonArray.getJSONObject(i);
            wbEmotion.generateKey();
            wbEmotion.setPhrase((String) jsonObject.get("phrase"));
            wbEmotion.setCommon((Boolean) jsonObject.get("common"));
            wbEmotion.setIcon((String) jsonObject.get("icon"));
            wbEmotion.setType((String) jsonObject.get("type"));
            wbEmotion.setHot((Boolean) jsonObject.get("hot"));

            wbEmotion.setCatagory((String) jsonObject.get("category"));

            wbEmotion.setValue((String) jsonObject.get("value"));
            wbEmotion.setUrl((String) jsonObject.get("url"));
            wbEmotion.setPicid((String) jsonObject.get("picid"));
         /*   wbEmotionDao.insert(wbEmotion);*/
            System.out.println(jsonObject+"jsonObject");

        }

    }


}
