package com.example.springsocial.controller;

import com.example.springsocial.model.Competition;
import com.example.springsocial.model.User;
import com.example.springsocial.repository.CompetitionRepository;
import com.example.springsocial.repository.UserRepository;

import java.time.Instant;
import java.time.ZonedDateTime;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import com.example.springsocial.security.CurrentUser;
import com.example.springsocial.security.UserPrincipal;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
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

    @GetMapping("/{id}")
    public ResponseEntity<Competition> getCompetition(@PathVariable Long id) {
        Competition found = competitionRepository.findById(id).orElse(null);
        if (found == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(found, HttpStatus.OK);
    }

    @PostMapping
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<Competition> createCompetition(@RequestBody Competition competition,
                                                         @CurrentUser UserPrincipal userPrincipal) {
        Competition c = new Competition();

        Optional<User> userOptional = userRepository.findById(userPrincipal.getId());
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            c.setCreator(user);
            participateInCompetition(user,c);
        }
        c.setName(competition.getName());
        if (competition.getStartDate() == null) {
            c.setStartDate(ZonedDateTime.now());
        } else {
            c.setStartDate(competition.getStartDate());
        }
        c.setEndDate(competition.getEndDate());
        c.setPayin(competition.getPayin());
        Competition saved = competitionRepository.saveAndFlush(c);
        return new ResponseEntity<>(saved, HttpStatus.OK);
    }

    //"2019-02-19T00:00:00.000+01:00"
    //"2019-02-22T00:00:00.000+01:00"
    @PutMapping
    public ResponseEntity<?> updateCompetition(@RequestBody Competition competition) {
        Competition c = competitionRepository.findById(competition.getCompetition_id()).orElse(null);
        if (c == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        if (competition.getParticipants() != null) {
            c.setParticipants(competition.getParticipants());
        }
        if (competition.getName() != null) {
            c.setName(competition.getName());
        }
        if (competition.getEndDate() != null) {
            c.setEndDate(competition.getEndDate());
        }
        if (competition.getStartDate() != null) {
            c.setStartDate(competition.getStartDate());
        }

        if (competition.getCreator() != null) {
            User user = userRepository.findById(competition.getWinner().getUser_id()).orElse(null);
            if (user != null) {
                c.setWinner(user);
            }
        }

        competitionRepository.saveAndFlush(c);
        return new ResponseEntity<>(c, HttpStatus.OK);
    }

    @PostMapping("/{competitionId}")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<?> joinCompetition(@PathVariable Long competitionId,
                                             @CurrentUser UserPrincipal userPrincipal) {

        User user = userRepository.findById(userPrincipal.getId()).orElse(null);
        Optional<Competition> c = competitionRepository.findById(competitionId);
        if (user == null || !c.isPresent()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        Competition competition = c.get();
        participateInCompetition(user, competition);

        competitionRepository.saveAndFlush(competition);
        userRepository.saveAndFlush(user);
        return new ResponseEntity<Competition>(HttpStatus.OK);
    }

    private void participateInCompetition(User user, Competition competition) {
        Set<User> participants = competition.getParticipants();
        participants = participants != null ? participants : new HashSet<>();
        participants.add(user);
        competition.setParticipants(participants);
        Set<Competition> competitions = user.getCompetitions();
        competitions.add(competition);
        user.setCompetitions(competitions);
    }
}