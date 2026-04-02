package com.contractgpt.backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:5173", maxAge = 3600)
public class AnalysisController {

    private final WebClient webClient;

    public AnalysisController(WebClient.Builder webClientBuilder) {
        this.webClient = webClientBuilder.baseUrl("http://localhost:5000").build();
    }

    @PostMapping("/legal-review")
    public ResponseEntity<?> triggerLegalReview(@RequestBody Map<String, Object> requestBody) {
        Map<String, Object> contractData = (Map<String, Object>) requestBody.get("contractData");
        String contractName = contractData != null ? (String) contractData.get("name") : "Unknown Contract";

        try {
            // Check health of bot.py (optional but mimics the express logic)
            webClient.get().uri("/health").retrieve().toBodilessEntity().block();
            
            Map<String, Object> responseData = new HashMap<>();
            responseData.put("contractName", contractName);
            responseData.put("analysisUrl", "http://localhost:5000");
            responseData.put("timestamp", java.time.Instant.now().toString());

            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("message", "AI Legal Analysis has been triggered successfully!");
            response.put("data", responseData);

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("success", false);
            errorResponse.put("message", "AI Analysis server is not available. Please make sure bot.py is running on port 5000.");
            errorResponse.put("error", "Service unavailable");
            
            return ResponseEntity.status(503).body(errorResponse);
        }
    }
}
