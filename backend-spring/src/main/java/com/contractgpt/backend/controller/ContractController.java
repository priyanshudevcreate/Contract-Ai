package com.contractgpt.backend.controller;

import com.contractgpt.backend.model.Contract;
import com.contractgpt.backend.security.UserPrincipal;
import com.contractgpt.backend.service.ContractService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:5173", maxAge = 3600)
public class ContractController {

    @Autowired
    private ContractService contractService;

    @GetMapping("/contracts")
    public ResponseEntity<?> getUserContracts(@AuthenticationPrincipal UserPrincipal currentUser) {
        List<Contract> contracts = contractService.getUserContracts(currentUser.getId());
        return ResponseEntity.ok(contracts);
    }

    @PostMapping("/upload-contract")
    public ResponseEntity<?> uploadContract(
            @RequestParam("contract") MultipartFile file,
            @AuthenticationPrincipal UserPrincipal currentUser) {
        try {
            return contractService.uploadAndAnalyzeContract(file, currentUser.getId());
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("Failed to upload contract: " + e.getMessage());
        }
    }
}
