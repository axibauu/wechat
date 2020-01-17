package com.gpower.modules.user.controller;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.gpower.common.controller.BaseController;
import com.gpower.common.result.Result;
import com.gpower.modules.user.entity.UserInfo;
import com.gpower.modules.user.service.UserInfoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping("/userInfo")
public class UserInfoController extends BaseController {

    @Autowired
    private UserInfoService userInfoService;

    /**
     * 修改用户详细
     */
    @RequestMapping(method = RequestMethod.POST)
    @ResponseBody
    public Result update(@RequestBody UserInfo userInfo) {
        userInfoService.updateById(userInfo);
        return Result.ok();
    }

    /**
     * 获取id获取用户详细信息
     */
    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    @ResponseBody
    public Result info(@PathVariable("id") String id) {
        UserInfo userInfo = userInfoService.getById(id);
        return Result.ok().put("object", userInfo);
    }

    /**
     * 当前登录用户详细信息
     */
    @RequestMapping(value = "/current", method = RequestMethod.GET)
    @ResponseBody
    public Result current() {
        UserInfo userInfo = userInfoService.getOne(new QueryWrapper<UserInfo>().eq("name", getLoginUsername()));
        return Result.ok().put("object", userInfo);
    }


}
