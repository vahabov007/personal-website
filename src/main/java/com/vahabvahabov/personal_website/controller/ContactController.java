// src/main/java/com/vahabvahabov/personal_website/controller/ContactController.java
package com.vahabvahabov.personal_website.controller;

import com.vahabvahabov.personal_website.model.ContactInfo; // Modelinizi import edin
import com.vahabvahabov.personal_website.service.EmailService; // Servisinizi import edin
import jakarta.validation.Valid; // Validasiyanı aktivləşdirmək üçün
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController // RESTful API endpoint-i olduğunu bildirir
@RequestMapping("/api") // Bütün endpointlər '/api' ilə başlayır
@CrossOrigin(origins = "http://localhost:8080") // Frontend-in domenini qeyd edin (CORS üçün)
public class ContactController {

    private final EmailService emailService;

    public ContactController(EmailService emailService) {
        this.emailService = emailService;
    }

    @PostMapping("/contact") // Bu endpoint-ə POST sorğuları gələcək
    public ResponseEntity<String> handleContactForm(@Valid @RequestBody ContactInfo contactInfo) {
        try {
            // Validasiya burada @Valid annotasiyası ilə avtomatik aparılır.
            // Əgər validasiya uğursuz olsa, metod çağrılmayacaq və Spring avtomatik olaraq 400 Bad Request qaytaracaq.

            emailService.sendContactFormEmail(contactInfo);
            return ResponseEntity.ok("Message sent successfully!");
        } catch (Exception e) {
            // Xəta olarsa, konsola yazdır və 500 status kodu ilə xəta mesajı qaytar
            e.printStackTrace();
            return ResponseEntity.status(500).body("Failed to send message: " + e.getMessage());
        }
    }
}