package com.gpower.modules.user.controller;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.gpower.common.annotation.SysLog;
import com.gpower.common.controller.BaseController;
import com.gpower.common.exception.GpException;
import com.gpower.common.result.PageInfo;
import com.gpower.common.result.Result;
import com.gpower.common.utils.ShiroUtil;
import com.gpower.common.utils.StringUtil;
import com.gpower.common.validator.ValidatorUtil;
import com.gpower.modules.user.dao.GroupDao;
import com.gpower.modules.user.dao.UserRoleDao;
import com.gpower.modules.user.entity.Group;
import com.gpower.modules.user.entity.Role;
import com.gpower.modules.user.entity.User;
import com.gpower.modules.user.entity.UserRole;
import com.gpower.modules.user.service.GroupService;
import com.gpower.modules.user.service.RoleService;
import com.gpower.modules.user.service.UserRoleService;
import com.gpower.modules.user.service.UserService;
import org.apache.commons.collections4.CollectionUtils;
import org.apache.commons.collections4.map.HashedMap;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.*;
import java.util.stream.Collectors;

@Controller
@RequestMapping("/user")
public class UserController extends BaseController {

    @Autowired
    private UserService userService;

    @Autowired
    private UserRoleService userRoleService;

    @Autowired
    private RoleService roleService;
   @Autowired
    private GroupService  groupService;
   @Autowired
   private GroupDao  groupDao;

    /**
     * 查询用户列表
     */
    @RequestMapping(value = "/page", method = RequestMethod.POST)
    @ResponseBody
    public Result pageList(@RequestParam Map<String, Object> params) {
        String loginUsername = getLoginUsername();
        QueryWrapper <User> queryWrapper = new QueryWrapper <User>();

        queryWrapper.eq("name", loginUsername);

        Collection <String> allPermissions = ShiroUtil.getAllPermissions(loginUsername);

        PageInfo pageInfo = userService.queryPage(params,allPermissions,loginUsername);
        return Result.ok().put("page", pageInfo);
    }

    /**
     * 条件查询
     */
 /*   @RequestMapping(value = "/list", method = RequestMethod.POST)
    @ResponseBody
    public Result pageList(@RequestParam Map<String, Object> params, @RequestBody User user) {
        if (StringUtil.isNotBlank(user.getName())) {
            params.put("name", user.getName());
        }
        PageInfo pageInfo = userService.queryPage(params, allPermissions, loginUsername);
        return Result.ok().put("page", pageInfo);
    }
*/
    /**
     * 用户名是否重复
     */
    @RequestMapping(value = "/{name}/check", method = RequestMethod.GET)
    @ResponseBody
    public Boolean check(@PathVariable("name") String name) {
        Map<String, Object> map = new HashedMap<>();
        map.put("name", name);
        Collection<User> users = userService.listByMap(map);
        return users.size() == 0;
    }



    @RequestMapping(value = "/system",method = RequestMethod.GET)
    @ResponseBody
    public Result system() {
        QueryWrapper <Role> eq = new QueryWrapper <Role>().eq("name", "院级管理员");
        Role one = roleService.getOne(eq);
        String id = one.getId();

        List <UserRole> userRole = userRoleService.list(new QueryWrapper <UserRole>().eq("role_id",
                id));

        List <String> collect = userRole.stream().map(UserRole::getUserId).collect(Collectors.toList());
        List<Map<String,User>> aaa=new  ArrayList<Map<String,User>>();
        List <User> users = userService.list(new QueryWrapper <User>().in(CollectionUtils.isNotEmpty(collect),"id", collect));
        Map <String, User> map = new HashMap <>();
     if(CollectionUtils.isNotEmpty(users)){
         Iterator<User> iterator = users.iterator();

         while (iterator.hasNext()){
             User next = iterator.next();
             if(next.getName().equals("admin")){
                 iterator.remove();
             }

         }
        /* for (User user : users) {
             if (user.getName().equals("admin")) {
                 users.remove(user);
             }
         }*/

         //   List <String> userids = user.stream().map(User::getId).collect(Collectors.toList());
         //  boolean remove = userids.remove("1");
         if(CollectionUtils.isNotEmpty(users)){
         for (User user : users) {

             List <Group> groups = groupDao.selectGroupbyUserId(user.getId());
             for (Group group : groups) {
                 map.put(group.getId(), user);

             }
         }}
     }

        return Result.ok().put("object", map);
    }





  /*  @RequestMapping(value = "/system/{id}",method = RequestMethod.GET)
    @ResponseBody
    public Result system(@PathVariable String id) {
        List <User> users = groupService.selectGroupUserById(id);
       // List <String> collect = users.stream().map(User::getName).collect(Collectors.toList());
        QueryWrapper <User> q = new QueryWrapper <>();
        for (User user : users) {
            Collection <String> allPermissions = ShiroUtil.getAllPermissions(user.getName());
            if(allPermissions.contains("user")){
                System.out.println("user-----"+user);
                return    Result.ok().put("Object", user);
            }
            }   return    Result.ok();
        }
*/





    /**
     * 创建新用户
     */
    @SysLog("创建新用户")
    @RequestMapping(method = RequestMethod.POST)
    @ResponseBody
    public Result save(@RequestBody User user) {

        ValidatorUtil.validateEntity(user);
        userService.create(user);
        return Result.ok();
    }

    /**
     * 删除用户
     */
    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    @ResponseBody
    public Result delete(@PathVariable("id") String id) {
        if ("1".equals(id)) {
            throw new GpException("管理员不允许删除！");
        }
        userService.delete(id);
        return Result.ok();
    }

    @RequestMapping(method = RequestMethod.PUT)
    @ResponseBody
    public Result updatePassword(@RequestBody User user) {
        userService.updateById(user);
        return Result.ok();
    }

    /**
     * 管理员修改密码
     */
    @RequestMapping(value="/update/password", method = RequestMethod.PUT)
    @ResponseBody
    @RequiresPermissions("user")
    public Result updatePasswordAdmin(@RequestBody User user) {

        userService.updateById(user);
        String role = user.getRole();
        QueryWrapper<UserRole> user_id = new QueryWrapper<UserRole>().eq("user_id", user.getId());
        UserRole one = userRoleService.getOne(user_id);
        one.setRoleId(role);
        userRoleService.updateById(one);
        return Result.ok();
    }

    /**
     * 修改密码
     */
    @RequestMapping(value="/password", method = RequestMethod.POST)
    @ResponseBody
    public Result updatePassword(@RequestParam("id") String id, @RequestParam(required = false) String oldPassword, @RequestParam String password) {
        userService.updatePassword(id, oldPassword, password);
        return Result.ok();
    }

    /**
     * 查找用户
     */
    @RequestMapping(value = "/get/{id}", method = RequestMethod.GET)
    @ResponseBody
    public Result get(@PathVariable("id") String id) {
        User user = userService.getById(id);
        return Result.ok().put("object", user);
    }

    /**
     * 当前登录用户
     */
    @RequestMapping(value = "/current", method = RequestMethod.GET)
    @ResponseBody
    public Result current() {
        User user = userService.getOne(new QueryWrapper<User>().eq("name", getLoginUsername()));
        Collection <String> allPermissions = ShiroUtil.getAllPermissions(getLoginUsername());
        if(allPermissions.contains("role")){
            user.setRole("role");
        }else if(allPermissions.contains("group")){
            user.setRole("group");
        }
        return Result.ok().put("object", user);
    }



    /**
     * 用户授权
     */
    @RequestMapping(value = "/grantRole/{id}", method = RequestMethod.POST)
    @ResponseBody
    @RequiresPermissions("user")
    public Result grantRole(@PathVariable("id") String userId, @RequestBody String[] roleIds) {
        userService.grantRoles(userId, roleIds);
        return Result.ok();
    }

    /**
     * 获取用户角色
     */
   /* @RequestMapping(value = "/{userID}/roles", method = RequestMethod.GET)
    @ResponseBody
    public List<Role> getUserRoles(@PathVariable("userID") String userID) {
        List<UserRole> userRoles =userRoleService.list(new QueryWrapper<UserRole>().eq("user_id", userID));
        List<String> ids = new ArrayList<>();
        for (UserRole userRole : userRoles) {
            ids.add(userRole.getRoleId());
        }
        Collection<Role> roles = null;
        if (ids.size() > 0) {
            roles = roleService.listByIds(ids);
        }
        return (List<Role>) roles;
    }*/

    @RequestMapping(value = "/{userID}/roles", method = RequestMethod.GET)
    @ResponseBody
    public Result getMyUserRoles(@PathVariable("userID") String userID) {
        List<UserRole> userRoles =userRoleService.list(new QueryWrapper<UserRole>().eq("user_id", userID));
        List<String> ids = new ArrayList<>();
        for (UserRole userRole : userRoles) {
            ids.add(userRole.getRoleId());
        }
        List <Role> roles = new ArrayList <>();
        if (ids.size() > 0) {
            roles = (List)roleService.listByIds(ids);
        }
        /*suoyou*/
        List <Role> Allroles = roleService.selectAll();
        System.out.println(Allroles.toArray().toString());
        for (int i = 0; i < Allroles.size(); i++) {
            Role role = Allroles.get(i);role.setStatus(0);

            for (int i1 = 0; i1 < roles.size(); i1++) {
                Role role1 = roles.get(i1);
                if(role.getId().equals(role1.getId())){
                    role.setStatus(1);
                    break;
                }

            }


        }

        return Result.ok().put("object",Allroles);
    }




}
