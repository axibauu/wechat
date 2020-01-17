package com.gpower.common.exception;

import com.gpower.common.result.Result;
import org.apache.shiro.authz.AuthorizationException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {
    private static final Logger logger = LoggerFactory.getLogger(GlobalExceptionHandler.class);

    @ExceptionHandler(value = AuthorizationException.class)
    public Result handlerAuthorizationException(AuthorizationException e) {
        logger.error(e.getMessage(), e);
        return Result.error("没有权限");
    }

    @ExceptionHandler(value = DataIntegrityViolationException.class)
    public Result handlerDataIntegrityViolationException(DataIntegrityViolationException e) {
        logger.error(e.getMessage(), e);
        return Result.error("数据异常");
    }

    /**
     * 业务异常
     */
    @ExceptionHandler(value = GpException.class)
    public Result handlerGpException(GpException e) {
        logger.error(e.getMessage(), e);
        return Result.error(e.getMessage());
    }

    /**
     * 系统异常
     */
    @ExceptionHandler(value = Exception.class)
    public Result handlerException(Exception e) {
        logger.error(e.getMessage(), e);
        return Result.error();
    }

}
