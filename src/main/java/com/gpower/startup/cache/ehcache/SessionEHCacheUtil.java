package com.gpower.startup.cache.ehcache;

import com.gpower.startup.cache.CacheProperties;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.cache.CacheManager;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Component;

@Component(value = CacheProperties.SESSIONCACHENAME)
@ConditionalOnProperty(prefix = "spring.cache", value = "type", havingValue = "ehcache")
public class SessionEHCacheUtil extends GpowerEHCacheUtil {
    private static Logger logger = LoggerFactory.getLogger(SessionEHCacheUtil.class);

    @Autowired
    private Environment env;

    @Autowired
    protected void setCacheManager(CacheManager cacheManager) {
        super.cacheManager = cacheManager;
        logger.info("初始化EHCache为GpowerSessionCache");
        super.cacheName = env.getProperty("gpower.session.cache.prefix", "GpowerSessionCache");
        super.init();
    }


    public SessionEHCacheUtil() {
        super();
    }
}
