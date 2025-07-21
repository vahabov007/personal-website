package com.vahabvahabov.personal_website.controller;

import com.vahabvahabov.personal_website.service.AgeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class HomeController {

    @Autowired
    private AgeService ageService;

    @GetMapping("/")
    public String home(Model model) {
        model.addAttribute("name", "Vahab Vahabov");
        model.addAttribute("title", "Back-end Developer");
        model.addAttribute("age", ageService.getAge());
        return "index";
    }
}
