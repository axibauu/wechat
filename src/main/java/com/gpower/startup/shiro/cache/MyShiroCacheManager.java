package com.gpower.startup.shiro.cache;

import org.apache.shiro.cache.Cache;
import org.apache.shiro.cache.CacheException;
import org.apache.shiro.cache.CacheManager;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.redis.core.RedisTemplate;

import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ConcurrentMap;

/**
 * diwp
 * 自定义的cacheManager以供Shiro框架的组件使用
 * -- 继承了CacheManagerAware接口的
 * -- 组件会注入此CacheManager
 */
@SuppressWarnings("rawtypes")
public class MyShiroCacheManager implements CacheManager {
    private Logger logger = LoggerFactory.getLogger(MyShiroCacheManager.class);
    private RedisTemplate<String, Object> redis;
    private final ConcurrentMap<String, Cache> caches = new ConcurrentHashMap<String, Cache>();

    @SuppressWarnings("unchecked")
    @Override
    public <K, V> Cache<K, V> getCache(String name) throws CacheException {
        Cache c = caches.get(name);

        if (c == null) {

            // create a new cache instance
            c = new MyShiroCache<String, Object>();

            // add it to the cache collection
            caches.put(name, c);
        }
        logger.debug("MyShiroCacheManager put {" + name + "}");
        return c;
    }

    private String keyPrefix = "shiro_redis_cache.";

    public String getKeyPrefix() {
        return keyPrefix;
    }

    public void setKeyPrefix(String keyPrefix) {
        this.keyPrefix = keyPrefix;
    }

    public RedisTemplate<String, Object> getRedis() {
        return redis;
    }

    public void setRedis(RedisTemplate<String, Object> redis) {
        this.redis = redis;
    }

}
