package com.gpower.modules.wb.controller;

import cn.hutool.json.JSONObject;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.additional.query.impl.QueryChainWrapper;
import com.gpower.common.controller.BaseController;
import com.gpower.common.exception.GpException;
import com.gpower.common.result.PageInfo;
import com.gpower.common.result.Result;
import com.gpower.common.utils.ShiroUtil;
import com.gpower.common.utils.UUIDGenerator;
import com.gpower.modules.user.entity.User;
import com.gpower.modules.user.service.UserService;
import com.gpower.modules.wb.dao.WbContentDao;
import com.gpower.modules.wb.entity.WbAccount;
import com.gpower.modules.wb.entity.WbContent;
import com.gpower.modules.wb.service.WbAccountService;
import com.gpower.modules.wb.service.WbContentService;
import com.gpower.modules.wx.dao.WxContentDao;
import com.gpower.modules.wx.entity.WxContent;
import com.gpower.modules.wx.service.WxContentService;
import com.gpower.modules.wx.util.HttpUtil;
import com.gpower.modules.wx.util.StringUtil;
import com.gpower.modules.wx.util.WbUtils;
import com.gpower.modules.wx.util.WxUtils;
import org.apache.commons.lang.StringUtils;
import org.apache.commons.lang.time.DateUtils;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Paths;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;
import java.util.stream.Stream;

/**
 * @description:
 * @author: jingff
 * @date: 2019-08-02 10:44
 */
@Controller
@RequestMapping("/wb/content")
public class WbContentController extends BaseController {


@Autowired
    WbAccountService  wbAccountService;

    @Autowired
    WbContentService  wbContentService;

    @Autowired
    UserService  userService;

    @Autowired
    Environment env;


    @RequestMapping(value = "/{id}",method = RequestMethod.PUT)
    @ResponseBody
    public Result updateWxContent(@PathVariable String id){
        WbContent wxContent = wbContentService.getById(id);
        wxContent.setStatus(WxContent.STATUS_CAOGAO);
        wbContentService.updateById(wxContent);
        return  Result.ok();
    }



   @RequestMapping(value="{accountIds}",method = RequestMethod.POST)
   @ResponseBody
    public  Result  sendContent(@PathVariable("accountIds") String accountIds,String img,
                              String cmd,
                            String publishDate, String content){

     Date date = null;
           if (StringUtils.isEmpty(publishDate)) {
               publishDate=null;
           }
           if (!StringUtils.isEmpty(publishDate)) {
               try {
                   date = DateUtils.parseDate(publishDate, new String[]{"yyyy-MM-dd HH:mm",
                           "yyyy-MM-dd HH"});
               } catch (ParseException e) {
                   e.printStackTrace();
               }
           }
       String username = getLoginUsername();
       String[] split = accountIds.split(",");
       Date finalDate = date;
       Arrays.asList(split).forEach(accoutid->{
           WbAccount byId = wbAccountService.getById(accoutid);
           if(byId==null){
               throw  new GpException("error.wbaccount.noexist--accoutid"+accoutid);
           }else{
               String clientID = byId.getClientID();
               String clientSecret = byId.getClientSecret();
               String url = env.getProperty("gpower.wb.tokenurl");
               Date expireDate = byId.getExpireDate();
               String token = byId.getToken();
               if(expireDate.before(new Date())){
                   boolean b = wbAccountService.removeById(accoutid);
                   throw   new  GpException("error.wbaccount :"+byId.getName()+"Authorization " +
                           "expires,"+
                           "Please re-add your account number");
               }

               wbContentService.createTextContent(accoutid,content,username,cmd, finalDate,img);
           }

       });

     return  Result.ok();

   }

    @RequestMapping(value = "/pub", method = RequestMethod.POST)
    @ResponseBody
    public Result pubWxContent(String  id,String time) {
        WbContent wbcontent = wbContentService.getById(id);
        try {
            Date publish = DateUtils.parseDate(time, new String[]{"yyyy-MM-dd HH:mm"});
            wbcontent.setSendDate(publish);
            wbcontent.setStatus(WxContent.STATUS_REVOKED);
            wbContentService.updateById(wbcontent);
        } catch (ParseException e) {
            e.printStackTrace();
        }

        return Result.ok();
    }


    @RequestMapping(value="/update/{accountIds}",method = RequestMethod.POST)
    @ResponseBody
    public  Result  updateContent(@PathVariable("accountIds") String accountIds,String img,
                                String cmd,
                                String publishDate, String content,String id){

        System.out.println(content+"content");
        System.out.println(cmd+"cmd");
        System.out.println(id+"id");
        System.out.println(img+"img");

        Date date = null;
        if (StringUtils.isEmpty(publishDate)) {
            publishDate=null;
        }
        if (!StringUtils.isEmpty(publishDate)&&!"undefined".equals(publishDate)) {
            try {
                date = DateUtils.parseDate(publishDate, new String[]{"yyyy-MM-dd HH:mm",
                        "yyyy-MM-dd HH"});
            } catch (ParseException e) {
                e.printStackTrace();
            }
        }
        String username = getLoginUsername();
        String[] split = accountIds.split(",");
        Date finalDate = date;
        Arrays.asList(split).forEach(accoutid->{
            WbAccount byId = wbAccountService.getById(accoutid);
            if(byId==null){
                throw  new GpException("error.wbaccount.noexist--accoutid"+accoutid);
            }else{
                String clientID = byId.getClientID();
                String clientSecret = byId.getClientSecret();
                String url = env.getProperty("gpower.wb.tokenurl");
                Date expireDate = byId.getExpireDate();
                String token = byId.getToken();
                if(expireDate.before(new Date())){
                    boolean b = wbAccountService.removeById(accoutid);
                    throw   new  GpException("error.wbaccount :"+byId.getName()+"Authorization " +
                            "expires,"+
                            "Please re-add your account number");
                }

                wbContentService.updateTextContent(id,accoutid,content,username,cmd, finalDate,img);
            }

        });

        return  Result.ok();

    }



    @RequestMapping(value = "/{id}",method=RequestMethod.DELETE)
   @ResponseBody
   public  Result  deleteDraft(@PathVariable String id){
       boolean b = wbContentService.removeById(id);
       return  Result.ok();
   }

    @RequestMapping(value = "auditUpdate/{id}",method=RequestMethod.POST)
    @ResponseBody
    public  Result  auditUpdate(@PathVariable("id") String id,Integer status,String  reason){
        WbContent byId = wbContentService.getById(id);
        byId.setStatus(status);
        if(!StringUtils.isEmpty(reason)){
            byId.setAuditreason(reason);
        }
        wbContentService.updateById(byId);

        return  Result.ok();
    }
    @RequestMapping(value = "/{id}",method=RequestMethod.GET)
    @ResponseBody
    public  Result  getDraft(@PathVariable String id){
        WbContent byId = wbContentService.getById(id);
        return  Result.ok().put("object", byId);
    }


   @RequestMapping(value="/uploadMedia",method = RequestMethod.POST)
    @ResponseBody
    public  Result publicuploadMedia(@RequestParam(value = "file", required = false) MultipartFile file,
                                        String accountID, String type){
       if (StringUtils.isEmpty(accountID)) {
           throw new GpException("error.wxaccount.noexist");
       }
       String[] split = accountID.split(",");
       String newFileName = null;
       if (file!=null) {
           int maxSize = Integer.parseInt(env.getProperty("gpower.wb.thumb.maxSize")) * 1024*1024;
           if (file.getSize() > maxSize) {
               throw new GpException("图片尺寸过大,请重新上传");
           }
           String fileExt = StringUtil.getFileExtension(file.getOriginalFilename()).toLowerCase();
           String allow = env.getProperty("gpower.wb.thumb.ext.allow");
           if (!StringUtil.strInSplitString(fileExt, allow, ",")) {
               throw new GpException("仅支持png,jpeg,gif格式");
           }
           newFileName =  UUIDGenerator.getUUID() + "." + fileExt;
           for (String aid : split) {
               String property = env.getProperty("gpower.publish.path");
               String path =
                       property + File.separator + "wb" + File.separator + aid + File.separator;
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


           return Result.ok().put("object",newFileName);

   }




    @RequestMapping(value="/waitauditlist",method = RequestMethod.POST)
    @ResponseBody
    public  Result waitAuditlist(@RequestParam Map<String,Object>param){
        String loginUsername = getLoginUsername();
        QueryWrapper <User> q = new QueryWrapper <>();
        q.eq("name", loginUsername);
        Integer pageSize = Integer.valueOf(param.get("pageSize").toString());
        Integer currentPage = Integer.valueOf(param.get("currentPage").toString());

        IPage <WbContent> waitAuditlist=null;

        Collection <String> allPermissions = ShiroUtil.getAllPermissions(loginUsername);
        User one = userService.getOne(q);
        String id = one.getId();
        if (allPermissions.contains("user")) {
            waitAuditlist= wbContentService.waitAuditlist(pageSize, currentPage,id, loginUsername);

            if (allPermissions.contains("role")) {
                waitAuditlist = wbContentService.waitAllAuditList(pageSize, currentPage);
            }
        }
        if(!allPermissions.contains("user")&&!allPermissions.contains("role")&&!allPermissions.contains("group")){
            waitAuditlist = wbContentService.waitAuditByUser(pageSize, currentPage,id);
        }

        if(waitAuditlist==null){
            return Result.ok().put("page", null);
        }
        List<WbContent> records = waitAuditlist.getRecords();

        for (WbContent wbContent : records) {
            String weiboID = wbContent.getWeiboID();
            WbAccount byId = wbAccountService.findById(weiboID);
            wbContent.setWbAccount(byId);


        }

        PageInfo pageInfo=new PageInfo(waitAuditlist);


        return Result.ok().put("page", pageInfo);




    }


    /**
*@Description: 获取已发列表
*@Param:
*@return:
*@Author: jingff
*@date: 2019/8/20
*/

    @RequestMapping(value="/HasPublishlist",method = RequestMethod.POST)
    @ResponseBody
    public  Result HasPublishlist(@RequestParam Map<String,Object>param){
        String loginUsername = getLoginUsername();
        Integer pageSize = Integer.valueOf(param.get("pageSize").toString());

        Integer currentPage = Integer.valueOf(param.get("currentPage").toString());
        QueryWrapper <User> q = new QueryWrapper <>();
        q.eq("name", loginUsername);


        IPage <WbContent> hasPublishArticle = null;
        Collection <String> allPermissions = ShiroUtil.getAllPermissions(loginUsername);
        User one = userService.getOne(q);
        String id = one.getId();
        if (allPermissions.contains("user")) {
            hasPublishArticle= wbContentService.PublishList(pageSize,currentPage,id, loginUsername);

            if (allPermissions.contains("role")) {
                hasPublishArticle = wbContentService.AllPublishList(pageSize,currentPage);
            }
        }
        if(!allPermissions.contains("user")&&!allPermissions.contains("role")&&!allPermissions.contains("group")){
            hasPublishArticle = wbContentService.PublishListByUser(pageSize,currentPage,id);
        }
        if(hasPublishArticle==null){
            return Result.ok().put("page", null);
        }
        List<WbContent> records = hasPublishArticle.getRecords();

        for (WbContent wbContent : records) {
            String weiboID = wbContent.getWeiboID();
            WbAccount byId = wbAccountService.findById(weiboID);
            wbContent.setWbAccount(byId);


        }

      PageInfo pageInfo = new PageInfo(hasPublishArticle);

        return Result.ok().put("page", pageInfo);




    }


    @RequestMapping(value="/HasPublishlist/{id}",method = RequestMethod.DELETE)
    @ResponseBody
    public  Result HasPublishlist(@PathVariable String id){

        WbContent wbContent = wbContentService.getById(id);
        String wbresult = wbContent.getWbresult();
        JSONObject  json=new JSONObject(wbresult);

        Long wbresultid =(Long)json.get("id");
        WbAccount wbAccount = wbAccountService.getById(wbContent.getWeiboID());
        wbContent.setStatus(WxContent.STATUS_PUBLISHDELETE);
        wbContentService.updateById(wbContent);
        Map<String ,Object> parameters=new HashMap<String,Object>();

      WbUtils.removeWeibo(parameters,wbresultid);
        return Result.ok();




    }





    @RequestMapping(value="/auditlist",method = RequestMethod.POST)
    @ResponseBody
    public  Result auditlist(@RequestParam Map<String,Object>param){
        Integer pageSize = Integer.valueOf(param.get("pageSize").toString());

        Integer currentPage = Integer.valueOf(param.get("currentPage").toString());
        String loginUsername = getLoginUsername();
        QueryWrapper <User> q = new QueryWrapper <>();
        q.eq("name", loginUsername);
     IPage auditlist = null;
        Collection <String> allPermissions = ShiroUtil.getAllPermissions(loginUsername);
        User one = userService.getOne(q);
        String id = one.getId();
        if (allPermissions.contains("user")) {
            auditlist= wbContentService.hasauditList(pageSize,currentPage,id, loginUsername);

            if (allPermissions.contains("role")) {
                auditlist = wbContentService.AllhasauditList(pageSize,currentPage);
            }
        }
        if(!allPermissions.contains("user")&&!allPermissions.contains("role")&&!allPermissions.contains("group")){
            auditlist = wbContentService.hasAuditListByUser(pageSize,currentPage,id);
        }
        if(auditlist==null){
            return Result.ok().put("page", null);


        }
        List<WbContent> records = auditlist.getRecords();

        for (WbContent wbContent : records) {
            String weiboID = wbContent.getWeiboID();
            WbAccount byId = wbAccountService.findById(weiboID);
            wbContent.setWbAccount(byId);


        }
        PageInfo pageInfo = new PageInfo(auditlist);

        return Result.ok().put("page", pageInfo);




    }

/**
*@Description: 草稿箱
*@Param:
*@return:
*@Author: jingff
*@date: 2019/8/20
*/

    @RequestMapping(value = "draft", method = RequestMethod.POST)
    @ResponseBody
    public Result getDraftArticle(@RequestParam Map<String,String> param) {
        String loginUsername = getLoginUsername();
        QueryWrapper <User> q = new QueryWrapper <>();
        q.eq("name", loginUsername);
        User one = userService.getOne(q);
        String id = one.getId();

        Integer pageSize = Integer.valueOf(param.get("pageSize"));

        Integer currentPage = Integer.valueOf(param.get("currentPage"));
        Page <WbContent> objects = new Page <>(currentPage, pageSize);

        IPage <WbContent> page = wbContentService.page(objects, new QueryWrapper <WbContent>().eq("owner",
                id).eq("status", 0).orderByDesc("creationDate"));

        if(page==null){
            return Result.ok().put("page", null);
        }
        List <WbContent> draftList = page.getRecords();
         if(pageSize*(currentPage-1)>page.getTotal()){
            objects = new Page <>(1, pageSize);
            page=  wbContentService.page(objects, new QueryWrapper <WbContent>().eq("owner",
                    id).eq("status", 0));
            draftList =page.getRecords();
        }

             for (WbContent wbContent : draftList) {
                    String weiboID = wbContent.getWeiboID();
                    WbAccount byId = wbAccountService.findById(weiboID);
                    wbContent.setWbAccount(byId);
                }

        PageInfo pageInfo = new PageInfo(page);

        return Result.ok().put("page", pageInfo);
    }


    @RequestMapping(value = "geturl", method = RequestMethod.GET)
    @ResponseBody
    public Result getwburl(){
        String wburl =
                env.getProperty("gpower.publish.url")+File.separator + "wb";
        String wbpath =
                env.getProperty("gpower.publish.path")+File.separator + "wb";
List<String> wbpu=new ArrayList <String>(2);
        wbpu.add(wburl);
        wbpu.add(wbpath);
    return Result.ok().put("object",wbpu);
    }
}
