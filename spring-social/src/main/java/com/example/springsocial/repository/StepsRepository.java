package com.example.springsocial.repository;

import com.example.springsocial.model.StepsInCompetition;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StepsRepository extends JpaRepository<StepsInCompetition, Long> {
}