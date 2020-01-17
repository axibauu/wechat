package com.gpower.common.utils;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.stereotype.Component;

import java.util.Locale;

/**
 * 国际化信息工具 
 * 从messages.properties根据key获取value
 * @author liuzl
 *
 */
@Component
public class LocalMessage {
	@Autowired
    private MessageSource messageSource;
    
	public  void setMessageSource(MessageSource messageSource) {
		this.messageSource = messageSource;
	}
	/**
	   * <p>创  建  人:liuzhongliang</p>
	   * <p>日       期 :2017年04月10</p>
	   * <p>功能描述 :获取国际化信息</p>
	   * <p>参数说明 :code(key值)</p>
	   * <p>返  回  值 :String</p>
	  */
    public  String getMessage(String code){
       return getMessage(code,null,null);
    }
    /**
	   * <p>创  建  人:liuzhongliang</p>
	   * <p>日       期 :2017年04月10</p>
	   * <p>功能描述 :获取国际化信息</p>
	   * <p>参数说明 :code(key值),defaultMessage(默认值,对应key值不存在时生效)</p>
	   * <p>返  回  值 :String</p>
	  */
    public  String getMessage(String code,String defaultMessage){
        return getMessage(code,null,defaultMessage);
     }
    /**
	   * <p>创  建  人:liuzhongliang</p>
	   * <p>日       期 :2017年04月10</p>
	   * <p>功能描述 :获取国际化信息</p>
	   * <p>参数说明 :code(key值),array(value中的参数)</p>
	   * <p>返  回  值 :String</p>
	  */
    public  String getMessage(String code,Object[] array){
        return getMessage(code,array,null);
     }
    /**
	   * <p>创  建  人:liuzhongliang</p>
	   * <p>日       期 :2017年04月10</p>
	   * <p>功能描述 :获取国际化信息</p>
	   * <p>参数说明 :	code(key值),
	   * 			array(value中的参数  eg. hello{0},today is{1}),
	   * 			defaultMessage(默认值,对应key值不存在时生效)</p>
	   * <p>返  回  值 :String</p>
	  */
	public  String getMessage(String code, Object[] array, String defaultMessage) {
		Locale locale = LocaleContextHolder.getLocale();
		return messageSource.getMessage(code, array, defaultMessage, locale);
	}
	
}
