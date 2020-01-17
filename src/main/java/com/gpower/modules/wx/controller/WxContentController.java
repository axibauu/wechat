package com.gpower.modules.wx.controller;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.gpower.common.controller.BaseController;
import com.gpower.common.exception.GpException;
import com.gpower.common.result.PageInfo;
import com.gpower.common.result.Result;
import com.gpower.common.utils.FileUtil;
import com.gpower.common.utils.ShiroUtil;
import com.gpower.common.utils.UUIDGenerator;
import com.gpower.modules.user.entity.User;
import com.gpower.modules.user.service.UserService;
import com.gpower.modules.wx.entity.*;
import com.gpower.modules.wx.service.*;
import com.gpower.modules.wx.util.HtmlUtil;
import com.gpower.modules.wx.util.RSAUtil;
import com.gpower.modules.wx.util.StringUtil;
import com.gpower.modules.wx.util.WxUtils;
import org.apache.commons.codec.binary.Base64;
import org.apache.commons.lang.StringUtils;
import org.apache.commons.lang.time.DateUtils;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.net.URLDecoder;
import java.nio.file.Paths;
import java.text.ParseException;
import java.util.*;

/**
 * @description:
 * @author: jingff
 * @date: 2019-07-24 14:32
 */
@RestController
@RequestMapping("wx/content")
public class WxContentController extends BaseController {

  @Autowired WxContentService wxContentService;
  @Autowired WxAccountService wxAccountService;
  @Autowired UserService userService;
  @Autowired Environment env;
  @Autowired StringRedisTemplate srt;
  @Autowired WxTextContentService wxTextContentService;
  @Autowired WxImageContentService wxImageContentService;
  @Autowired WxNewsContentService wxNewsContentService;

  @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
  @ResponseBody
  public Result deletePublishArticle(@PathVariable String id) {
    WxContent wxContent = wxContentService.getById(id);
    if (wxContent.getType() == 1) {
      wxContentService.removeById(id);
    } else {
      int status = wxContent.getStatus();
      if (status == WxContent.STATUS_PUBLISHFAIL) {
        wxContentService.removeById(wxContent.getId());
      } else {

        wxContentService.deletePulishArticle(wxContent);
      }
    }

    return Result.ok();
  }

  @RequestMapping(value = "/pub", method = RequestMethod.POST)
  @ResponseBody
  public Result pubWxContent(String content) {
    String checkurl = env.getProperty("gpower.errordetect.url");
    /*   HttpUtil.doHttpsPost(, )*/

    return Result.ok();
  }
  @RequestMapping(value = "/getEncryptContent", method = RequestMethod.POST)
  @ResponseBody
  public Result getEncryptContent(String content) {

    try {
      content = HtmlUtil.stripTags(content);
      RSAUtil rsaUtil = new RSAUtil();
      JSONObject json = new JSONObject();
      json.put("content", content);
      json.put("source", env.getProperty("gpower.errordetect.source"));
      String dealString = new Base64().encodeToString(json.toString().getBytes());
      String encryptContent = rsaUtil.encrypt(dealString);
      String url = env.getProperty("gpower.errordetect.url");
      Map<String, String> map = new HashMap<>();
      map.put("url", url);
      map.put("encryptContent", encryptContent);

      return  Result.ok().put("object", map);
    } catch (Exception e) {

      String msg = getMessage(e.getMessage());


      return Result.error(msg);
    }
  }

  @RequestMapping(value = "/checkContent", method = RequestMethod.POST)
  @ResponseBody
  public Result pubWxContent(String id, String time) {
    WxContent wxcontent = wxContentService.getById(id);
    try {
      Date publish = DateUtils.parseDate(time, new String[] {"yyyy-MM-dd HH:mm"});
      wxcontent.setPublishDate(publish);
      wxcontent.setStatus(WxContent.STATUS_REVOKED);
      wxContentService.updateById(wxcontent);
    } catch (ParseException e) {
      e.printStackTrace();
    }

    return Result.ok();
  }

  @RequestMapping(value = "/{accountID}/create", method = RequestMethod.POST)
  @ResponseBody
  public Result create(
      @PathVariable("accountID") String accountID,
      @RequestParam(value = "file", required = false) MultipartFile image,
      String cmd,
      Integer type,
      String imgtitle,
      String publishDate,
      String content,
      String mpnews,
      String title) {
    String result = "";
    String username = getLoginUsername();

    String groupSendId = UUIDGenerator.getUUID();

    Date date = null;

    String[] split = accountID.split(",");

    System.out.println("publishDate" + publishDate);
    try {
      if (StringUtils.isEmpty(publishDate)) {
        publishDate = null;
      }
      if (!StringUtils.isEmpty(publishDate)) {
        System.out.println("publishDate" + publishDate);
        date = DateUtils.parseDate(publishDate, new String[] {"yyyy-MM-dd HH:mm", "yyyy-MM-dd HH"});
      }
      // 文本
      if (WxContent.TYPE_TEXT == type) {
        Date finalDate = date;
        if (split.length > 1) {
          for (String aid : split) {
            WxContent wxContent =
                wxContentService.createTextContent(
                    aid, content, username, finalDate, cmd, title, groupSendId);
            result = getWxresult(wxContent);

            writeSuccesssLog("微信文章", wxContent.getId(), null, "创建文本消息", wxContent, null);
          }
          ;
        } else {
          for (String aid : split) {
            WxContent wxContent =
                wxContentService.createTextContent(
                    aid, content, username, finalDate, cmd, title, groupSendId);
            result = getWxresult(wxContent);

            writeSuccesssLog("微信文章", wxContent.getId(), null, "创建文本消息", wxContent, null);
          }
        }

      } else if (WxContent.TYPE_IMAGE == type) {
        String property = env.getProperty("gpower.wx.image.maxSize");

        int maxSize = Integer.valueOf(property) * 1024 * 1024;
        ;
        if (image.getSize() > maxSize) {
          throw new GpException("error.image.size");
        }
        String fileExt = StringUtil.getFileExtension(image.getOriginalFilename()).toLowerCase();
        String allow = env.getProperty("gpower.wx.image.ext.allow");
        System.out.println("fileExt---" + fileExt);
        System.out.println("allow---" + allow);
        if (!StringUtil.strInSplitString(fileExt, allow, ",")) {
          throw new GpException("error.image.ext");
        }
        Date finalDate1 = date;
        if (split.length > 1) {
          for (String aid : split) {
            String newFileName = aid + "_" + UUIDGenerator.getUUID() + "." + fileExt;
            String path =
                env.getProperty("gpower.publish.path")
                    + File.separator
                    + "wx"
                    + File.separator
                    + aid
                    + File.separator;

            File dir = new File(path);
            if (!dir.exists()) {
              dir.mkdirs();
            }
            File newTargetFile = new File(path, newFileName);
            try {
              image.transferTo(Paths.get(newTargetFile.getAbsolutePath()));
              System.out.println("path" + path);
              System.out.println("newFileName" + newFileName);

            } catch (IOException e) {
              e.printStackTrace();
            }
            WxContent wxContent1 =
                wxContentService.createImageContent(
                    aid, newFileName, username, finalDate1, cmd, imgtitle, groupSendId);
            result = getWxresult(wxContent1);
            writeSuccesssLog("微信图片", wxContent1.getId(), null, "创建图片消息", wxContent1, null);
          }
        } else {
          for (String aid : split) {
            String newFileName = aid + "_" + UUIDGenerator.getUUID() + "." + fileExt;
            String path =
                env.getProperty("gpower.publish.path")
                    + File.separator
                    + "wx"
                    + File.separator
                    + aid
                    + File.separator;
            File dir = new File(path);
            if (!dir.exists()) {
              dir.mkdirs();
            }
            File newTargetFile = new File(path, newFileName);
            try {
              image.transferTo(Paths.get(newTargetFile.getAbsolutePath()));
            } catch (IOException e) {
              e.printStackTrace();
            }
            WxContent wxContent1 =
                wxContentService.createImageContent(
                    aid, newFileName, username, finalDate1, cmd, imgtitle, null);
            result = getWxresult(wxContent1);
          }
          ;
        }

      } else if (WxContent.TYPE_MPNEWS == type) {

        List<WxNewsContent> newsList = stringToList(mpnews);
        Date finalDate2 = date;
        if (split.length > 1) {
          for (String aid : split) {
            WxContent wxContent =
                wxContentService.createNewsContent(
                    aid, newsList, username, finalDate2, cmd, groupSendId);
            result = getWxresult(wxContent);
          }
          ;
        } else {

          for (String aid : split) {
            WxContent wxContent =
                wxContentService.createNewsContent(
                    aid, newsList, username, finalDate2, cmd, groupSendId);
            result = getWxresult(wxContent);
          }
          //   throw new GpException("图文发送失败，全局返回码为"+i);

        }

      } else {
        throw new GpException("error.wxContent.type");
      }

    } catch (Exception e) {
      e.printStackTrace();
    }

    if (StringUtils.isEmpty(result)) {
      return Result.ok();
    } else {
      return Result.error(result);
    }
  }

  public String getWxresult(WxContent wxContent) {
    String wxResult = wxContent.getWxResult();
    if (!StringUtils.isEmpty(wxResult)) {
      JSONObject a = new JSONObject(wxResult);
      int i = Integer.valueOf((Integer) a.get("errcode"));
      if (i > 0) {
        return "发送" + wxContent.getTypeValue() + "失败,全局返回码为" + i;
      } else {
        return "";
      }
    } else {
      if (wxContent.getStatus() == WxContent.STATUS_PUBLISHED) {
        wxContent.setStatus(WxContent.STATUS_PUBLISHFAIL);
        wxContentService.updateById(wxContent);
      }

      return "";
    }
  }

  @RequestMapping(value = "/{accountID}/update", method = RequestMethod.POST)
  @ResponseBody
  public Result update(
      @PathVariable("accountID") String accountID,
      @RequestParam(value = "file", required = false) MultipartFile image,
      String cmd,
      String id,
      String imgPath,
      Integer type,
      String imgtitle,
      String title,
      String publishDate,
      String content,
      String mpnews) {
    String username = getLoginUsername();

    System.out.println(mpnews + "mpnews--");
    Date date = null;
    String[] split = accountID.split(",");
    System.out.println("publishDate" + publishDate);
    try {
      if (StringUtils.isEmpty(publishDate)||"null".equals(publishDate)) {
        publishDate = null;
      }
      if (!StringUtils.isEmpty(publishDate)) {
        System.out.println("publishDate" + publishDate);
        date = DateUtils.parseDate(publishDate, new String[] {"yyyy-MM-dd HH:mm", "yyyy-MM-dd HH"});
      }
      // 文本
      if (WxContent.TYPE_TEXT == type) {
        Date finalDate = date;
        Arrays.asList(split).stream()
            .forEach(
                aid -> {
                  wxContentService.updateTextContent(
                      aid, id, content, username, finalDate, cmd, title);
                });

      } else if (WxContent.TYPE_IMAGE == type) {
        if (image != null) {

          WxContent wxcontent = wxContentService.getById(id);
          String accountid = wxcontent.getWxAccountID();
          String property = env.getProperty("gpower.wx.image.maxSize");

          int maxSize = Integer.valueOf(property) * 1024 * 1024;
          ;
          if (image.getSize() > maxSize) {
            throw new GpException("error.image.size");
          }
          String fileExt = StringUtil.getFileExtension(image.getOriginalFilename()).toLowerCase();
          String allow = env.getProperty("gpower.wx.image.ext.allow");

          if (!StringUtil.strInSplitString(fileExt, allow, ",")) {
            throw new GpException("error.image.ext");
          }
          if (!StringUtil.strInSplitString(fileExt, allow, ",")) {
            throw new GpException("error.image.ext");
          }
          String newFileName = accountID + "_" + UUIDGenerator.getUUID() + "." + fileExt;
          String path =
              env.getProperty("gpower.publish.path")
                  + File.separator
                  + "wx"
                  + File.separator
                  + accountID
                  + File.separator;
          File dir = new File(path);
          if (!dir.exists()) {
            dir.mkdirs();
          }
          File newTargetFile = new File(path, newFileName);
          try {
            FileUtil.storeFile(image, newTargetFile);
          } catch (IOException e) {
            e.printStackTrace();
          }

          imgPath = newFileName;
          wxContentService.updateImageContent(id, imgPath, username, date, cmd, imgtitle);
        }

      } else if (WxContent.TYPE_MPNEWS == type) {

        List<WxNewsContent> newsList = stringToList(mpnews);
        Date finalDate2 = date;
        for (String s : split) {
          WxContent wxContent =
                  wxContentService.updateNewsContent(
                          id, s, newsList, username, finalDate2, cmd);
          writeSuccesssLog("微信图文", wxContent.getId(), null, "更新图文消息", wxContent, null);

        }

      } else {
        throw new GpException("error.wxContent.type");
      }

    } catch (Exception e) {
      e.printStackTrace();
    }

    return Result.ok();
  }

  @RequestMapping(value = "/{accountID}/audit", method = RequestMethod.POST)
  @ResponseBody
  public Result update(
      @PathVariable("accountID") String accountID, String status, String content, String id) {

    System.out.println(status + "status");
    System.out.println(content);
    System.out.println(id + "id");
    WxContent wxcontent = wxContentService.getById(id);
    if (status.equals("4")) {
      wxcontent.setStatus(4);
    }
    if (status.equals("2")) {
      wxcontent.setStatus(2);
      wxcontent.setAuditReason(content);
    }
    wxContentService.updateById(wxcontent);

    return Result.ok();
  }

  private List<WxNewsContent> stringToList(String mpnews) throws Exception {
    String property =
        env.getProperty("gpower.publish.path")
            + File.separator
            + "wxupload"
            + File.separator
            + "gpowersoft"
            + File.separator
            + "GpowerBase"
            + File.separator
            + "file"
            + File.separator
            + "upload"
            + File.separator
            + "ueditor"
            + File.separator;
    System.out.println(mpnews);
    List<WxNewsContent> newsList = new ArrayList<WxNewsContent>();
    JSONArray array = null;
    try {
      array = new JSONArray(mpnews);
    } catch (Exception e) {
      e.printStackTrace();
      throw new GpException("提交的数据格式错误");
    }
    StringBuffer errors = new StringBuffer();
    for (int i = 0; i < array.length(); i++) {
      JSONObject object = array.getJSONObject(i);
      WxNewsContent news = new WxNewsContent();
      String thumbImageName = object.optString("thumbImageName");
      news.setThumbImageName(object.optString("thumbImageName"));
      if (thumbImageName == null || thumbImageName.trim().length() == 0) {
        errors.append("请上传第" + (i + 1) + "个图文的封面").append("<br>");
      }
      String title = object.optString("title");
      news.setTitle(title);
      if (title == null || title.trim().length() == 0) {
        errors.append("请输入第" + (i + 1) + "个图文的标题").append("<br>");
      } else if (title.length() > 64) {
        errors.append("第" + (i + 1) + "个图文的标题长度超过了64个字符").append("<br>");
      }
      String author = object.optString("author");
      if (author != null && author.length() > 8) {
        errors.append("第" + (i + 1) + "个图文的作者长度超过了8个字符").append("<br>");
      }
      news.setAuthor(author);
      news.setContent_source_url(object.optString("content_source_url"));
      String digest = object.optString("digest");
      if (digest != null && digest.length() > 120) {
        errors.append("第" + (i + 1) + "个图文的摘要长度超过了120个字符").append("<br>");
      }
      news.setDigest(digest);
      String content = object.optString("content");
      if (content == null || content.trim().length() == 0) {
        errors.append("请填写第" + (i + 1) + "个图文的内容").append("<br>");
      }
      content = URLDecoder.decode(content);
      news.setContent(content);
      newsList.add(news);
    }
    if (errors.length() != 0) {
      throw new GpException(errors.toString());
    }

    for (int i = 0; i < newsList.size(); i++) {}

    return newsList;
  }

  /**
   * @description :上传图片
   *
   * <p>@version :0.1
   *
   * <p>@author :liuzl
   *
   * <p>@Time :2017-07-21
   *
   * <p>@return
   */
  @RequestMapping(value = "/uploadMedia", method = RequestMethod.POST)
  public Result uploadImage(
      @RequestParam(value = "file", required = false) MultipartFile file,
      String accountID,
      String type) {
    System.out.println(accountID + "----------accountIDs");
    if (StringUtils.isEmpty(accountID)) {
      throw new GpException("error.wxaccount.noexist");
    }
    String[] split = accountID.split(",");

    String newFileName = null;

    if (WxUtils.MEDIA_TYPE_THUMB.equals(type)) {
      int maxSize = Integer.parseInt(env.getProperty("gpower.wx.thumb.maxSize")) * 1024;
      if (file.getSize() > maxSize) {
        throw new GpException("图片尺寸过大,请重新上传");
      }
      String fileExt = StringUtil.getFileExtension(file.getOriginalFilename()).toLowerCase();
      String allow = env.getProperty("gpower.wx.thumb.ext.allow");
      if (!StringUtil.strInSplitString(fileExt, allow, ",")) {
        throw new GpException("不符合的图片格式");
      }

      for (String aid : split) {
        newFileName = aid + "_" + UUIDGenerator.getUUID() + "." + fileExt;
        String property = env.getProperty("gpower.publish.path");
        String path = property + File.separator + "wx" + File.separator + aid + File.separator;
        File dir = new File(path);
        if (!dir.exists()) {
          dir.mkdirs();
        }
        File newTargetFile = new File(path, newFileName);
        try {

          file.transferTo(Paths.get(newTargetFile.getAbsolutePath()));
        } catch (IOException e) {
          e.printStackTrace();
          return Result.error("failed to save the picture" + file);
        }
      }
    }
    return Result.ok().put("object", newFileName);
  }

  /**
   * @Description: 获取微信存放位置地址 @Param:
   *
   * @return: @Author: jingff
   * @date: 2019/8/7
   */
  @RequestMapping(value = "geturl", method = RequestMethod.GET)
  @ResponseBody
  public Result getUrl() {
    String path = env.getProperty("gpower.publish.path");
    String url = env.getProperty("gpower.publish.url");
    List<String> li = new ArrayList<>();
    li.add(path);
    li.add(url);

    return Result.ok().put("object", li);
  }

  /**
   * @Description:未审核 @Param:
   *
   * @return: @Author: jingff
   * @date: 2019/8/8
   */
  @RequestMapping(value = "getnotpublisharticle", method = RequestMethod.POST)
  @ResponseBody
  public Result getNotPublishArticle(@RequestParam Map<String, Object> param) {
    String loginUsername = getLoginUsername();
    QueryWrapper<User> q = new QueryWrapper<>();
    q.eq("name", loginUsername);
    IPage<WxContent> notPublishArticle = null;
    Integer pageSize = Integer.valueOf(param.get("pageSize").toString());
    Integer currentPage = Integer.valueOf(param.get("currentPage").toString());
    Collection<String> allPermissions = ShiroUtil.getAllPermissions(loginUsername);
    User one = userService.getOne(q);
    String id = one.getId();
    if (allPermissions.contains("user")) {
      notPublishArticle =
          wxContentService.findNotPublishArticle(pageSize, currentPage, id, loginUsername);
      if (allPermissions.contains("role")) {
        wxContentService.findNotAllPublishArticle(pageSize, currentPage);
      }
    }
    if (!allPermissions.contains("user")
        && !allPermissions.contains("group")
        && !allPermissions.contains("role")) {
      notPublishArticle =
          wxContentService.findNotAllPublishArticleByUser(pageSize, currentPage, id, loginUsername);
    }

    if (notPublishArticle == null) {
      return Result.ok().put("page", null);
    }
    PageInfo pageinfo = new PageInfo(notPublishArticle);
    List<WxContent> list = (List<WxContent>) pageinfo.getList();
    list.forEach(
        wxcontent -> {
          String wxAccountID = wxcontent.getWxAccountID();
          WxAccount byId = wxAccountService.getById(wxAccountID);
          wxcontent.setWxAccount(byId);
        });
    return Result.ok().put("page", pageinfo);
  }

  /*shenhe
   * */

  @RequestMapping(value = "getpublisharticle", method = RequestMethod.POST)
  @ResponseBody
  public Result getHasPublishArticle(@RequestParam Map<String, Object> param) {

    Integer pageSize = Integer.valueOf(param.get("pageSize").toString());
    Integer currentPage = Integer.valueOf(param.get("currentPage").toString());
    String loginUsername = getLoginUsername();
    QueryWrapper<User> q = new QueryWrapper<>();
    q.eq("name", loginUsername);
    IPage<WxContent> hasPublishArticle = null;
    Collection<String> allPermissions = ShiroUtil.getAllPermissions(loginUsername);
    User one = userService.getOne(q);
    String id = one.getId();
    if (allPermissions.contains("user")) {
      hasPublishArticle =
          wxContentService.findPublishArticle(pageSize, currentPage, id, loginUsername);

      if (allPermissions.contains("role")) {
        hasPublishArticle = wxContentService.findAllPublishArticle(pageSize, currentPage);
      }
    }

    if (!allPermissions.contains("user")
        && !allPermissions.contains("group")
        && !allPermissions.contains("role")) {
      hasPublishArticle =
          wxContentService.findAllPublishArticleByUser(pageSize, currentPage, id, loginUsername);
    }
    if (hasPublishArticle == null) {
      return Result.ok().put("page", null);
    }
    if (hasPublishArticle == null) {
      return Result.ok().put("page", null);
    }
    PageInfo pageInfo = new PageInfo(hasPublishArticle);
    List<WxContent> list = (List<WxContent>) pageInfo.getList();
    list.forEach(
        wxcontent -> {
          String wxAccountID = wxcontent.getWxAccountID();
          WxAccount wxAccount = wxAccountService.getById(wxAccountID);
          wxcontent.setWxAccount(wxAccount);
        });

    return Result.ok().put("page", pageInfo);
  }

  /**
   * @Description: 已发步文章 @Param:
   *
   * @return: @Author: jingff
   * @date: 2019/8/12
   */
  @RequestMapping(value = "publisharticle", method = RequestMethod.POST)
  @ResponseBody
  public Result getPublishArticle(@RequestParam Map<String, Object> param) {
    String loginUsername = getLoginUsername();
    Integer pageSize = Integer.valueOf(param.get("pageSize").toString());
    Integer currentPage = Integer.valueOf(param.get("currentPage").toString());
    QueryWrapper<User> q = new QueryWrapper<>();
    q.eq("name", loginUsername);
    IPage<WxContent> wxContentIPage = null;
    Collection<String> allPermissions = ShiroUtil.getAllPermissions(loginUsername);
    User one = userService.getOne(q);
    String id = one.getId();
    if (allPermissions.contains("user")) {
      wxContentIPage = wxContentService.PublishArticle(pageSize, currentPage, id, loginUsername);
      if (allPermissions.contains("role")) {
        wxContentIPage = wxContentService.AllPublishArticle(pageSize, currentPage);
      }
    }
    if (!allPermissions.contains("user")
        && !allPermissions.contains("group")
        && !allPermissions.contains("role")) {
      wxContentService.publicArticleByUser(pageSize, currentPage, id, loginUsername);
    }

    if (wxContentIPage == null) {
      return Result.ok().put("page", null);
    }
    PageInfo pageInfo = new PageInfo(wxContentIPage);
    List<WxContent> list = (List<WxContent>) pageInfo.getList();
    list.forEach(
        wxcontent -> {
          String wxAccountID = wxcontent.getWxAccountID();
          WxAccount wxAccount = wxAccountService.getById(wxAccountID);
          wxcontent.setWxAccount(wxAccount);
        });

    return Result.ok().put("page", pageInfo);
  }

  @RequestMapping(value = "draft", method = RequestMethod.POST)
  @ResponseBody
  public Result getDraftArticle(@RequestParam Map<String, String> param) {
    Integer pageSize = Integer.valueOf(param.get("pageSize").toString());
    Integer currentPage = Integer.valueOf(param.get("currentPage").toString());
    String title = param.get("title");
    String loginUsername = getLoginUsername();
    QueryWrapper<User> q = new QueryWrapper<>();
    q.eq("name", loginUsername);
    PageInfo pageInfo = null;
    IPage<WxContent> hasPublishArticle = null;
    Collection<String> allPermissions = ShiroUtil.getAllPermissions(loginUsername);
    User one = userService.getOne(q);
    String id = one.getId();

    hasPublishArticle =
        wxContentService.findDraftAticlebyuser(title, pageSize, currentPage, id, loginUsername);

    if (hasPublishArticle == null) {
      return Result.ok().put("page", null);
    }
    pageInfo = new PageInfo(hasPublishArticle);
    List<WxContent> list = (List<WxContent>) pageInfo.getList();
    list.forEach(
        wxcontent -> {
          String wxAccountID = wxcontent.getWxAccountID();
          WxAccount wxAccount = wxAccountService.getById(wxAccountID);
          wxcontent.setWxAccount(wxAccount);
        });
    return Result.ok().put("page", pageInfo);
  }

  @RequestMapping(value = "/{id}", method = RequestMethod.GET)
  @ResponseBody
  public Result getWxContent(@PathVariable String id) {
    WxContent wxContent = wxContentService.findById(id);

    return Result.ok().put("object", wxContent);
  }

  @RequestMapping(value = "/{id}", method = RequestMethod.PUT)
  @ResponseBody
  public Result updateWxContent(@PathVariable String id) {
    WxContent wxContent = wxContentService.findById(id);
    wxContent.setStatus(wxContent.STATUS_CAOGAO);
    wxContentService.updateById(wxContent);
    return Result.ok();
  }

  @RequestMapping(value = "draft/{id}", method = RequestMethod.DELETE)
  @ResponseBody
  public Result deleteWxContent(@PathVariable String id) {
    WxContent wxcontent = wxContentService.getById(id);
    if (wxcontent.getType() == 1) {
      wxTextContentService.remove(new QueryWrapper<WxTextContent>().eq("wxContentID", id));
    } else if (wxcontent.getType() == 2) {

      wxImageContentService.remove(new QueryWrapper<WxImageContent>().eq("wxContentID", id));
    } else {
      wxNewsContentService.remove(new QueryWrapper<WxNewsContent>().eq("wxContentID", id));
    }
    wxContentService.removeById(id);
    return Result.ok();
  }
}
