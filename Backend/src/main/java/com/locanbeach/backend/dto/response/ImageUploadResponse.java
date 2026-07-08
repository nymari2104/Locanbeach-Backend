package com.locanbeach.backend.dto.response;

import lombok.Builder;
import lombok.Data;

import java.util.UUID;

@Data
@Builder
public class ImageUploadResponse {
    private UUID id;
    private String url;
    private Boolean isCover;
    private Integer sortOrder;
}
