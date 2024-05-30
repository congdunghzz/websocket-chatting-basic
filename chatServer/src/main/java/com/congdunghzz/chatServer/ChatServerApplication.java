package com.congdunghzz.chatServer;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

import java.util.List;

@SpringBootApplication
public class ChatServerApplication {

	public static void main(String[] args) {
		SpringApplication.run(ChatServerApplication.class, args);
	}

	@Bean
	public CorsFilter corsFilter (){
		UrlBasedCorsConfigurationSource configurationSource = new UrlBasedCorsConfigurationSource();
		CorsConfiguration corsConfiguration = new CorsConfiguration();

		corsConfiguration.setAllowCredentials(true);
		corsConfiguration.setAllowedOriginPatterns(List.of("*"));
		corsConfiguration.setAllowedMethods(List.of("POST", "GET", "PUT","DELETE"));
		corsConfiguration.addAllowedHeader("*");
		configurationSource.registerCorsConfiguration("/**", corsConfiguration);

		return new CorsFilter(configurationSource);
	}
}
