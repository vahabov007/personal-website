package com.vahabvahabov.personal_website.controller;

import com.vahabvahabov.personal_website.service.AgeService;
import com.vahabvahabov.personal_website.service.EmailService; // EmailService-i import edin
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping; // PostMapping üçün
import org.springframework.web.bind.annotation.RequestParam; // RequestParam üçün
import org.slf4j.Logger; // Logger üçün
import org.slf4j.LoggerFactory; // LoggerFactory üçün

@Controller
public class HomeController {

    private static final Logger logger = LoggerFactory.getLogger(HomeController.class); // Logger əlavə edildi

    @Autowired
    private AgeService ageService;

    @Autowired // EmailService-i inject edin
    private EmailService emailService;

    @GetMapping("/")
    public String home(Model model) {
        logger.info("Home page accessed."); // Log əlavə edildi
        int age = ageService.getAge();
        model.addAttribute("age", age);
        return "index";
    }

    @PostMapping("/api/contact") // HTML formanızdakı apiUrl ilə eyni olmalıdır
    public String handleContactForm(@RequestParam("yourName") String name, // HTML input name ilə eyni olmalıdır
                                    @RequestParam("email") String email,   // HTML input name ilə eyni olmalıdır
                                    @RequestParam("message") String message) { // HTML textarea name ilə eyni olmalıdır
        logger.info("Kontakt forması sorğusu qəbul edildi. Ad: {}, Email: {}", name, email); // Log əlavə edildi

        try {
            // Email göndərmə metodunu çağırın
            String subject = "Yeni Mesaj: " + name;
            String body = "Ad: " + name + "\n" +
                    "Email: " + email + "\n" +
                    "Mesaj: " + message;

            emailService.sendEmail(email, subject, body); // Göndərən email adresini burada təyin etmirik, application.properties-dən gələcək
            logger.info("Email göndərmə cəhdi tamamlandı."); // Log əlavə edildi
            return "redirect:/success"; // Uğurlu göndərmədən sonra yönləndirəcəyiniz səhifə
        } catch (Exception e) {
            logger.error("Email göndərərkən xəta baş verdi: {}", e.getMessage(), e); // Xəta logu
            e.printStackTrace(); // Stacktrace-i də loga yazın
            return "redirect:/error"; // Xəta zamanı yönləndirəcəyiniz səhifə
        }
    }
}