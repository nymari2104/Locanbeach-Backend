package com.locanbeach.backend.dto.request.staff;

import com.locanbeach.backend.entity.enums.BookingStatus;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class ChangeBookingStatusRequest {

    @NotNull(message = "Status is required")
    private BookingStatus status;

    private String note;
}
