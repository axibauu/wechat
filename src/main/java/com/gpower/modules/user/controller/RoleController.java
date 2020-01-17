package com.gpower.modules.user.controller;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.gpower.common.controller.BaseController;
import com.gpower.common.result.PageInfo;
import com.gpower.common.result.Result;
import com.gpower.modules.user.entity.Permission;
import com.gpower.modules.user.entity.Role;
import com.gpower.modules.user.entity.RolePermisson;
import com.gpower.modules.user.service.PermissionService;
import com.gpower.modules.user.service.RolePermissonService;
import com.gpower.modules.user.service.RoleService;
import org.apache.commons.collections4.map.HashedMap;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/role")

public class RoleController extends BaseController {

    @Autowired
    private RoleService roleService;

    @Autowired
    private RolePermissonService rolePermissonService;

    @Autowired
    private PermissionService permissionService;


    /**
     * 全部角色
     */
    @RequestMapping(value = "/getrole/{id}", method = RequestMethod.GET)
    public Result allRoles(@PathVariable String id) {
        Role role = roleService.getOne(new QueryWrapper<Role>().eq("ID", id));

        return Result.ok().put("object",role.getName());
    }


    /**
     * 全部角色
     */
    @RequestMapping(value = "/all", method = RequestMethod.GET)
    public List<Role> allRoles() {
        return roleService.list();
    }

    /**
     * 分页查询
     */
    @RequestMapping(value = "/page", method = RequestMethod.POST)
    public Result pageList(@RequestParam Map<String, Object> params) {

        PageInfo pageInfo = roleService.queryPage(params);
        return Result.ok().put("page", pageInfo);
    }

    /**
     * 新增角色
     */
    @RequestMapping(value = "/{name}/{code}", method = RequestMethod.POST)
    public Result save(@PathVariable("name") String name, @PathVariable("code") String code, @RequestBody String[] permissionIds) {
        Role role = new Role();
        role.setName(name);
        role.setCode(code);
        roleService.create(role, permissionIds);
        return Result.ok();
    }

    /**
     * 删除角色
     */
    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    public Result delete(@PathVariable("id") String id) {
        roleService.delete(id);
        return Result.ok();
    }

    /**
     * 修改角色
     */
    @RequestMapping(value = "/{id}/{name}/{code}", method = RequestMethod.PUT)
    public Result update(@PathVariable("id") String id, @PathVariable("name") String name, @PathVariable("code") String code, @RequestBody String[] permissionIds) {
        Role role = new Role();
        role.setId(id);
        role.setName(name);
        role.setCode(code);
        roleService.update(role, permissionIds);
        return Result.ok();
    }

    /**
     * 获取角色拥有的权限
     */
    @RequestMapping(value = "/{roleId}/permissions", method = RequestMethod.GET)
    @ResponseBody
    public List<Permission> getRolePermissions(@PathVariable("roleId") String roleId) {
        List<RolePermisson> rolePermissonList = rolePermissonService.list(new QueryWrapper<RolePermisson>().eq("role_id", roleId));
        List<String> ids = new ArrayList<>();
        for (RolePermisson rolePermisson : rolePermissonList) {
            ids.add(rolePermisson.getPermissionId());
        }
        List<Permission> permissions = null;
        if (ids.size() > 0) {
            permissions = (List<Permission>) permissionService.listByIds(ids);
        }
        return permissions;
    }

    /**
     * 角色code是否重复
     */
    @RequestMapping(value = "/{code}/check", method = RequestMethod.GET)
    @ResponseBody
    public Boolean check(@PathVariable("code") String code) {
        Map<String, Object> map = new HashedMap<>();
        map.put("code", code);
        List<Role> roles = (List<Role>) roleService.listByMap(map);
        return roles.size() == 0;
    }

}
