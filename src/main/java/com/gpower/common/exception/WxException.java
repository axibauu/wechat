package com.gpower.common.exception;
/**
 * <p>@description 微信异常</p>
 * <p>@author liuzl</p>
 * <p>@version 0.1</p>
 */
public class WxException extends Exception {
	private static final long serialVersionUID = 7728363043373096082L;

	private Object[] params;
	public WxException(){
        super();
    }
	public WxException(String msg, Object[] params){
        super(msg);
        this.params = params;
    }
    public WxException(String msg){
        super(msg);
    }
    public WxException(String msg, Throwable cause) {  
        super(msg, cause);  
    }  
      
    public WxException(Throwable cause) {  
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
    @Override
    public synchronized Throwable fillInStackTrace() {
        return this;
    }
}
