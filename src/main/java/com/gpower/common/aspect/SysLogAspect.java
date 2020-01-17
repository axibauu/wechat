package com.gpower.common.aspect;

import com.gpower.common.annotation.SysLog;
import com.gpower.common.utils.HttpContextUtils;
import com.gpower.modules.log.entity.Log;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Pointcut;
import org.aspectj.lang.reflect.MethodSignature;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import javax.servlet.http.HttpServletRequest;
import java.lang.reflect.Method;
import java.util.Date;


/**
 * 系统日志，切面处理类
 */
@Aspect
@Component
public class SysLogAspect {

	private static final Logger logger = LoggerFactory.getLogger(SysLogAspect.class);


	@Pointcut("@annotation(com.gpower.common.annotation.SysLog)")
	public void logPointCut() { 
		
	}

	@Around("logPointCut()")
	public Object around(ProceedingJoinPoint point) throws Throwable {
		long beginTime = System.currentTimeMillis();
		long time = 0;
		int opationStatus = 1;
		Object result;
		try {
			result = point.proceed();
			time = System.currentTimeMillis() - beginTime;
		} catch (Throwable throwable) {
			opationStatus = 0;
			throw throwable;
		} finally {
			saveSysLog(point, time, opationStatus);
		}
		return result;
	}

	private void saveSysLog(ProceedingJoinPoint joinPoint, long time, int opationStatus) {
		MethodSignature signature = (MethodSignature) joinPoint.getSignature();
		Method method = signature.getMethod();

		Log log = new Log();
		log.setStatus(opationStatus);
		log.setOpTime(new Date());
		SysLog syslog = method.getAnnotation(SysLog.class);
		if(syslog != null){
			// 注解描述
			log.setOperate(syslog.value());
		}
		// 请求的方法名
		String className = joinPoint.getTarget().getClass().getName();
		String methodName = signature.getName();

		// 类名（额外补充方法名）
		log.setClazz(className + "." + methodName + "()");
		// 执行时间
		log.setRemark("耗时：" + time);
		// 有必要的话，添加模块名
		/*if (className.contains("yysy")) {
			log.setModelName("会议预定");
		} else if (className.contains("xtgl")) {
			log.setModelName("系统管理");
		} else if (className.contains("tjcx")) {
			log.setModelName("统计查询");
		} else if (className.contains("rgsh")) {
			log.setModelName("人工审核");
		}*/
		// 有必要的话可以解析请求参数
		/*Object[] args = joinPoint.getArgs();
		try{
			for (int i = 0; i < args.length; i++) {
				// System.out.println("请求参数："+ args[i]);
			}
			String params = new Gson().toJson(args[0]);
			log.setJson(null);
		}catch (Exception e){
			e.printStackTrace();
		}*/
		//获取request
		HttpServletRequest request = HttpContextUtils.getHttpServletRequest();
		//设置IP地址
		log.setIp(request.getRemoteAddr());
		//用户名
		// String username = (String)SecurityUtils.getSubject().getPrincipal();
		// log.setUser(username);
		//保存系统日志
		logger.info("执行日志-->" + log.toString());
	}
}
