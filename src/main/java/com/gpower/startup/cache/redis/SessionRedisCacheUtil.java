package com.gpower.startup.cache.redis;

import com.gpower.startup.cache.CacheProperties;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.core.env.Environment;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Component;

@Component(value = CacheProperties.SESSIONCACHENAME)
@ConditionalOnProperty(prefix = "spring.cache", value = "type", havingValue = "redis")
public class SessionRedisCacheUtil extends GpowerRedisCacheUtil {
    private static Logger logger = LoggerFactory.getLogger(SessionRedisCacheUtil.class);

    @Autowired
    private Environment env;

    @Autowired
    protected void setRedisTemplate(RedisTemplate<String, Object> redis) {
        super.redis = redis;
        logger.info("初始化Redis为GpowerSessionCache");
        super.cachePrefix = env.getProperty("gpower.session.cache.prefix", "GpowerSessionCache") + ":";
    }


    public SessionRedisCacheUtil() {
        super();
    }

}
