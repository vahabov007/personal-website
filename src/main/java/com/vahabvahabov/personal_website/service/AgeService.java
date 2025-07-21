package com.vahabvahabov.personal_website.service;

import com.fasterxml.jackson.databind.util.BeanUtil;
import com.vahabvahabov.personal_website.model.PersonalInfo;
import com.vahabvahabov.personal_website.repository.PersonalRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import javax.swing.text.html.Option;
import java.util.Optional;

@Service
public class AgeService {

    @Autowired
    private PersonalRepository personalRepository;

    public Integer getAge() {
        Optional<PersonalInfo> dbInfo = personalRepository.findById(1L);
        if(dbInfo.isPresent()) {
            PersonalInfo personalInfo = dbInfo.get();
            return personalInfo.getAge();
        }
        return 18;
    }
    @Scheduled(cron = "0 0 0 22 6 ?")
    public void increaseAge() {
        Optional<PersonalInfo> dbInfo = personalRepository.findById(1L);
        if(dbInfo.isPresent()) {
            PersonalInfo personalInfo = dbInfo.get();
            int currentAge = personalInfo.getAge();
            personalInfo.setAge(currentAge + 1);
            personalRepository.save(personalInfo);
        }
        else {
            PersonalInfo personalInfo = new PersonalInfo();
            int currentAge = personalInfo.getAge();
            personalInfo.setId(1L);
            personalInfo.setAge(18);
            personalInfo.setFirstName("Vahab");
            personalInfo.setLastName("Vahabov");
            personalInfo.setField("Back-end Developer");
            personalInfo.setLocation("Azerbaijan/Baku");
            personalRepository.save(personalInfo);
            System.out.println("Created new PersonalInfo with age 18");
        }
    }
}
