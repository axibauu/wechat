package com.gpower.modules.wx.util;


import cn.hutool.json.JSON;
import com.gpower.common.exception.GpException;
import com.gpower.common.exception.WxException;
import com.gpower.common.utils.RedisUtil;
import com.gpower.modules.wx.entity.WxAccount;
import com.gpower.modules.wx.entity.WxContent;
import com.gpower.modules.wx.entity.WxNewsContent;
import com.gpower.modules.wx.service.WxAccountService;
import com.gpower.startup.config.ApplicationContextUtil;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.context.ApplicationContext;

import java.io.File;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.TimeUnit;

public class WxUtils {
	private static HttpUtil httpUtil = new HttpUtil();
	
	private static final String GRANT_TYPE = "client_credential";
	private static final String URL_ACCESSTOKEN = "https://api.weixin.qq.com/cgi-bin/token";
	private static final String URL_UPLOADIMG = "https://api.weixin.qq.com/cgi-bin/media/uploadimg";
	private static final String URL_UPLOADMEDIA = "https://api.weixin.qq.com/cgi-bin/media/upload";
	private static final String URL_UPLOADNEWS = "https://api.weixin.qq.com/cgi-bin/media/uploadnews";
	private static final String URL_SENDALL = "https://api.weixin.qq.com/cgi-bin/message/mass/sendall";
	private static final String URL_GETUSERSUMMARY = "https://api.weixin.qq.com/datacube/getusersummary";
	private static final String URL_GETUSERCUMULATE = "https://api.weixin.qq.com/datacube/getusercumulate";
	private static final String URL_GETARTICLESUMMARY = "https://api.weixin.qq.com/datacube/getarticlesummary";
private static  final  String  URL_PREVIEW="https://api.weixin.qq.com/cgi-bin/message/mass/preview";
	private static  final String URK_DATEFENXI="https://api.weixin.qq.com/datacube/getarticletotal";

	private static  final  String  URL_DELETE="https://api.weixin.qq.com/cgi-bin/message/mass/delete";
	public static final String MEDIA_TYPE_IMAGE = "image";
	public static final String MEDIA_TYPE_THUMB= "thumb";
	public static final String MEDIA_TYPE_VOICE = "voice";
	public static final String MEDIA_TYPE_VIDEO = "video";

  public static void main2(String[] args) {
  	String url="/medium/upload/image/20191025/1571986688081059481.png\" title=\"1571986688081059481.png\" alt=\"index.png\"/></p>\n" +
			"      ";
	  String fileName = url.substring(url.indexOf("/") + 8);
    System.out.println(fileName);
  }

	public static void main1(String[] args) throws Exception {


		Map<String,Object> parameters1 = new HashMap<String,Object>();
		parameters1.put("grant_type", GRANT_TYPE);
		parameters1.put("appid", "wx436653b7154a403f");
		parameters1.put("secret", "d13b126906e8ad29b881cf1f948bc844");
		String jsonResult = httpUtil.doHttpsGet(URL_ACCESSTOKEN, parameters1);
		System.out.println("getTokenresult:"+jsonResult);
		JSONObject json = new JSONObject(jsonResult);
		String  av= json.optString("access_token");
String beginDate="2018-11-09";String endDate="2018-11-09";

		String parameters = "{\"begin_date\": \""+beginDate+"\", \"end_date\": \""+endDate+"\"}";
		String url = URL_GETARTICLESUMMARY+"?access_token="+av;
		//{"list":[{"ref_date":"2017-08-04","user_source":0,"msgid":"2247483985_1","title":"哪一瞬间让你觉得读书真有用？","int_page_read_user":85,"int_page_read_count":102,"ori_page_read_user":0,"ori_page_read_count":0,"share_user":9,"share_count":11,"add_to_fav_user":1,"add_to_fav_count":1}]}
		String s = httpUtil.doHttpsPost(url, parameters);
		System.out.println("s11111"+s);

/*Map<String,Object> parameters = new HashMap<String,Object>();

		parameters.put("begin_date", "2019-08-21");
		parameters.put("end_date", "2019-08-21");
		String s = httpUtil.doHttpsPost("https://api.weixin.qq.com/datacube/getarticletotal?access_token="
				+ av, parameters);*/
		System.out.println(s+"--ssssssss");
		//httpUtil.doHttpsPost("https://api.weixin.qq.com/datacube/getarticlesummary?access_token="
			//			+av, parameters);

	/*Map<String,Object> parameters = new HashMap<String,Object>();
		parameters.put("grant_type", GRANT_TYPE);
		parameters.put("appid", "wxe7938fa525b2287d");
		parameters.put("secret", "214c05d92dcb5a06e1018a1f8ccdbf75");
		String jsonResult =  httpUtil.doHttpsGet(URL_ACCESSTOKEN, parameters);
		JSONObject json = new JSONObject(jsonResult);
		String access_token = json.optString("access_token");
		System.out.println(access_token);*/
		/*	*//*	/*String access_token = "NlqR6zOi1CPJ-ik7LMwCDfqzrJQlRqUfkQ-CYUxaTmlrnS3ECZAUV1df4vbPp3pF0_SiSeN4zjUFrpsVPKFElqtFERLVRJaEY8B1OCXKYCC6Pqb4YqyNigNIUz5_JtdbKXVjACAXKI";
		String url = "https://api.weixin.qq.com/datacube/getarticlesummary?access_token="+access_token;
		String parameters = "{\"begin_date\": \"2017-08-04\", \"end_date\": \"2017-08-04\"}";
		String result = httpUtil.doHttpsPost(url, parameters);
		System.out.println("result:"+result);*/
		
		/*String url1 = "https://api.weixin.qq.com/datacube/getusersummary?access_token="+access_token;
		String parameters1 = "{\"begin_date\": \"2017-09-24\", \"end_date\": \"2017-09-25\"}";
		String result1 = httpUtil.doHttpsPost(url1, parameters1);
		System.out.println("result:"+result1);*/
	}
	/**
	  * <p>@description :获取图文群发每日数据</p>
	  *	<p>@version :0.1</p>
	  * <p>@author :liuzl</p>
	  * <p>@Time :2017-09-26</p>
	  * <p>@param accountID
	  * <p>@param beginDate
	  * <p>@param endDate
	  * <p>@return</p>
	 */
	public static String getArticleSummary(String accountID, String beginDate,String endDate){
		String parameters = "{\"begin_date\": \""+beginDate+"\", \"end_date\": \""+endDate+"\"}";
		String url = URL_GETARTICLESUMMARY+"?access_token="+getAccessToken(accountID);
		//{"list":[{"ref_date":"2017-08-04","user_source":0,"msgid":"2247483985_1","title":"哪一瞬间让你觉得读书真有用？","int_page_read_user":85,"int_page_read_count":102,"ori_page_read_user":0,"ori_page_read_count":0,"share_user":9,"share_count":11,"add_to_fav_user":1,"add_to_fav_count":1}]}
		return httpUtil.doHttpsPost(url, parameters);
	}
	/**
	  * <p>@description :获取用户增减数据</p>
	  *	<p>@version :0.1</p>
	  * <p>@author :liuzl</p>
	  * <p>@Time :2017-09-26</p>
	  * <p>@param accountID
	  * <p>@param beginDate
	  * <p>@param endDate
	  * <p>@return</p>
	 */
	public static String getUserSummary(String accountID, String beginDate,String endDate){
		String parameters = "{\"begin_date\": \""+beginDate+"\", \"end_date\": \""+endDate+"\"}";
		String url = URL_GETUSERSUMMARY+"?access_token="+getAccessToken(accountID);
		//{"list":[{"ref_date":"2017-09-24","user_source":0,"new_user":0,"cancel_user":3},{"ref_date":"2017-09-25","user_source":0,"new_user":0,"cancel_user":0},{"ref_date":"2017-09-25","user_source":17,"new_user":1,"cancel_user":0}]}
		return httpUtil.doHttpsPost(url, parameters);
	}

	/**
	 * <p>@description :预览接口</p>
	 *	<p>@version :0.1</p>
	 * <p>@author :liuzl</p>
	 * <p>@Time :2017-09-26</p>
	 * <p>@param accountID
	 * <p>@param beginDate
	 * <p>@param endDate
	 * <p>@return</p>
	 */

	public static String getpriview(WxContent wxContent, String accountID, String media_id){
		String parameters="";
		if(wxContent.getType()==3){
			parameters="{\"touser\":\"OPENID\", \"mpnews\":{\"media_id\":\""+media_id+"\" }, " +
					"\"msgtype\":\"mpnews\"}";
		}else if(wxContent.getType()==2){
			parameters="{\"touser\":\"OPENID\", \"image\":{\"media_id\":\""+media_id+"\" }, " +
					"\"msgtype\":\"image\"}";
		}else if(wxContent.getType()==1){
			parameters="{\"touser\":\"OPENID\", \"text\":{\"media_id\":\""+wxContent.getText().getContent()+
					"\" }, " +
					"\"msgtype\":\"text\"}";

		}




		String url = URL_PREVIEW+"?access_token="+getAccessToken(accountID);
		//{"list":[{"ref_date":"2017-09-24","user_source":0,"new_user":0,"cancel_user":3},{"ref_date":"2017-09-25","user_source":0,"new_user":0,"cancel_user":0},{"ref_date":"2017-09-25","user_source":17,"new_user":1,"cancel_user":0}]}
		return httpUtil.doHttpsPost(url, parameters);
	}
	/**
	  * <p>@description :获取累计用户数据</p>
	  *	<p>@version :0.1</p>
	  * <p>@author :liuzl</p>
	  * <p>@Time :2017-09-26</p>
	  * <p>@param accountID
	  * <p>@param beginDate
	  * <p>@param endDate
	  * <p>@return</p>
	 */
	public static String getUserCumulate(String accountID, String beginDate,String endDate){
		String parameters = "{\"begin_date\": \""+beginDate+"\", \"end_date\": \""+endDate+"\"}";
		String url = URL_GETUSERCUMULATE+"?access_token="+getAccessToken(accountID);
		//{"list":[{"ref_date":"2017-09-24","user_source":0,"cumulate_user":332},{"ref_date":"2017-09-25","user_source":0,"cumulate_user":333}]}
		return httpUtil.doHttpsPost(url, parameters);
	}
	/**
	  * <p>@description :从微信接口获取access_token</p>
	  *	<p>@version :0.1</p>
	  * <p>@author :liuzl</p>
	  * <p>@Time :2017-07-20</p>
	  * <p>@param wxAccount
	  * <p>@return</p>
	 */
	public static String getAccessToken(WxAccount wxAccount){
		try {
			Map<String,Object> parameters = new HashMap<String,Object>();
			parameters.put("grant_type", GRANT_TYPE);
			parameters.put("appid", wxAccount.getAppId());
			parameters.put("secret", wxAccount.getAppSecret());
			String jsonResult = httpUtil.doHttpsGet(URL_ACCESSTOKEN, parameters);
			System.out.println("getTokenresult:"+jsonResult);
			//{"access_token":"cvjqcJi80ikRd_4SjS9dNFS8S-BMpNHiZbzHFRwjVNyzQOudhZReDmbmkFuWmTjytZmgnL4JLgEN8ZUU3tgWP5wXdA1nIojEfj60yfS_7D4JSIiACAOXN","expires_in":7200}
			JSONObject json = new JSONObject(jsonResult);
			return json.optString("access_token");
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}
	/**
	  * <p>@description : 存储本地的access_token</p>
	  *	<p>@version :0.1</p>
	  * <p>@author :liuzl</p>
	  * <p>@Time :2017-07-20</p>
	  * <p>@param accountID
	  * <p>@return</p>
	 */
	public static void saveAccessToken(String accountID,String accessToken ){
		RedisUtil.set("access_token_"+accountID,accessToken, 7100L, TimeUnit.SECONDS);
	}
	/**
	  * <p>@description : 获取本地的access_token</p>
	  *	<p>@version :0.1</p>
	  * <p>@author :liuzl</p>
	  * <p>@Time :2017-07-20</p>
	  * <p>@param accountID
	  * <p>@return</p>
	 */
	public static String getAccessToken(String accountID){


		Object obj = RedisUtil.get("access_token_"+accountID);
		if(obj==null || "".equals(obj)){

			 WxAccountService wxAccountService = ApplicationContextUtil.getBean(WxAccountService
					 .class);
			/*WxAccountService wxAccountService = ApplicationContextUtil.getBean(WxAccountService.class);*/
			WxAccount wxAccount = wxAccountService.findById(accountID);
			String accessToken = getAccessToken(wxAccount);

			saveAccessToken(accountID, accessToken);
			return accessToken;
		}
		return (String)obj;
	}
	/**
	  * <p>@description :上传内容中的图片</p>
	  *	<p>@version :0.1</p>
	  * <p>@author :liuzl</p>
	  * <p>@Time :2017-07-20</p>
	  * <p>@param accountID
	  * <p>@param file
	  * <p>@return</p>
	 */
	public static String uploadContentImage(String accountID, File file)throws WxException{
		String jsonResult = httpUtil.doHttpsUploadImg(URL_UPLOADIMG+"?access_token="+getAccessToken(accountID), file);
		JSONObject json = new JSONObject(jsonResult);
		int errcode = json.optInt("errcode",-1);
		if(errcode>0){
			throw new WxException("weixin.errror.code."+errcode);
		}
		//{"url":"http:\/\/mmbiz.qpic.cn\/mmbiz_png\/EretmbPOTOuGHBpz81KRTF3vt62hlmnzHYCvicu1ZqKP1r0lc0MlGC7kpJbuTIXHR5mJ7EmNONke8ic2zubL2mYw\/0"}
		return json.optString("url");
	}


	/**
	  * <p>@description :上传多媒体资源</p>
	  *	<p>@version :0.1</p>
	  * <p>@author :liuzl</p>
	  * <p>@Time :2017-07-20</p>
	  * <p>@param accountID
	  * <p>@param file
	  * <p>@param type
	  * <p>@return</p>
	 */
	public static String uploadMedia(String accountID, File file, String type)throws WxException{
		String jsonResult = httpUtil.doHttpsUploadMedia(URL_UPLOADMEDIA+"?access_token="+getAccessToken(accountID), file, type);//分别有图片（image）、语音（voice）、视频（video）和缩略图（thumb）
		JSONObject json = new JSONObject(jsonResult);
		System.out.println("jsonResult___"+jsonResult);
		int errcode = json.optInt("errcode",-1);
		if(errcode>0){
			throw new WxException("微信封面上传失败，官方返回码为"+errcode);
		}
		//{"type":"thumb","thumb_media_id":"vXfZMeVS7sVkjJj1lylFvpKZRwAOZaupxdSesV-xlFvCIUTWp9mmC4P3QkOct34T","created_at":1500452751}
		String s = json.optString("thumb_media_id");
		return s;
	}
	/**
	  * <p>@description :上传图文消息</p>
	  *	<p>@version :0.1</p>
	  * <p>@author :liuzl</p>
	  * <p>@Time :2017-07-20</p>
	  * <p>@param accountID
	  * <p>@param list
	  * <p>@return</p>
	 */
	public static String uploadMpNews(String accountID, List<WxNewsContent> list)throws WxException{

			JSONArray jsonArray = new JSONArray();
			for (int i = 0; i < list.size(); i++) {
				WxNewsContent wxNews = list.get(i);
				JSONObject article1 = new JSONObject();
				article1.put("thumb_media_id", wxNews.getThumbMediaId());
				article1.put("author", wxNews.getAuthor());
				article1.put("title", wxNews.getTitle());
				article1.put("content_source_url", wxNews.getContent_source_url());
				article1.put("content", wxNews.getContent());
				article1.put("digest", wxNews.getDigest());
				article1.put("show_cover_pic", wxNews.getShow_cover_pic());
				jsonArray.put(article1);
			}
			JSONObject articles = new JSONObject();
			articles.put("articles", jsonArray);
			String parameter = articles.toString();
			String jsonResult = httpUtil.doHttpsPost(URL_UPLOADNEWS+"?access_token="+getAccessToken(accountID), parameter);
			//{"type":"news","media_id":"5dosP2KAwL8O30QUDoX7keU0M0z_rH-ueKpSOLMqIJZKauiyU9ptpTmfPWf2gI8c","created_at":1500453933}
			JSONObject json = new JSONObject(jsonResult);
			int errcode = json.optInt("errcode",-1);
			if(errcode>0){
				throw new WxException("媒体图文上传错误，微信官方返回码为"+errcode);
			}
			return json.optString("media_id");

	}
	/**
	  * <p>@description :群发</p>
	  *	<p>@version :0.1</p>
	  * <p>@author :liuzl</p>
	  * <p>@Time :2017-07-20</p>
	  * <p>@param accountID
	  * <p>@param requestBody
	  * <p>@return</p>
	 */
	private static String sendAll(String accountID, String requestBody){
		String token = getAccessToken(accountID);
		System.out.println("token:"+token);
		return httpUtil.doHttpsPost(URL_SENDALL+"?access_token="+token, requestBody);
		
		//return "{\"errcode\":0, \"errmsg\":\"send job submission success\",\"msg_id\":34182, \"msg_data_id\": 206227730}";
	}
	/**
	  * <p>@description :群发图文</p>
	  *	<p>@version :0.1</p>
	  * <p>@author :liuzl</p>
	  * <p>@Time :2017-07-20</p>
	  * <p>@param accountID
	  * <p>@param media_id
	  * <p>@return</p>
	 */
	public static String sendNews(String accountID,String media_id){
		String body = "{\"filter\":{ \"is_to_all\":true}, \"mpnews\":{ \"media_id\":\""+media_id+"\" },\"msgtype\":\"mpnews\",\"send_ignore_reprint\":1}";
		String re = sendAll(accountID, body);
		System.out.println("re:"+re);
		return re ;
	}
	/**
	  * <p>@description :群发文本</p>
	  *	<p>@version :0.1</p>
	  * <p>@author :liuzl</p>
	  * <p>@Time :2017-07-20</p>
	  * <p>@param accountID
	  * <p>@param content
	  * <p>@return</p>
	 */
	public static String sendText(String accountID,String content){
		String body = "{\"filter\":{ \"is_to_all\":true}, \"text\":{ \"content\":\""+content+"\" },\"msgtype\":\"text\",\"send_ignore_reprint\":1}";
		return sendAll(accountID, body);
	}
	/**
	  * <p>@description :群发图片</p>
	  *	<p>@version :0.1</p>
	  * <p>@author :liuzl</p>
	  * <p>@Time :2017-07-20</p>
	  * <p>@param accountID
	  * <p>@param media_id
	  * <p>@return</p>
	 */
	public static String sendImage(String accountID,String media_id){
		String body = "{\"filter\":{ \"is_to_all\":true}, \"image\":{ \"media_id\":\""+media_id+"\" },\"msgtype\":\"image\",\"send_ignore_reprint\":1}";
		return sendAll(accountID, body);
	}



	/**
	*@Description: 获取图文收藏数，阅读量
	*@Param:
	*@return:
	*@Author: jingff
	*@date: 2019/8/6
	*/
	public  static  String  getArticleInfo(String accountID, String  beginTime, String endTime,
										   String timeday){
		String accessToken = getAccessToken(accountID);

		Map<String,Object> parameters = new HashMap<String,Object>();
		parameters.put("begin_date", "2018-11-09");
		parameters.put("end_date", "2018-11-09");
		String s = httpUtil.doHttpsPost(URK_DATEFENXI+"?access_token="+accessToken, parameters);
		return  s;

	}

	/**
	 *@Description: 获取图文收藏数，阅读量
	 *@Param:
	 *@return:
	 *@Author: jingff
	 *@date: 2019/8/6
	 */
	public  static  String  getArticleInfo1(String accountID,String publishDate ){

		String accessToken = getAccessToken(accountID);

		Map<String,Object> parameters = new HashMap<String,Object>();
		parameters.put("begin_date", publishDate);
		parameters.put("end_date", publishDate);
		String s = httpUtil.doHttpsPost(URK_DATEFENXI+"?access_token="+accessToken, parameters);
		return  s;

	}


	/**
	*@Description: 、删除群发消息只能删除图文消息和视频消息，其他类型的消息一经发送，无法删除。
	*@Param:
	*@return:
	*@Author: jingff
	*@date: 2019/8/15
	*/

	public  static  String  deletePublishArticle(String accountID,String msgid){
		String accessToken = getAccessToken(accountID);

		Map<String,Object> parameters = new HashMap<String,Object>();
		parameters.put("msg_id",msgid);
		String s = httpUtil.doHttpsPost(URL_DELETE+"?access_token="+accessToken, parameters);
		JSONObject jsonObject=new JSONObject(s);
		int errcode = jsonObject.optInt("errcode",-1);
		if(errcode>0){
			throw new GpException("weixin.errror.code."+errcode);
		}
		//{"url":"http:\/\/mmbiz.qpic.cn\/mmbiz_png\/EretmbPOTOuGHBpz81KRTF3vt62hlmnzHYCvicu1ZqKP1r0lc0MlGC7kpJbuTIXHR5mJ7EmNONke8ic2zubL2mYw\/0"}
		return s;

	}


	public  static  String  deleteNews(String accountID,String msgid){
		String accessToken = getAccessToken(accountID);

		Map<String,Object> parameters = new HashMap<String,Object>();
		parameters.put("msg_id",Integer.valueOf(msgid));
		parameters.put("article_idx",0);

		String s = httpUtil.doHttpsPost(URL_DELETE+"?access_token="+accessToken, parameters);
		JSONObject jsonObject=new JSONObject(s);
		int errcode = jsonObject.optInt("errcode",-1);
		if(errcode>0){
			throw new GpException("weixin.errror.code."+errcode);
		}
		//{"url":"http:\/\/mmbiz.qpic.cn\/mmbiz_png\/EretmbPOTOuGHBpz81KRTF3vt62hlmnzHYCvicu1ZqKP1r0lc0MlGC7kpJbuTIXHR5mJ7EmNONke8ic2zubL2mYw\/0"}
		return s;

	}

}
