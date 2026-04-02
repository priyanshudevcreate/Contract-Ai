package com.contractgpt.backend.repository;

import com.contractgpt.backend.model.AnalysisResult;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AnalysisResultRepository extends JpaRepository<AnalysisResult, String> {
    Optional<AnalysisResult> findByContractId(String contractId);
}
