package com.vahabvahabov.personal_website.controller;

import com.vahabvahabov.personal_website.model.ContactInfo;
import com.vahabvahabov.personal_website.service.EmailService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api")
public class ContactController {

    private static final Logger logger = LoggerFactory.getLogger(ContactController.class);

    private final EmailService emailService;

    public ContactController(EmailService emailService) {
        this.emailService = emailService;
    }

    @PostMapping("/contact")
    public ResponseEntity<Map<String, String>> handleContactForm(@Valid @RequestBody ContactInfo contactInfo) {
        logger.info("Contact form request accepted. Name: {}, Topic: {}, Email: {}, Message length: {}",
                contactInfo.getYourName(),
                contactInfo.getTopic(),
                contactInfo.getEmail(),
                contactInfo.getMessage() != null ? contactInfo.getMessage().length() : 0);

        try {
            String subject = "[" + contactInfo.getTopic() + "] New Contact Request from Website: " + contactInfo.getYourName();
            String htmlBody = emailService.buildHtmlEmailBody(
                    contactInfo.getYourName(),
                    contactInfo.getEmail(),
                    contactInfo.getTopic(),
                    contactInfo.getMessage()
            );

            emailService.sendHtmlEmail(subject, htmlBody);

            Map<String, String> response = new HashMap<>();
            response.put("message", "Message sent successfully!");
            return ResponseEntity.ok(response);

        } catch (IOException e) {
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("error", "Failed to load email template: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
        } catch (Exception e) {
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("error", "Failed to send message: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
        }
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Map<String, List<String>>> handleValidationExceptions(MethodArgumentNotValidException ex) {
        List<String> errors = ex.getBindingResult().getFieldErrors()
                .stream().map(FieldError::getDefaultMessage)
                .collect(Collectors.toList());
        Map<String, List<String>> errorResponse = new HashMap<>();
        errorResponse.put("errors", errors);
        return new ResponseEntity<>(errorResponse, HttpStatus.BAD_REQUEST);
    }
}
