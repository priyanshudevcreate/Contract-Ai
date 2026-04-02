package com.contractgpt.backend.service;

import com.contractgpt.backend.model.Contract;
import com.contractgpt.backend.repository.ContractRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@Service
public class ContractService {

    @Autowired
    private ContractRepository contractRepository;
    
    @Autowired
    private AnalysisService analysisService;

    private final String UPLOAD_DIR = "uploads/contracts/";

    public List<Contract> getUserContracts(String userId) {
        return contractRepository.findByUserIdOrderByUploadDateDesc(userId);
    }

    public ResponseEntity<?> uploadAndAnalyzeContract(MultipartFile file, String userId) throws IOException {
        if (file.isEmpty() || !file.getContentType().equals("application/pdf")) {
            return ResponseEntity.badRequest().body("Only PDF files are allowed!");
        }

        Path uploadPath = Paths.get(UPLOAD_DIR);
        if (!Files.exists(uploadPath)) {
            Files.createDirectories(uploadPath);
        }

        String storedFilename = UUID.randomUUID().toString() + "_" + file.getOriginalFilename();
        Path filePath = uploadPath.resolve(storedFilename);
        Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

        Contract contract = new Contract();
        contract.setUserId(userId);
        contract.setOriginalFilename(file.getOriginalFilename());
        contract.setStoredFilename(storedFilename);
        contract.setFilePath(filePath.toString());
        contract.setFileSize(file.getSize());
        contract.setStatus("uploaded");
        
        contract = contractRepository.save(contract);
        
        // Asynchronously or synchronously analyze contract
        // Simple synchronous call for now
        Map<String, Object> analysisData = analysisService.analyzeContract(contract);
        
        Map<String, Object> response = new LinkedHashMap<>();
        response.put("success", true);
        response.put("message", "Contract uploaded and analyzed successfully!");
        
        Map<String, Object> data = new LinkedHashMap<>();
        data.put("contractId", contract.getId());
        data.put("filename", storedFilename);
        data.put("analysis", analysisData);
        data.put("uploadPath", filePath.toString());
        
        response.put("data", data);

        return ResponseEntity.ok(response);
    }
}
