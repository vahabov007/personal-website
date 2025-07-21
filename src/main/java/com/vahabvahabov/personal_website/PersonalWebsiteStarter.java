package com.vahabvahabov.personal_website;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.retry.annotation.EnableRetry;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EntityScan(basePackages = {"com.vahabvahabov"})
@EnableJpaRepositories
@ComponentScan(basePackages = {"com.vahabvahabov"})
@EnableScheduling
@EnableRetry
class PersonalWebsiteStarter {

	public static void main(String[] args) {
		SpringApplication.run(PersonalWebsiteStarter.class, args);
	}

}
