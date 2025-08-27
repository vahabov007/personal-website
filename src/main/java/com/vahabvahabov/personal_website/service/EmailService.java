package com.vahabvahabov.personal_website.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.MailException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Service
public class EmailService {

    private static final Logger logger =  LoggerFactory.getLogger(EmailService.class);

    @Autowired
    private JavaMailSender mailSender;
    public void sendEmail(String to, String subject, String body) {
        logger.info("Email göndərmə metodu çağırıldı. Alıcı: {}", to);

        SimpleMailMessage message = new SimpleMailMessage();


        message.setFrom("vahab.vahabov07@gmail.com");

        message.setTo(to);
        message.setSubject(subject);
        message.setText(body);

        try {

            mailSender.send(message);
            logger.info("Email uğurla göndərildi. Alıcı: {}", to);
        } catch (MailException e) {
            logger.error("Email göndərərkən MailException baş verdi: {}", e.getMessage(), e);
            throw new RuntimeException("Email göndərilmədi: " + e.getMessage(), e);
        }
    }
}