package com.contractgpt.backend.repository;

import com.contractgpt.backend.model.Contract;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ContractRepository extends MongoRepository<Contract, String> {
    List<Contract> findByUserIdOrderByUploadDateDesc(String userId);
}
