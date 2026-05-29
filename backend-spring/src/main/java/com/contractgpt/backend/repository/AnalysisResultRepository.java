package com.contractgpt.backend.repository;

import com.contractgpt.backend.model.AnalysisResult;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AnalysisResultRepository extends MongoRepository<AnalysisResult, String> {
    Optional<AnalysisResult> findByContractId(String contractId);
}
