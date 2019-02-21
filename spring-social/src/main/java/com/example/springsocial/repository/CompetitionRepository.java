package com.example.springsocial.repository;

import com.example.springsocial.model.Competition;
import com.example.springsocial.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CompetitionRepository extends JpaRepository<Competition, Long> {
}