package com.gpower.startup.shiro.cache;

import com.gpower.common.utils.SpringContextUtil;
import com.gpower.startup.cache.CacheProperties;
import com.gpower.startup.cache.GpCacheUtil;
import org.apache.shiro.cache.Cache;
import org.apache.shiro.cache.CacheException;
import org.apache.shiro.util.CollectionUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.*;

/**
 * diwp
 * 为shiro框架提供自定义缓存cache
 */
public class MyShiroCache<K, V> implements Cache<K, V> {
    Logger log = LoggerFactory.getLogger(this.getClass());

    @Override
    public void clear() throws CacheException {
        try {
            GpCacheUtil cacheUtil = (GpCacheUtil) SpringContextUtil.getBean(CacheProperties.SESSIONCACHENAME);
            cacheUtil.clearAllCache();
            log.trace(cacheUtil.getClass().getName() + " clear");
        } catch (Throwable t) {
            throw new CacheException(t);
        }

    }

    @Override
    public V get(K key) throws CacheException {
        try {
            GpCacheUtil cacheUtil = (GpCacheUtil) SpringContextUtil.getBean(CacheProperties.SESSIONCACHENAME);
            V v = (V) cacheUtil.getCache(key.toString());
            log.trace(cacheUtil.getClass().getName() + " get {" + key + ":" + v + "}");
            return v;
        } catch (Throwable t) {
            throw new CacheException(t);
        }
    }

    @Override
    @SuppressWarnings("unchecked")
    public Set<K> keys() {
        GpCacheUtil cacheUtil = (GpCacheUtil) SpringContextUtil.getBean(CacheProperties.SESSIONCACHENAME);
        Set<K> keys = (Set<K>) cacheUtil.getAllKeys();
        return keys;
    }

    @Override
    @SuppressWarnings("unchecked")
    public V put(K key, V value) throws CacheException {
        try {
            GpCacheUtil cacheUtil = (GpCacheUtil) SpringContextUtil.getBean(CacheProperties.SESSIONCACHENAME);
            cacheUtil.setCache(key.toString(), value);
            log.trace(cacheUtil.getClass().getName() + " put {" + key + ":" + value + "}");
            return value;
        } catch (Throwable t) {
            throw new CacheException(t);
        }
    }

    @Override
    @SuppressWarnings("unchecked")
    public V remove(K key) throws CacheException {
        try {
            V previous = get(key);
            GpCacheUtil cacheUtil = (GpCacheUtil) SpringContextUtil.getBean(CacheProperties.SESSIONCACHENAME);
            cacheUtil.deleteCacheByKey(key.toString());
            log.trace(cacheUtil.getClass().getName() + " delete {" + key + ":" + previous + "}");
            return previous;
        } catch (Throwable t) {
            throw new CacheException(t);
        }
    }

    @Override
    public int size() {
        try {
            GpCacheUtil cacheUtil = (GpCacheUtil) SpringContextUtil.getBean(CacheProperties.SESSIONCACHENAME);
            return cacheUtil.getCacheSize();
        } catch (Throwable t) {
            throw new CacheException(t);
        }
    }

    @Override
    @SuppressWarnings("unchecked")
    public Collection<V> values() {
        try {
            GpCacheUtil cacheUtil = (GpCacheUtil) SpringContextUtil.getBean(CacheProperties.SESSIONCACHENAME);
            Set<K> keys = (Set<K>) cacheUtil.getAllKeys();

            if (!CollectionUtils.isEmpty(keys)) {
                List<V> values = new ArrayList<V>(keys.size());
                for (K key : keys) {
                    V value = get((K) key);
                    if (value != null) {
                        values.add(value);
                    }
                }
                return Collections.unmodifiableList(values);
            } else {
                return Collections.emptyList();
            }
        } catch (Throwable t) {
            throw new CacheException(t);
        }
    }

}
