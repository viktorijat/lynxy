package com.example.springsocial.controller;

import com.example.springsocial.exception.ResourceNotFoundException;
import com.example.springsocial.model.Competition;
import com.example.springsocial.model.User;
import com.example.springsocial.repository.CompetitionRepository;
import com.example.springsocial.repository.UserRepository;
import com.example.springsocial.security.CurrentUser;
import com.example.springsocial.security.UserPrincipal;
import java.time.ZonedDateTime;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserController {



    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CompetitionRepository competitionRepository;

    @GetMapping("/user/me")
    @PreAuthorize("hasRole('USER')")
    public User getCurrentUser(@CurrentUser UserPrincipal userPrincipal) {
        return userRepository.findById(userPrincipal.getId())
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", userPrincipal.getId()));
    }

    @GetMapping("/user/competitions/{status}")
    public ResponseEntity<Set<Competition>> getCompetitions(@CurrentUser UserPrincipal userPrincipal,
                                                            @PathVariable String status) {

        User user = userRepository.findById(userPrincipal.getId()).orElse(null);
        if (user == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        Set<Competition> competitions = user.getCompetitions();
        ZonedDateTime now = ZonedDateTime.now();

        if ("ongoing".equals(status)) {
            Set<Competition> ongoing = competitions.stream().filter(c -> c.getStartDate().isBefore(now) &&
                    c.getEndDate().isAfter(now)).collect(Collectors.toSet());
            return new ResponseEntity<>(ongoing, HttpStatus.OK);

        }
        if ("notstarted".equals(status)) {
            Set<Competition> notstarted = competitions.stream().filter(c -> c.getStartDate().isAfter(now) &&
                    c.getEndDate().isAfter(now)).collect(Collectors.toSet());
            return new ResponseEntity<>(notstarted, HttpStatus.OK);

        }
        if ("finished".equals(status)) {
            Set<Competition> finished = competitions.stream().filter(c -> c.getStartDate().isBefore(now) &&
                    c.getEndDate().isBefore(now)).collect(Collectors.toSet());
            return new ResponseEntity<>(finished, HttpStatus.OK);
        }
        return new ResponseEntity<>(competitions, HttpStatus.OK);
    }
}
