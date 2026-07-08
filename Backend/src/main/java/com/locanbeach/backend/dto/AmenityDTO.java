package com.locanbeach.backend.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.AccessLevel;
import lombok.Data;
import lombok.experimental.FieldDefaults;

import java.util.UUID;

@Data
@FieldDefaults(level = AccessLevel.PRIVATE)
public class AmenityDTO {

    UUID id;

    @NotBlank(message = "Amenity name must not be blank")
    String name;

    String icon;
}
