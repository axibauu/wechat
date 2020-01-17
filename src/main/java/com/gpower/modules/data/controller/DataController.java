package com.gpower.modules.data.controller;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.service.additional.query.impl.QueryChainWrapper;
import com.gpower.common.controller.BaseController;
import com.gpower.common.result.PageInfo;
import com.gpower.common.result.Result;
import com.gpower.common.utils.ShiroUtil;
import com.gpower.common.utils.StringUtil;
import com.gpower.modules.data.entity.WbInfo;
import com.gpower.modules.data.entity.WxData;
import com.gpower.modules.data.service.DataService;
import com.gpower.modules.user.dao.GroupDao;
import com.gpower.modules.user.dao.UserGroupDao;
import com.gpower.modules.user.entity.Group;
import com.gpower.modules.user.entity.User;
import com.gpower.modules.user.entity.UserGroup;
import com.gpower.modules.user.service.UserGroupService;
import com.gpower.modules.user.service.UserService;
import com.gpower.modules.wb.entity.WbAccount;
import com.gpower.modules.wb.service.WbAccountService;
import com.gpower.modules.wx.entity.WxAccount;
import com.gpower.modules.wx.entity.WxArticleInfo;
import com.gpower.modules.wx.entity.WxContent;
import com.gpower.modules.wx.service.WxAccountService;
import com.gpower.modules.wx.service.WxContentService;
import com.gpower.modules.wx.util.WbUtils;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.*;
import java.util.stream.Collectors;

import static com.gpower.modules.wx.util.WbUtils.*;

/**
 * @description:
 * @author: jingff
 * @date: 2019-08-05 14:42
 */
@Controller
@RequestMapping("data")
public class DataController extends BaseController {

    @Autowired
    WxAccountService wxAccountService;
    @Autowired
    WxContentService wxContentService;
    @Autowired
    WbAccountService  wbAccountService;
    @Autowired
    GroupDao groupDao;
    @Autowired
    UserService userService;


    @Autowired
    DataService  dataService;

    @RequestMapping(value = "getTypeAccountList/{type}",method = RequestMethod.GET)
    @ResponseBody
    public  Result getAccountType(@PathVariable String  type){
        if("1".equals(type)){
            List <WxAccount> list1 = wxAccountService.list(new QueryWrapper <WxAccount>());
            /*PageInfo pageInfo = wxAccountService.queryPage(new HashMap <>());*/
         //   List <WxAccount> list = (List <WxAccount>) pageInfo.getList();
            return Result.ok().put("object", list1);
        }else{
            List <WbAccount> list1 = wbAccountService.list(new QueryWrapper <WbAccount>());
        /*    PageInfo pageInfo =  wbAccountService.queryPage(new HashMap <>());
            List <WbAccount> list = (List <WbAccount>) pageInfo.getList();*/
            return Result.ok().put("object", list1);
        }


    }


    @RequestMapping(value="getStatistics",method = RequestMethod.POST)
    @ResponseBody
    public Result  getStatistics( @RequestParam String  type, @RequestParam String  list,
                                  @RequestParam String time ,@RequestParam String  fromtime,
                                  @RequestParam String  totime
                               ){


        /*weibo1*/
      if("2".equals(type)){
            List <WbInfo> userDetail=new ArrayList <>();
             userDetail = dataService.getUserDetail(list, time, fromtime, totime);
            return   Result.ok().put("object",userDetail);
        }else{
            List <WxData> userDetail=new ArrayList <>();
            userDetail = dataService.getArticleImageDetail(list, time, fromtime, totime);

            return   Result.ok().put("object",userDetail);
        }


    }
    @RequestMapping(value="getStatistics/getarticle",method = RequestMethod.POST)
    @ResponseBody
    public Result  getStatistics(
    ){ String loginUsername = getLoginUsername();
        QueryWrapper <User> q = new QueryWrapper <>();
        q.eq("name", loginUsername);


        User one = userService.getOne(q);
        Collection <String> allPermissions = ShiroUtil.getAllPermissions(loginUsername);
        Map<String,Object>  map=new HashMap <>();
        map.put("status", WxContent.STATUS_PUBLISHED);
        if(allPermissions.contains("role")){

        }else if(allPermissions.contains("group")){
            List <Group> groups = groupDao.selectGroupbyUserId(one.getId());
            List <User> users = groupDao.selectGroupUserById(groups.get(0).getId());
            List <String> collect = users.stream().map(User::getId).collect(Collectors.toList());
            map.put("ownerList", collect);
        } else{
             map.put("owner",one);
        }


        List <WxContent> wxContentList = wxContentService.selectByCondition(map);

return Result.ok().put("Object",wxContentList.size());
    }

}
