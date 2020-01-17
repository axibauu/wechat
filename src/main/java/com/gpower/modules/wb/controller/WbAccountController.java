package com.gpower.modules.wb.controller;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.service.additional.query.impl.QueryChainWrapper;
import com.gpower.common.auth.GpowerAuthInterface;
import com.gpower.common.controller.BaseController;
import com.gpower.common.exception.GpException;
import com.gpower.common.result.PageInfo;
import com.gpower.common.result.Result;
import com.gpower.common.utils.ShiroUtil;
import com.gpower.common.utils.UUIDGenerator;
import com.gpower.modules.user.entity.User;
import com.gpower.modules.user.service.GroupService;
import com.gpower.modules.user.service.UserService;
import com.gpower.modules.wb.entity.WbAccount;
import com.gpower.modules.wb.entity.WbContent;
import com.gpower.modules.wb.service.WbAccountService;
import com.gpower.modules.wb.service.WbContentService;
import com.gpower.modules.wx.entity.UserWb;

import com.gpower.modules.wx.entity.UserWx;
import com.gpower.modules.wx.entity.WxAccount;
import com.gpower.modules.wx.service.UserWbService;
import com.gpower.modules.wx.util.HttpUtil;
import com.gpower.modules.wx.util.StringUtil;
import com.gpower.modules.wx.util.WbUtils;
import org.apache.commons.collections4.map.HashedMap;
import org.apache.commons.httpclient.Header;
import org.apache.commons.httpclient.methods.PostMethod;
import org.apache.commons.httpclient.params.HttpMethodParams;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.UsernamePasswordToken;
import org.apache.shiro.subject.Subject;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Controller;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.File;
import java.io.IOException;
import java.net.URLDecoder;
import java.nio.file.Paths;
import java.util.*;
import java.util.stream.Collectors;

import static org.assertj.core.util.Lists.list;

/**
 * @description:
 * @author: jingff
 * @date: 2019-08-01 17:32
 */
@Controller
public class WbAccountController extends BaseController {

    @Autowired
    WbAccountService wbAccountService;
    @Autowired
    UserService userService;
    @Autowired
    UserWbService userWbService;
    @Autowired
    WbContentService wbContentService;
    @Autowired
    GroupService groupService;

    @Autowired
    Environment env;

    @RequestMapping(value="wb/account/geturl",method = RequestMethod.GET)
    @ResponseBody
    public  Result getUrl(){
        String url = env.getProperty("gpower.wb.tokenurl");
        return  Result.ok().put("message", url);
    }

    @RequestMapping(value = "wb/account/updateshouquanUser", method = RequestMethod.POST)
    @ResponseBody
    public  Result  updateShouquan(String userID,String wxids){
        userWbService.remove(new QueryWrapper<UserWb>().eq(!StringUtils.isEmpty(userID),"userid", userID));
        if(!StringUtils.isEmpty(wxids)){
            String[] split = wxids.split(",");
            UserWb  userWb=new UserWb();

            for (String s : split) {

                userWb.setUserid(userID);
                userWb.setWbaccountid(s);

                userWbService.save(userWb);
            }
        }

        return  Result.ok();
    }



    @RequestMapping(value = "wb/account/all/{id}", method = RequestMethod.GET)
    @ResponseBody
    public Result pageList(@PathVariable("id") String id) {
        System.out.println("id----"+id);
        String loginUsername = getLoginUsername();
        QueryWrapper <User> q = new QueryWrapper <>();
        q.eq("name", loginUsername);

        Collection <String> allPermissions = ShiroUtil.getAllPermissions(loginUsername);
        User one = userService.getOne(q);
        String userid = one.getId();


        List<WbAccount> smalllist=null;
        List<WbAccount> owner=new ArrayList<>();
        if(allPermissions.contains("group")){
            owner = wbAccountService.list(new QueryWrapper<WbAccount>().eq("owner", userid).eq("status", 1));
            List<UserWb> userWxs = userWbService.list(new QueryWrapper<UserWb>().eq("userid", userid));
            List<String> collect = userWxs.stream().map(UserWb::getWbaccountid).collect(Collectors.toList());
            List<WbAccount> shouquanwbaccounts = wbAccountService.list(new QueryWrapper<WbAccount>().eq("status", 1).in(collect!=null&&collect.size()>1, "id",collect));

            owner.removeAll(shouquanwbaccounts);
            owner.addAll(shouquanwbaccounts);

            if (allPermissions.contains("role")){
                owner = wbAccountService.list(new QueryWrapper<WbAccount>().eq("status", 1));
            }
            List<WbAccount> wx = wbAccountService.list(new QueryWrapper<WbAccount>().eq("owner", id).eq("status", 1));
            List<UserWb> aa = userWbService.list(new QueryWrapper<UserWb>().eq("userid", id));
            List<String> bb = aa.stream().map(UserWb::getWbaccountid).collect(Collectors.toList());

            if(bb!=null&&bb.size()>=1){
                smalllist = wbAccountService.list(new QueryWrapper<WbAccount>().eq("status", 1).in( "id", bb));

                smalllist.removeAll(wx);
                smalllist.addAll(wx);
            }
            if(smalllist!=null&&smalllist.size()>=1){

                owner.removeAll(smalllist);
            }

            for (WbAccount wbAccount : owner) {
                wbAccount.setTempstatus(0);
            }
            if(smalllist!=null&&smalllist.size()>=1){

                for (WbAccount wbAccount : smalllist) {
                    wbAccount.setTempstatus(1);
                }
                owner.addAll(smalllist);
            }




        }

        return Result.ok().put("object",owner);
        /* return Result.ok();*/
    }


    /**
    *@Description:
    *@Param:
    *@return:
    *@Author: jingff
    *@date: 2019/8/19
    */
    @RequestMapping(value="wb/account/{id}",method = RequestMethod.DELETE)
    @ResponseBody
    public  Result deleteWbAccount(@PathVariable String  id){
        boolean b = wbAccountService.removeById(id);
        wbContentService.remove(new QueryWrapper<WbContent>().eq("weiboID", id));
        return  Result.ok();
    }


    @RequestMapping(value="wb/account/activeAccount/{id}",method = RequestMethod.POST)
    @ResponseBody
    public  Result activeAccount(@PathVariable String  id){
        WbAccount wb = wbAccountService.findById(id);wb.setStatus(1);
        wbAccountService.updateById(wb);

        return  Result.ok();
    }

    @RequestMapping(value="wb/account/desableAccount/{id}",method = RequestMethod.POST)
    @ResponseBody
    public  Result desableAccount(@PathVariable String  id){
        WbAccount wb = wbAccountService.findById(id);wb.setStatus(0);
        wbAccountService.updateById(wb);

        return  Result.ok();
    }


    @RequestMapping(value="wb/account/{id}",method = RequestMethod.POST)
    @ResponseBody
    public  Result updateWbAccount(@PathVariable String  id,String clientid,String logo,
                                   String name,String  clientSecret){
        WbAccount wb = wbAccountService.findById(id);
        if(wb==null){
            throw new GpException("微博帐号不存在");
        }
        wb.setLogo(logo);
        wb.setName(name);
        wb.setClientSecret(clientSecret);
        wb.setClientID(clientid);

        wbAccountService.updateById(wb);
        return  Result.ok();
    }

    @RequestMapping(value="wb/account/uuid",method = RequestMethod.GET)
    @ResponseBody
    public  Result getUUid(){
        String uuid = UUIDGenerator.getUUID();
        return  Result.ok().put("object",uuid);
    }
    /**
    *@Description:
    *@Param:
    *@return:
    *@Author: jingff
    *@date: 2019/8/19
    */
    @RequestMapping(value="wb/account/logo",method = RequestMethod.POST)
    @ResponseBody
    public  Result uploadWbAccount( @RequestParam(value="file",required =true) MultipartFile file
            ,String  id){
        WbAccount  Wb=new WbAccount();
        if(StringUtils.isEmpty(id)){
            Wb.generateKey();
        }else{
            Wb.setId(id);
        }
        //int maxSize = Integer.parseInt(env.getProperty("gpower.wx.thumb.maxSize")) * 1024;

        String fileExt = StringUtil.getFileExtension(file.getOriginalFilename()).toLowerCase();

        String  newFileName = Wb.getId() + "_" + UUIDGenerator.getUUID() + "." + fileExt;
        String property = env.getProperty("gpower.publish.path");
        String path = property + File.separator + "wb" + File.separator + Wb.getId()+ File.separator;
        File dir = new File(path);
        if (!dir.exists()) {
            dir.mkdirs();
        }
        File newTargetFile = new File(path, newFileName);
        try {
            file.transferTo(Paths.get(newTargetFile.getAbsolutePath()));
        } catch (IOException e) {
            e.printStackTrace();
            return Result.error("failed to save the wblogo" + file);
        }

        Wb.setLogo(newFileName);

        return  Result.ok().put("object",Wb);
    }




    @RequestMapping(value = "wb/account/create", method = RequestMethod.POST)
    @ResponseBody
    public void create(@RequestBody WbAccount account) {
        String loginUsername = getLoginUsername();
        QueryWrapper <User> queryWrapper = new QueryWrapper <User>();
        ;
        queryWrapper.eq("name", loginUsername);

        Collection <String> allPermissions = ShiroUtil.getAllPermissions(loginUsername);

        Collection <String> allRoles = ShiroUtil.getAllRoles(loginUsername);


        String url = env.getProperty("gpower.wb.tokenurl");
      //  WbUtils.sendShouquan(account.getClientID(), url, account.getClientSecret());
        /*  User one = userService.getOne(queryWrapper);*/
       /* if (one != null) {
            if (!StringUtils.isEmpty(account)) {
                account.setId(UUIDGenerator.getUUID());
                account.setCreationDate(new Date());
                account.setOwner(one.getId());

                boolean save = wbAccountService.save(account);
                if (save) {
                    writeSuccesssLog("微博", account.getId(), account.getName(), "创建微博", account, null);

                } else {
                    writeFailureLog("微博", account.getId(), account.getName(), "创建微博", account,
                            "");
                }
            }else{
                throw  new GpException("error.user.noexist");
            }*/

        /* }*/



    }


    /**
     * @Description: 获取当前用户下的所有微博
     * @Param:
     * @return:
     * @Author: jingff
     * @date: 2019/8/1
     */

    @RequestMapping(value = "wb/account/page", method = RequestMethod.POST)
    @ResponseBody
    public Result pageList(@RequestParam Map <String, Object> params) {
        String loginUsername = getLoginUsername();
        QueryWrapper <User> q = new QueryWrapper <>();
        q.eq("name", loginUsername);
        List<WbAccount> wbAccountslist=new ArrayList <>();
        Collection <String> allPermissions = ShiroUtil.getAllPermissions(loginUsername);
        User one = userService.getOne(q);
        Integer pageSize = Integer.valueOf(params.get("pageSize").toString());
        Integer currentPage = Integer.valueOf(params.get("currentPage").toString());
        String userid = one.getId();
        PageInfo  pageInfo=null;
        IPage <WbAccount> byuser=null;
        if (allPermissions.contains("user")) {
            byuser=  wbAccountService.findByuser(currentPage, pageSize, userid,
                    loginUsername);
         /*   pageInfo=new PageInfo(wbAccountslist, wbAccountslist.size(),
                    Integer.valueOf(params.get("pageSize").toString()), Integer.valueOf(params.get(
                    "currentPage").toString()));
*/
            if (allPermissions.contains("role")) {
                byuser= wbAccountService.queryPage(currentPage, pageSize);
            }
        }else{

            byuser= wbAccountService.selectByOneUser(currentPage, pageSize, userid);


        }
        if(byuser!=null){
            pageInfo=new PageInfo(byuser);

            return Result.ok().put("page", pageInfo);
        }

        return Result.ok().put("page", null);



    }

    /*授权接口*/

    @RequestMapping(value = "wb/account/getToken")
    private void getToken(String code, String state, HttpServletRequest request, HttpServletResponse response) throws IOException {
        System.out.println("code------------" + code);
        String url1 = env.getProperty("gpower.wb.tokenurl");
        String property = env.getProperty("server.port");
        String appname = env.getProperty("server.servlet.context-path");
        Subject subject = ShiroUtil.getSubject();
       // UsernamePasswordToken token = new UsernamePasswordToken(username, password);
    /*    subject.login(token);*/

        java.net.URL  url2 = new  java.net.URL(url1);
        String host = url2.getHost();
        String[] split = state.split(",");
        if(split.length>1){
            String url = "https://api.weibo.com/oauth2/access_token?client_id="+split[0]+"&client_secret="+split[1]+"&code="+code+"&grant_type=authorization_code"+"&redirect_uri="+url1;
            Map<String,Object>  map=new HashedMap<>();

            String s = HttpUtil.doHttpsPost(url, map);

            JSONObject json = null;
            try {
                json = new JSONObject(s);
            } catch (JSONException e) {
                e.printStackTrace();
            }
            String access_token = json.optString("access_token");
            Long expires_in = Long.valueOf(json.optString("expires_in"));
            String uid = json.optString("uid");

            expires_in=expires_in/86400;
            WbAccount  account=new WbAccount();
            account.setToken(access_token);
            account.setId(split[4]);
            String decode = URLDecoder.decode(split[3], "utf-8");
            String name = new String(split[3].getBytes("iso-8859-1"),"utf-8");
            System.out.println("name----"+decode);
            account.setName(decode);
            account.setCreationDate(new Date());
            account.setClientID(split[0]);
            account.setLogo(split[5]);
            account.setClientSecret(split[1]);
            Calendar ca = Calendar.getInstance();
            ca.add(Calendar.DATE,expires_in.intValue());
            Date time = ca.getTime();
            account.setExpireDate(time);//失效时间
            account.setOwner(split[2]);
            account.setUid(uid);
          //  UsernamePasswordToken token = new UsernamePasswordToken(username, password);
            boolean save = wbAccountService.save(account);

            System.out.println(access_token + "------access_token");
            System.out.println(json.toString() + "------json");
            System.out.println(save + "------save");
            Object currentUser = SecurityUtils.getSubject().getSession().getAttribute("currentUser");


            System.out.println(currentUser+"zzzzzzzzzzz");


            //return "views/index";
           response.sendRedirect("http://"+host+":"+property+appname+"/index#/accountManagement");

        }else{
            String id = split[0];
            WbAccount wbAccount = wbAccountService.getById(id);

            String clientID = wbAccount.getClientID();

            String clientSecret = wbAccount.getClientSecret();

            String url = "https://api.weibo.com/oauth2/access_token?client_id="+clientID+"&client_secret="+clientSecret+"&code="+code+"&grant_type=authorization_code"+"&redirect_uri="+url1;
            Map<String,Object>  map=new HashedMap<>();


            String s = HttpUtil.doHttpsPost(url, map);
            JSONObject json = null;
            try {
                json = new JSONObject(s);
            } catch (JSONException e) {
                e.printStackTrace();
            }
            String access_token = json.optString("access_token");
            Long expires_in = Long.valueOf(json.optString("expires_in"));
            String uid = json.optString("uid");

            expires_in=expires_in/86400;

            wbAccount.setToken(access_token);








            Calendar ca = Calendar.getInstance();
            ca.add(Calendar.DATE,expires_in.intValue());
            Date time = ca.getTime();
            wbAccount.setExpireDate(time);//失效时间

            wbAccount.setUid(uid);
            wbAccountService.updateById(wbAccount);
          response.sendRedirect("http://"+host+":"+property+appname+"/index#/accountManagement");
//response.sendRedirect("/login");
            //response.sendRedirect("medium/login");
        }



    }

    @RequestMapping(value="wb/account/check/{name}",method = RequestMethod.GET)
    @ResponseBody
    public  Boolean  checkWxAccount(@PathVariable("name") String name){
        Map<String, Object> map = new HashedMap <>();
        map.put("name", name);

        Collection <WbAccount> ts = wbAccountService.listByMap(map);
        return  ts.size()==0;
    }
    @RequestMapping(value="wb/account/wbUser/{id}",method = RequestMethod.GET)
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

        List<UserWb> userWxs = userWbService.list(new QueryWrapper<UserWb>().eq("wbaccountid"
                , id));
        List<String> collect = userWxs.stream().map(UserWb::getUserid).collect(Collectors.toList());
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
    @RequestMapping(value = "wb/account/updateshouquanWb", method = RequestMethod.POST)
    @ResponseBody
    public  Result  updateShouquanUser(String wb,String userids){

        userWbService.remove(new QueryWrapper<UserWb>().eq(!StringUtils.isEmpty(wb),"wbaccountid", wb));
        if(!StringUtils.isEmpty(userids)){
            String[] split = userids.split(",");
            UserWb  userWb=new UserWb();
            for (String s : split) {
                userWb.setUserid(s);
                userWb.setWbaccountid(wb);
                userWbService.save(userWb);
            }
        }

        return  Result.ok();
    }



}



