package com.gpower.startup.config;

import org.apache.shiro.SecurityUtils;
import org.apache.shiro.subject.Subject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.servlet.LocaleResolver;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Locale;

/**
 * Created by wenpu_Di on 2019/1/10.
 */

public class MyLocaleResolver implements LocaleResolver {
    public static final String LANG = "Accept-Language";
    public static final String LANG_SESSION = "lang_session";


    private static final Logger logger = LoggerFactory
            .getLogger(MyLocaleResolver.class);

    @Override
    public Locale resolveLocale(HttpServletRequest request) {
        String lang = request.getHeader(LANG);
        Locale locale = Locale.getDefault();    // zh-CN ; en-US
        // logger.info(request.getServletPath());
        try {
            Subject currentUser = SecurityUtils.getSubject();
            org.apache.shiro.session.Session session = currentUser.getSession();
            Locale localeInSession = (Locale) session.getAttribute(LANG_SESSION);
            if (localeInSession != null){
                locale = localeInSession;
            } else {
                if (lang != null && lang != ""){
                    String[] langueage = lang.split(",")[0].split("-");
                    locale = new Locale(langueage[0],langueage[1]);
                    session.setAttribute(LANG_SESSION,locale);
                }
            }
        } catch (Exception e) {
            // e.printStackTrace();
        }
        return locale;
    }

    @Override
    public void setLocale(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, Locale locale) {

    }
}
