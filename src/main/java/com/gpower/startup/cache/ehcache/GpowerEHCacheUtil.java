package com.gpower.startup.cache.ehcache;

import com.gpower.startup.cache.GpCacheUtil;
import net.sf.ehcache.Element;
import org.springframework.cache.CacheManager;
import org.springframework.cache.ehcache.EhCacheCacheManager;

import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Set;
import java.util.concurrent.TimeUnit;

public abstract class GpowerEHCacheUtil implements GpCacheUtil{

	protected String cacheName;
	protected  CacheManager cacheManager;
	private net.sf.ehcache.Cache cache = null;
	public GpowerEHCacheUtil() {
		super();
	}


	public GpowerEHCacheUtil(String cacheName, CacheManager cacheManager) {
		super();
		this.cacheName = cacheName;
		this.cacheManager = cacheManager;
		init();
	}

	protected void init(){
		EhCacheCacheManager cacheCacheManager = (EhCacheCacheManager) cacheManager;
		net.sf.ehcache.CacheManager ehCacheManager = cacheCacheManager.getCacheManager();
		this.cache = ehCacheManager.getCache(cacheName);
	}

	@Override
	public void setCache(String key, Object obj) {
		Element element = new Element(key, obj);
		cache.put(element);
	}

	@Override
	public void setCache(String key, Object obj, TimeUnit unit, int timeout) {
		int seconds = (int) unit.toSeconds(timeout);
		Element element = new Element(key, obj);
		element.setTimeToIdle(seconds);
		element.setTimeToLive(seconds+1);
		cache.put(element);
	}
	@Override
	public Object getCache(String key) {
		Element element = cache.get(key);
		if(element!=null){
			return element.getObjectValue();
		}
		return null;
	}

	@Override
	public void deleteCacheByKey(String key) {
		cache.remove(key);
	}

	@Override
	public void clearAllCache() {
		cache.removeAll();

	}

	@Override
	public int getCacheSize() {
		return cache.getSize();
	}

	@Override
	public void expire(String key, long timeout, TimeUnit unit) {
		Object obj = this.getCache(key);
		this.setCache(key, obj, unit, (int)timeout);
	}

	@Override
	public Set<String> getAllKeys() {
		List keys = cache.getKeysNoDuplicateCheck();
		Set<String> set = new HashSet<String>();
		set.addAll(keys);
		return set;
	}

	@Override
	public int clearCacheFuzzy(String str) {
		Set<String> keys = getAllKeys();
		Iterator<String> keyIterator = keys.iterator();
		Set<String> deleteKeys = new HashSet<String>();
		while(keyIterator.hasNext()){
			String key = keyIterator.next();
			if(key.contains(str)){
				deleteKeys.add(key);
			}
		}
		cache.removeAll(deleteKeys);
		return deleteKeys.size();
	}

}
