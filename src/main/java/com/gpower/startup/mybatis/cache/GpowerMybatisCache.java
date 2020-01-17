package com.gpower.startup.mybatis.cache;

import com.gpower.common.utils.SpringContextUtil;
import com.gpower.startup.cache.CacheProperties;
import com.gpower.startup.cache.GpCacheUtil;
import org.apache.ibatis.cache.Cache;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.concurrent.TimeUnit;
import java.util.concurrent.locks.ReadWriteLock;
import java.util.concurrent.locks.ReentrantReadWriteLock;


public class GpowerMybatisCache implements Cache{
	private Logger logger = LoggerFactory.getLogger(GpowerMybatisCache.class);
	/** The ReadWriteLock. */ 
    private final ReadWriteLock readWriteLock = new ReentrantReadWriteLock();
//    private JdkSerializationRedisSerializer jdkSerializer = new JdkSerializationRedisSerializer(); 
    private String id;
  
  
    public GpowerMybatisCache(final String id) {  
        if (id == null) {
            throw new IllegalArgumentException("Cache instances require an ID");
        }
        logger.info("MybatisRedisCache:id="+id);
        this.id = id;
    }  
	public String getId() {
		return this.id;
	}

	public void putObject(Object object, Object value) {
		
		String keyString = object.toString();
		keyString = stringFilter(keyString);
		try {
			if(value!=null){
				GpCacheUtil redisUtil = (GpCacheUtil) SpringContextUtil.getBean(CacheProperties.MYBATISCACHENAME);
				redisUtil.setCache(keyString, value,TimeUnit.MINUTES,10);
				//RedisUtil.setMybatisCache(keyString, value,TimeUnit.MINUTES,10);
				//logger.info("putIntoRedis:【"+keyString+"】=【"+value+"】");
			}
		} catch (Exception e) {
			logger.error("key:【"+keyString+"】=【"+value+"】");
			e.printStackTrace();
		}
	}

	public Object getObject(Object object) {
		String keyString = object.toString();
		keyString = stringFilter(keyString);
		Object value = null;
		try {
			GpCacheUtil redisUtil =  (GpCacheUtil) SpringContextUtil.getBean(CacheProperties.MYBATISCACHENAME);
			value = redisUtil.getCache(keyString);//RedisUtil.getMybatisCache(keyString);//
			//logger.info("getFromRedis:【"+keyString+"】=【"+value+"】");
		} catch (Exception e) {
			logger.error("key:【"+keyString+"】=【"+value+"】");
			e.printStackTrace();
		}
		return value;
	}

	public Object removeObject(Object object) {
		String keyString = object.toString();
		keyString = stringFilter(keyString);
		try {
			GpCacheUtil redisUtil = (GpCacheUtil)SpringContextUtil.getBean(CacheProperties.MYBATISCACHENAME);
			redisUtil.deleteCacheByKey(keyString);
			//RedisUtil.deleteMybatisByKey(keyString);
			logger.info("removeFromRedis:【"+keyString+"】");
		} catch (Exception e) {
			logger.error("key:【"+keyString+"】");
			e.printStackTrace();
		}
		return null;
	}

	public void clear() {
	}


	public ReadWriteLock getReadWriteLock() {
		return readWriteLock;
	}
	private String stringFilter(String str){
		str = str.toLowerCase();
		str = str.replace("\r\n", " ");
		str = str.replace("\r", " ");
		str = str.replace("\n", " ");
		str = str.replace("\t", " ");
		str = str.replace("$", " ");
		str = str.replace("'", " ");
		str = str.replace("\"", " ");
		return str;
	}
	@Override
	public int getSize() {
		GpCacheUtil redisUtil = (GpCacheUtil)SpringContextUtil.getBean(CacheProperties.MYBATISCACHENAME);
		return  redisUtil.getCacheSize();//RedisUtil.getMybatisCacheSize();//
	}
	

}
