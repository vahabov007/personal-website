package com.vahabvahabov.personal_website;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.retry.annotation.Backoff;
import org.springframework.retry.annotation.Retryable;
import org.springframework.stereotype.Component;

import javax.sql.DataSource;
import java.sql.Connection;
import java.sql.SQLException;

@Component
public class DatabaseConnectionChecker implements CommandLineRunner {

    @Autowired
    private DataSource dataSource;

    @Override
    public void run(String... args) throws Exception {
        checkDatabaseConnection();
    }

    @Retryable(
            value = { SQLException.class }, // Bu xətanı tut
            maxAttempts = 10,               // 10 dəfə cəhd et
            backoff = @Backoff(delay = 5000) // Hər cəhddən sonra 5 saniyə gözlə
    )
    public void checkDatabaseConnection() throws SQLException {
        System.out.println("Verilənlər bazası bağlantısını yoxlayıram...");
        try (Connection connection = dataSource.getConnection()) {
            if (connection != null) {
                System.out.println("Verilənlər bazasına uğurla qoşuldu!");
            }
        } catch (SQLException e) {
            System.err.println("Verilənlər bazasına qoşulma xətası: " + e.getMessage());
            throw e; // Retry üçün xətanı yenidən at
        }
    }
}