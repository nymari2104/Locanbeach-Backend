package com.locanbeach.backend.service;

import com.locanbeach.backend.common.exception.AppException;
import com.locanbeach.backend.common.exception.errorcode.GeneralErrorCode;
import com.locanbeach.backend.dto.request.staff.AddBookingComboRequest;
import com.locanbeach.backend.dto.request.staff.AddBookingGuestRequest;
import com.locanbeach.backend.dto.request.staff.AddBookingServiceRequest;
import com.locanbeach.backend.dto.request.staff.ChangeBookingStatusRequest;
import com.locanbeach.backend.dto.response.BookingResponse;
import com.locanbeach.backend.entity.*;
import com.locanbeach.backend.entity.enums.BookingStatus;
import com.locanbeach.backend.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class StaffBookingService {

    private final BookingRepository bookingRepository;
    private final GuestRepository guestRepository;
    private final BookingGuestRepository bookingGuestRepository;
    private final ServiceRepository serviceRepository;
    private final BookingServiceRepository bookingServiceRepository;
    private final ComboEventRepository comboEventRepository;
    private final BookingComboRepository bookingComboRepository;

    public Page<BookingResponse> getBookings(String search, BookingStatus status, LocalDateTime startDate, LocalDateTime endDate, Pageable pageable) {
        return bookingRepository.findBookingsWithFilters(search, status, startDate, endDate, pageable)
                .map(this::mapToResponse);
    }

    public BookingResponse getBookingDetails(UUID id) {
        Booking booking = bookingRepository.findById(id)
                .orElseThrow(() -> new AppException(GeneralErrorCode.RESOURCE_NOT_FOUND, "Booking not found"));
        return mapToResponse(booking);
    }

    @Transactional
    public BookingResponse changeBookingStatus(UUID id, ChangeBookingStatusRequest request) {
        Booking booking = bookingRepository.findById(id)
                .orElseThrow(() -> new AppException(GeneralErrorCode.RESOURCE_NOT_FOUND, "Booking not found"));
        
        booking.setStatus(request.getStatus());
        // Depending on status changes, we might record history in booking_status_history here
        
        return mapToResponse(bookingRepository.save(booking));
    }

    @Transactional
    public BookingResponse checkIn(UUID id) {
        Booking booking = bookingRepository.findById(id)
                .orElseThrow(() -> new AppException(GeneralErrorCode.RESOURCE_NOT_FOUND, "Booking not found"));
        
        if (booking.getStatus() != BookingStatus.CONFIRMED && booking.getStatus() != BookingStatus.PENDING_DEPOSIT) {
            throw new AppException(GeneralErrorCode.INVALID_INPUT, "Cannot check-in from current status");
        }
        
        booking.setStatus(BookingStatus.CHECKED_IN);
        booking.setActualCheckinAt(LocalDateTime.now());
        
        return mapToResponse(bookingRepository.save(booking));
    }

    @Transactional
    public BookingResponse checkOut(UUID id) {
        Booking booking = bookingRepository.findById(id)
                .orElseThrow(() -> new AppException(GeneralErrorCode.RESOURCE_NOT_FOUND, "Booking not found"));
        
        if (booking.getStatus() != BookingStatus.CHECKED_IN) {
            throw new AppException(GeneralErrorCode.INVALID_INPUT, "Only checked-in bookings can be checked out");
        }
        
        booking.setStatus(BookingStatus.CHECKED_OUT);
        booking.setActualCheckoutAt(LocalDateTime.now());
        
        return mapToResponse(bookingRepository.save(booking));
    }

    @Transactional
    public void addGuest(UUID id, AddBookingGuestRequest request) {
        Booking booking = bookingRepository.findById(id)
                .orElseThrow(() -> new AppException(GeneralErrorCode.RESOURCE_NOT_FOUND, "Booking not found"));
        
        Guest guest = new Guest();
        guest.setFullName(request.getFullName());
        guest.setDob(request.getDob());
        guest.setGender(request.getGender());
        guest.setNationality(request.getNationality());
        guest.setIdType(request.getIdType());
        guest.setIdNumber(request.getIdNumber());
        guest.setPhone(request.getPhone());
        guest.setEmail(request.getEmail());
        guest = guestRepository.save(guest);
        
        BookingGuest bookingGuest = new BookingGuest();
        bookingGuest.setBooking(booking);
        bookingGuest.setGuest(guest);
        bookingGuest.setPrimary(request.isPrimary());
        bookingGuest.setFaceImageUrl(request.getFaceImageUrl());
        bookingGuest.setIdCardImageUrl(request.getIdCardImageUrl());
        
        bookingGuestRepository.save(bookingGuest);
    }

    @Transactional
    public void addService(UUID id, AddBookingServiceRequest request) {
        Booking booking = bookingRepository.findById(id)
                .orElseThrow(() -> new AppException(GeneralErrorCode.RESOURCE_NOT_FOUND, "Booking not found"));
        
        com.locanbeach.backend.entity.Service service = serviceRepository.findById(request.getServiceId())
                .orElseThrow(() -> new AppException(GeneralErrorCode.RESOURCE_NOT_FOUND, "Service not found"));
                
        com.locanbeach.backend.entity.BookingService bookingService = new com.locanbeach.backend.entity.BookingService();
        bookingService.setBooking(booking);
        bookingService.setService(service);
        bookingService.setQuantity(request.getQuantity());
        bookingService.setUnitPrice(service.getPrice());
        bookingService.setNote(request.getNote());
        
        bookingServiceRepository.save(bookingService);
    }

    @Transactional
    public void addCombo(UUID id, AddBookingComboRequest request) {
        Booking booking = bookingRepository.findById(id)
                .orElseThrow(() -> new AppException(GeneralErrorCode.RESOURCE_NOT_FOUND, "Booking not found"));
        
        ComboEvent combo = comboEventRepository.findById(request.getComboId())
                .orElseThrow(() -> new AppException(GeneralErrorCode.RESOURCE_NOT_FOUND, "Combo not found"));
                
        BookingCombo bookingCombo = new BookingCombo();
        bookingCombo.setBooking(booking);
        bookingCombo.setCombo(combo);
        bookingCombo.setQuantity(request.getQuantity());
        bookingCombo.setUnitPrice(combo.getPrice());
        bookingCombo.setNote(request.getNote());
        
        bookingComboRepository.save(bookingCombo);
    }

    private BookingResponse mapToResponse(Booking booking) {
        return BookingResponse.builder()
                .bookingId(booking.getId())
                .accommodationId(booking.getAccommodation().getId())
                .accommodationCode(booking.getAccommodation().getCode())
                .categoryId(booking.getAccommodation().getCategory().getId())
                .categoryName(booking.getAccommodation().getCategory().getName())
                .guestName(booking.getGuestName())
                .guestPhone(booking.getGuestPhone())
                .checkinDate(booking.getCheckinDate())
                .checkoutDate(booking.getCheckoutDate())
                .guestsCount(booking.getGuestsCount())
                .totalAmount(booking.getTotalAmount())
                .depositAmount(booking.getDepositAmount())
                .status(booking.getStatus())
                .build();
    }
}
