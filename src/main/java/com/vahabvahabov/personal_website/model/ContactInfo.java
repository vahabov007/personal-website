package com.vahabvahabov.personal_website.model;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ContactInfo {

    @NotBlank(message = "Name cannot be empty.")
    @Size(min = 3, max = 40, message = "Your name must be between 3 and 40 characters.")
    private String yourName;

    @NotBlank(message = "Topic is required.")
    private String topic;

    @Email(message = "Email should be valid.")
    @NotBlank(message = "Email cannot be empty.")
    private String email;

    @NotBlank(message = "Message cannot be empty.")
    @Size(min = 10, max = 400, message = "Message must be between 10 and 400 characters.")
    private String message;
}