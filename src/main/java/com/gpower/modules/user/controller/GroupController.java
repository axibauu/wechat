package com.gpower.modules.user.controller;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.gpower.common.annotation.SysLog;
import com.gpower.common.controller.BaseController;
import com.gpower.common.result.PageInfo;
import com.gpower.common.result.Result;
import com.gpower.common.utils.ShiroUtil;
import com.gpower.common.validator.ValidatorUtil;
import com.gpower.modules.user.entity.Group;
import com.gpower.modules.user.entity.User;
import com.gpower.modules.user.entity.UserGroup;
import com.gpower.modules.user.service.GroupService;
import com.gpower.modules.user.service.UserGroupService;
import com.gpower.modules.user.service.UserService;
import org.apache.commons.collections4.map.HashedMap;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

/**
 * @description:
 * @author: jingff
 * @date: 2019-07-11 10:49
 */
@Controller
@RequestMapping("/group")
public class GroupController extends BaseController {

    @Autowired
    private GroupService groupService;
    @Autowired
    private UserService userService;
    @Autowired
    private UserGroupService  userGroupService;



    /**
     * 查询用户列表
     */
    @RequestMapping(value = "/page", method = RequestMethod.POST)
    @ResponseBody
    @RequiresPermissions("user")
    public Result pageList(@RequestParam Map<String, Object> params) {
        String loginUsername = getLoginUsername();
        QueryWrapper <User> queryWrapper = new QueryWrapper <User>();
        ;
        queryWrapper.eq("name", loginUsername);

        Collection <String> allPermissions = ShiroUtil.getAllPermissions(loginUsername);

        PageInfo pageInfo = groupService.queryPage(params,allPermissions,loginUsername);
        return Result.ok().put("page", pageInfo);



    }

    @RequestMapping(value="/getGroupUsers/{id}",method =RequestMethod.GET )
    @ResponseBody
    public   Result  getGroupUsers(@PathVariable String  id){
        List <User> allUsers = userService.selectAll();
        List <User> myUsers = groupService.selectGroupUserById(id);
        for (int i = 0; i < allUsers.size(); i++) {
            User user = allUsers.get(i);user.setStatus(0);
            for (int j = 0; j < myUsers.size(); j++) {
                User muser = myUsers.get(j);
                if(user.getId().equals(muser.getId())){
                    user.setStatus(1);
                    break;
                }
        }
        }
        return  Result.ok().put("object",allUsers);
    }
    @RequestMapping(value="/updateGroupUser",method =RequestMethod.POST )
    @ResponseBody
    public Result  updateGroupUser(String  groupID, String userID){
        System.out.println("groupID----"+groupID);
       groupService.updateGroupUser(groupID, userID);
        return  Result.ok();


    }



    /**
     * 用户组名是否重复
     */
    @RequestMapping(value = "/{name}/check", method = RequestMethod.GET)
    @ResponseBody
    public Boolean check(@PathVariable("name") String name) {
        Map<String, Object> map = new HashedMap<>();
        map.put("name", name);
        Collection<Group> groups = groupService.listByMap(map);
        return groups.size() == 0;
    }

    /**
     * 创建新用户组
     */
    @SysLog("创建新用户组")
    @RequestMapping(method = RequestMethod.POST)
    @ResponseBody
    @RequiresPermissions("user")
    public Result save(@RequestBody Group group) {

        groupService.create(group);
        return Result.ok();
    }

    /**
     * 创建新用户组
     */
    @SysLog("更新新用户组")
    @RequestMapping(value = "/update",method = RequestMethod.PUT)
    @ResponseBody
    @RequiresPermissions("user")
    public Result update(@RequestBody Group group) {
        group.setCreatetime(new Date());
        groupService.updateById(group);
        return Result.ok();
    }


    /**
     * 删除用户组
     */
    @SysLog("删除用户组")
    @RequestMapping(value="/{id}",method = RequestMethod.DELETE)
    @ResponseBody
    @RequiresPermissions("user")
    public Result delete(@PathVariable String  id) {

        groupService.delete(id);
        return Result.ok();
    }


}
