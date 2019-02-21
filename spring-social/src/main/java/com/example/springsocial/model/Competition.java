package com.example.springsocial.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;
import java.time.ZonedDateTime;
import java.util.Set;

@Entity
@Table(name = "competition", uniqueConstraints = {
        @UniqueConstraint(columnNames = "competition_id")
})
public class Competition {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long competition_id;

    private String name;

    @ManyToMany(mappedBy = "competitions")
    private Set<User> participants;

    @OneToMany(mappedBy = "competition")
    private Set<StepsInCompetition> userSteps;

    @ManyToOne(targetEntity = User.class)
    private User winner;

    @ManyToOne(targetEntity = User.class)
    private User creator;

    private ZonedDateTime endDate;

    private ZonedDateTime startDate;

    private Integer payin;

    private Long maxSteps;

    public Long getCompetition_id() {
        return competition_id;
    }

    public void setCompetition_id(Long competition_id) {
        this.competition_id = competition_id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Set<User> getParticipants() {
        return participants;
    }

    public void setParticipants(Set<User> participants) {
        this.participants = participants;
    }

    public User getWinner() {
        return winner;
    }

    public void setWinner(User winner) {
        this.winner = winner;
    }

    public User getCreator() {
        return creator;
    }

    public void setCreator(User creator) {
        this.creator = creator;
    }

    public ZonedDateTime getEndDate() {
        return endDate;
    }

    public void setEndDate(ZonedDateTime endDate) {
        this.endDate = endDate;
    }

    public ZonedDateTime getStartDate() {
        return startDate;
    }

    public void setStartDate(ZonedDateTime startDate) {
        this.startDate = startDate;
    }

    public Integer getPayin() {
        return payin;
    }

    public void setPayin(Integer payin) {
        this.payin = payin;
    }

    public Long getMaxSteps() {
        return maxSteps;
    }

    public void setMaxSteps(Long maxSteps) {
        this.maxSteps = maxSteps;
    }

    public Set<StepsInCompetition> getUserSteps() {
        return userSteps;
    }

    public void setUserSteps(Set<StepsInCompetition> userSteps) {
        this.userSteps = userSteps;
    }
}
