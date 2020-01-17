package com.gpower.startup.config;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.env.Environment;

import com.zaxxer.hikari.HikariDataSource;

@Configuration
public class HikariCPConfig {
	@Autowired
	private Environment environment;

	@Bean(name = "dataSource")
	public DataSource dataSource() {
		HikariDataSource ds = new HikariDataSource();
		ds.setJdbcUrl(environment.getProperty("spring.datasource.hikari.jdbc-url"));
		ds.setUsername(environment.getProperty("spring.datasource.hikari.username"));
		ds.setPassword(environment.getProperty("spring.datasource.hikari.password"));
		ds.setDriverClassName(environment.getProperty("spring.datasource.hikari.driver-class-name"));
		return ds;
	}

}
