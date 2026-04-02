package com.contractgpt.backend.model;

import lombok.Data;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import java.util.Date;
import java.util.List;
import java.util.Map;

@Data
@Entity
@Table(name = "analysis_results")
public class AnalysisResult {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    private String contractId;
    private String userId;

    private Integer overallRiskAssessment;
    private String riskCategory;
    
    private Integer financialTerms;
    private Integer legalCompliance;
    private Integer operationalRisk;
    private Integer terminationTerms;

    @JdbcTypeCode(SqlTypes.JSON)
    private List<String> keyRiskFactors;
    
    @JdbcTypeCode(SqlTypes.JSON)
    private List<String> recommendations;
    
    @JdbcTypeCode(SqlTypes.JSON)
    private List<String> legalVerifications;
    
    @JdbcTypeCode(SqlTypes.JSON)
    private Map<String, Object> sophisticatedAnalysis;

    private Date analysisTimestamp = new Date();
    private Date createdAt = new Date();
}
