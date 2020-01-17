package com.gpower.modules.job.wx;

import cn.hutool.json.JSONArray;
import cn.hutool.json.JSONObject;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.gpower.modules.data.entity.Details;
import com.gpower.modules.data.entity.WxData;
import com.gpower.modules.data.service.WxDataService;
import com.gpower.modules.data.service.WxDetailService;
import com.gpower.modules.wx.entity.WxAccount;
import com.gpower.modules.wx.entity.WxContent;
import com.gpower.modules.wx.service.WxAccountService;
import com.gpower.modules.wx.service.WxContentService;
import com.gpower.startup.config.ApplicationContextUtil;
import org.apache.commons.collections4.CollectionUtils;
import org.apache.commons.lang.time.DateUtils;

import org.jsoup.helper.DataUtil;
import org.quartz.Job;
import org.quartz.JobExecutionContext;
import org.quartz.JobExecutionException;

import java.lang.reflect.Type;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Collection;
import java.util.Date;
import java.util.List;

import static com.gpower.modules.wx.util.WxUtils.getArticleInfo1;

/**
 * @description:
 * @author: jingff
 * @date: 2019-08-30 12:56
 */

public class WxDetailJob  implements Job {
    @Override
    public void execute(JobExecutionContext jobExecutionContext) throws JobExecutionException {



        WxContentService wxContentService = ApplicationContextUtil.getBean(WxContentService.class);
        WxDataService WxDataService = ApplicationContextUtil.getBean(WxDataService.class);
        WxDetailService wxDetailService = ApplicationContextUtil.getBean(WxDetailService.class);
        WxAccountService wxAccountService = ApplicationContextUtil.getBean(WxAccountService.class);
        List <WxAccount> WxAccountList = wxAccountService.list();
        Integer[] type=new Integer[]{2,3};

        Calendar calendar= Calendar.getInstance();
        calendar.setTime(new Date());
       // calendar.set(Calendar.DAY_OF_MONTH,calendar.get(Calendar.DAY_OF_MONTH)-6);
        if(CollectionUtils.isNotEmpty(WxAccountList)){
            WxAccountList.forEach(WxAccount->{
                List <WxContent> wxcontentList =
                        wxContentService.list(new QueryWrapper <WxContent>().eq("wxAccountID",
                                WxAccount.getId()).in("type", type).eq("status",
                                WxContent.STATUS_PUBLISHED).lt("publishDate", calendar.getTime()));
if(CollectionUtils.isNotEmpty(wxcontentList)){
    wxcontentList.forEach(wxcontent->{
        SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
        String  	str =format.format(wxcontent.getPublishDate());


        String articleInfo1 = getArticleInfo1(WxAccount.getId(),str);
        cn.hutool.json.JSONObject  jo=new cn.hutool.json.JSONObject(articleInfo1);

        JSONArray ja = jo.getJSONArray("list");
        if(ja!=null&&ja.size()>0){
            for (int i = 0; i < ja.size(); i++) {
                JSONObject ojb= (JSONObject)  ja.get(i);
                String refdate = (String) ojb.get("ref_date");
                String msgid = (String) ojb.get("msgid");
                String title = (String) ojb.get("title");
                String url = (String) ojb.get("url");
                Integer usersource = (Integer) ojb.get("user_source");
                WxData wxdata = WxDataService.getOne(new QueryWrapper <WxData>().eq(
                        "msgid", msgid).eq("wxaccountID", wxcontent.getWxAccountID()));
                if(wxdata==null){
                    wxdata=new WxData();
                    wxdata.setWxcontentID(wxcontent.getId());
                    wxdata.generateKey();
                    wxdata.setTitle(title);
                    wxdata.setMsgid(msgid);
                    wxdata.setUrl(url);
                    wxdata.setRefdate(refdate);
                    wxdata.setWxaccountID(wxcontent.getWxAccountID());
                    wxdata.setUsersource(usersource);
                    WxDataService.save(wxdata);
                }

                JSONArray details = ojb.getJSONArray("details");
                for (int i1 = 0; i1 < details.size(); i1++) {
                    JSONObject jdetail = (JSONObject) details.get(i1);
                    String stat_date = (String) jdetail.get("stat_date");
                    Integer target_user = (Integer) jdetail.get("target_user");
                    Integer int_page_read_user = (Integer) jdetail.get("int_page_read_user");
                    Integer  int_page_read_count = (Integer) jdetail.get("int_page_read_count");
                    Integer ori_page_read_user = (Integer) jdetail.get("ori_page_read_user");
                    Integer ori_page_read_count = (Integer) jdetail.get("ori_page_read_count");
                    Integer share_user = (Integer) jdetail.get("share_user");
                    Integer share_count = (Integer) jdetail.get("share_count");
                    Integer add_to_fav_user = (Integer) jdetail.get("add_to_fav_user");
                    Integer add_to_fav_count = (Integer) jdetail.get("add_to_fav_count");
                    Integer int_page_from_session_read_user = (Integer)jdetail.get("int_page_from_session_read_user");
                    Integer int_page_from_session_read_count = (Integer)jdetail.get("int_page_from_session_read_count");

                    Details one = wxDetailService.getOne(new QueryWrapper <Details>().eq(
                            "msgid", msgid).eq("statdate", stat_date));
                    if(one==null){
                        one=new Details();
                        one.generateKey();
                        one.setMsgid(msgid);
                        one.setStatdate(stat_date);
                        one.setIntpagefromsessionreadcount(int_page_from_session_read_count);
                        one.setIntpagefromsessionreaduser(int_page_from_session_read_user);
                        one.setTargetuser(target_user);
                        one.setIntpagereaduser(int_page_read_user);
                        one.setIntpagereadcount(int_page_read_count);
                        one.setOripagereaduser(ori_page_read_user);
                        one.setOripagereadcount(ori_page_read_count);
                        one.setAddtofavcount(add_to_fav_count);
                        one.setSharecount(share_count);
                        one.setShareuser(share_user);
                        one.setAddtofavuser(add_to_fav_user);

                        one.setWxaccountID(wxcontent.getWxAccountID());
                        wxDetailService.save(one);
                    }
                }
            }
        }


    });
}


            });
        }



    }
}