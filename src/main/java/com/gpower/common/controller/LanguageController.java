package com.gpower.common.controller;

import com.gpower.common.result.Result;
import com.gpower.startup.config.MyLocaleResolver;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.LocaleResolver;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.util.Locale;

@RestController
public class LanguageController {

    private static final Logger logger = LoggerFactory
            .getLogger(LanguageController.class);

    @Autowired
    LocaleResolver localeResolver;

    @RequestMapping(value = "/languages/{lang}", method = RequestMethod.GET)
    public Result index(HttpServletRequest request, HttpServletResponse response, @PathVariable("lang") String lang) {
        Result result = new Result();
        logger.info("切换语言：" + lang);

        String[] langueage = lang.split(",")[0].split("-");
        Locale locale = new Locale(langueage[0], langueage[1]);

        localeResolver.setLocale(request, response, locale);

        HttpSession session = request.getSession();
        session.setAttribute(MyLocaleResolver.LANG_SESSION, locale);
        return result;
    }
}
