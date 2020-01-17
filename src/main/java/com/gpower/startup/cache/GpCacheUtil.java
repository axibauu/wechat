package com.gpower.startup.cache;

import java.util.Set;
import java.util.concurrent.TimeUnit;

public interface GpCacheUtil {
	
	/**
	  * <p>@description :设置缓存</p>
	  *	<p>@version :0.1</p>
	  * <p>@author :liuzl</p>
	  * <p>@Time :2018-06-28</p>
	  * <p>@param key</p>
	  * <p>@param obj</p>
	 */
	 void setCache(String key, Object obj);
	/**
	  * <p>@description :设置缓存</p>
	  *	<p>@version :0.1</p>
	  * <p>@author :liuzl</p>
	  * <p>@Time :2018-06-28</p>
	  * <p>@param key</p>
	  * <p>@param obj</p>
	  * <p>@param unit</p>
	  * <p>@param timeout </p>
	 */
	 void setCache(String key, Object obj, TimeUnit unit, int timeout);
	/**
	  * <p>@description :获取缓存</p>
	  *	<p>@version :0.1</p>
	  * <p>@author :liuzl</p>
	  * <p>@Time :2018-06-28</p>
	  * <p>@param key
	  * <p>@return </p>
	 */
	 Object getCache(String key);
	/**
	  * <p>@description :删除缓存</p>
	  *	<p>@version :0.1</p>
	  * <p>@author :liuzl</p>
	  * <p>@Time :2018-06-28</p>
	  * <p>@param key </p>
	 */
	 void deleteCacheByKey(String key);
	/**
	  * <p>@description :清除全部缓存</p>
	  *	<p>@version :0.1</p>
	  * <p>@author :liuzl</p>
	  * <p>@Time :2018-06-28</p>
	  * <p> </p>
	 */
	 void clearAllCache();
	/**
	  * <p>@description :查询缓存数量</p>
	  *	<p>@version :0.1</p>
	  * <p>@author :liuzl</p>
	  * <p>@Time :2018-06-28</p>
	  * <p> </p>
	 */
	 int getCacheSize();
	/**
	  * <p>@description :设置过期时间</p>
	  *	<p>@version :0.1</p>
	  * <p>@author :liuzl</p>
	  * <p>@Time :2018-06-28</p>
	  * <p>@param key </p>
	  * <p>@param timeout </p>
	  * <p>@param unit </p>
	  * <p> </p>
	 */
	 void expire(String key, long timeout, TimeUnit unit);
	 /**
	   * <p>@description :获取全部key</p>
	   *	<p>@version :0.1</p>
	   * <p>@author :liuzl</p>
	   * <p>@Time :2018-07-04</p>
	   * <p>@return </p>
	  */
	 Set<String> getAllKeys();
	 /**
	   * <p>@description :模糊删除</p>
	   *	<p>@version :0.1</p>
	   * <p>@author :liuzl</p>
	   * <p>@Time :2018-07-04</p>
	   * <p>@param str
	   * <p>@return </p>
	  */
	 int clearCacheFuzzy(String str);
}
