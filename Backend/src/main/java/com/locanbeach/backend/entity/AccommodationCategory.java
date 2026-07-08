package com.locanbeach.backend.entity;

import com.locanbeach.backend.entity.enums.AccommodationType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.annotations.UpdateTimestamp;
import org.hibernate.type.SqlTypes;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.UUID;

@Getter
@Setter
@Entity
@Table(name = "accommodation_categories")
public class AccommodationCategory {

    @Id
    @GeneratedValue
    private UUID id;

    @Column(nullable = false, length = 100)
    private String name;

    @Column(nullable = false, unique = true, length = 50)
    private String code;

    @Column(nullable = false)
    @JdbcTypeCode(SqlTypes.NAMED_ENUM)
    private AccommodationType type;

    @jakarta.persistence.ManyToMany(fetch = jakarta.persistence.FetchType.LAZY)
    @jakarta.persistence.JoinTable(
        name = "category_amenities",
        joinColumns = @jakarta.persistence.JoinColumn(name = "category_id"),
        inverseJoinColumns = @jakarta.persistence.JoinColumn(name = "amenity_id")
    )
    private java.util.Set<Amenity> amenities = new java.util.HashSet<>();

    @jakarta.persistence.OneToMany(mappedBy = "category", cascade = jakarta.persistence.CascadeType.ALL, orphanRemoval = true)
    private java.util.List<CategoryImage> images = new java.util.ArrayList<>();

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(name = "base_price", nullable = false, precision = 12, scale = 2)
    private BigDecimal basePrice;

    @Column(name = "max_guests", nullable = false)
    private Integer maxGuests;

    @Column(name = "area_sqm", precision = 8, scale = 2)
    private BigDecimal areaSqm;

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
}
