package com.gpower.common.exception;

public class GpException extends RuntimeException {
    private static final long serialVersionUID = 7728363043373096082L;

    private Object[] params;

    public GpException() {
        super();
    }

    public GpException(String msg, Object[] params) {
        super(msg);
        this.params = params;
    }

    public GpException(String msg, String... str) {
        super(msg);
        this.params = str;
    }

    public GpException(String msg) {
        super(msg);
    }

    public GpException(String msg, Throwable cause) {
        super(msg, cause);
    }

    public GpException(Throwable cause) {
        super(cause);
    }

    public Object[] getParams() {
        return params;
    }

    public void setParams(Object[] params) {
        this.params = params;
    }

    @Override
    public String toString() {
        return super.toString();
    }
}
