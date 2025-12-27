package com.vahabvahabov.personal_website;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableAsync;

@SpringBootApplication
@EnableAsync
class PersonalWebsiteStarter {

	public static void main(String[] args) {
		SpringApplication.run(PersonalWebsiteStarter.class, args);
	}

}
