package com.contractgpt.backend.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;
import java.util.List;
import java.util.Map;

@Data
@Document(collection = "analysis_results")
public class AnalysisResult {

    @Id
    private String id;

    private String contractId;
    private String userId;

    private Integer overallRiskAssessment;
    private String riskCategory;

    private Integer financialTerms;
    private Integer legalCompliance;
    private Integer operationalRisk;
    private Integer terminationTerms;

    private List<String> keyRiskFactors;
    private List<String> recommendations;
    private List<String> legalVerifications;
    private Map<String, Object> sophisticatedAnalysis;

    private Date analysisTimestamp = new Date();
    private Date createdAt = new Date();
}
