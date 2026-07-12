package com.locanbeach.backend.repository;

import com.locanbeach.backend.entity.Booking;
import com.locanbeach.backend.entity.enums.BookingStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.UUID;

@Repository
public interface BookingRepository extends JpaRepository<Booking, UUID> {

    @Query("SELECT b FROM Booking b WHERE " +
           "(:search IS NULL OR LOWER(b.guestName) LIKE LOWER(CONCAT('%', :search, '%')) OR LOWER(CAST(b.id AS string)) LIKE LOWER(CONCAT('%', :search, '%'))) AND " +
           "(:status IS NULL OR b.status = :status) AND " +
           "(cast(:startDate as timestamp) IS NULL OR b.checkinDate >= :startDate) AND " +
           "(cast(:endDate as timestamp) IS NULL OR b.checkinDate <= :endDate)")
    Page<Booking> findBookingsWithFilters(
            @Param("search") String search,
            @Param("status") BookingStatus status,
            @Param("startDate") LocalDateTime startDate,
            @Param("endDate") LocalDateTime endDate,
            Pageable pageable);
}
