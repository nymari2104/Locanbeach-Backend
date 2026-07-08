package com.locanbeach.backend.dto;

import com.locanbeach.backend.entity.enums.AccommodationType;
import lombok.Data;

import java.math.BigDecimal;
import java.util.UUID;

@Data
public class AccommodationCategoryDTO {
    private UUID id;
    private String name;
    private String code;
    private AccommodationType type;
    private String description;
    private BigDecimal basePrice;
    private Integer maxGuests;
    private BigDecimal areaSqm;
    private java.util.List<ImageDTO> images = new java.util.ArrayList<>();
    private java.util.Set<UUID> amenityIds = new java.util.HashSet<>();
    private java.util.List<AmenityDTO> amenities = new java.util.ArrayList<>();
}
