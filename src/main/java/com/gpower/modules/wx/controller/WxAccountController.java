package com.gpower.modules.wx.controller;

import cn.hutool.core.util.ObjectUtil;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.gpower.common.controller.BaseController;
import com.gpower.common.exception.GpException;
import com.gpower.common.result.PageInfo;
import com.gpower.common.result.Result;
import com.gpower.common.utils.ShiroUtil;
import com.gpower.common.utils.UUIDGenerator;
import com.gpower.modules.user.entity.User;
import com.gpower.modules.user.service.GroupService;
import com.gpower.modules.user.service.UserService;
import com.gpower.modules.wx.entity.UserWx;
import com.gpower.modules.wx.entity.WxAccount;
import com.gpower.modules.wx.entity.WxContent;
import com.gpower.modules.wx.service.UserWxService;
import com.gpower.modules.wx.service.WxAccountService;
import com.gpower.modules.wx.util.StringUtil;
import com.gpower.modules.wx.util.WxUtils;
import org.apache.commons.collections4.map.HashedMap;
import org.aspectj.weaver.ast.Var;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.propertyeditors.CustomDateEditor;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Controller;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.ServletRequestDataBinder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.io.File;
import java.io.IOException;
import java.nio.file.Paths;
import java.text.SimpleDateFormat;
import java.util.*;
import java.util.stream.Collectors;

/**
 * @description:
 * @author: jingff
 * @date: 2019-07-18 10:48
 */
@Controller
@RequestMapping("wx/account")
public class WxAccountController extends BaseController {

    @Autowired
    WxAccountService wxAccountService;
    @Autowired
    Environment env;
    @Autowired
    UserService userService;
    @Autowired
    UserWxService  userWxService;
    @Autowired
    GroupService groupService;

    @InitBinder
    public void initBinder(HttpServletRequest request, ServletRequestDataBinder binder) throws Exception {
        binder.registerCustomEditor(Date.class, new CustomDateEditor(new SimpleDateFormat("yyyy-MM-dd HH:mm:ss"), true));
    }



    @RequestMapping(value = "/updateshouquanUser", method = RequestMethod.POST)
    @ResponseBody
    public  Result  updateShouquan(String userID,String wxids){

        userWxService.remove(new QueryWrapper<UserWx>().eq(!StringUtils.isEmpty(userID),"userid", userID));
       if(!StringUtils.isEmpty(wxids)){
           String[] split = wxids.split(",");
           UserWx  userWx=new UserWx();
           for (String s : split) {
               userWx.setUserid(userID);
               userWx.setWxaccountid(s);
               userWxService.save(userWx);
           }
       }

        return  Result.ok();
    }

    @RequestMapping(value = "/updateshouquanWx", method = RequestMethod.POST)
    @ResponseBody
    public  Result  updateShouquanUser(String wx,String userids){

        userWxService.remove(new QueryWrapper<UserWx>().eq(!StringUtils.isEmpty(wx),"wxaccountid", wx));
        if(!StringUtils.isEmpty(userids)){
            String[] split = userids.split(",");
            UserWx  userWx=new UserWx();
            for (String s : split) {
                userWx.setUserid(s);
                userWx.setWxaccountid(wx);
                userWxService.save(userWx);
            }
        }

        return  Result.ok();
    }


    @RequestMapping(value = "/all/{id}", method = RequestMethod.GET)
    @ResponseBody
    public Result pageList(@PathVariable("id") String id) {
        System.out.println("id----"+id);
        String loginUsername = getLoginUsername();
        QueryWrapper <User> q = new QueryWrapper <>();
        q.eq("name", loginUsername);

        Collection <String> allPermissions = ShiroUtil.getAllPermissions(loginUsername);
        User one = userService.getOne(q);
        String userid = one.getId();
        IPage <WxAccount> byuser=null;

        List<WxAccount> smalllist=null;
        List<WxAccount> owner=new ArrayList<>();
        if(allPermissions.contains("group")){
           owner = wxAccountService.list(new QueryWrapper<WxAccount>().eq("owner", userid).eq("status", 1));
            List<UserWx> userWxs = userWxService.list(new QueryWrapper<UserWx>().eq("userid", userid));
            List<String> collect = userWxs.stream().map(UserWx::getWxaccountid).collect(Collectors.toList());
            List<WxAccount> shouquanwxaccounts = wxAccountService.list(new QueryWrapper<WxAccount>().eq("status", 1).in(collect!=null&&collect.size()>1, "id",collect));

            owner.removeAll(shouquanwxaccounts);
           owner.addAll(shouquanwxaccounts);

            if (allPermissions.contains("role")){
                owner = wxAccountService.list(new QueryWrapper<WxAccount>().eq("status", 1));
            }
         List<WxAccount> wx = wxAccountService.list(new QueryWrapper<WxAccount>().eq("owner", id).eq("status", 1));
            List<UserWx> aa = userWxService.list(new QueryWrapper<UserWx>().eq("userid", id));
            List<String> bb = aa.stream().map(UserWx::getWxaccountid).collect(Collectors.toList());

  if(bb!=null&&bb.size()>=1){
      smalllist = wxAccountService.list(new QueryWrapper<WxAccount>().eq("status", 1).in( "id", bb));

      smalllist.removeAll(wx);
      smalllist.addAll(wx);
  }
            if(smalllist!=null&&smalllist.size()>=1){

                owner.removeAll(smalllist);
            }

            for (WxAccount wxAccount : owner) {
                wxAccount.setTempstatus(0);
            }
            if(smalllist!=null&&smalllist.size()>=1){

                for (WxAccount wxAccount : smalllist) {
                    wxAccount.setTempstatus(1);
                }
                owner.addAll(smalllist);
            }




        }

        return Result.ok().put("object",owner);
       /* return Result.ok();*/
    }





    @RequestMapping(value = "/page", method = RequestMethod.POST)
    @ResponseBody
    public Result pageList(@RequestParam Map<String, Object> params) {
        String loginUsername = getLoginUsername();
        QueryWrapper <User> q = new QueryWrapper <>();
        q.eq("name", loginUsername);

        Collection <String> allPermissions = ShiroUtil.getAllPermissions(loginUsername);
        User one = userService.getOne(q);
        String userid = one.getId();
        Integer pageSize = Integer.valueOf(params.get("pageSize").toString());
        Integer currentPage = Integer.valueOf(params.get("currentPage").toString());
        IPage <WxAccount> byuser=null;

        PageInfo  pageInfo=null;
        if (allPermissions.contains("user")) {
       byuser = wxAccountService.findByuser(currentPage, pageSize, userid,
                    loginUsername);
            if (allPermissions.contains("role")) {
                byuser = wxAccountService.queryPage(currentPage, pageSize);
            }
        }else{

            byuser = wxAccountService.selectByOneUser(currentPage, pageSize, userid);

        }
        if(!ObjectUtil.isEmpty(byuser)){
            PageInfo  a=new PageInfo(byuser);
              return Result.ok().put("page", a);
        }else {
            return Result.ok().put("page", null);
        }



    }

    @RequestMapping(value = "/list", method = RequestMethod.GET)
    @ResponseBody
    public Result list() {

        List <WxAccount> list = wxAccountService.list();
        System.out.println("list0---"+list.size());

        return Result.ok().put("object", list);
    }



    @RequestMapping(value = "/createlogo", method = RequestMethod.POST)
    @ResponseBody
    public Result createLogo(
                         @RequestParam(value="file",required =true) MultipartFile file,String id

                     ) {
        WxAccount wxAccount=new WxAccount();

        if(StringUtils.isEmpty(id)){
            wxAccount.generateKey();
        }else{
            wxAccount.setId(id);
        }

        int maxSize = Integer.parseInt(env.getProperty("gpower.wx.thumb.maxSize")) * 1024;

        String fileExt = StringUtil.getFileExtension(file.getOriginalFilename()).toLowerCase();
        String allow = env.getProperty("gpower.wx.image.ext.allow");
        if (!StringUtil.strInSplitString(fileExt, allow, ",")) {
            throw new GpException("error.thumb.ext");
        }
            String  newFileName = wxAccount.getId() + "_" + UUIDGenerator.getUUID() + "." + fileExt;

        String property = env.getProperty("gpower.publish.path");
        String path = property + File.separator + "wx" + File.separator + wxAccount.getId() + File.separator;
        File dir = new File(path);
        if (!dir.exists()) {
            dir.mkdirs();
        }
        File newTargetFile = new File(path, newFileName);
        try {
            System.out.println(newTargetFile.getAbsolutePath() + "newTargetFile.getAbsolutePath()");
            file.transferTo(Paths.get(newTargetFile.getAbsolutePath()));
        } catch (IOException e) {
            e.printStackTrace();
            return Result.error("failed to save the picture" + file);
        }

        wxAccount.setLogo(newFileName);
        System.out.println(wxAccount);

           String loginUsername = getLoginUsername();
        User user = userService.getOne(new QueryWrapper <User>().eq("name", loginUsername));
        String uid = user.getId();

      //  WxAccount account = wxAccountService.createAccount( id,wxAccount);

          // writeSuccesssLog("微信公众号", account.getId(), account.getName(), "创建微信公众号", account,null);


        return Result.ok().put("object",wxAccount);
    }

    @RequestMapping(value = "/create", method = RequestMethod.POST)
    @ResponseBody
    public Result create(
            String id,String logo,
            String type,String authentication,String originalId,String appId,
            String name,   String appSecret) {

        WxAccount wxAccount=new WxAccount();
        wxAccount.setId(id);

        wxAccount.setAppId(appId);
        wxAccount.setType(Integer.valueOf(type));
        wxAccount.setName(name);
        wxAccount.setAuthentication(Integer.valueOf(authentication));
        wxAccount.setOriginalId(originalId);
        wxAccount.setAppSecret(appSecret);
        wxAccount.setLogo(logo);
        System.out.println(wxAccount);

        String accessToken = WxUtils.getAccessToken(wxAccount);

        if(StringUtils.isEmpty(accessToken)){

           // throw  new GpException("绑定失败,请检查微信ip白名单");

           //return Result.error("绑定失败,请检查微信ip白名单");
            return Result.error("绑定失败,请核实公众号信息");
        }else{
            String loginUsername = getLoginUsername();
            User user = userService.getOne(new QueryWrapper <User>().eq("name", loginUsername));
            String uid = user.getId();

            WxAccount account = wxAccountService.createAccount( uid,wxAccount);

            writeSuccesssLog("微信公众号", account.getId(), account.getName(), "创建微信公众号", account,null);


            return Result.ok();
        }



    }




/**
*@Description: 更新微信帐号
*@Param: 
*@return: 
*@Author: jingff
*@date: 2019/7/18
*/
    @RequestMapping(value = "/update", method = RequestMethod.POST)
    @ResponseBody
    public Result update(
                        String id, String logo, String type,String authentication,String originalId,
                           String appId,
                           String name,   String appSecret) {
        WxAccount wxAccount = wxAccountService.getById(id);
        wxAccount.setLogo(logo);
        String  newFileName="";

        wxAccount.setAppId(appId);
        wxAccount.setType(Integer.valueOf(type));
        wxAccount.setName(name);
        wxAccount.setAuthentication(Integer.valueOf(authentication));
        wxAccount.setOriginalId(originalId);
        wxAccount.setAppSecret(appSecret);

        System.out.println(wxAccount);


        Integer integer = wxAccountService.updateAccount(wxAccount);

        writeSuccesssLog("微信公众号", wxAccount.getId(), wxAccount.getName(), "更改微信公众号", wxAccount,null);


        return Result.ok().put("object",newFileName);

    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    @ResponseBody
    public Result get( @PathVariable("id") String id) {
        WxAccount byId = wxAccountService.findById(id);

        if (byId == null) {

            writeSuccesssLog("微信公众号", id, null, "查找微信公众号", byId, null);
        } else {
            writeFailureLog("微信公众号", id, null, "查找微信公众号", null,
                    "");
        }
        return  Result.ok().put("object", byId);
    }

        /**
        *@Description: 删除公众号
        *@Param:
        *@return:
        *@Author: jingff
        *@date: 2019/7/19
        */

    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    @ResponseBody
    public Result delete( @PathVariable("id") String id) {
        Integer integer = wxAccountService.deleteAccount(id);
        if(integer==1) {

            writeSuccesssLog("微信公众号", id, null, "删除微信公众号",null , null);
        }else {
            writeFailureLog("微信公众号", id, null, "删除微信公众号",null,
                    "");
        }

        return Result.ok();
    }
    @RequestMapping(value = "/activeAccount/{id}", method = RequestMethod.POST)
    @ResponseBody
    public  Result activeAccount(@PathVariable("id") String id){
        WxAccount wxAccount = wxAccountService.activeAccount(id);
        return Result.ok();

    }

    @RequestMapping(value = "/desableAccount/{id}", method = RequestMethod.POST)
    @ResponseBody
    public  Result desable(@PathVariable("id") String id){
        WxAccount wxAccount = wxAccountService.disableAccount(id);
        return Result.ok();

    }


    @RequestMapping(value="/check/{name}",method = RequestMethod.GET)
    @ResponseBody
    public  Boolean  checkWxAccount(@PathVariable("name") String name){
        Map<String, Object> map = new HashedMap<>();
        map.put("name", name);
        Collection <WxAccount> ts = wxAccountService.listByMap(map);
        return  ts.size()==0;
    }


    @RequestMapping(value="/wxUser/{id}",method = RequestMethod.GET)
    @ResponseBody
    public Result  getUserWX(@PathVariable("id") String id){
        List<User> list1 = new ArrayList<>();
        String loginUsername = getLoginUsername();

        User curuser = userService.getOne(new QueryWrapper<User>().eq("name", loginUsername));
        Collection <String> allPermissions = ShiroUtil.getAllPermissions(loginUsername);
        if(allPermissions.contains("role")){
            list1=userService.selectAll();
        }else if(allPermissions.contains("group")){
            list1 = groupService.selectGroupUserById(id);
        }
        list1.remove(curuser);

        List<UserWx> userWxs = userWxService.list(new QueryWrapper<UserWx>().eq("wxaccountid"
                , id));
        List<String> collect = userWxs.stream().map(UserWx::getUserid).collect(Collectors.toList());
        List<User> list2 = new ArrayList<>();
        for (String s : collect) {
            User byId = userService.getById(s);
            list2.add(byId);

        }
        List<User> collect1 = list1.stream().filter(item ->list2.contains(item)).collect(Collectors.toList());

        for (int i = 0; i < list1.size(); i++) {
            User user = list1.get(i);user.setStatus(0);
            for (int j = 0; j < collect1.size(); j++) {
                User muser = collect1.get(j);
                if(user.getId().equals(muser.getId())){
                    user.setStatus(1);
                    break;
                }
            }}


        return  Result.ok().put("object", list1);

    }

}



