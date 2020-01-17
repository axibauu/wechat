package com.gpower.common.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

/**
 * 系统页面视图
 * diwp
 */
@Controller
public class PageRedirectController extends BaseController {

    // 头、脚
    @RequestMapping(value = "tpl/{url}.html", method = RequestMethod.GET)
    public String tpl(@PathVariable("url") String url) {
        return "tpl/" + url;
    }

    // 模块功能视图
    @RequestMapping(value = "views/{view}/{url}.html", method = RequestMethod.GET)
    public String view(@PathVariable("view") String view, @PathVariable("url") String url) {
        return "views/" + view + "/" + url;
    }

    @RequestMapping(value = "views/dashboard.html", method = RequestMethod.GET)
    public String dashboard() {
        return "views/dashboard";
    }

}
