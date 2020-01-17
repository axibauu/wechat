package com.gpower.startup.shiro.filter;

import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.shiro.subject.Subject;
import org.apache.shiro.web.filter.AccessControlFilter;
import org.apache.shiro.web.util.WebUtils;
import org.springframework.util.StringUtils;

public class CmsAccessFilter extends AccessControlFilter {
	private final String URL_SESSION_TIMEOUT;
	
	public CmsAccessFilter(String sessionTimeoutUrl){
		this.URL_SESSION_TIMEOUT = sessionTimeoutUrl;
	}
	protected boolean isAccessAllowed(ServletRequest request, ServletResponse response, Object mappedValue) {
		if (isLoginRequest(request, response)) {
			return true;
		} else {
			Subject subject = getSubject(request, response);
			return subject.getPrincipal() != null;
		}
	}

	protected boolean onAccessDenied(ServletRequest request, ServletResponse response) throws Exception {
		HttpServletRequest r = (HttpServletRequest)request;
		String requestTime = r.getHeader("RequestTime");
		
    	if(!StringUtils.isEmpty(requestTime)){
    		//session过期
    		WebUtils.saveRequest(request);
    		WebUtils.toHttp(response).sendError(HttpServletResponse.SC_UNAUTHORIZED);  
    		//WebUtils.issueRedirect(request, response, this.URL_SESSION_TIMEOUT);
    	}else{
    		//未登陆
    		 saveRequestAndRedirectToLogin(request, response);
    	}
		return false;
	}
}
