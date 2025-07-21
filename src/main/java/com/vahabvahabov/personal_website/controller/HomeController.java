// src/main/java/com/vahabvahabov/personal_website/controller/HomeController.java
package com.vahabvahabov.personal_website.controller;

import com.vahabvahabov.personal_website.service.AgeService;
// EmailService-ə burada ehtiyac yoxdur, çünki kontakt forması ContactController tərəfindən idarə olunacaq
// import com.vahabvahabov.personal_website.service.EmailService; 
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
// PostMapping və RequestParam-a burada ehtiyac yoxdur
// import org.springframework.web.bind.annotation.PostMapping; 
// import org.springframework.web.bind.annotation.RequestParam; 
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Controller
public class HomeController {

    private static final Logger logger = LoggerFactory.getLogger(HomeController.class);

    @Autowired
    private AgeService ageService;

    // EmailService-i burada inject etməyə ehtiyac yoxdur
    // @Autowired 
    // private EmailService emailService;

    @GetMapping("/")
    public String home(Model model) {
        logger.info("Home page accessed.");
        int age = ageService.getAge();
        model.addAttribute("age", age);
        return "index";
    }

    // Əvvəlki handleContactForm metodu buradan silinib,
    // çünki ContactController tərəfindən idarə olunur.
}
