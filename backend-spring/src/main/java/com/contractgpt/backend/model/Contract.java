package com.contractgpt.backend.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

@Data
@Document(collection = "contracts")
public class Contract {

    @Id
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
