package com.locanbeach.backend.entity;

import com.locanbeach.backend.entity.enums.ComboEventType;
import com.locanbeach.backend.entity.enums.ServiceStatus;
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
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.UUID;

@Getter
@Setter
@Entity
@Table(name = "combos_events")
public class ComboEvent {

    @Id
    @GeneratedValue
    private UUID id;

    @Column(nullable = false, length = 150)
    private String name;

    @Column(nullable = false)
    @JdbcTypeCode(SqlTypes.NAMED_ENUM)
    private ComboEventType type;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(precision = 12, scale = 2)
    private BigDecimal price;

    @Column(name = "start_date")
    private LocalDate startDate;

    @Column(name = "end_date")
    private LocalDate endDate;

    @Column(nullable = false)
    @JdbcTypeCode(SqlTypes.NAMED_ENUM)
    private ServiceStatus status = ServiceStatus.ACTIVE;

    @jakarta.persistence.OneToMany(mappedBy = "combo", cascade = jakarta.persistence.CascadeType.ALL, orphanRemoval = true)
    private java.util.List<ComboImage> images = new java.util.ArrayList<>();

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
}
