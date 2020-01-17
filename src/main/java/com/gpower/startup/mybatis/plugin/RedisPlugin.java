package com.gpower.startup.mybatis.plugin;

import com.gpower.common.utils.SpringContextUtil;
import com.gpower.startup.cache.CacheProperties;
import com.gpower.startup.cache.GpCacheUtil;
import org.apache.ibatis.executor.statement.RoutingStatementHandler;
import org.apache.ibatis.executor.statement.StatementHandler;
import org.apache.ibatis.plugin.*;
import org.apache.ibatis.reflection.DefaultReflectorFactory;
import org.apache.ibatis.reflection.MetaObject;
import org.apache.ibatis.reflection.ReflectorFactory;
import org.apache.ibatis.reflection.factory.DefaultObjectFactory;
import org.apache.ibatis.reflection.factory.ObjectFactory;
import org.apache.ibatis.reflection.wrapper.DefaultObjectWrapperFactory;
import org.apache.ibatis.reflection.wrapper.ObjectWrapperFactory;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.lang.invoke.MethodHandles;
import java.util.Properties;



/**
 * Executor (update, query, flushStatements, commit, rollback, getTransaction, close, isClosed)
 * ParameterHandler (getParameterObject, setParameters)
 * ResultSetHandler (handleResultSets, handleOutputParameters)
 * StatementHandler (prepare, parameterize, batch, update, query)
 * 
拦截执行器的方法
拦截参数的处理
拦截结果集的处理
拦截Sql语法构建的处理
拦截器的使用
 * @author QiuBo
 *
 *@Intercepts({@Signature(type = StatementHandler .class, method ="prepare", args = {MappedStatement.class, Object.class})})  
 *
------------------------------target:org.apache.ibatis.executor.CachingExecutor@67621b4b
------------------------------target:org.apache.ibatis.scripting.defaults.DefaultParameterHandler@52c80e95
------------------------------target:org.apache.ibatis.executor.resultset.DefaultResultSetHandler@71ed2a9f
------------------------------target:org.apache.ibatis.executor.statement.RoutingStatementHandler@12e3bc6a
 */
@Intercepts({@Signature(type=StatementHandler.class,method="update",args={java.sql.Statement.class})}) 
public class RedisPlugin implements Interceptor{
	private Logger logger = LoggerFactory.getLogger(MethodHandles.lookup().lookupClass());
    private static final ObjectFactory objectFactory = new DefaultObjectFactory();  
    private static final ObjectWrapperFactory objectWrapperFactory = new DefaultObjectWrapperFactory(); 
    private static final ReflectorFactory reflectorFactory = new DefaultReflectorFactory();
	@Override
	public Object intercept(Invocation invocation) throws Throwable {
	
		RoutingStatementHandler resultSetHandler = (RoutingStatementHandler) invocation.getTarget();  
        MetaObject metaStatementHandler = MetaObject.forObject(resultSetHandler,objectFactory,objectWrapperFactory,reflectorFactory);
        String tableName =null;
        String updateSql = null;
        try {
        	if(metaStatementHandler.hasGetter("delegate.boundSql.sql")){
        		updateSql = (String) metaStatementHandler.getValue("delegate.boundSql.sql");
        		updateSql = updateSql.toLowerCase();
        		updateSql = updateSql.replace("\r\n", "");
        		updateSql = updateSql.replace("\r", "");
        		updateSql = updateSql.replace("\n", "");
        		updateSql = updateSql.replace("\t", "");
        		updateSql = updateSql.toLowerCase().trim();
        		if(updateSql.startsWith("insert")){
        			int p = updateSql.indexOf("(");
        			int pv = updateSql.indexOf("values");
        			if(pv>p){
        				tableName = updateSql.substring(updateSql.indexOf("into")+4, p).trim();
        			}else{
        				tableName = updateSql.substring(updateSql.indexOf("into")+4, pv).trim();
        			}
        		}else if(updateSql.startsWith("update")){
        			tableName = updateSql.substring(updateSql.indexOf("update")+6, updateSql.indexOf("set")).trim();
        		}else if(updateSql.startsWith("delete")){
        			if(updateSql.indexOf("where")>0){
        				tableName = updateSql.substring(updateSql.indexOf("from")+4, updateSql.indexOf("where")).trim();
        			}else{
        				tableName = updateSql.substring(updateSql.indexOf("from")+4).trim();
        			}
        		}else{
        			return invocation.proceed();
        		}
        		if(logger.isDebugEnabled()){
        			logger.info("Ready to start caching.");
        		}
        		
        		if(updateSql.contains(tableName)){
        			GpCacheUtil redisUtil = (GpCacheUtil) SpringContextUtil.getBean(CacheProperties.MYBATISCACHENAME);
        			redisUtil.clearCacheFuzzy(tableName);
        		}else{
        			GpCacheUtil redisUtil = (GpCacheUtil)SpringContextUtil.getBean(CacheProperties.MYBATISCACHENAME);
        			redisUtil.clearAllCache();
        			if(logger.isDebugEnabled()){
        				logger.info("Clear table:"+tableName+" all data");
            		}
        			
        		}
        	}
		} catch (Exception e) {
			e.printStackTrace();
			logger.error("RedisPlugin Error :"+e.getMessage());
		}
        if(logger.isDebugEnabled()){
        	logger.info("Update cache completed.");
		}
		return invocation.proceed();
	}

	@Override
	public Object plugin(Object target) {
		if (target instanceof StatementHandler) { 
            return Plugin.wrap(target, this);  
        } else {  
            return target;  
        }  
	}

	@Override
	public void setProperties(Properties properties) {
	}

}
