package com.gpower.startup.config;

import com.gpower.common.xss.XssFilter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.env.Environment;

@Configuration
public class FilterConfiguration {
    @Autowired
    Environment env;

    @SuppressWarnings({"rawtypes", "unchecked"})
    @Bean
    public FilterRegistrationBean testFilterRegistration() {
        String excludedUriString = env.getProperty("gpower.filter.xss.excludedUris");
        FilterRegistrationBean registration = new FilterRegistrationBean();
        registration.setFilter(new XssFilter());
        registration.addUrlPatterns("/*");
        registration.addInitParameter("excludedUri", excludedUriString);
        registration.setName("GpowerXssFilter");
        registration.setOrder(1);
        return registration;
    }


}
