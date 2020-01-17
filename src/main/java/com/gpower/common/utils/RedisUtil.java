package com.gpower.common.utils;


import org.springframework.dao.DataAccessException;
import org.springframework.data.redis.connection.RedisConnection;
import org.springframework.data.redis.core.RedisCallback;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.util.SerializationUtils;

import java.util.*;
import java.util.concurrent.TimeUnit;

public class RedisUtil {
	/**
	 * 集群模式
	 */
	public static final int MODE_CLUSTER = 1;
	/**
	 * 单机模式
	 */
	public static final int MODE_STANDALONE = 0;
	
	private static RedisTemplate<String, Object> redis;
	//private static JedisCluster cluster;
	
	public static int MODE = MODE_STANDALONE;
	
	public static String mybatisCachePrefix = "MybatisCache:";
	
	public static String shiroSessionCachePrefix = "shiro_redis_session:";
	
	public static String shiroAuthInfoPrefix = "shiro_redis_cache:";
	
	public static String cmsLastChannelPrefix = "gpower:userLastChannel:";
	
	public static String cmsAttachmentImagePrefix = "gpower:attachment:image:";
	
	public static String cmsAttachmentDocPrefix = "gpower:attachment:doc:";
	
	
	
	public static void setRedis(RedisTemplate<String, Object> redis) {
		RedisUtil.redis = redis;
	}
	
	public static Object get(Object key){
		return redis.opsForValue().get(key);
	}
	public static void expire(String key,long timeout,TimeUnit unit){
		redis.expire(key, timeout, unit);
	}
	public static void delete(String key){
		redis.delete(key);
	}
	public static void set(String key, Object value,long timeout,TimeUnit unit){
		redis.opsForValue().set(key, value, timeout, unit);
	}
	public static void set(String key, Object value){
		redis.opsForValue().set(key, value);
	}
	/**
	  * <p>@description :清空表缓存</p>
	  *	<p>@version :0.1</p>
	  * <p>@author :liuzl</p>
	  * <p>@Time :2018-01-08</p>
	  * <p>@param tableName 表名</p>
	  * <p>@return </p>
	 */
	public static int clearTableCache(String tableName){
		Set<String> nodekeys = redis.keys("*"+tableName+"*");
		Iterator<String> it = nodekeys.iterator();
		List<String> listKeys = new ArrayList<String>();
		while (it.hasNext()) {
			String key = it.next();
			String key1 = key.toLowerCase();
			if( key.startsWith(mybatisCachePrefix) && key1.contains(tableName)){
				listKeys.add(key);
			}
		}
		if(listKeys.size()==0){
			return 0;
		}
		redis.delete(listKeys);
		return listKeys.size();
	}
	/**
	  * <p>@description :清空数据库缓存</p>
	  *	<p>@version :0.1</p>
	  * <p>@author :liuzl</p>
	  * <p>@Time :2018-01-09</p>
	  * <p> </p>
	 */
	public static void clearMybatisCache(){
		Set<String> keys = redis.keys(mybatisCachePrefix+ "*");
		if(keys==null || keys.isEmpty()){
			return;
		}
		redis.delete(keys);
	}

	
	/**
	  * <p>@description :清空session缓存</p>
	  *	<p>@version :0.1</p>
	  * <p>@author :liuzl</p>
	  * <p>@Time :2018-01-09</p>
	  * <p> </p>
	 */
	public static void clearSessionCache(){
		Set<String> keys = redis.keys(shiroSessionCachePrefix + "*");
		if(keys==null || keys.isEmpty()){
			return;
		}
		redis.delete(keys);
	}
	/**
	  * <p>@description :清空shiro的用户认证信息</p>
	  *	<p>@version :0.1</p>
	  * <p>@author :liuzl</p>
	  * <p>@Time :2018-01-09</p>
	  * <p> </p>
	 */
	public static void clearShiroAuthorizationInfo(){
		Set<String> keys = redis.keys(shiroAuthInfoPrefix + "*");
		if(keys==null || keys.isEmpty()){
			return;
		}
		redis.delete(keys);
	}
	/**
	  * <p>@description :序列化</p>
	  *	<p>@version :0.1</p>
	  * <p>@author :liuzl</p>
	  * <p>@Time :2018-01-09</p>
	  * <p>@param obj</p>
	  * <p>@return </p>
	 */
	private static byte[] serializeObject(Object obj){
		if(obj==null){
			return null;
		}
		return SerializationUtils.serialize(obj);
	}
	/**
	  * <p>@description :反序列化</p>
	  *	<p>@version :0.1</p>
	  * <p>@author :liuzl</p>
	  * <p>@Time :2018-01-09</p>
	  * <p>@param bytes</p>
	  * <p>@return </p>
	 */
	private static Object deserialize(byte[] bytes){
		return SerializationUtils.deserialize(bytes);
	}

	/**
	  * <p>@description :存入mybatis缓存</p>
	  *	<p>@version :0.1</p>
	  * <p>@author :liuzl</p>
	  * <p>@Time :2018-01-09</p>
	  * <p>@param key</p>
	  * <p>@param obj </p>
	 */
	public static void setMybatisCache(String key,Object obj){
			redis.opsForValue().set(mybatisCachePrefix + key, obj);
	}
	/**
	  * <p>@description :存入mybatis缓存</p>
	  *	<p>@version :0.1</p>
	  * <p>@author :liuzl</p>
	  * <p>@Time :2018-01-09</p>
	  * <p>@param key</p>
	  * <p>@param obj</p>
	  * <p>@param unit</p>
	  * <p>@param timeout </p>
	 */
	public static void setMybatisCache(String key,Object obj,TimeUnit unit,int timeout){
		if(obj==null){
			deleteMybatisByKey(key);
			return;
		}
		if(obj instanceof Collection){
			if(((Collection) obj).isEmpty()){
				deleteMybatisByKey(key);
				return;
			}
		}
		redis.opsForValue().set(mybatisCachePrefix + key, obj, timeout, unit);
	}
	/**
	  * <p>@description :获取mybatis缓存</p>
	  *	<p>@version :0.1</p>
	  * <p>@author :liuzl</p>
	  * <p>@Time :2018-01-09</p>
	  * <p>@param key</p>
	  * <p>@return </p>
	 */
	public static Object getMybatisCache(String key){
		Object obj = redis.opsForValue().get(mybatisCachePrefix + key);
		return obj;
	}
	
	public static void deleteMybatisByKey(String key){
		redis.delete(mybatisCachePrefix + key);
	}
	public static void deleteSessionByKey(String key){
		redis.delete(shiroSessionCachePrefix + key);
	}
	public static int getMybatisCacheSize(){
			Long l = redis.execute(new RedisCallback<Long>() {
		            public Long doInRedis(RedisConnection connection) throws DataAccessException {
		                return connection.dbSize();
		            }
		        });
			 return l.intValue();
	}
	
	/**
	  * <p>@description :存session缓存</p>
	  *	<p>@version :0.1</p>
	  * <p>@author :liuzl</p>
	  * <p>@Time :2018-01-09</p>
	  * <p>@param key</p>
	  * <p>@param obj </p>
	 */
	public static void setSessionCache(String key,Object obj){
		redis.opsForValue().set(shiroSessionCachePrefix + key, obj);
	}
	/**
	  * <p>@description :存session缓存</p>
	  *	<p>@version :0.1</p>
	  * <p>@author :liuzl</p>
	  * <p>@Time :2018-01-09</p>
	  * <p>@param key</p>
	  * <p>@param obj</p>
	  * <p>@param unit 时间单位</p>
	  * <p>@param timeout 时间数字</p>
	 */
	public static void setSessionCache(String key,Object obj,TimeUnit unit,int timeout){
		redis.opsForValue().set(shiroSessionCachePrefix + key, obj, timeout, unit);
	}
	/**
	  * <p>@description :获取session缓存</p>
	  *	<p>@version :0.1</p>
	  * <p>@author :liuzl</p>
	  * <p>@Time :2018-01-09</p>
	  * <p>@param key</p>
	  * <p>@return </p>
	 */
	public static Object getSessionCache(String key){
		Object obj = redis.opsForValue().get(shiroSessionCachePrefix + key);
		return obj;
	}
	
	public static Set<String> getBykeyPrefix(String keyPrefix){
		Set<String> keys = redis.keys(keyPrefix + "*");
		return keys;
	}
	
	public static Set<String> getAllSessionKeys(){
		return getBykeyPrefix(shiroSessionCachePrefix);
	}
	public static Object getLastChannel(String key){
		return get(cmsLastChannelPrefix+key);
	}
	public static void setLastChannel(String key,Object obj){
		redis.opsForValue().set(cmsLastChannelPrefix+key, obj);
	}
	
	public static Object getAttachmentImage(String key){
		return get(cmsAttachmentImagePrefix+key);
	}
	public static void setAttachmentImage(String key,Object obj){
		redis.opsForValue().set(cmsAttachmentImagePrefix+key, obj);
	}
	
	public static Object getAttachmentDoc(String key){
		return get(cmsAttachmentDocPrefix+key);
	}
	public static void setAttachmentDoc(String key,Object obj){
		redis.opsForValue().set(cmsAttachmentDocPrefix+key, obj);
	}
	public static String getAttachmentImageKey(String key){
		return cmsAttachmentImagePrefix+key;
	}
	public static String getAttachmentDocKey(String key){
		return cmsAttachmentDocPrefix+key;
	}
	
	/**
	  * <p>@description :清空站点备份缓存</p>
	  *	<p>@version :0.1</p>
	  * <p>@author :liuzl</p>
	  * <p>@Time :2019-01-21</p>
	  * <p> </p>
	 */

}
