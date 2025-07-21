package com.vahabvahabov.personal_website.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "personal_info")
@Data
@AllArgsConstructor
@NoArgsConstructor

public class PersonalInfo {

    @Id
    private Long id;

    private String firstName;

    private String lastName;

    private Integer age;

    private String field;

    private String location;

}
