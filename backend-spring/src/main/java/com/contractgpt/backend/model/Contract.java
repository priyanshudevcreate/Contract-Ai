package com.contractgpt.backend.model;

import lombok.Data;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;

import java.util.Date;

@Data
@Entity
@Table(name = "contracts")
public class Contract {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    private String userId;
    
    private String originalFilename;
    private String storedFilename;
    private String filePath;
    private Long fileSize;
    
    private Date uploadDate = new Date();
    private Date lastViewed = new Date();
    private String status = "uploaded"; // uploaded, analyzed, failed
}
