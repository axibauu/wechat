package com.gpower.modules.user.controller;

import com.gpower.common.controller.BaseController;
import com.gpower.modules.user.entity.Permission;
import com.gpower.modules.user.service.PermissionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/permission")
public class PermissionController extends BaseController {

    @Autowired
    private PermissionService permissionService;

    /**
     * 全部权限
     */
    @RequestMapping(value = "/all", method = RequestMethod.GET)
    public List<Permission> getAll() {
        return permissionService.list();
    }

}
