package com.gpower.modules.log.controller;

import com.gpower.common.result.PageInfo;
import com.gpower.common.result.Result;
import com.gpower.modules.log.service.LogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.Map;

/**
 * Created by wenpu_Di on 2019/4/16.
 */
@Controller
@RequestMapping("/log")
public class LogController {
    @Autowired
    private LogService logService;

    /**
     * 查询用户列表
     */
    @RequestMapping(value = "/page", method = RequestMethod.POST)
    @ResponseBody
    public Result page(@RequestParam Map<String, Object> params) {
        PageInfo pageInfo = logService.queryPage(params);
        return Result.ok().put("page", pageInfo);
    }

}
