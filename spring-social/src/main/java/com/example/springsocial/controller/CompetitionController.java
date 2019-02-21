package com.example.springsocial.controller;

import com.example.springsocial.model.Competition;
import com.example.springsocial.model.User;
import com.example.springsocial.repository.CompetitionRepository;
import com.example.springsocial.repository.UserRepository;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/competition")
public class CompetitionController {

    @Autowired
    private CompetitionRepository competitionRepository;

    @Autowired
    private UserRepository userRepository;

    @GetMapping
    public List<Competition> getCompetitions() {
        return competitionRepository.findAll();
    }

    @GetMapping
    public Competition getCompetitionById(Long id) {
        return competitionRepository.findById(id).orElse(null);
    }

    @PostMapping
    public Competition createCompetition(@RequestBody Competition competition) {
        return competitionRepository.save(competition);
    }

    @PostMapping
    public Competition joinCompetition(Long competitionId, Long userId) {

        User user =  userRepository.findById(userId).orElse(null);
        if (user == null) {

        }
        return null;
    }


}
