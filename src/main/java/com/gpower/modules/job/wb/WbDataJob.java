package com.gpower.modules.job.wb;

import cn.hutool.core.util.ObjectUtil;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.gpower.modules.data.entity.WbInfo;
import com.gpower.modules.data.service.DataService;
import com.gpower.modules.data.service.WbDataService;
import com.gpower.modules.wb.entity.WbAccount;
import com.gpower.modules.wb.service.WbAccountService;
import com.gpower.modules.wb.service.WbContentService;
import com.gpower.startup.config.ApplicationContextUtil;
import io.lettuce.core.ScriptOutputType;
import org.apache.commons.collections4.CollectionUtils;
import org.json.JSONObject;
import org.quartz.Job;
import org.quartz.JobExecutionContext;
import org.quartz.JobExecutionException;

import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static com.gpower.modules.wx.util.WbUtils.getUserShow;

/**
 * @description:
 * @author: jingff
 * @date: 2019-08-30 9:35
 */
public class WbDataJob implements Job {
    @Override
    public void execute(JobExecutionContext jobExecutionContext) throws JobExecutionException {
        WbAccountService wbAccountService = ApplicationContextUtil.getBean(WbAccountService.class);
        WbDataService wbDataService = ApplicationContextUtil.getBean(WbDataService.class);

        List <WbAccount> list = wbAccountService.list(new QueryWrapper <WbAccount>());

        if(CollectionUtils.isNotEmpty(list)){
            for (int i = 0; i < list.size(); i++) {

                WbAccount wbAccount = list.get(i);
                System.out.println(wbAccount);
                WbInfo wbData = wbDataService.getOne(new QueryWrapper <WbInfo>().eq("wbaccountID",
                        wbAccount.getId()));
                Map <String, Object> zz = new HashMap <String, Object>();
                zz.put("access_token", wbAccount.getToken());
                zz.put("uids", wbAccount.getUid());
                JSONObject userShow = getUserShow(zz);
                System.out.println(userShow+"userShow");
                String s = userShow.toString();

                if(!s.contains("error_code")){
                    String friends_count = String.valueOf(userShow.get("friends_count"));
                    String statuses_count = String.valueOf(userShow.get("statuses_count"));
                    String followers_count = String.valueOf(userShow.get("followers_count"));
                    if(wbData==null){
                        wbData=new WbInfo();
                        wbData.setFollowerscount(followers_count);
                        wbData.setFriendscount(friends_count);
                        wbData.setStatusescount(statuses_count);
                        wbData.setWbaccountID(wbAccount.getId());
                        wbData.setName(wbAccount.getName());
                        wbData.generateKey();
                        wbDataService.save(wbData);

                    }else{
                        wbData.setFollowerscount(followers_count);
                        wbData.setFriendscount(friends_count);
                        wbData.setStatusescount(statuses_count);
                        wbData.setWbaccountID(wbAccount.getId());
                        wbDataService.updateById(wbData);
                    }
                }




            }
        }


    }
}
