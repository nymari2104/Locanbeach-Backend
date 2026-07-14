package com.locanbeach.backend.service;

import com.locanbeach.backend.dto.AccommodationDTO;
import com.locanbeach.backend.dto.ComboEventDTO;
import com.locanbeach.backend.dto.ServiceDTO;
import com.locanbeach.backend.entity.Accommodation;
import com.locanbeach.backend.entity.ComboEvent;
import com.locanbeach.backend.entity.Service;
import com.locanbeach.backend.repository.AccommodationRepository;
import com.locanbeach.backend.repository.ComboEventRepository;
import com.locanbeach.backend.repository.ServiceRepository;
import lombok.RequiredArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@org.springframework.stereotype.Service
@RequiredArgsConstructor
public class StaffLookupService {

    private final ServiceRepository serviceRepository;
    private final ComboEventRepository comboEventRepository;
    private final AccommodationRepository accommodationRepository;

    public List<ServiceDTO> getServices() {
        return serviceRepository.findAll().stream()
                .map(this::mapToServiceDTO)
                .collect(Collectors.toList());
    }

    public List<ComboEventDTO> getCombos() {
        return comboEventRepository.findAll().stream()
                .map(this::mapToComboDTO)
                .collect(Collectors.toList());
    }

    public List<AccommodationDTO> getAvailableAccommodations(LocalDateTime startDate, LocalDateTime endDate) {
        // Find available accommodations (this might require custom query if we need to check bookings and holds)
        // For simplicity, let's just get accommodations that do not have active bookings in this period.
        // Assuming we have this method in repository or we can implement it.
        // We can just use the existing logic or create a new query.
        
        // This is a placeholder for actual complex availability logic.
        return accommodationRepository.findAll().stream()
                .map(this::mapToAccommodationDTO)
                .collect(Collectors.toList());
    }

    private ServiceDTO mapToServiceDTO(Service service) {
        ServiceDTO dto = new ServiceDTO();
        dto.setId(service.getId());
        dto.setName(service.getName());
        dto.setGroup(service.getGroup());
        dto.setDescription(service.getDescription());
        dto.setPrice(service.getPrice());
        dto.setOperatingHours(service.getOperatingHours());
        dto.setStatus(service.getStatus());
        return dto;
    }

    private ComboEventDTO mapToComboDTO(ComboEvent combo) {
        ComboEventDTO dto = new ComboEventDTO();
        dto.setId(combo.getId());
        dto.setName(combo.getName());
        dto.setType(combo.getType());
        dto.setDescription(combo.getDescription());
        dto.setPrice(combo.getPrice());
        dto.setStartDate(combo.getStartDate());
        dto.setEndDate(combo.getEndDate());
        dto.setStatus(combo.getStatus());
        return dto;
    }

    private AccommodationDTO mapToAccommodationDTO(Accommodation accommodation) {
        AccommodationDTO dto = new AccommodationDTO();
        dto.setId(accommodation.getId());
        dto.setCategoryId(accommodation.getCategory().getId());
        dto.setCategoryName(accommodation.getCategory().getName());
        dto.setCode(accommodation.getCode());
        dto.setMetadata(accommodation.getMetadata());
        dto.setStatus(accommodation.getStatus());
        dto.setOperationalStatus(accommodation.getOperationalStatus());
        return dto;
    }
}
