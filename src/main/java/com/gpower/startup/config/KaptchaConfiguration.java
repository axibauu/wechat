package com.gpower.startup.config;

import com.google.code.kaptcha.servlet.KaptchaServlet;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.web.servlet.ServletRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.env.Environment;

import java.awt.*;
import java.text.Collator;
import java.util.List;
import java.util.*;

@Configuration
public class KaptchaConfiguration {
	@Autowired
	private Environment env;
	@SuppressWarnings({ "rawtypes", "unchecked" })
	@Bean
    public ServletRegistrationBean kaptchaServlet(){
       //org.springframework.boot.context.embedded.ServletRegistrationBean提供类的进行注册.
       ServletRegistrationBean servletRegistrationBean = new ServletRegistrationBean(new KaptchaServlet(), env.getProperty("kaptcha.servlet.url"));
       //添加初始化参数：initParams
       String font = getSystemFont();
       servletRegistrationBean.addInitParameter("kaptcha.border", env.getProperty("kaptcha.border"));
       // servletRegistrationBean.addInitParameter("kaptcha.border", "no");
       servletRegistrationBean.addInitParameter("kaptcha.textproducer.font.color", env.getProperty("kaptcha.textproducer.font.color"));
       servletRegistrationBean.addInitParameter("kaptcha.image.width", env.getProperty("kaptcha.image.width"));
       servletRegistrationBean.addInitParameter("kaptcha.textproducer.char.string", env.getProperty("kaptcha.textproducer.char.string"));
       servletRegistrationBean.addInitParameter("kaptcha.image.height", env.getProperty("kaptcha.image.height"));
       servletRegistrationBean.addInitParameter("kaptcha.textproducer.font.size", env.getProperty("kaptcha.textproducer.font.size"));
       servletRegistrationBean.addInitParameter("kaptcha.noise.color", env.getProperty("kaptcha.noise.color"));
       servletRegistrationBean.addInitParameter("kaptcha.textproducer.char.length", env.getProperty("kaptcha.textproducer.char.length"));
       servletRegistrationBean.addInitParameter("kaptcha.textproducer.font.names", font);
      //servletRegistrationBean.addInitParameter("kaptcha.textproducer.font.names", env.getProperty("kaptcha.textproducer.font.names"));
       
       return servletRegistrationBean;
    }
	public String getSystemFont(){
		try {
			Font[] fonts = GraphicsEnvironment.getLocalGraphicsEnvironment().getAllFonts();  
			if(fonts == null || fonts.length==0){
				return "Arial";
			 }
			 List<String> fontL = new ArrayList<String>();
			 for(Font i:fonts){        
				 fontL.add(i.getFamily());
			 }
			 List<String> list= removeDeuplicate(fontL);
			 String[] result = list.stream().toArray(String[]::new); 
			 Comparator<Object> com=Collator.getInstance(java.util.Locale.CHINA);      
			 Arrays.sort(result,com); 
			 return result[0];
		} catch (Exception e) {
			System.out.println("Unable to get system font");
		}
		return "Arial";
	}
	 public static List<String> removeDeuplicate(List<String> arlList)  
	    {  
	        HashSet<String> h=new HashSet<String>(arlList);  
	        arlList.clear();  
	        arlList.addAll(h);  
	        List<String> list=new ArrayList<String>();  
	        list=arlList;  
	        return list;  
	    }   

}
