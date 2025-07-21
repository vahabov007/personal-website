package com.vahabvahabov.personal_website.controller;

import com.vahabvahabov.personal_website.service.AgeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AgeController {

    @Autowired
    private AgeService ageService;

    @GetMapping("/api/age")
    public Integer getAge() {
        return ageService.getAge();
    }
}
