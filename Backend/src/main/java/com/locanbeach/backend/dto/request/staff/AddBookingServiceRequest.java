package com.locanbeach.backend.dto.request.staff;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.util.UUID;

@Data
public class AddBookingServiceRequest {

    @NotNull(message = "Service ID is required")
    private UUID serviceId;

    @Min(value = 1, message = "Quantity must be at least 1")
    private int quantity = 1;

    private String note;
}
