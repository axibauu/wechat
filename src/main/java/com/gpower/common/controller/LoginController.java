package com.gpower.common.controller;


import com.google.code.kaptcha.Constants;
import com.gpower.common.exception.GpException;
import com.gpower.common.result.Result;
import com.gpower.common.utils.ShiroUtil;
import com.gpower.modules.log.LogUtil;
import com.gpower.modules.user.entity.User;
import com.gpower.modules.user.service.UserService;
import com.gpower.startup.cache.CacheProperties;
import com.gpower.startup.cache.GpCacheUtil;
import org.apache.commons.collections4.CollectionUtils;
import org.apache.commons.collections4.map.HashedMap;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.ExcessiveAttemptsException;
import org.apache.shiro.authc.UsernamePasswordToken;
import org.apache.shiro.subject.Subject;
/*import org.keycloak.KeycloakSecurityContext;
import org.keycloak.representations.IDToken;*/
import org.keycloak.KeycloakSecurityContext;
import org.keycloak.representations.IDToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import java.util.Collection;
import java.util.HashMap;
import java.util.Map;

@Controller
public class LoginController extends BaseController {

    @Resource(name = CacheProperties.APPCACHENAME)
    private GpCacheUtil cacheUtil;
    @Autowired
    private UserService  userService;

    @RequestMapping(value = "/", method = RequestMethod.GET)
    public String defaultP() {
        return login();
    }

    @RequestMapping(value="/oAuthLogin",method=RequestMethod.GET)
    public String oAuthLogin(HttpServletRequest request,RedirectAttributes attr,  ModelMap map){
        KeycloakSecurityContext ctx= (KeycloakSecurityContext)request.getAttribute(KeycloakSecurityContext.class.getName());
        final IDToken idToken = ctx.getIdToken();
        String username = idToken.getPreferredUsername();
        /*判断是否存在*/
        Map<String, Object> map1 = new HashMap <>();
        map1.put("name", username);
        Collection<User> users = userService.listByMap(map1);
        if(CollectionUtils.isNotEmpty(users)){
            /*用户存在*/
            Object[] objects = users.toArray();
          User user=  (User)objects[0];
            Subject subject = ShiroUtil.getSubject();
            UsernamePasswordToken token = new UsernamePasswordToken(username, user.getPassword());
            subject.login(token);
            Object currentUser = SecurityUtils.getSubject().getSession().getAttribute("currentUser");
            System.out.println(currentUser+"currentUser1");

            return "views/index";
        }else{
            try {
                throw  new GpException("用户"+username+"不存在，请联系管理员");
            } catch (Exception e) {
                e.printStackTrace();
                System.out.println("errorMsg"+e.getMessage());
                map.addAttribute("error", e.getMessage());
                return "views/error";
            }
        }

    }

    @RequestMapping(value = "/login", method = RequestMethod.GET)
    public String login() {
            SecurityUtils.getSubject().getSession().getAttribute("currentUser");
        if (SecurityUtils.getSubject().isRemembered()) {
            return "views/index";
        }
        return "views/login";
    }

    @RequestMapping(value = "/redictlogin", method = RequestMethod.GET)
    public String redictlogin() {
        Object currentUser = SecurityUtils.getSubject().getSession().getAttribute("currentUser");
        System.out.println(currentUser+"currentUser");
        if (SecurityUtils.getSubject().isRemembered()) {
            return "views/index";
        }
        return "views/login";
    }

    @RequestMapping(value = "/login", method = RequestMethod.POST)
    @ResponseBody
    public Result doLogin(HttpServletRequest request) {
        String captcha = request.getParameter("code");
        String kaptcha = ShiroUtil.getKaptcha(Constants.KAPTCHA_SESSION_KEY);
        if (!captcha.equalsIgnoreCase(kaptcha)) {
            return Result.error("验证码不正确");
        }
        try {
            String username = request.getParameter("username");
            String password = request.getParameter("password");
            Subject subject = ShiroUtil.getSubject();
            UsernamePasswordToken token = new UsernamePasswordToken(username, password);
            subject.login(token);
            Object currentUser = SecurityUtils.getSubject().getSession().getAttribute("currentUser");
            System.out.println(currentUser+"currentUser");
        } catch (ExcessiveAttemptsException e) {
            return Result.error("输入错误次数过多，请稍后再试！");
        } catch (Exception e) {
            return Result.error("用户名或密码不正确");
        }
        return Result.ok().put("object", true);
    }

    protected void writeLoginLog(String username, int status, String desc) {
        String ip = getRequest().getRemoteAddr();
        LogUtil.getInstance().writeLog(username, ip, status, "用户", null, null, "登录", null, desc);
    }

    @RequestMapping(value = "/logout", method = RequestMethod.GET)
    public String logout() {
        Subject currentUser = SecurityUtils.getSubject();
        currentUser.getSession().removeAttribute("currentUser");
        currentUser.logout();
        return "views/login";
    }

}
