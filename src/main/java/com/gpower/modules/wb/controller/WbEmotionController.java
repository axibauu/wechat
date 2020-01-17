package com.gpower.modules.wb.controller;

import com.gpower.common.controller.BaseController;
import com.gpower.common.result.Result;
import com.gpower.modules.wb.service.WbEmotionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

/**
 * @description:
 * @author: jingff
 * @date: 2019-08-16 9:14
 */
@RequestMapping("/wbemotion")
@RestController
public class WbEmotionController extends BaseController {
    @Autowired
    WbEmotionService  wbEmotionService;


    @RequestMapping(value = "/createemotion",method = RequestMethod.GET)
    public Result createEmotion(){

        wbEmotionService.createEmotion();
        return  Result.ok();


    }
}
