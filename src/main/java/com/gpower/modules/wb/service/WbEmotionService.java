package com.gpower.modules.wb.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.gpower.modules.wb.entity.WbAccount;
import com.gpower.modules.wb.entity.WbEmotion;

/**
 * @description:
 * @author: jingff
 * @date: 2019-08-16 9:09
 */
public interface WbEmotionService extends IService <WbEmotion> {
    void createEmotion();
}
