package com.example.springsocial.controller;

import com.example.springsocial.exception.ResourceNotFoundException;
import com.example.springsocial.model.Competition;
import com.example.springsocial.model.StepsInCompetition;
import com.example.springsocial.model.User;
import com.example.springsocial.repository.CompetitionRepository;
import com.example.springsocial.repository.StepsRepository;
import com.example.springsocial.repository.UserRepository;
import com.example.springsocial.security.CurrentUser;
import com.example.springsocial.security.UserPrincipal;
import com.example.springsocial.service.GoogleFitnessService;
import com.google.api.services.fitness.model.AggregateBucket;
import com.google.api.services.fitness.model.AggregateResponse;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

import com.google.api.services.fitness.model.Value;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserController {

    private static final Logger LOGGER = LoggerFactory.getLogger(UserController.class);

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private GoogleFitnessService googleFitnessService;

    @Autowired
    private CompetitionRepository competitionRepository;

    @Autowired
    private StepsRepository stepsRepository;

    @GetMapping("/user/me")
    @PreAuthorize("hasRole('USER')")
    public User getCurrentUser(@CurrentUser UserPrincipal userPrincipal) {

        String accessToken = userPrincipal.getAccessToken();
        User user = userRepository.findById(userPrincipal.getId())
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", userPrincipal.getId()));
        user.setAccessToken(accessToken);
        return user;
    }

    @GetMapping("/user/me/steps")
    @PreAuthorize("hasRole('USER')")
    public AggregateResponse getCurrentUserSteps(@CurrentUser UserPrincipal userPrincipal) {
        return googleFitnessService.getAggregatedStepsForCurrentUser(userPrincipal.getAccessToken(),
                ZonedDateTime.of(LocalDateTime.of(2019, 2, 18, 0, 0),
                        ZoneId.of("UTC")), ZonedDateTime.now(ZoneId.of("UTC")));
    }

    @PostMapping("/user/me/submit/{competitionId}")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<?> submitStepsForCompetition(@CurrentUser UserPrincipal userPrincipal,
                                                       @PathVariable Long competitionId) {
        Optional<Competition> competitionOptional = competitionRepository.findById(competitionId);
        Optional<User> userOptional = userRepository.findById(userPrincipal.getId());
        if (!userOptional.isPresent() || !competitionOptional.isPresent()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        User user = userOptional.get();
        Competition competition = competitionOptional.get();
        StepsInCompetition stepsInCompetition = new StepsInCompetition();
        stepsInCompetition.setCompetition(competition);
        stepsInCompetition.setWalker(user);

        AggregateResponse aggregatedStepsForCurrentUser =
                googleFitnessService.getAggregatedStepsForCurrentUser(userPrincipal.getAccessToken(),
                        competition.getStartDate(),
                        competition.getEndDate());

        long totalAmountOfSteps = 0;
        if (aggregatedStepsForCurrentUser != null) {
            List<AggregateBucket> buckets = aggregatedStepsForCurrentUser.getBucket();
            if (buckets != null) {
                totalAmountOfSteps = buckets
                        .stream()
                        .flatMap(bucket -> bucket.getDataset().stream())
                        .flatMap(dataset -> dataset.getPoint().stream())
                        .flatMap(point -> point.getValue().stream())
                        .mapToLong(Value::getIntVal)
                        .sum();
            }
        }
        stepsInCompetition.setAmount(totalAmountOfSteps);
        long currentMaxInCompetition = competition.getMaxSteps() != null ? competition.getMaxSteps() : 0L;
        if (currentMaxInCompetition < totalAmountOfSteps) {
            competition.setMaxSteps(totalAmountOfSteps);
            competition.setWinner(user);
        }
        competitionRepository.saveAndFlush(competition);
        stepsRepository.saveAndFlush(stepsInCompetition);
        return new ResponseEntity<>(competition, HttpStatus.OK);
    }

    @PostMapping("/user/me/submit/{competitionId}/{amountOfSteps}")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<?> submitStepsForCompetitionTest(@CurrentUser UserPrincipal userPrincipal,
                                                           @PathVariable Long competitionId,
                                                           @PathVariable Long amountOfSteps) {
        Optional<Competition> competitionOptional = competitionRepository.findById(competitionId);
        Optional<User> userOptional = userRepository.findById(userPrincipal.getId());
        if (!userOptional.isPresent() || !competitionOptional.isPresent()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        User user = userOptional.get();
        Competition competition = competitionOptional.get();
        StepsInCompetition stepsInCompetition = new StepsInCompetition();
        stepsInCompetition.setCompetition(competition);
        stepsInCompetition.setWalker(user);

        long totalAmountOfSteps = amountOfSteps;
        stepsInCompetition.setAmount(totalAmountOfSteps);
        long currentMaxInCompetition = competition.getMaxSteps() != null ? competition.getMaxSteps() : 0L;
        if (currentMaxInCompetition < totalAmountOfSteps) {
            competition.setMaxSteps(totalAmountOfSteps);
            competition.setWinner(user);
        }
        competitionRepository.saveAndFlush(competition);
        stepsRepository.saveAndFlush(stepsInCompetition);
        return new ResponseEntity<>(competition, HttpStatus.OK);
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
