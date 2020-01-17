package com.gpower.startup.mybatis.cache;

import org.apache.ibatis.cache.Cache;
import org.apache.ibatis.cache.decorators.LoggingCache;


public class GpowerLoggingCache extends LoggingCache{

	public GpowerLoggingCache(Cache delegate) {
		super(delegate);
	}
	public GpowerLoggingCache(String id) {
		super( new GpowerMybatisCache(id));
	}

}
