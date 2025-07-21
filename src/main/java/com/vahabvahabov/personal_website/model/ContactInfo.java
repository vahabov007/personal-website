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
    @Size(min = 3, max = 40, message = "Your name could not be determined.")
    private String yourName;

    @Email(message = "Email should be valid.")
    @NotBlank(message = "Email cannot be empty.")
    private String email;

    @NotBlank(message = "Message cannot be empty.")
    @Size(max = 400, message = "Message too long.")
    private String message;

}

