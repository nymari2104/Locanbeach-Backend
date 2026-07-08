package com.locanbeach.backend.dto.response;

import com.locanbeach.backend.dto.ImageDTO;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Data;
import lombok.experimental.FieldDefaults;

import java.math.BigDecimal;
import java.util.UUID;
import java.util.List;

@Data
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class SearchCategoryResultResponse {
    UUID categoryId;
    String categoryName;
    String categoryCode;
    String description;
    BigDecimal basePrice;
    Integer maxGuests;
    BigDecimal areaSqm;
    long availableRoomsCount;
    List<ImageDTO> images;
    List<com.locanbeach.backend.dto.AmenityDTO> amenities;
}

