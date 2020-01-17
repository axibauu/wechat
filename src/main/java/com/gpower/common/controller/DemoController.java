package com.gpower.common.controller;

import com.gpower.common.annotation.SysLog;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/demo")
public class DemoController {

    @SysLog
    @RequestMapping(value = "/sysLog", method = RequestMethod.GET)
    public String test1(){
        return "test is cuccess";
    }
}
