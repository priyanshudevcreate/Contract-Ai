package com.contractgpt.backend.service;

import com.contractgpt.backend.model.AnalysisResult;
import com.contractgpt.backend.model.Contract;
import com.contractgpt.backend.repository.AnalysisResultRepository;
import com.contractgpt.backend.repository.ContractRepository;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.text.PDFTextStripper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.File;
import java.util.*;

@Service
public class AnalysisService {

    @Autowired
    private AnalysisResultRepository analysisResultRepository;
    
    @Autowired
    private ContractRepository contractRepository;

    public Map<String, Object> analyzeContract(Contract contract) {
        // Implement PDF parsing
        String parsedText = "";
        try (PDDocument document = org.apache.pdfbox.Loader.loadPDF(new File(contract.getFilePath()))) {
            PDFTextStripper stripper = new PDFTextStripper();
            parsedText = stripper.getText(document);
        } catch (Exception e) {
            e.printStackTrace();
            contract.setStatus("failed");
            contractRepository.save(contract);
            return Collections.singletonMap("error", "Failed to parse PDF");
        }

        // Ideally here you call OpenAI via WebClient, for now we mock the response
        AnalysisResult result = new AnalysisResult();
        result.setContractId(contract.getId());
        result.setUserId(contract.getUserId());
        result.setOverallRiskAssessment(45);
        result.setRiskCategory("Medium");
        result.setFinancialTerms(30);
        result.setLegalCompliance(50);
        result.setOperationalRisk(40);
        result.setTerminationTerms(60);
        
        result.setKeyRiskFactors(Arrays.asList("Termination clause favors one party", "Unclear liability limits"));
        result.setRecommendations(Arrays.asList("Negotiate liability cap", "Clarify termination notice period"));
        result.setLegalVerifications(Arrays.asList("Standard jurisdiction applied", "Intellectual property rights secured"));
        
        result.setSophisticatedAnalysis(new HashMap<>());
        
        analysisResultRepository.save(result);
        
        contract.setStatus("analyzed");
        contractRepository.save(contract);
        
        // Prepare response map to mimic jsonweb.json output
        Map<String, Object> analysisData = new LinkedHashMap<>();
        analysisData.put("Overall_Risk_Assessment", result.getOverallRiskAssessment());
        analysisData.put("Risk_Category", result.getRiskCategory());
        analysisData.put("Financial_Terms", result.getFinancialTerms());
        analysisData.put("Legal_Compliance", result.getLegalCompliance());
        analysisData.put("Operational_Risk", result.getOperationalRisk());
        analysisData.put("Termination_Terms", result.getTerminationTerms());
        analysisData.put("Key_Risk_Factors_Identified", result.getKeyRiskFactors());
        analysisData.put("Recommendations", result.getRecommendations());
        analysisData.put("Legal_Verifications", result.getLegalVerifications());
        analysisData.put("Sophisticated_Analysis", result.getSophisticatedAnalysis());

        return analysisData;
    }
}
