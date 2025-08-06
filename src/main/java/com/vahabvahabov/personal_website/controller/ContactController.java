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
@CrossOrigin(origins = {
        "https://vahabvahabov.site",
        "https://www.vahabvahabov.site",
        "http://localhost:8080", // Lokal test üçün
        "https://personal-website-ketc.onrender.com" // Render-in ilkin URL-i üçün
})
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
            // DÜZƏLİŞ: Mesajın göndəriləcəyi email adresi sizin əsas email adresiniz olmalıdır.
            // Bu, sizin mesajları qəbul etmək istədiyiniz email adresidir.
            String recipientEmail = "vahab.vahabov07@gmail.com"; // Buraya sizin əsas email adresinizi yazın

            String subject = "Yeni Mesaj: " + contactInfo.getYourName();
            String body = "Ad: " + contactInfo.getYourName() + "\n" +
                    "Email: " + contactInfo.getEmail() + "\n" +
                    "Mesaj: " + contactInfo.getMessage();

            // Mesajı sizin əsas email adresinizə göndəririk
            emailService.sendEmail(recipientEmail, subject, body);
            logger.info("Email göndərmə cəhdi tamamlandı. Mesaj göndərildi: {}", recipientEmail);

            return ResponseEntity.ok("Message sent successfully!");
        } catch (Exception e) {
            logger.error("Email göndərərkən xəta baş verdi: {}", e.getMessage(), e);
            e.printStackTrace();
            return ResponseEntity.status(500).body("Failed to send message: " + e.getMessage());
        }
    }
}
