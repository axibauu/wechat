package com.gpower.startup.cache.redis;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.core.env.Environment;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Component;

import com.gpower.startup.cache.CacheProperties;

@Component(value=CacheProperties.APPCACHENAME)
@ConditionalOnProperty(prefix="spring.cache", value="type",havingValue="redis")
public class AppRedisCacheUtil extends GpowerRedisCacheUtil{
	
	@Autowired
	private Environment env;
	@Autowired
	protected void setRedisTemplate(RedisTemplate<String, Object> redis){
		super.redis = redis;
		super.cachePrefix = env.getProperty("gpower.app.cache.prefix","GpowerAppCache")+":";
	}
	

	public AppRedisCacheUtil() {
		super();
	}
}
