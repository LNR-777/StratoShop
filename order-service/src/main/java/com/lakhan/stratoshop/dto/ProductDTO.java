package com.lakhan.stratoshop.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;

import java.math.BigDecimal;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class ProductDTO {
    private Long id;
    private String name;
    private BigDecimal price;
    private Integer stockQuantity;
    private String category;
    private String imageUrl;
}
