package com.gpower.startup.shiro.cache;

import com.gpower.common.utils.SpringContextUtil;
import com.gpower.startup.cache.CacheProperties;
import com.gpower.startup.cache.GpCacheUtil;
import org.apache.shiro.session.Session;
import org.apache.shiro.session.UnknownSessionException;
import org.apache.shiro.session.mgt.eis.EnterpriseCacheSessionDAO;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.Serializable;
import java.util.Collection;
import java.util.HashSet;
import java.util.Set;
import java.util.concurrent.TimeUnit;

/**
 * diwp
 *
 * EnterpriseCacheSessionDAO继承了cache功能，会先从父类cache中寻找
 * session找不到在调用此类的doReadSession方法
 */
public class MyShiroSessionDAO extends EnterpriseCacheSessionDAO {
    private Logger log = LoggerFactory.getLogger(MyShiroSessionDAO.class);

    // 默认值为1800秒=>30分钟
    private long expire = 1800L;

    @Override
    public void delete(Session session) {
        if (session == null || session.getId() == null) {
            return;
        }
        GpCacheUtil cacheUtil = (GpCacheUtil) SpringContextUtil.getBean(CacheProperties.SESSIONCACHENAME);
        cacheUtil.deleteCacheByKey(this.getKey(session.getId()));
        // log.debug("delete session : " + session.getId());
    }

    @Override
    protected void doDelete(Session session) {

    }

    @Override
    public Collection<Session> getActiveSessions() {
        GpCacheUtil cacheUtil = (GpCacheUtil) SpringContextUtil.getBean(CacheProperties.SESSIONCACHENAME);
        Set<Session> sessions = new HashSet<Session>();
        Set<String> keys = cacheUtil.getAllKeys();

        if (keys != null && keys.size() > 0) {
            for (String key : keys) {
                Session s = (Session) cacheUtil.getCache(key);
                sessions.add(s);
            }
        }

        return sessions;
    }

    @Override
    public void update(Session session) throws UnknownSessionException {
        this.saveSession(session);

    }

    @Override
    protected void doUpdate(Session session) {

    }

    /**
     * save session
     *
     * @param session
     * @throws UnknownSessionException
     */
    private void saveSession(Session session) throws UnknownSessionException {
        if (session == null || session.getId() == null) {
            return;
        }
        String key = getKey(session.getId());
        // 这里填写的是毫秒
        session.setTimeout(expire * 1000);
        GpCacheUtil cacheUtil = (GpCacheUtil) SpringContextUtil.getBean(CacheProperties.SESSIONCACHENAME);
        cacheUtil.setCache(key, session, TimeUnit.SECONDS, new Long(expire).intValue());
        // log.debug("save session : " + key);
    }

    @Override
    protected Serializable doCreate(Session session) {
        Serializable sessionId = this.generateSessionId(session);
        this.assignSessionId(session, sessionId);
        this.saveSession(session);
        log.debug("create session : " + sessionId);
        return sessionId;
    }

    // 这个方法总返回null
    // 因为先去查找缓存，如果没有(比如那些过期清理的session)才会调用这个方法
    // 下面这种写法还是去找缓存同样为null
    // 所以这个方法只返回null就可以了
    @Override
    protected Session doReadSession(Serializable sessionId) {
        return null;

       /*

        if (sessionId == null) {
            return null;
        }
        GpCacheUtil cacheUtil = (GpCacheUtil) SpringContextUtil.getBean(CacheProperties.SESSIONCACHENAME);
        Session session = (Session) cacheUtil.getCache(getKey(sessionId));
        log.debug( "read session : {" + sessionId + ":" + session + "}");
        return session;

        */
    }

    /**
     * 获得byte[]型的key
     *
     * @return
     */
    private String getKey(Serializable sessionId) {
        return sessionId.toString();
    }


    public long getExpire() {
        return expire;
    }

    public void setExpire(long expire) {
        this.expire = expire;
    }

}
