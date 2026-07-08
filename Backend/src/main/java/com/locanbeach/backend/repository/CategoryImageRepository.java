package com.locanbeach.backend.repository;

import com.locanbeach.backend.entity.CategoryImage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface CategoryImageRepository extends JpaRepository<CategoryImage, UUID> {
}
