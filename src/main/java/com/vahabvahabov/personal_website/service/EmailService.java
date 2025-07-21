package com.vahabvahabov.personal_website.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.MailException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import org.slf4j.Logger; // Logger üçün
import org.slf4j.LoggerFactory; // LoggerFactory üçün

@Service
public class EmailService {

    private static final Logger logger = LoggerFactory.getLogger(EmailService.class); // Logger əlavə edildi

    @Autowired
    private JavaMailSender mailSender;

    public void sendEmail(String to, String subject, String body) {
        logger.info("Email göndərmə metodu çağırıldı. Alıcı: {}", to); // Log əlavə edildi
        SimpleMailMessage message = new SimpleMailMessage();

        // `spring.mail.username` dəyəri `application.properties` və ya mühit dəyişənlərindən gələcək.
        // Buraya birbaşa email adresi yazmayın, əgər application.properties-də təyin etmisinizsə.
        // Məsələn: message.setFrom("sizin_emailiniz@gmail.com");
        // Əgər application.properties-də spring.mail.properties.mail.smtp.from təyin etmisinizsə,
        // bu sətirə ehtiyac olmaya bilər.
        // Əgər yoxdursa, buraya öz Gmail adresinizi yaza bilərsiniz:
        message.setFrom("vahab.vahabov07@gmail.com"); // Məsələn, bu sizin Gmail adresinizdir

        message.setTo(to);
        message.setSubject(subject);
        message.setText(body);

        try {
            mailSender.send(message);
            logger.info("Email uğurla göndərildi. Alıcı: {}", to); // Log əlavə edildi
        } catch (MailException e) {
            logger.error("Email göndərərkən MailException baş verdi: {}", e.getMessage(), e); // Xəta logu
            throw new RuntimeException("Email göndərilmədi: " + e.getMessage(), e); // Xətanı yuxarı atın
        }
    }
}