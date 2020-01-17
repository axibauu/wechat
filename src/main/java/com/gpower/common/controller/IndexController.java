package com.gpower.common.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
@RequestMapping(value = "/index")
public class IndexController {
    @Autowired
    Environment env;

    @RequestMapping(method = RequestMethod.GET)
    public String index() {
        return "views/index";
    }
}
