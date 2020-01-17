package com.gpower.modules.wx.util;


import com.gpower.common.exception.GpException;
import com.gpower.common.utils.FileUtil;
import com.gpower.common.utils.StringUtil;
import com.gpower.common.utils.UUIDGenerator;
import com.gpower.startup.config.ApplicationContextUtil;
import org.json.JSONObject;

import com.gpower.modules.wx.entity.WxAccount;
import com.gpower.modules.wx.entity.WxNewsContent;
import com.gpower.modules.wx.service.WxAccountService;
import org.springframework.util.Base64Utils;
import org.json.JSONArray;
import java.io.File;
import java.util.*;

/**
 * 微信远程发布工具类,使用于cms服务器在内网中不能对外，需要在application-gpower.properties中配置：
 * <p>gpower.wxpublish.remote.url=远程端地址</p>
 * <p>gpower.wxpublish.remote.on=true</p>
 * @author liuzl
 *
 */
public class WxRemoteUtil {
    public static String getUserCumulate(String accountID,String beginDate,String endDate) throws GpException{
        try {
            JSONObject json = getAccount("usercumulate", accountID);
            json.put("beginDate", beginDate);
            json.put("endDate", endDate);
            String result = toPublish(json);
            return result;
        } catch (Exception e) {
            e.printStackTrace();
            throw new GpException(e.getMessage());
        }
    }
    public static String getUserSummary(String accountID,String beginDate,String endDate) throws GpException{
        try {
            JSONObject json = getAccount("usersummary", accountID);
            json.put("beginDate", beginDate);
            json.put("endDate", endDate);
            String result = toPublish(json);
            return result;
        } catch (Exception e) {
            e.printStackTrace();
            throw new GpException(e.getMessage());
        }
    }
    public static String getArticleSummary(String accountID,String beginDate,String endDate) throws GpException{
        try {
            JSONObject json = getAccount("articlesummary", accountID);
            json.put("beginDate", beginDate);
            json.put("endDate", endDate);
            String result = toPublish(json);
            return result;
        } catch (Exception e) {
            e.printStackTrace();
            throw new GpException(e.getMessage());
        }
    }
    /**
     * <p>@description :群发文本消息</p>
     *	<p>@version :0.1</p>
     * <p>@author :liuzl</p>
     * <p>@Time :2018-11-07</p>
     * <p>@param accountID
     * <p>@param content
     * <p>@throws GpException </p>
     */
    public static String publishText(String accountID,String content)throws GpException {
        try {
            String key = "text";
            JSONObject json = getAccount(key, accountID);
            json.put(key, content);
            String result = toPublish(json);

            return result;
        } catch (Exception e) {
            e.printStackTrace();
            throw new GpException(e.getMessage());
        }


    }
    /**
     * <p>@description :群发图片消息</p>
     *	<p>@version :0.1</p>
     * <p>@author :liuzl</p>
     * <p>@Time :2018-11-07</p>
     * <p>@param accountID
     * <p>@param image
     * <p>@return
     * <p>@throws GpException </p>
     */
    public static String publishImage(String accountID,File image)throws GpException{
        try {
            String key = "image";
            String imageString = FileUtil.fileToEncodeString(image.getAbsolutePath());
            JSONObject json = getAccount(key, accountID);
            json.put(key, imageString);
            json.put("imageName", image.getName());
            String result = toPublish(json);

            return result;
        } catch (Exception e) {
            e.printStackTrace();
            throw new GpException(e.getMessage());
        }
    }
    /**
     * <p>@description :群发图文消息</p>
     *	<p>@version :0.1</p>
     * <p>@author :liuzl</p>
     * <p>@Time :2018-11-07</p>
     * <p>@param accountID
     * <p>@param newsList
     * <p>@return
     * <p>@throws GpException </p>
     */
    public static String publishNews(String accountID,List<WxNewsContent> newsList)throws GpException{
        try {
            String key = "news";
            JSONObject json = getAccount(key, accountID);
            JSONArray newsArray = new JSONArray();
            for(int i=0,len=newsList==null?0:newsList.size();i<len;i++){
                WxNewsContent news = newsList.get(i);
                String thumbFilePath = ApplicationContextUtil.getEnvironment().getProperty
                        ("gpower.publish.path")+File
                        .separator+"wx"+File
                        .separator+accountID+File
                        .separator+news.getThumbImageName();
                Map<String,String> fileMaps = doNewsContentImage(accountID, news.getContent());
                JSONObject newsJson = new JSONObject();
                newsJson.put("sortID", news.getSortID());
                newsJson.put("author", news.getAuthor());
                newsJson.put("title", news.getTitle());
                newsJson.put("content_source_url", news.getContent_source_url());
                String content = Base64Utils.encodeToString(news.getContent().getBytes());
                newsJson.put("content", content);
                newsJson.put("digest", news.getDigest());
                newsJson.put("show_cover_pic", news.getShow_cover_pic());
                newsJson.put("thumbImageName", news.getThumbImageName());
                String thumbFileString = FileUtil.fileToEncodeString(thumbFilePath);
                newsJson.put("thumb", thumbFileString);
                if(fileMaps!=null && !fileMaps.isEmpty()){
                    Map<String,String> images = new HashMap<>();
                    Iterator<String> it = fileMaps.keySet().iterator();
                    while(it.hasNext()){
                        String imageUrl = it.next();
                        String imageFilePath = fileMaps.get(imageUrl);
                        String imageFileString = FileUtil.fileToEncodeString(imageFilePath);
                        images.put(imageUrl, imageFileString);
                    }
                    newsJson.put("images", images);
                }
                newsArray.put(newsJson);
            }
            json.put(key, newsArray);
            String result = toPublish(json);

            return result;
        } catch (Exception e) {
            e.printStackTrace();
            throw new GpException(e.getMessage());
        }
    }
    private static Map<String,String> doNewsContentImage(String accountID,String content) throws Exception{
        String property = ApplicationContextUtil.getEnvironment().getProperty("gpower.contentimage.prefix");

        String wxImagePrefix = ApplicationContextUtil.getEnvironment().getProperty("gpower" +
                ".contentimage.prefix","http://mmbiz.qpic.cn/mmbiz_");
        Set<String> set = HtmlUtil.getImageUrlList(content);
        Iterator<String> it = set.iterator();
        Map<String,String> map = new HashMap<>();
        while(it.hasNext()){
            String url = it.next();
            if(url.startsWith(wxImagePrefix+"png/") || url.startsWith(wxImagePrefix+"jpg/")){
                continue;
            }
            if(url.startsWith(property)){
                String fileName = url.substring(url.lastIndexOf("/")+1);
                String path = property+File.separator+"wx"+File.separator+accountID+File.separator+fileName;
                map.put(url, path);
            }else if(url.contains("resource/wechatEditor/img/static/")){
                String fileName = UUIDGenerator.getUUID()+"."+StringUtil.getFileExtension(url.substring(url.lastIndexOf("/")+1));
                String path =property+File.separator+"wx"+File.separator+accountID+File.separator+fileName;
                HttpUtil httpUtil = new HttpUtil();
                httpUtil.download(url, path);
                map.put(url, path);
            }

        }

        return map;
    }
    private static String toPublish(JSONObject json) throws Exception{
       String requestContent = json.toString();
        /* String requestContent = encrypt(json);*/
        Map<String, Object> parameters = new HashMap<String, Object>();
        parameters.put("content", requestContent);
      /*  RSAUtil util = new RSAUtil();*/
       // String requestContent1 = requestContent.replaceAll("%2B","\\+");
        //System.out.println("解压后："+util.decrypt(requestContent1));;
        String result = post(parameters);
        return result;
    }
    private static String post(Map<String, Object> parameters){
        String url = ApplicationContextUtil.getEnvironment().getProperty("gpower.wxpublish.remote.url");
        HttpUtil http = new HttpUtil();
        String result = http.doHttpPost(url, parameters);
        return result;
    }

    private static JSONObject getAccount(String type,String accountID)throws Exception{
        WxAccountService wxAccountService = ApplicationContextUtil.getBean(WxAccountService.class);
        WxAccount account = wxAccountService.findById(accountID);
        if(account==null){
            throw new GpException("error.account.noexist");
        }
        String appID = account.getAppId();
        String secret = account.getAppSecret();
        JSONObject json = new JSONObject();
        json.put("appID", appID);
        json.put("secret", secret);
        json.put("type", type);
        return json;
    }
  /*  private static String encrypt(JSONObject json) throws Exception{
        RSAUtil util = new RSAUtil();
        String cryptograph = util.encrypt(json.toString());
        cryptograph = cryptograph.replaceAll("\\+", "%2B");
        System.out.println("send:"+cryptograph);
        return cryptograph;
    }*/
}
