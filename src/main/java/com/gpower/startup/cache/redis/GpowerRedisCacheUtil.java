package com.gpower.startup.cache.redis;

import com.gpower.startup.cache.GpCacheUtil;
import org.springframework.data.redis.core.RedisTemplate;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Set;
import java.util.concurrent.TimeUnit;

public abstract class GpowerRedisCacheUtil implements GpCacheUtil {
    protected String cachePrefix;
    protected RedisTemplate<String, Object> redis;

    public GpowerRedisCacheUtil(String cachePrefix, RedisTemplate<String, Object> redis) {
        super();
        this.cachePrefix = cachePrefix;
        this.redis = redis;
    }

    public GpowerRedisCacheUtil() {
        super();
    }

    @Override
    public int clearCacheFuzzy(String str) {
        Set<String> nodekeys = redis.keys("*" + str + "*");
        Iterator<String> it = nodekeys.iterator();
        List<String> listKeys = new ArrayList<String>();
        while (it.hasNext()) {
            String key = it.next();
            String key1 = key.toLowerCase();
            if (key.startsWith(cachePrefix) && key1.contains(str)) {
                listKeys.add(key);
            }
        }
        if (listKeys.size() == 0) {
            return 0;
        }
        redis.delete(listKeys);
        return listKeys.size();
    }

    @Override
    public void setCache(String key, Object obj) {
        redis.opsForValue().set(cachePrefix + key, obj);
    }

    @Override
    public void setCache(String key, Object obj, TimeUnit unit, int timeout) {
        redis.opsForValue().set(cachePrefix + key, obj, timeout, unit);

    }

    @Override
    public Object getCache(String key) {
        return redis.opsForValue().get(cachePrefix + key);
    }

    @Override
    public void deleteCacheByKey(String key) {
        redis.delete(cachePrefix + key);

    }

    @Override
    public void clearAllCache() {
        Set<String> keys = redis.keys(cachePrefix + "*");
        if (keys == null || keys.isEmpty()) {
            return;
        }
        redis.delete(keys);

    }

    @Override
    public int getCacheSize() {
        Set<String> keys = redis.keys(cachePrefix + "*");
        return keys.size();
    }

    @Override
    public void expire(String key, long timeout, TimeUnit unit) {
        redis.expire(cachePrefix + key, timeout, unit);

    }

    public String getCachePrefix() {
        return cachePrefix;
    }

    public void setCachePrefix(String cachePrefix) {
        this.cachePrefix = cachePrefix;
    }

    public RedisTemplate<String, Object> getRedis() {
        return redis;
    }

    public void setRedis(RedisTemplate<String, Object> redis) {
        this.redis = redis;
    }

    @Override
    public Set<String> getAllKeys() {
        Set<String> keys = redis.keys(cachePrefix + "*");
        return keys;
    }

}
