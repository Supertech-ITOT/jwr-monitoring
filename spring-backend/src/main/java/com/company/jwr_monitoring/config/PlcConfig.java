package com.company.jwr_monitoring.config;

import org.apache.plc4x.java.api.PlcDriverManager;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class PlcConfig {

    @Bean
    public PlcDriverManager plcDriverManager() {
        return PlcDriverManager.getDefault();
    }
}