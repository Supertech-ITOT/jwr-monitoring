package com.company.jwr_monitoring;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class JwrMonitoringApplication {

	public static void main(String[] args) {
		SpringApplication.run(JwrMonitoringApplication.class, args);
	}

}
