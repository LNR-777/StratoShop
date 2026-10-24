package com.lakhan.stratoshop.client;

import com.lakhan.stratoshop.common.ProductApiResponse;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestParam;

@FeignClient(name = "product-service")
public interface ProductClient {

    @GetMapping("/api/products/{id}")
    ProductApiResponse getProductById(@PathVariable("id") Long id);

    @PutMapping("/api/products/{id}/stock")
    ProductApiResponse updateStock(@PathVariable("id") Long id, @RequestParam("quantity") Integer quantity);
}
