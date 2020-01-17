package com.gpower.modules.wx.util;

import org.apache.commons.httpclient.HttpClient;
import org.apache.commons.httpclient.methods.GetMethod;
import org.apache.commons.httpclient.methods.PostMethod;
import org.apache.commons.httpclient.methods.RequestEntity;
import org.apache.commons.httpclient.methods.StringRequestEntity;
import org.apache.commons.httpclient.methods.multipart.FilePart;
import org.apache.commons.httpclient.methods.multipart.MultipartRequestEntity;
import org.apache.commons.httpclient.methods.multipart.Part;
import org.apache.commons.httpclient.protocol.Protocol;
import org.apache.commons.httpclient.protocol.ProtocolSocketFactory;
import org.apache.commons.io.IOUtils;

import org.apache.http.HttpEntity;
import org.apache.http.NameValuePair;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.ContentType;
import org.apache.http.entity.mime.MultipartEntityBuilder;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.DefaultHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.message.BasicNameValuePair;
import org.apache.http.util.EntityUtils;
import org.json.JSONObject;


import java.io.*;
import java.net.URLEncoder;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

/**
 * @description:
 * @author: jingff
 * @date: 2019-07-25 11:07
 */
public class HttpUtil {

    public static void main(String[] args) throws Exception {
       /* long time = System.currentTimeMillis();
        String url = "http://192.168.2.83:9999/base";
        HttpClient client = new HttpClient();
        PostMethod method = new PostMethod(url);
        method.addParameter("key", "8098");//003396fe00474c2a8f301658875f6374
		*//*RequestEntity entity = new StringRequestEntity(json, "application/json", "UTF-8");
		method.setRequestEntity(entity);*//*
        int code = client.executeMethod(method);
        System.out.println("code==" + code);
        InputStream inputStream = method.getResponseBodyAsStream();
        String restult = org.apache.commons.io.IOUtils.toString(inputStream);
        System.out.println(restult);
        System.out.println(System.currentTimeMillis()-time);*/

        publishimage("https://api.weibo.com/2/statuses/share.json");
    }
    /**
     * <p>@description :https的post请求</p>
     *	<p>@version :0.1</p>
     * <p>@author :liuzl</p>
     * <p>@Time :2017-07-20</p>
     * <p>@param url 请求地址
     * <p>@param parameters 请求参数
     * <p>@return</p>
     */
    public String doHttpPost(String url,Map<String,Object> parameters){
        HttpClient client = new HttpClient();
        // 使用POST方法
        PostMethod method = new PostMethod(url);
        try {
            if(parameters!=null){
                Iterator<String> it = parameters.keySet().iterator();
                while(it.hasNext()){
                    String key = it.next();
                    String value = parameters.get(key).toString();
                    method.addParameter(key, value);
                }
            }
    	/*
       	JSONObject json = new JSONObject(parameters);
       	RequestEntity entity = new StringRequestEntity(json.toString(), "application/json", "UTF-8");
           method.setRequestEntity(entity);*/
            client.executeMethod(method);
            InputStream inputStream = method.getResponseBodyAsStream();
            String restult = org.apache.commons.io.IOUtils.toString(inputStream);
            return restult;
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            // 释放连接
            method.releaseConnection();
        }
        return null;
    }
    /**
     * <p>@description :https的GET请求</p>
     *	<p>@version :0.1</p>
     * <p>@author :liuzl</p>
     * <p>@Time :2017-07-20</p>
     * <p>@param uri  请求地址
     * <p>@param parameters 请求参数
     * <p>@return
     * <p>@throws Exception</p>
     */
    public static String doHttpsGet(String uri,Map<String,Object> parameters) throws Exception{
        ProtocolSocketFactory fcty = new MySecureProtocolSocketFactory();
        Protocol.registerProtocol("https", new Protocol("https", fcty, 443));
        HttpClient client = new HttpClient();
        String url = uri;
        if(parameters!=null){
            url += "?";
            Iterator<String> it = parameters.keySet().iterator();
            while(it.hasNext()){
                String key = (String)it.next();
                String value = (String)parameters.get(key);
                if(value!=null){
                    url += "&"+key+"="+value;
                }
            }
        }
        GetMethod get = new GetMethod(url);
        client.executeMethod(get);
        String result = get.getResponseBodyAsString();
        System.out.println("result---"+result);
        return result;
    }
    /**
     * <p>@description :https的post请求</p>
     *	<p>@version :0.1</p>
     * <p>@author :liuzl</p>
     * <p>@Time :2017-07-20</p>
     * <p>@param url 请求地址
     * <p>@param parameters 请求参数
     * <p>@return</p>
     */

  /*  public  static String doWBHttpsPost(String url,Map<String,Object> parameters){
        ProtocolSocketFactory fcty = new MySecureProtocolSocketFactory();
        Protocol.registerProtocol("https", new Protocol("https", fcty, 443));
        DefaultHttpClient httpClient = new DefaultHttpClient();
        HttpPost  postMethod = new HttpPost(url);

        // 使用POST方法
      *//*  PostMethod method = new PostMethod(url);*//*
        try {
            List<NameValuePair> paramList = new ArrayList<>();
            for (String key : parameters.keySet()) {
                paramList.add(new BasicNameValuePair(key, (String) parameters.get(key)));
            }
           *//* JSONObject json = new JSONObject(parameters);
            RequestEntity entity = new StringRequestEntity(json.toString(), "application/json", "UTF-8");
            method.setRequestEntity(entity);
            client.executeMethod(method);*//*
            postMethod.setEntity(new UrlEncodedFormEntity(paramList, "utf-8"));
            InputStream inputStream = method.getResponseBodyAsStream();
            String restult = org.apache.commons.io.IOUtils.toString(inputStream);

            return restult;
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            // 释放连接
            method.releaseConnection();
        }
        return null;
    }*/

    public  static String doHttpsPost(String url,Map<String,Object> parameters){
        ProtocolSocketFactory fcty = new MySecureProtocolSocketFactory();
        Protocol.registerProtocol("https", new Protocol("https", fcty, 443));
        HttpClient client = new HttpClient();
        // 使用POST方法
        PostMethod method = new PostMethod( url);
        try {
            JSONObject json = new JSONObject(parameters);
            RequestEntity entity = new StringRequestEntity(json.toString(), "application/json", "UTF-8");
            method.setRequestEntity(entity);
            client.executeMethod(method);
            InputStream inputStream = method.getResponseBodyAsStream();
            String restult = org.apache.commons.io.IOUtils.toString(inputStream);

            return restult;
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            // 释放连接
            method.releaseConnection();
        }
        return null;
    }
    /**
     * <p>@description :https的post请求</p>
     *	<p>@version :0.1</p>
     * <p>@author :liuzl</p>
     * <p>@Time :2017-07-20</p>
     * <p>@param url 请求地址
     * <p>@param parameters 请求参数
     * <p>@return</p>
     */
    public String doHttpsPost(String url,String parameters){
        ProtocolSocketFactory fcty = new MySecureProtocolSocketFactory();
        Protocol.registerProtocol("https", new Protocol("https", fcty, 443));
        HttpClient client = new HttpClient();
        // 使用POST方法
        PostMethod method = new PostMethod( url);
        try {
            RequestEntity entity = new StringRequestEntity(parameters, "application/json", "UTF-8");
            method.setRequestEntity(entity);
            client.executeMethod(method);
            InputStream inputStream = method.getResponseBodyAsStream();
            String restult = org.apache.commons.io.IOUtils.toString(inputStream);
            return restult;
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            // 释放连接
            method.releaseConnection();
        }
        return null;
    }
    /**
     * <p>@description :上传内容中的图片</p>
     *	<p>@version :0.1</p>
     * <p>@author :liuzl</p>
     * <p>@Time :2017-07-20</p>
     * <p>@param url 请求地址
     * <p>@param file 图片文件
     * <p>@return</p>
     */
    public String doHttpsUploadImg(String url,File file){
        ProtocolSocketFactory fcty = new MySecureProtocolSocketFactory();
        Protocol.registerProtocol("https", new Protocol("https", fcty, 443));
        HttpClient client = new HttpClient();
        // 使用POST方法
        PostMethod method = new PostMethod(url);
        try {
            Part[] parts = {
                    new FilePart("media", file)
            };

            RequestEntity entity = new MultipartRequestEntity(parts, method.getParams());  //(file, "multipart/form-data");
            method.setRequestEntity(entity);
            client.executeMethod(method);
            InputStream inputStream = method.getResponseBodyAsStream();
            String restult = IOUtils.toString(inputStream);
            return restult;
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            // 释放连接
            method.releaseConnection();
        }
        return null;
    }
    /**
     * <p>@description :上传多媒体文件</p>
     *	<p>@version :0.1</p>
     * <p>@author :liuzl</p>
     * <p>@Time :2017-07-20</p>
     * <p>@param url	请求地址
     * <p>@param file	多媒体文件
     * <p>@param type  多媒体类型:图片（image）、语音（voice）、视频（video）和缩略图（thumb）
     * <p>@return</p>
     */
    public String doHttpsUploadMedia(String url,File file,String type){
        return doHttpsUploadImg(url+"&type="+type, file);
    }
    /**
     * <p>@description :下载文件</p>
     *	<p>@version :0.1</p>
     * <p>@author :liuzl</p>
     * <p>@Time :2017-07-25</p>
     * <p>@param uri
     * <p>@param localFileName
     * <p>@return 返回下载的文件
     * <p>@throws Exception</p>
     */
    public File download(String uri,String localFileName) throws Exception{
        File storeFile = null;
        GetMethod get = null;
        FileOutputStream  output = null;
        try {
            if(uri.startsWith("https")){
                ProtocolSocketFactory fcty = new MySecureProtocolSocketFactory();
                Protocol.registerProtocol("https", new Protocol("https", fcty, 443));
            }
            HttpClient client = new HttpClient();
            get = new GetMethod(uri);
            client.executeMethod(get);

            storeFile = new File(localFileName);
            output = new FileOutputStream(storeFile);
            output.write(get.getResponseBody());
        } catch (Exception e) {
            e.printStackTrace();
        }finally {
            if(output != null){
                output.close();
            }
            get.releaseConnection();
        }
        return storeFile;
    }


    public  static  void publishimage(String  url){

        File file = new File("C:\\Users\\10354\\Desktop\\files\\aa.jpg");
        CloseableHttpClient httpClient = HttpClients.createDefault();
        HttpPost uploadFile = new HttpPost(url);
        MultipartEntityBuilder builder = MultipartEntityBuilder.create();
        builder.addTextBody("access_token", "2.00OUqk_G0kY_ZUb8538c599c0I2y2M", ContentType.TEXT_PLAIN);
        try {
            builder.addTextBody("status", URLEncoder.encode(("今晚打LOL吗？https://www.gpowersoft" +
                            ".com/index.htm"),"UTF-8"),
                    ContentType.TEXT_PLAIN);
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
        }

        try {
            builder.addBinaryBody(
                    "pic",
                    new FileInputStream(file),
                    ContentType.APPLICATION_OCTET_STREAM,
                    file.getName()
            );

            HttpEntity multipart = builder.build();
            uploadFile.setEntity(multipart);
            CloseableHttpResponse response = httpClient.execute(uploadFile);
            HttpEntity responseEntity = response.getEntity();
            String sResponse= EntityUtils.toString(responseEntity, "UTF-8");


        } catch (Exception e) {
            e.printStackTrace();
        }


    }

}
