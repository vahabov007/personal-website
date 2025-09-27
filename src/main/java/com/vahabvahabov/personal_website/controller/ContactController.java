package com.vahabvahabov.personal_website.controller;

import com.vahabvahabov.personal_website.model.ContactInfo;
import com.vahabvahabov.personal_website.service.EmailService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.IOException;

@RestController
@RequestMapping("/api")
public class ContactController {

    private static final Logger logger = LoggerFactory.getLogger(ContactController.class);

    private final EmailService emailService;

    public ContactController(EmailService emailService) {
        this.emailService = emailService;
    }

    @PostMapping("/contact")
    public ResponseEntity<String> handleContactForm(@Valid @RequestBody ContactInfo contactInfo) {
        logger.info("Contact form request accepted. Name: {}, Topic: {}, Email: {}, Message length: {}",
                contactInfo.getYourName(),
                contactInfo.getTopic(),
                contactInfo.getEmail(),
                contactInfo.getMessage() != null ? contactInfo.getMessage().length() : 0);

        try {
            logger.info("Validation passed for contact form");

            String subject = "[" + contactInfo.getTopic() + "] New Contact Request from Website: " + contactInfo.getYourName();
            logger.info("Email subject: {}", subject);

            String htmlBody = emailService.buildHtmlEmailBody(
                    contactInfo.getYourName(),
                    contactInfo.getEmail(),
                    contactInfo.getTopic(),
                    contactInfo.getMessage()
            );

            logger.info("HTML body created successfully, sending email...");
            emailService.sendHtmlEmail(subject, htmlBody);

            logger.info("HTML Email sent successfully.");
            return ResponseEntity.ok("Message sent successfully!");

        } catch (IOException e) {
            logger.error("Error loading or processing email template: {}", e.getMessage(), e);
            return ResponseEntity.status(500).body("Failed to load email template: " + e.getMessage());
        } catch (Exception e) {
            logger.error("An error occurred while sending email: {}", e.getMessage(), e);
            return ResponseEntity.status(500).body("Failed to send message: " + e.getMessage());
        }
    }
}