package com.gpower.modules.job.wb;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.gpower.modules.wb.entity.WbAccount;
import com.gpower.modules.wb.service.WbAccountService;
import com.gpower.modules.wx.util.HttpUtil;
import com.gpower.startup.config.ApplicationContextUtil;
import org.apache.commons.collections4.CollectionUtils;
import org.apache.commons.collections4.map.HashedMap;
import org.quartz.Job;
import org.quartz.JobExecutionContext;
import org.quartz.JobExecutionException;
import org.springframework.core.env.Environment;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;
import org.springframework.web.context.request.ServletWebRequest;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Map;

/**
 * @description:
 * @author: jingff
 * @date: 2019-09-23 21:33
 */
public class WbTokenjob  implements Job {
    @Override
    public void execute(JobExecutionContext jobExecutionContext) throws JobExecutionException {
        Date date = new Date();
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(date);
        calendar.add(Calendar.HOUR_OF_DAY, -3);
        date = calendar.getTime();

        WbAccountService wbAccountService = ApplicationContextUtil.getBean(WbAccountService.class);
        Environment env = ApplicationContextUtil.getBean(Environment.class);
        List<WbAccount> wbAccounts = wbAccountService.list(new QueryWrapper<WbAccount>().lt("expireDate", date));
if(CollectionUtils.isNotEmpty(wbAccounts)){
    for (WbAccount wbAccount : wbAccounts) {
        String url1 = env.getProperty("gpower.wb.tokenurl");
        String clientID = wbAccount.getClientID();
        String clientsecret = wbAccount.getClientSecret();
        String id = wbAccount.getId();




         String uri="https://api.weibo.com/oauth2/authorize?client_id="+clientID+"&response_type=code&redirect_uri="+url1+"&state="+id;
            try {
                HttpUtil.doHttpsGet(uri,null);
            } catch (Exception e) {
                e.printStackTrace();
            }


    }
}


    }
}
