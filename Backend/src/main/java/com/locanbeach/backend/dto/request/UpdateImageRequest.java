package com.locanbeach.backend.dto.request;

import lombok.Data;

@Data
public class UpdateImageRequest {
    private Boolean isCover;
    private Integer sortOrder;
}
