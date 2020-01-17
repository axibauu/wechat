package com.gpower.startup.shiro;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.stereotype.Component;

import javax.servlet.Filter;
import java.io.Serializable;
import java.util.List;
import java.util.Map;

@Configuration
@ConfigurationProperties(prefix = "shiro")
@PropertySource("classpath:shiro.properties")
@Component
public class ShiroConfigBean implements Serializable {
    private static final long serialVersionUID = -569974445720343795L;
    private Map<String, String> filterChainDefinitionMap;
    //private Map<String, String> filterChainDefinitionMap;
    private Map<String, Filter> filters;

    private List<String> list;

    public List<String> getList() {
        return list;
    }

    public void setList(List<String> list) {
        this.list = list;
    }

    public Map<String, String> getFilterChainDefinitionMap() {
        return filterChainDefinitionMap;
    }

    public void setFilterChainDefinitionMap(Map<String, String> filterChainDefinitionMap) {
        this.filterChainDefinitionMap = filterChainDefinitionMap;

    }

    public Map<String, Filter> getFilters() {
        return filters;
    }

    public void setFilters(Map<String, Filter> filters) {
        this.filters = filters;
    }


}
