package com.vahabvahabov.personal_website.repository;

import com.vahabvahabov.personal_website.model.PersonalInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PersonalRepository extends JpaRepository<PersonalInfo, Long> {
}
