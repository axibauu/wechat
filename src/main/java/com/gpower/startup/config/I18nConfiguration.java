package com.gpower.startup.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.LocaleResolver;

@Configuration
public class I18nConfiguration {
    @Bean
    public LocaleResolver localeResolver(){
        return new MyLocaleResolver();
    }

}
