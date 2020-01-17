package com.gpower.startup.config;

import net.sf.ehcache.CacheManager;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.cache.ehcache.EhCacheCacheManager;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.util.ResourceUtils;

import java.io.FileNotFoundException;
import java.net.URL;

@Configuration
@ConditionalOnProperty(prefix="spring.cache", value="type",havingValue="ehcache")
public class EhCacheConfiguration {
	@Bean
	public CacheManager cacheManager() throws FileNotFoundException {
		URL file = ResourceUtils.getURL("classpath:ehcache/ehcache-local.xml");
		CacheManager ca = new CacheManager(file);
		return ca;
	}
	@Bean
	public EhCacheCacheManager ehCacheCacheManager(CacheManager ehCacheCacheManager) {
		return new EhCacheCacheManager(ehCacheCacheManager);
	}

}
