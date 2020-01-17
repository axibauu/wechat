package com.gpower.modules.wx.util;



import com.gpower.common.exception.GpException;
import com.gpower.startup.config.ApplicationContextUtil;
import org.apache.http.HttpEntity;
import org.apache.http.NameValuePair;
import org.apache.http.client.ClientProtocolException;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.config.Registry;
import org.apache.http.config.RegistryBuilder;
import org.apache.http.conn.socket.ConnectionSocketFactory;
import org.apache.http.conn.socket.PlainConnectionSocketFactory;
import org.apache.http.conn.ssl.SSLConnectionSocketFactory;
import org.apache.http.entity.ContentType;
import org.apache.http.entity.mime.MultipartEntityBuilder;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.impl.conn.PoolingHttpClientConnectionManager;
import org.apache.http.message.BasicNameValuePair;
import org.apache.http.util.EntityUtils;
import org.json.JSONObject;
import org.springframework.core.env.Environment;

import javax.net.ssl.SSLContext;
import javax.net.ssl.TrustManager;
import javax.net.ssl.X509TrustManager;
import javax.security.cert.CertificateException;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.security.KeyManagementException;
import java.security.NoSuchAlgorithmException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

/**
 * @description:
 * @author: jingff
 * @date: 2019-08-02 14:19
 */
public class WbUtils {

    /*https://c.api.weibo.com/2/statuses/update/biz.json*/
    private static final String GRANT_TYPE = "client_credential";
    private static final String URL_SHOUQUAN = "https://api.weibo.com/oauth2/authorize";
    private static final String URL_ACCESSTOKEN = "https://api.weibo.com/oauth2/access_token";
    private static final String URL_TEXT = "https://c.api.weibo.com/2/statuses/update/biz.json";
    private static final String URL_TEXTIMG = "https://api.weibo.com/2/statuses/share.json";
    /*用户的粉丝数、关注数、微博数。*/
    private static final String USER_SHOW="https://api.weibo.com/2/users/counts.json";
    private static final String User_contents_batch ="https://c.api.weibo" +
            ".com/2/users/counts_batch/other" +
            ".json";
    private static final String URL_UPLOADNEWS = "https://api.weixin.qq.com/cgi-bin/media/uploadnews";
    private static final String URL_SENDALL = "https://api.weixin.qq.com/cgi-bin/message/mass/sendall";
    private static final String URL_GETUSERSUMMARY = "https://api.weixin.qq.com/datacube/getusersummary";
    private static final String URL_GETUSERCUMULATE = "https://api.weixin.qq.com/datacube/getusercumulate";
    private static final String URL_GETARTICLESUMMARY = "https://api.weixin.qq.com/datacube/getarticlesummary";
private  static  final String URL_TOUTIAOARTICLE="https://api.weibo.com/proxy/article/publish.json";
private static  final String URL_DELETE="http://api.t.sina.com.cn/statuses/destroy/";


    public static final String MEDIA_TYPE_IMAGE = "image";
    public static final String MEDIA_TYPE_THUMB = "thumb";
    public static final String MEDIA_TYPE_VOICE = "voice";
    public static final String MEDIA_TYPE_VIDEO = "video";

    public static void main(String[] args) throws  Exception {



/*

            String sResponse = null;
            CloseableHttpClient httpClient = HttpClients.createDefault();
            HttpPost uploadFile = new HttpPost(URL_TEXTIMG);
            MultipartEntityBuilder builder = MultipartEntityBuilder.create();
            builder.addTextBody("access_token", "2.00OUqk_G0kY_ZUb8538c599c0I2y2M", ContentType.TEXT_PLAIN);
            String encode1 = null;

                encode1 = URLEncoder.encode("北京人", "UTF-8");

            builder.addTextBody("status", encode1+"https://www.gpowersoft.com/index.htm",
                    ContentType.TEXT_PLAIN);
        File file = new File("C:\\MySoft\\apache-tomcat-8.5" +
                ".34\\webapps\\publish\\wb\\3faa58998c53410fba7a61dc2a7db956\\3faa58998c53410fba7a61dc2a7db956_2ef0cd4946c9494683a6b3f72ebb71d1.png");
        File file1 = new File("C:\\MySoft\\apache-tomcat-8.5" +
                ".34\\webapps\\publish\\wb\\3faa58998c53410fba7a61dc2a7db956\\3faa58998c53410fba7a61dc2a7db956_3847c6974cac41dd8fd69f6e6edb74e8.png");
                    builder.addBinaryBody(
                            "pic",
                            new FileInputStream(file),
                            ContentType.APPLICATION_OCTET_STREAM,
                            file.getName()
                    );
                    builder.addBinaryBody(
                            "pic",
                            new FileInputStream(file1),
                            ContentType.APPLICATION_OCTET_STREAM,
                            file1.getName()
                    );



                HttpEntity multipart = builder.build();
                CloseableHttpResponse response = httpClient.execute(uploadFile);
                HttpEntity responseEntity = response.getEntity();
                sResponse= EntityUtils.toString(responseEntity, "UTF-8");


                System.out.println(sResponse);
*/




    }


    public static String  removeWeibo(Map<String,Object> paramer,Long id){

        String s =
                new HttpUtil().doHttpPost(" http://api.t.sina.com.cn/statuses/destroy/:id"+id+
                        ".json",paramer
                       /* ":id="+id, paramer*/);
        System.out.println(s+"-----------s--");
        return s;

    }
    /*发微博*/

    public static String publishShangyeText(String content, String token, Integer clength) throws GpException {
        // 创建Httpclient对象
        CloseableHttpClient httpClient1 = HttpClients.createDefault();
        CloseableHttpResponse response1 = null;
        String resultString = "";
        HttpPost httpPost1 = new HttpPost(URL_TEXT);

        Map <String, String> param1 = new HashMap();
        param1.put("access_token", token);
        param1.put("status", content);
        param1.put("is_longtext", clength.toString());
        param1.put("custom_source", "通元软件融媒体");
        if (param1 != null) {
            List<NameValuePair> paramList = new ArrayList<>();
            for (String key : param1.keySet()) {
                paramList.add(new BasicNameValuePair(key, param1.get(key)));
            }
            // 模拟表单
            UrlEncodedFormEntity entity = null;
            try {
                entity = new UrlEncodedFormEntity(paramList, "utf-8");
                httpPost1.setEntity(entity);
                response1 = httpClient1.execute(httpPost1);
                resultString = EntityUtils.toString(response1.getEntity(), "utf-8");
                System.out.println("resultString----" + resultString);
                return resultString;
            } catch (UnsupportedEncodingException e) {
                e.printStackTrace();
            } catch (ClientProtocolException e) {
                e.printStackTrace();
            } catch (IOException e) {
                e.printStackTrace();
            } finally {
                try {
                    httpClient1.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }


        }


        return "";
    }

    /*发布图片文字*/

    public static String publishText(String content, String token, Integer clength,String img) throws GpException {
      if(img!=null){
          sendimgtext(token,content,clength,img);
      }
        try {
            sendtext(token,content,clength);
        } catch (IOException e) {
            e.printStackTrace();
        }

        return "";
    }

    public  static  String  sendimgtext(String  token,String content, Integer clength,String img){
        HttpPost httpPost = new HttpPost(URL_TEXTIMG);
        Environment env = ApplicationContextUtil.getBean(Environment.class);
        String weburl = env.getProperty("gpower.wb.weburl");
      /*=================*/
        String sResponse = null;
        SSLContext sslcontext = null;
        try {
            sslcontext = createIgnoreVerifySSL();
        } catch (NoSuchAlgorithmException e) {
            e.printStackTrace();
        } catch (KeyManagementException e) {
            e.printStackTrace();
        }

        // 设置协议http和https对应的处理socket链接工厂的对象
        Registry<ConnectionSocketFactory> socketFactoryRegistry = RegistryBuilder.<ConnectionSocketFactory>create()
                .register("http", PlainConnectionSocketFactory.INSTANCE)
                .register("https", new SSLConnectionSocketFactory(sslcontext))
                .build();
        PoolingHttpClientConnectionManager connManager = new PoolingHttpClientConnectionManager(socketFactoryRegistry);
        HttpClients.custom().setConnectionManager(connManager);

        CloseableHttpClient httpClient = HttpClients.custom().setConnectionManager(connManager).build();
        HttpPost uploadFile = new HttpPost(URL_TEXTIMG);
        MultipartEntityBuilder builder = MultipartEntityBuilder.create();
        builder.addTextBody("access_token", token, ContentType.TEXT_PLAIN);
        String encode1 = null;
        try {
            encode1 = URLEncoder.encode(content, "UTF-8");
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
        }
        builder.addTextBody("status", encode1+weburl,
                ContentType.TEXT_PLAIN);
        try {
            if(img!=null){
                File file = new File(img);
                builder.addBinaryBody(
                        "pic",
                        new FileInputStream(file),
                        ContentType.APPLICATION_OCTET_STREAM,
                        file.getName()
                );  }

            HttpEntity multipart = builder.build();
            uploadFile.setEntity(multipart);
            CloseableHttpResponse response = httpClient.execute(uploadFile);
            HttpEntity responseEntity = response.getEntity();
         sResponse= EntityUtils.toString(responseEntity, "UTF-8");


            System.out.println(sResponse);
        } catch (Exception e) {
            e.printStackTrace();
        }
return   sResponse;
    }




    public static  String sendtext(String  token,String content, Integer clength) throws IOException {
        Environment env = ApplicationContextUtil.getBean(Environment.class);
        HttpPost httpPost = new HttpPost(URL_TEXTIMG);
        String weburl = env.getProperty("gpower.wb.weburl");
        Map<String, String> param1 = new HashMap();
        param1.put("access_token", token);
        param1.put("status", content+weburl);
        param1.put("is_longtext", clength.toString());
        param1.put("custom_source", "通元软件融媒体");


        if (param1 != null) {
            List<NameValuePair> pairList = (List)param1.entrySet().stream().map((e) -> {
                return new BasicNameValuePair((String)e.getKey(), (String)e.getValue());
            }).collect(Collectors.toList());
            try {
                httpPost.setEntity(new UrlEncodedFormEntity(pairList, "UTF-8"));
            } catch (UnsupportedEncodingException e) {
                e.printStackTrace();
            }
        }
//*********************这一段是为了绕过ssl验证****************
        //采用绕过验证的方式处理https请求
        SSLContext sslcontext = null;
        try {
            sslcontext = createIgnoreVerifySSL();
        } catch (NoSuchAlgorithmException e) {
            e.printStackTrace();
        } catch (KeyManagementException e) {
            e.printStackTrace();
        }

        // 设置协议http和https对应的处理socket链接工厂的对象
        Registry<ConnectionSocketFactory> socketFactoryRegistry = RegistryBuilder.<ConnectionSocketFactory>create()
                .register("http", PlainConnectionSocketFactory.INSTANCE)
                .register("https", new SSLConnectionSocketFactory(sslcontext))
                .build();
        PoolingHttpClientConnectionManager connManager = new PoolingHttpClientConnectionManager(socketFactoryRegistry);
        HttpClients.custom().setConnectionManager(connManager);

        //创建自定义的httpclient对象
        CloseableHttpClient httpClient = HttpClients.custom().setConnectionManager(connManager).build();
//***********************************

//如果不需要绕过ssl验证，使用下面这一行获取的httpclient就行
//       CloseableHttpClient httpClient = HttpClients.createDefault();

        Throwable var5 = null;

        Object var8;
        try {
            CloseableHttpResponse response = httpClient.execute(httpPost);
            Throwable var7 = null;

            try {
                var8 = EntityUtils.toString(response.getEntity());
            } catch (Throwable var31) {
                var8 = var31;
                var7 = var31;
                throw var31;
            } finally {
                if (response != null) {
                    if (var7 != null) {
                        try {
                            response.close();
                        } catch (Throwable var30) {
                            var7.addSuppressed(var30);
                        }
                    } else {
                        response.close();
                    }
                }

            }
        } catch (Throwable var33) {
            var5 = var33;
            throw var33;
        } finally {
            if (httpClient != null) {
                if (var5 != null) {
                    try {
                        httpClient.close();
                    } catch (Throwable var29) {
                        var5.addSuppressed(var29);
                    }
                } else {
                    httpClient.close();
                }
            }

        }

        return (String)var8;



       /* String weburl = env.getProperty("gpower.wb.weburl");
        ProtocolSocketFactory fcty = new MySecureProtocolSocketFactory();
        Protocol.registerProtocol("https", new Protocol("https", fcty, 400));
        // 创建Httpclient对象
        CloseableHttpClient httpClient1 = HttpClients.createDefault();
        CloseableHttpResponse response1 = null;
        String resultString = "";
        HttpPost httpPost1 = new HttpPost(URL_TEXTIMG);

        Map <String, String> param1 = new HashMap();
        param1.put("access_token", token);
        param1.put("status", content+weburl);
        param1.put("is_longtext", clength.toString());
        param1.put("custom_source", "通元软件融媒体");


        if (param1 != null) {
            List <NameValuePair> paramList = new ArrayList <>();
            for (String key : param1.keySet()) {
                paramList.add(new BasicNameValuePair(key, param1.get(key)));
            }
            // 模拟表单
            UrlEncodedFormEntity entity = null;
            try {
                entity = new UrlEncodedFormEntity(paramList, "utf-8");
                httpPost1.setEntity(entity);
                response1 = httpClient1.execute(httpPost1);
                resultString = EntityUtils.toString(response1.getEntity(), "utf-8");
                System.out.println("resultString----" + resultString);
                return resultString;
            } catch (UnsupportedEncodingException e) {
                e.printStackTrace();
            } catch (ClientProtocolException e) {
                e.printStackTrace();
            } catch (IOException e) {
                e.printStackTrace();
            } finally {
                try {
                    httpClient1.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }


        }*/






    }






    @Deprecated
    public static SSLContext createIgnoreVerifySSL() throws NoSuchAlgorithmException, KeyManagementException {
        SSLContext sc = SSLContext.getInstance("SSLv3");

        // 实现一个X509TrustManager接口，用于绕过验证，不用修改里面的方法
        X509TrustManager trustManager = new X509TrustManager() {
            @Override
            public void checkClientTrusted(
                    java.security.cert.X509Certificate[] paramArrayOfX509Certificate,
                    String paramString)  {
            }

            @Override
            public void checkServerTrusted(
                    java.security.cert.X509Certificate[] paramArrayOfX509Certificate,
                    String paramString) {
            }

            @Override
            public java.security.cert.X509Certificate[] getAcceptedIssuers() {
                return null;
            }
        };

        sc.init(null, new TrustManager[] { trustManager }, null);
        return sc;

    }


    public  static JSONObject getUserShow(Map<String,Object> param){

        try {
            String s = new HttpUtil().doHttpsGet(USER_SHOW, param);
            System.out.println(s);
            String replace = s.replace("[", "");
            String replace1 = replace.replace("]", "");

            JSONObject a=new JSONObject(replace1);
           /* String friends_count = String.valueOf(a.get("friends_count")) ;
            String statuses_count =  String.valueOf( a.get("statuses_count"));
            String followers_count =  String.valueOf( a.get("followers_count"));
*/
            return a;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    public  static String getEmodition(){

        String aa="https://api.weibo.com/2/emotions.json";

        CloseableHttpClient httpClient1 = HttpClients.createDefault();
        CloseableHttpResponse response1 = null;
        String resultString = "";
        HttpPost httpPost1 = new HttpPost(aa);
        HttpUtil httpUtil = new HttpUtil();
        Map <String, Object> param1 = new HashMap();
        param1.put("access_token", "2.00OUqk_G0kY_ZUb8538c599c0I2y2M");
        param1.put("type", "ani");
      /*  param1.put("is_longtext", clength.toString());
        param1.put("custom_source", "通元软件融媒体");*/
        try {
            String s = httpUtil.doHttpsGet(aa,param1);
        //    JSONArray.
            return  s;
        } catch (Exception e) {
            e.printStackTrace();
        }

     return "";
    }

/**
*@Description: 头条文章
*@Param:
*@return:
*@Author: jingff
*@date: 2019/8/16
*/
    public static String publishHeadArticle(String content, String token, Integer clength) throws GpException {
        // 创建Httpclient对象
        CloseableHttpClient httpClient1 = HttpClients.createDefault();
        CloseableHttpResponse response1 = null;
        String resultString = "";
        HttpPost httpPost1 = new HttpPost("https://api.weibo.com/proxy/article/publish.json");

        Map <String, String> param1 = new HashMap();
        param1.put("access_token", token);
        param1.put("content", "hahahhaha");
        param1.put("title", "ceshi");
        param1.put("cover", "");

        param1.put("status", content+"https://www.gpowersoft.com/index.htm");
      /*  param1.put("is_longtext", clength.toString());
        param1.put("custom_source", "通元软件融媒体");*/
        if (param1 != null) {
            List <NameValuePair> paramList = new ArrayList <>();
            for (String key : param1.keySet()) {
                paramList.add(new BasicNameValuePair(key, param1.get(key)));
            }
            // 模拟表单
            UrlEncodedFormEntity entity = null;
            try {
                entity = new UrlEncodedFormEntity(paramList, "utf-8");
                httpPost1.setEntity(entity);
                response1 = httpClient1.execute(httpPost1);
                resultString = EntityUtils.toString(response1.getEntity(), "utf-8");
                System.out.println("resultString----" + resultString);
                return resultString;
            } catch (UnsupportedEncodingException e) {
                e.printStackTrace();
            } catch (ClientProtocolException e) {
                e.printStackTrace();
            } catch (IOException e) {
                e.printStackTrace();
            } finally {
                try {
                    httpClient1.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }


        }


        return "";
    }
}