package com.locanbeach.backend.dto;

import com.locanbeach.backend.entity.enums.ComboEventType;
import com.locanbeach.backend.entity.enums.ServiceStatus;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;
import lombok.AccessLevel;
import lombok.Data;
import lombok.experimental.FieldDefaults;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.UUID;

@Data
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ComboEventDTO {

    UUID id;

    @NotBlank(message = "Name must not be blank")
    String name;

    @NotNull(message = "Type is required")
    ComboEventType type;

    String description;

    @PositiveOrZero(message = "Price must be greater than or equal to 0")
    BigDecimal price;

    LocalDate startDate;

    LocalDate endDate;

    ServiceStatus status;

    java.util.List<ImageDTO> images = new java.util.ArrayList<>();
}
