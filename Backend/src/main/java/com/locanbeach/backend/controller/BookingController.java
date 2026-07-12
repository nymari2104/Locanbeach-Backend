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
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.format.annotation.DateTimeFormat;
import com.locanbeach.backend.entity.enums.BookingStatus;
import java.time.LocalDateTime;
import java.time.LocalDate;

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
    
    @GetMapping
    public ResponseEntity<ApiResponse<Page<BookingResponse>>> getBookings(
            @RequestParam(required = false) String search,
            @RequestParam(required = false) BookingStatus status,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "createdAt") String sortBy,
            @RequestParam(defaultValue = "desc") String direction) {
        
        Sort sort = direction.equalsIgnoreCase(Sort.Direction.ASC.name()) ? Sort.by(sortBy).ascending() : Sort.by(sortBy).descending();
        Pageable pageable = PageRequest.of(page, size, sort);
        
        LocalDateTime start = startDate != null ? startDate.atStartOfDay() : null;
        LocalDateTime end = endDate != null ? endDate.atTime(23, 59, 59) : null;
        
        return ResponseEntity.ok(
                ApiResponse.success("Get bookings successfully", service.getBookings(search, status, start, end, pageable)));
    }
}
