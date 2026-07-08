package com.locanbeach.backend.repository;

import com.locanbeach.backend.entity.ComboImage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface ComboImageRepository extends JpaRepository<ComboImage, UUID> {
}
