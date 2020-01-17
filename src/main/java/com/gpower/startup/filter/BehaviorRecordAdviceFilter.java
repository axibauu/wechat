package com.gpower.startup.filter;

import com.gpower.common.utils.BehaviorRecordUtil;
import com.gpower.modules.log.entity.BehaviorRecord;
import org.apache.commons.lang.StringUtils;
import org.apache.shiro.web.servlet.AdviceFilter;

import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.HashMap;
import java.util.Map;

public class BehaviorRecordAdviceFilter extends AdviceFilter {
	@Override
	protected boolean preHandle(ServletRequest req, ServletResponse res) throws Exception {
		String uri = null;

		try {
			HttpServletRequest request = (HttpServletRequest) req;
			uri = request.getRequestURI();
			if (StringUtils.isNotBlank(uri) && uri.contains("logout")) {
				HttpServletResponse response = (HttpServletResponse) res;
				BehaviorRecord br = new BehaviorRecord();
				br.setUri(uri);
				if (request.getSession() != null) {
					br.setUserName((String)request.getSession().getAttribute("currentUser"));
					br.setSessionID(request.getRequestedSessionId());
                }
				Map<String,String> header = new HashMap<String,String>();
                header.put("referer",request.getHeader("referer"));
                header.put("origin",request.getHeader("origin"));
                header.put("user-agent",request.getHeader("user-agent"));
				br.setHeader(header);
				br.setParams(request.getParameterMap());
				br.setTime(System.currentTimeMillis());
				br.setStatus(response.getStatus());
				BehaviorRecordUtil.store(br);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return true;
	}

	@Override
	protected void postHandle(ServletRequest req, ServletResponse response) throws Exception {
	}

	@Override
	public void afterCompletion(ServletRequest req, ServletResponse res, Exception exception) throws Exception {
		String uri = null;
		try {
			HttpServletRequest request = (HttpServletRequest) req;
			uri = request.getRequestURI();
			if (StringUtils.isNotBlank(uri) && (uri.contains("logout") || uri.endsWith("/page"))) {
				return;
			}
			HttpServletResponse response = (HttpServletResponse) res;
			BehaviorRecord br = new BehaviorRecord();
			br.setUri(uri);
			if (request.getSession() != null) {
				br.setUserName((String)request.getSession().getAttribute("currentUser"));
				br.setSessionID(request.getRequestedSessionId());
            }
			Map<String,String> header = new HashMap<String,String>();
            header.put("referer",request.getHeader("referer"));
            header.put("origin",request.getHeader("origin"));
            header.put("user-agent",request.getHeader("user-agent"));
			br.setHeader(header);
			br.setParams(request.getParameterMap());
			br.setTime(System.currentTimeMillis());
			br.setStatus(response.getStatus());
			if(exception != null){
				br.setException(exception.getMessage());
			}
			BehaviorRecordUtil.store(br);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
}
