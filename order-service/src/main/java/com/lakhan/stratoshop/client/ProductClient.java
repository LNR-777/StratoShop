package com.lakhan.stratoshop.client;

import com.lakhan.stratoshop.common.ApiResponse;
import com.lakhan.stratoshop.dto.ProductDTO;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(name = "product-service")
public interface ProductClient {

    @GetMapping("/api/products/{id}")
    ApiResponse<ProductDTO> getProductById(@PathVariable("id") Long id);
}
