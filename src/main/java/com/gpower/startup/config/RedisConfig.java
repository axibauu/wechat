package com.gpower.startup.config;

import com.gpower.common.utils.RedisUtil;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.connection.RedisConnectionFactory;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.serializer.RedisSerializer;
import org.springframework.data.redis.serializer.SerializationException;


/*
@Configuration
*/
/*@ConditionalOnProperty(prefix="spring.cache", value="type",havingValue="redis")*//*

public class RedisConfig {
	
	@Bean
	RedisTemplate<String, Object> redisTemplate(RedisConnectionFactory connectionFactory) {
		RedisTemplate<String, Object> redis = new RedisTemplate<String, Object>();
		redis.setKeySerializer(new RedisSerializer<String>() {
			@Override
			public byte[] serialize(String t) throws SerializationException {
				return t.getBytes();
			}

			@Override
			public String deserialize(byte[] bytes) throws SerializationException {
				return new String(bytes);
			}
		});
		redis.setConnectionFactory(connectionFactory);
		redis.afterPropertiesSet();
		RedisUtil.setRedis(redis);
		return redis;
	}
}
*/


@Configuration
@EnableCaching
public class RedisConfig {
	@Bean
	RedisTemplate<String, Object> redisTemplate(RedisConnectionFactory connectionFactory) {
		RedisTemplate<String, Object> redis = new RedisTemplate<String, Object>();
		redis.setKeySerializer(new RedisSerializer<String>() {
			@Override
			public byte[] serialize(String t) throws SerializationException {
				return t.getBytes();
			}

			@Override
			public String deserialize(byte[] bytes) throws SerializationException {
				return new String(bytes);
			}
		});
		redis.setConnectionFactory(connectionFactory);
		redis.afterPropertiesSet();
		RedisUtil.setRedis(redis);
		return redis;
	}
}
