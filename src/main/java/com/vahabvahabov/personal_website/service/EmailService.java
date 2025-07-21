// src/main/java/com/vahabvahabov/personal_website/service/EmailService.java
package com.vahabvahabov.personal_website.service;

import com.vahabvahabov.personal_website.model.ContactInfo; // ContactInfo modelinizi import edin
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    private final JavaMailSender mailSender;

    // application.properties-dən gələn SİZİN GMAIL ADRESİNİZ
    @Value("${spring.mail.username}")
    private String senderEmail;

    public EmailService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    public void sendContactFormEmail(ContactInfo contactInfo) {
        SimpleMailMessage message = new SimpleMailMessage();

        // E-poçtun kimdən gəldiyi (sizin tətbiqinizin göndərən adresi)
        message.setFrom(senderEmail);

        // E-poçtun kimə gedəcəyi (yəni sizə, form göndəriləndə xəbər almaq üçün)
        message.setTo(senderEmail);

        // E-poçtun mövzusu
        // Qeyd: Siz "subject" sahəsini ContactInfo modelinə əlavə etməmisiniz.
        // Əgər formanızda mövzu sahəsi varsa, ContactInfo-ya əlavə etməlisiniz.
        // Hələlik bunu ContactInfo-da olmadığını fərz edərək, statik mövzu qoyuram.
        // Əgər ContactInfo-ya 'subject' əlavə etsəniz, 'contactInfo.getSubject()' istifadə edin.
        message.setSubject("New Message from Personal Website Contact Form: " + contactInfo.getYourName());


        // E-poçtun məzmunu
        String emailBody = "Ad: " + contactInfo.getYourName() + "\n"
                + "Email: " + contactInfo.getEmail() + "\n"
                + "Mesaj: " + contactInfo.getMessage();

        message.setText(emailBody);

        // E-poçtu göndər
        mailSender.send(message);
    }
}