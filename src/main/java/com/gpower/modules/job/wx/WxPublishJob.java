package com.gpower.modules.job.wx;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.gpower.common.exception.GpException;
import com.gpower.modules.wx.entity.WxContent;
import com.gpower.modules.wx.entity.WxImageContent;
import com.gpower.modules.wx.entity.WxNewsContent;
import com.gpower.modules.wx.entity.WxTextContent;
import com.gpower.modules.wx.service.WxContentService;
import com.gpower.modules.wx.service.WxImageContentService;
import com.gpower.modules.wx.service.WxNewsContentService;
import com.gpower.modules.wx.service.WxTextContentService;
import com.gpower.modules.wx.util.WxRemoteUtil;
import com.gpower.modules.wx.util.WxUtils;
import com.gpower.startup.config.ApplicationContextUtil;
import com.gpower.startup.config.ApplicationStartup;
import org.apache.commons.lang.StringUtils;
import org.json.JSONObject;
import org.quartz.Job;
import org.quartz.JobExecutionContext;
import org.quartz.JobExecutionException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.env.Environment;

import java.io.File;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * @description:
 * @author: jingff
 * @date: 2019-08-27 10:23
 */
public class WxPublishJob implements Job {

    private static Logger log = LoggerFactory.getLogger(ApplicationStartup.class);
    @Override
    public void execute(JobExecutionContext jobExecutionContext) throws JobExecutionException {


        try {

            WxContentService wxContentService = ApplicationContextUtil.getBean(WxContentService.class);
            WxTextContentService wxTextContentService = ApplicationContextUtil.getBean(WxTextContentService.class);
            WxImageContentService wxImageContentService = ApplicationContextUtil.getBean(WxImageContentService.class);
            WxNewsContentService wxNewsContentService = ApplicationContextUtil.getBean(WxNewsContentService.class);
            Environment env = ApplicationContextUtil.getBean(Environment.class);

            Map <String, Object> map = new HashMap <String, Object>();
            map.put("status", WxContent.STATUS_REVOKED);
            Date publishDateEnd = new Date();
            map.put("publishDateEnd", publishDateEnd);
            List <WxContent> list = wxContentService.selectByCondition(map);
            boolean remote = Boolean.parseBoolean(ApplicationContextUtil.getEnvironment().getProperty("gpower.wxpublish.remote.on", "false"));
            for (int i = 0; i < list.size(); i++) {
                System.out.println(list.get(i).toString()+"wxcontent");
            }

            if (list != null && list.size() > 0) {

                for (int i = 0; i < list.size(); i++) {
                    WxContent wxContent = list.get(i);
                    wxContent.setStatus(WxContent.STATUS_PUBLISHED);
                    wxContentService.updateById(wxContent);
                    try {
                        String msgDataID = null;
                        String wxResult = null;
                        if (WxContent.TYPE_TEXT == wxContent.getType()) {
                            WxTextContent text = wxTextContentService.getOne(new QueryWrapper <WxTextContent>().eq(
                                    "wxContentID", wxContent.getId()));
                            if (remote) {
                                String remoteResult = WxRemoteUtil.publishText(wxContent.getWxAccountID(), text.getContent());
                                JSONObject resultJson = new JSONObject(remoteResult);
                                if (resultJson.optInt("status", 500) == 200 && StringUtils.isNotBlank(resultJson.optString("wxResult"))) {
                                    wxResult = resultJson.optString("wxResult");
                                } else {
                                    throw new GpException(resultJson.optString("msg", "系统异常"));
                                }
                            } else {
                                wxResult = WxUtils.sendText(wxContent.getWxAccountID(), text.getContent());
                            }


                        } else if (WxContent.TYPE_IMAGE == wxContent.getType()) {
                            WxImageContent image = wxImageContentService.getOne(new QueryWrapper <WxImageContent>().eq(
                                    "wxContentID", wxContent.getId()));
                            String property = env.getProperty("gpower.publish.path");
                            String path =
                                    property + File.separator + "wx" + File.separator + wxContent.getWxAccountID() + File.separator + image.getImgUrl();
                            if (remote) {
                                String remoteResult = WxRemoteUtil.publishImage(wxContent.getWxAccountID(), new File(path));
                                JSONObject resultJson = new JSONObject(remoteResult);
                                if (resultJson.optInt("status", 500) == 200 && StringUtils.isNotBlank(resultJson.optString("wxResult"))) {
                                    wxResult = resultJson.optString("wxResult");
                                } else {
                                    throw new GpException(resultJson.optString("msg", "系统异常"));
                                }
                            } else {
                                wxResult = WxUtils.sendImage(wxContent.getWxAccountID(), image.getImageMediaID());

                            }


                        } else if (WxContent.TYPE_MPNEWS == wxContent.getType()) {

                            List <WxNewsContent> newslist = wxNewsContentService.list(new QueryWrapper <WxNewsContent>().eq(
                                    "wxContentID", wxContent.getId()));

                            if (remote) {
                                String remoteResult = WxRemoteUtil.publishNews(wxContent.getWxAccountID(), newslist);
                                JSONObject resultJson = new JSONObject(remoteResult);
                                if (resultJson.optInt("status", 500) == 200 && StringUtils.isNotBlank(resultJson.optString("wxResult"))) {
                                    wxResult = resultJson.optString("wxResult");
                                } else {
                                    throw new GpException(resultJson.optString("msg", "系统异常"));
                                }
                            } else {
                                wxResult = WxUtils.sendNews(wxContent.getWxAccountID(), wxContent.getMpnewsMediaId());
                                JSONObject json = new JSONObject(wxResult);
                                msgDataID = json.optString("msg_data_id");
                            }


                        } else {
                            throw new GpException("群发消息类型错误");
                        }
                        JSONObject resultJson = new JSONObject(wxResult);
                        if(Integer.valueOf(resultJson.opt("errcode").toString())>0){
                            wxContent.setStatus(WxContent.STATUS_PUBLISHFAIL);
                        }
                        wxContent.setWxResult(wxResult);

                    } catch (Exception e) {

                        JSONObject json = new JSONObject();
                        json.put("errcode", 500);
                        json.put("errmsg", e.getMessage());
                        wxContent.setStatus(WxContent.STATUS_PUBLISHFAIL);
                        wxContent.setWxResult(json.toString());
                    }

                    wxContentService.updateById(wxContent);

                }

            }
        } catch (Exception e) {
            e.printStackTrace();

        }


    }
}
