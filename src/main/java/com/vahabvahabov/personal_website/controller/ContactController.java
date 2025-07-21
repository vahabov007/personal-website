// src/main/java/com/vahabvahabov/personal_website/controller/ContactController.java
package com.vahabvahabov.personal_website.controller;

import com.vahabvahabov.personal_website.model.ContactInfo;
import com.vahabvahabov.personal_website.service.EmailService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@RestController
@RequestMapping("/api")
// DÜZƏLİŞ: Həm www, həm də www-siz domenə icazə vermək üçün origins massivi istifadə edildi
@CrossOrigin(origins = {"https://vahabvahabov.site", "https://www.vahabvahabov.site"})
public class ContactController {

    private static final Logger logger = LoggerFactory.getLogger(ContactController.class);

    private final EmailService emailService;

    public ContactController(EmailService emailService) {
        this.emailService = emailService;
    }

    @PostMapping("/contact")
    public ResponseEntity<String> handleContactForm(@Valid @RequestBody ContactInfo contactInfo) {
        logger.info("Kontakt forması sorğusu qəbul edildi. Ad: {}, Email: {}", contactInfo.getYourName(), contactInfo.getEmail());
        try {
            String toEmail = contactInfo.getEmail();
            String subject = "Yeni Mesaj: " + contactInfo.getYourName();
            String body = "Ad: " + contactInfo.getYourName() + "\n" +
                    "Email: " + contactInfo.getEmail() + "\n" +
                    "Mesaj: " + contactInfo.getMessage();

            emailService.sendEmail(toEmail, subject, body);
            logger.info("Email göndərmə cəhdi tamamlandı.");

            return ResponseEntity.ok("Message sent successfully!");
        } catch (Exception e) {
            logger.error("Email göndərərkən xəta baş verdi: {}", e.getMessage(), e);
            e.printStackTrace();
            return ResponseEntity.status(500).body("Failed to send message: " + e.getMessage());
        }
    }
}
