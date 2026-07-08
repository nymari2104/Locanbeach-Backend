package com.locanbeach.backend.repository;

import com.locanbeach.backend.entity.ComboEvent;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface ComboEventRepository extends JpaRepository<ComboEvent, UUID> {
}
