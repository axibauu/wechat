package com.gpower.startup.shiro;

import org.apache.shiro.authc.AuthenticationInfo;
import org.apache.shiro.authc.AuthenticationToken;
import org.apache.shiro.authc.ExcessiveAttemptsException;
import org.apache.shiro.authc.credential.SimpleCredentialsMatcher;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.cache.Cache;
import org.springframework.cache.ehcache.EhCacheCacheManager;
import org.springframework.stereotype.Component;

import java.util.concurrent.atomic.AtomicInteger;

/**
 *
 * Created by wenpu_Di on 2019/1/17.
 * shiro默认的验证器就是SimpleCredentialsMatcher
 * 自定义验证器封装SimpleCredentialsMatcher加入限制逻辑
 */
@Component
@ConditionalOnProperty(prefix = "shiro", value = "retryLimit", havingValue = "true")
public class RetryLimitCredentialsMatcher extends SimpleCredentialsMatcher {
    private static final Logger logger = LoggerFactory.getLogger(RetryLimitCredentialsMatcher.class);

    @Value("${shiro.maxRetryNum}")
    private int maxRetryNum;

    private EhCacheCacheManager shiroEhcacheManager;

    public RetryLimitCredentialsMatcher(EhCacheCacheManager cacheManager) {
        this.shiroEhcacheManager = cacheManager;
    }


    /**
     *
     * @param token 用户login的时候输入的token
     * @param info  根据用户输入的token调用realm的doGetAuthenticationInfo返回的数据库里边的用户
     * @return
     */
    @Override
    public boolean doCredentialsMatch(AuthenticationToken token, AuthenticationInfo info) {
        Cache passwordRetryCache = shiroEhcacheManager.getCache("passwordRetryCache");
        String username = (String) token.getPrincipal();
        AtomicInteger retryCount = passwordRetryCache.get(username, AtomicInteger.class);

        if (null == retryCount) {
            retryCount = new AtomicInteger(0);
            passwordRetryCache.put(username, retryCount);
        }
        if (retryCount.incrementAndGet() > maxRetryNum) {
            // 这里做并改数据库字段，抛出锁定用户异常
            logger.warn("用户[{}]进行登录验证..失败验证超过{}次", username, maxRetryNum);
            throw new ExcessiveAttemptsException("username: " + username + " tried to login more than 5 times in period locked");
        }

        /*
         *
         * 使用父类的SimpleCredentialsMatcher方法
         * 判断用户账号和密码是否匹配，完成match逻辑
         */
        boolean matches = super.doCredentialsMatch(token, info);
        if (matches) {
            //clear retry data
            passwordRetryCache.evict(username);
        }
        return matches;
    }

    // 解锁操作
    public void unlockAccount(String username) {
        /*User user = userMapper.findByUserName(username);
        if (user != null){
            //修改数据库的状态字段
            user.setState("0");
            userMapper.update(user);
            passwordRetryCache.remove(username);
        }*/
    }
}