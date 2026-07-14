package com.locanbeach.backend.repository;

import com.locanbeach.backend.entity.BookingCombo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface BookingComboRepository extends JpaRepository<BookingCombo, UUID> {
    List<BookingCombo> findByBookingId(UUID bookingId);
}
