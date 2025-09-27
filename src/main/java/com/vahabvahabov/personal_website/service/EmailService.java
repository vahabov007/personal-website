package com.vahabvahabov.personal_website.service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.mail.MailException;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.util.StreamUtils;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.time.LocalDate;

@Service
public class EmailService {

    private static final Logger logger = LoggerFactory.getLogger(EmailService.class);

    @Autowired
    private JavaMailSender mailSender;

    @Value("${spring.mail.username}")
    private String myEmail;

    public String buildHtmlEmailBody(String name, String email, String topic, String message) throws IOException {
        logger.info("Building HTML email body for contact form with topic: {}", topic);

        try {
            ClassPathResource resource = new ClassPathResource("templates/email-template.html");
            logger.info("Looking for template at: {}", resource.getPath());
            logger.info("Template exists: {}", resource.exists());

            if (!resource.exists()) {
                logger.error("Email template not found at: templates/email-template.html");
                throw new IOException("Email template not found at: templates/email-template.html");
            }

            String htmlTemplate = StreamUtils.copyToString(resource.getInputStream(), StandardCharsets.UTF_8);
            logger.info("Template loaded successfully. Length: {} characters", htmlTemplate.length());

            String result = htmlTemplate
                    .replace("${topic}", topic != null ? topic : "")
                    .replace("${yourName}", name != null ? name : "")
                    .replace("${email}", email != null ? email : "")
                    .replace("${message_content}", message != null ? message : "")
                    .replace("${current_date}", LocalDate.now().toString());

            logger.info("Template processing completed successfully");
            return result;

        } catch (Exception e) {
            logger.error("Error in buildHtmlEmailBody: {}", e.getMessage(), e);
            throw e;
        }
    }

    public void sendHtmlEmail(String subject, String htmlBody) {
        logger.info("Attempting to send HTML email. Subject: {}", subject);
        logger.debug("HTML body length: {}", htmlBody.length());

        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(
                    message,
                    MimeMessageHelper.MULTIPART_MODE_MIXED_RELATED,
                    StandardCharsets.UTF_8.name()
            );

            helper.setFrom(myEmail);
            helper.setTo(myEmail);
            helper.setSubject(subject);
            helper.setText(htmlBody, true);

            mailSender.send(message);
            logger.info("HTML email sent successfully.");

        } catch (MailException | MessagingException e) {
            logger.error("Failed to send HTML email: {}", e.getMessage(), e);
            throw new RuntimeException("Email not sent: " + e.getMessage(), e);
        }
    }
}