package com.gpower.common.result;

/**
 * <p>@description 结果状态码</p>
 * <p>@author liuzl</p>
 */
public enum ResultStatus {
    OK(0, "Success", "操作成功"),
    SESSION_TIMEOUT(7003, "SessionTimeout", "用户session过期"),
    DATA_ERROR(7004, "DateException", "数据异常"),
    SERVER_ERROR(500, "ServerException", "操作异常，请稍后再试"),
    BAD_REQUEST(400, "BadRequest", "请求有误"),
    FORBIDDEN(403, "Forbidden", "没有权限"),
    NOT_FOUND(404, "NotFound", "您所访问的资源不存在"),
    UNKNOW_ERROR(-1, "UnknowError", "未知错误");
    private int status;
    private String code;
    private String msg;

    private ResultStatus(Integer status, String code, String msg) {
        this.status = status;
        this.code = code;
        this.msg = msg;
    }

    @Override
    public String toString() {
        return this.msg;
    }

    public int status() {
        return status;
    }

    public String code() {
        return code;
    }

    public String msg() {
        return msg;
    }
}
