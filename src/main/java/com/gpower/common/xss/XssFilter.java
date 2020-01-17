package com.gpower.common.xss;

import javax.servlet.*;
import javax.servlet.http.HttpServletRequest;
import java.io.IOException;

public class XssFilter implements Filter {
    private String[] ignoreUri = {"/page"};
    FilterConfig filterConfig = null;

    @Override
    public void init(FilterConfig filterConfig) throws ServletException {
        this.filterConfig = filterConfig;
        String excludedUri = filterConfig.getInitParameter("excludedUri");
        ignoreUri = excludedUri.split(",");

    }

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
            throws IOException, ServletException {
        HttpServletRequest req = (HttpServletRequest) request;
        String requestUri = req.getRequestURI();
        if (ignorePath(requestUri)) {
            chain.doFilter(request, response);
        } else {
            chain.doFilter(new XssHttpServletRequestWrapper(req), response);

        }
    }

    public boolean ignorePath(String uri) {
        if (ignoreUri == null || ignoreUri.length <= 0) {
            return false;
        }
        for (String ex : ignoreUri) {
            uri = uri.trim();
            ex = ex.trim();
            if (uri.toLowerCase().matches(ex.toLowerCase().replace("*", ".*")))
                return true;
        }
        return false;
    }

    public void destroy() {
        this.filterConfig = null;
    }

}
