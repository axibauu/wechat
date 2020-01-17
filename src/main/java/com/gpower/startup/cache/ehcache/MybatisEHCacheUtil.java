package com.gpower.startup.cache.ehcache;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.cache.CacheManager;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Component;

import com.gpower.startup.cache.CacheProperties;

@Component(value=CacheProperties.MYBATISCACHENAME)
@ConditionalOnProperty(prefix="spring.cache", value="type",havingValue="ehcache")
public class MybatisEHCacheUtil extends GpowerEHCacheUtil {
	@Autowired
	private Environment env;
	@Autowired
	protected void setCacheManager(CacheManager cacheManager){
		super.cacheManager = cacheManager;
		super.cacheName = env.getProperty("gpower.database.cache.prefix","GpowerMybatisCache");
		super.init();
	}
	

	public MybatisEHCacheUtil() {
		super();
	}
}
