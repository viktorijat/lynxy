package com.example.springsocial.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;

@Entity
@Table(name = "steps", uniqueConstraints = {
        @UniqueConstraint(columnNames = "steps_id")
})
public class StepsInCompetition {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long steps_id;

    private Long amount;

    @ManyToOne(targetEntity = User.class)
    private User walker;

    @ManyToOne(targetEntity = Competition.class)
    @JsonIgnore
    private Competition competition;

    public Long getSteps_id() {
        return steps_id;
    }

    public void setSteps_id(Long steps_id) {
        this.steps_id = steps_id;
    }

    public Long getAmount() {
        return amount;
    }

    public void setAmount(Long amount) {
        this.amount = amount;
    }

    public User getWalker() {
        return walker;
    }

    public void setWalker(User walker) {
        this.walker = walker;
    }

    public Competition getCompetition() {
        return competition;
    }

    public void setCompetition(Competition competition) {
        this.competition = competition;
    }
}
