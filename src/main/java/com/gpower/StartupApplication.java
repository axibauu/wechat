package com.gpower;

import com.gpower.startup.config.ApplicationContextUtil;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.scheduling.annotation.EnableScheduling;

import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.SessionCookieConfig;
import javax.servlet.SessionTrackingMode;
import java.util.Collections;

@SpringBootApplication
@EnableCaching
@MapperScan(basePackages = {"com.gpower.modules.**.dao"})
@EnableScheduling
public class StartupApplication extends SpringBootServletInitializer {

	public static void main(String[] args) {
		ConfigurableApplicationContext run = SpringApplication.run(StartupApplication.class, args);
		new ApplicationContextUtil().setApplicationContext(run);
	}

	@Override
	public void onStartup(ServletContext servletContext) throws ServletException {
		super.onStartup(servletContext);
		servletContext.setSessionTrackingModes(Collections.singleton(SessionTrackingMode.COOKIE));

		SessionCookieConfig sessionCookieConfig = servletContext.getSessionCookieConfig();
		sessionCookieConfig.setHttpOnly(true);
	}

	@Override
	protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {
		SpringApplicationBuilder app = application.sources(StartupApplication.class);
		return app;
	}
}
