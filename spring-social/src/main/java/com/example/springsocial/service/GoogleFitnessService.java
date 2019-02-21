package com.example.springsocial.service;

import com.google.api.client.googleapis.javanet.GoogleNetHttpTransport;
import com.google.api.client.json.jackson2.JacksonFactory;
import com.google.api.services.fitness.Fitness;
import com.google.api.services.fitness.FitnessRequestInitializer;
import com.google.api.services.fitness.model.AggregateBy;
import com.google.api.services.fitness.model.AggregateRequest;
import com.google.api.services.fitness.model.AggregateResponse;
import com.google.api.services.fitness.model.BucketByTime;
import com.google.common.collect.Lists;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.time.ZonedDateTime;
import java.util.concurrent.TimeUnit;

@Service
public class GoogleFitnessService {

    private static final Logger LOGGER = LoggerFactory.getLogger(GoogleFitnessService.class);

    public AggregateResponse getAggregatedStepsForCurrentUser(String oauthToken, ZonedDateTime startDate, ZonedDateTime endDate) {

        FitnessRequestInitializer fitnessRequestInitializer = new FitnessRequestInitializer();

        Fitness fitness;
        try {
            Fitness.Builder builder = new Fitness.Builder(GoogleNetHttpTransport.newTrustedTransport(), JacksonFactory.getDefaultInstance(), null)
                    .setApplicationName("FatLynx")
                    .setGoogleClientRequestInitializer(fitnessRequestInitializer);
            fitness = builder.build();

            AggregateRequest request = new AggregateRequest();
            AggregateBy aggregateBy = new AggregateBy();
            aggregateBy.setDataTypeName("com.google.step_count.delta");
            aggregateBy.setDataSourceId("derived:com.google.step_count.delta:com.google.android.gms:estimated_steps");
            request.setAggregateBy(Lists.newArrayList(aggregateBy));

            BucketByTime bucketByTime = new BucketByTime();
            bucketByTime.setDurationMillis(TimeUnit.DAYS.toMillis(1));
            request.setBucketByTime(bucketByTime);

            request.setStartTimeMillis(startDate.toInstant().toEpochMilli());
            request.setEndTimeMillis(endDate.toInstant().toEpochMilli());

            AggregateResponse response = fitness.users().dataset()
                    .aggregate("me", request)
                    .setOauthToken(oauthToken).execute();

            LOGGER.info(response.toString());

            return response;
        } catch (Exception e) {
            LOGGER.error("Error fetching fitness data", e);
            return null;
        }
    }

}
