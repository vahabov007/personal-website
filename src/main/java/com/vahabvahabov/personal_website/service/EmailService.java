package com.vahabvahabov.personal_website.service; // Bu faylın harada yerləşdiyini göstərir (package).

import org.springframework.beans.factory.annotation.Autowired; // Spring-in avtomatik obyekt yaratması üçün.
import org.springframework.mail.MailException; // E-poçt göndərərkən yarana biləcək xətaları tutmaq üçün.
import org.springframework.mail.SimpleMailMessage; // Sadə e-poçt mesajı yaratmaq üçün.
import org.springframework.mail.javamail.JavaMailSender; // E-poçt göndərmə işini görən əsas interfeys.
import org.springframework.stereotype.Service; // Spring-ə bunun bir xidmət (service) olduğunu bildirir.
import org.slf4j.Logger; // Proqramda baş verənləri qeyd etmək üçün.
import org.slf4j.LoggerFactory; // Loggeri yaratmaq üçün.

@Service // Spring-ə deyir ki, bu, iş məntiqi olan bir "xidmət" komponentidir.
public class EmailService {

    // Logger: Proqram işləyəndə, baş verən hadisələri (məsələn, "email göndərildi", "xəta baş verdi")
    // qeyd etmək üçün istifadə olunur. Bu, problemləri tapmaqda kömək edir.
    private static final Logger logger =  LoggerFactory.getLogger(EmailService.class);

    // @Autowired: Spring-in "İnversiya Nəzarəti" (Inversion of Control - IoC) xüsusiyyətidir.
    // O, Spring-ə deyir ki, "JavaMailSender" növündən bir obyektə ehtiyacım var,
    // onu tapıb bura avtomatik olaraq yerləşdir (dependency injection).
    // Sən bu obyekti özün yaratmaq məcburiyyətində qalmırsan.
    @Autowired
    private JavaMailSender mailSender;

    // `sendEmail` metodu: Bu metod e-poçtu göndərmək üçün çağırılır.
    // 3 parametr qəbul edir:
    // - `to`: E-poçtun göndəriləcəyi ünvan.
    // - `subject`: E-poçtun mövzusu.
    // - `body`: E-poçtun əsas mətni.
    public void sendEmail(String to, String subject, String body) {
        // Log yazılır ki, bu metodun çağırıldığını bilək.
        logger.info("Email göndərmə metodu çağırıldı. Alıcı: {}", to);

        // SimpleMailMessage: Sadə bir e-poçt mesajı obyekti yaradır.
        SimpleMailMessage message = new SimpleMailMessage();

        // `message.setFrom("vahab.vahabov07@gmail.com")`: E-poçtun kimdən göndərildiyini təyin edir.
        // Adətən bu, sizin Gmail adresiniz olur.
        // Qeyd: Daha yaxşı təcrübə olaraq, bu ünvanı `application.properties` faylında təyin etmək daha təhlükəsizdir
        // (`spring.mail.username`). Beləcə, kodu dəyişmədən ünvanı asanlıqla yeniləyə bilərsiniz.
        message.setFrom("vahab.vahabov07@gmail.com");

        // E-poçtun göndəriləcəyi ünvanı təyin edir. Bu, `to` parametrindən gəlir.
        message.setTo(to);
        // E-poçtun mövzusunu təyin edir.
        message.setSubject(subject);
        // E-poçtun əsas mətnini təyin edir.
        message.setText(body);

        // `try-catch` bloku: E-poçt göndərmə prosesi zamanı baş verə biləcək xətaları (MailException) tutmaq üçündür.
        // Bu, proqramın qəfil dayanmasının qarşısını alır.
        try {
            // `mailSender.send(message)`: Əsl e-poçt göndərmə əməliyyatı burada baş verir.
            // `JavaMailSender` obyekti `message` obyektini götürür və e-poçtu göndərir.
            mailSender.send(message);
            logger.info("Email uğurla göndərildi. Alıcı: {}", to); // Uğurlu göndəriş üçün log.
        } catch (MailException e) {
            // Xəta baş verdikdə bu blok işləyir.
            logger.error("Email göndərərkən MailException baş verdi: {}", e.getMessage(), e); // Xətanın detallarını loga yazır.
            // `throw new RuntimeException`: Xətanı yuxarı səviyyəyə (məsələn, `ContactController`ə) ötürür ki,
            // istifadəçiyə uyğun bir mesaj göstərilə bilsin.
            throw new RuntimeException("Email göndərilmədi: " + e.getMessage(), e);
        }
    }
}