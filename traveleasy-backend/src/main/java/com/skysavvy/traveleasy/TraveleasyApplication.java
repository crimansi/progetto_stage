package com.skysavvy.traveleasy;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
@EnableJpaRepositories
@SpringBootApplication
public class TraveleasyApplication {

	public static void main(String[] args) {
		SpringApplication.run(TraveleasyApplication.class, args);
	}

}
