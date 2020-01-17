package com.gpower.startup.cache.redis;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.core.env.Environment;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Component;

import com.gpower.startup.cache.CacheProperties;

@Component(value=CacheProperties.MYBATISCACHENAME)
@ConditionalOnProperty(prefix="spring.cache", value="type",havingValue="redis")
public class MybatisRedisCacheUtil extends GpowerRedisCacheUtil{
	
	/*private final String DEFAULT_PREFIX = "GpowerMybatisCache:";
	@Value( "${gpower.database.cache.prefix:GpowerMybatisCache:}")
	private String cachePrefix = DEFAULT_PREFIX;*/
	@Autowired
	private Environment env;
	//private RedisTemplate<String, Object> redis;
	@Autowired
	protected void setRedisTemplate(RedisTemplate<String, Object> redis){
		super.redis = redis;
		super.cachePrefix = env.getProperty("gpower.database.cache.prefix","GpowerMybatisCache")+":";
	}
	

	public MybatisRedisCacheUtil() {
		super();
	}
	

}
