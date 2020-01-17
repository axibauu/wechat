package com.gpower.modules.wx.util;


import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

/**
 * @description:
 * @author: jingff
 * @date: 2019-07-25 10:08
 */
@Component
public class WxRemoteBean {
    @Value("${gpower.wxpublish.remote.url}")
    private  String url;
    /*@Value("${gpower.wxpublish.remote.on}")
    private  Boolean on;*/
    @Value("${gpower.publish.path}")
    private  String path;


}
