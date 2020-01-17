package com.gpower.modules.job.wb;

import com.gpower.modules.wb.entity.WbAccount;
import com.gpower.modules.wb.entity.WbContent;
import com.gpower.modules.wb.service.WbAccountService;
import com.gpower.modules.wb.service.WbContentService;
import com.gpower.modules.wx.entity.WxContent;
import com.gpower.startup.config.ApplicationContextUtil;
import com.gpower.startup.config.ApplicationStartup;
import org.quartz.Job;
import org.quartz.JobExecutionContext;
import org.quartz.JobExecutionException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * @description:
 * @author: jingff
 * @date: 2019-08-27 14:08
 */
public class WbPublishJob implements Job {
    private static Logger log = LoggerFactory.getLogger(ApplicationStartup.class);

    @Override
    public void execute(JobExecutionContext jobExecutionContext) throws JobExecutionException {
        WbContentService wbContentService = ApplicationContextUtil.getBean(WbContentService.class);
        WbAccountService WbAccountService = ApplicationContextUtil.getBean(WbAccountService.class);

        Map <String, Object> map = new HashMap <String, Object>();
        map.put("status", WxContent.STATUS_REVOKED);
        Date publishDateEnd = new Date();
        map.put("publishDateEnd", publishDateEnd);
        List <WbContent> list = wbContentService.selectByCondition(map);
        if(list!=null&&list.size()>0){
            for (int i = 0; i < list.size(); i++) {
                WbContent wbContent = list.get(i);
                wbContent.setStatus(WxContent.STATUS_PUBLISHED);
                wbContentService.updateById(wbContent);
                String content = wbContent.getContent();
                Integer clength = 0;
                WbAccount wbAccount = WbAccountService.getById(wbContent.getWeiboID());
                if (content.length() > 140) {
                    clength = 1;
                }
                if(wbContent.getImgurl()==null){


                    wbContentService.publishText(wbContent,wbContent.getWeiboID(),
                            wbAccount.getToken(),clength,null);

                }else{
                    wbContentService.publishText(wbContent,wbContent.getWeiboID(),
                            wbAccount.getToken(),clength,wbContent.getImgurl());


                }




            }

            log.info("微博发送成功！");
        }



    }
}
