package com.locanbeach.backend.controller;

import com.locanbeach.backend.common.dto.ApiResponse;
import com.locanbeach.backend.dto.AmenityDTO;
import com.locanbeach.backend.service.AmenityService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/amenities")
@RequiredArgsConstructor
public class AmenityController {

    private final AmenityService service;

    @GetMapping
    public ResponseEntity<ApiResponse<List<AmenityDTO>>> getAllAmenities() {
        return ResponseEntity.ok(
                ApiResponse.success("Get all amenities successfully", service.getAllAmenities()));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<AmenityDTO>> getAmenityById(@PathVariable UUID id) {
        return ResponseEntity.ok(
                ApiResponse.success("Get amenity details successfully", service.getAmenityById(id)));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<AmenityDTO>> createAmenity(@Valid @RequestBody AmenityDTO dto) {
        return new ResponseEntity<>(
                ApiResponse.success("Amenity created successfully", service.createAmenity(dto)),
                HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<AmenityDTO>> updateAmenity(@PathVariable UUID id, @Valid @RequestBody AmenityDTO dto) {
        return ResponseEntity.ok(
                ApiResponse.success("Amenity updated successfully", service.updateAmenity(id, dto)));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteAmenity(@PathVariable UUID id) {
        service.deleteAmenity(id);
        return ResponseEntity.ok(
                ApiResponse.success("Amenity deleted successfully", null));
    }
}
