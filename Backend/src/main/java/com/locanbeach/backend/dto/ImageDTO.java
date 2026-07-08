package com.locanbeach.backend.dto;

import lombok.Builder;
import lombok.Data;

import java.util.UUID;

@Data
@Builder
public class ImageDTO {
    private UUID id;
    private String url;
    private Boolean isCover;
    private Integer sortOrder;
}
