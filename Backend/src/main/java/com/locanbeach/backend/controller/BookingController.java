package com.locanbeach.backend.controller;

import com.locanbeach.backend.common.dto.ApiResponse;
import com.locanbeach.backend.dto.request.BookingConfirmRequest;
import com.locanbeach.backend.dto.request.RoomHoldRequest;
import com.locanbeach.backend.dto.response.BookingResponse;
import com.locanbeach.backend.dto.response.RoomHoldResponse;
import com.locanbeach.backend.service.BookingService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/bookings")
@RequiredArgsConstructor
public class BookingController {

    private final BookingService service;

    @PostMapping("/hold")
    public ResponseEntity<ApiResponse<RoomHoldResponse>> holdRoom(@Valid @RequestBody RoomHoldRequest request) {
        return new ResponseEntity<>(
                ApiResponse.success("Room held successfully for 10 minutes", service.holdRoom(request)),
                HttpStatus.CREATED);
    }

    @PostMapping("/confirm")
    public ResponseEntity<ApiResponse<BookingResponse>> confirmBooking(@Valid @RequestBody BookingConfirmRequest request) {
        return new ResponseEntity<>(
                ApiResponse.success("Booking confirmed successfully", service.confirmBooking(request)),
                HttpStatus.CREATED);
    }
}
