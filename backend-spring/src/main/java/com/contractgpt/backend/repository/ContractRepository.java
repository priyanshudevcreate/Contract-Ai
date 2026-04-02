package com.contractgpt.backend.repository;

import com.contractgpt.backend.model.Contract;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ContractRepository extends JpaRepository<Contract, String> {
    List<Contract> findByUserIdOrderByUploadDateDesc(String userId);
}
