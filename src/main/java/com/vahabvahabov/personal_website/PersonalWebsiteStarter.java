package com.vahabvahabov.personal_website;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan(basePackages = {"com.vahabvahabov"})
class PersonalWebsiteStarter {

	public static void main(String[] args) {
		SpringApplication.run(PersonalWebsiteStarter.class, args);
	}

}
