package com.lakhan.stratoshop.product;

import com.lakhan.stratoshop.common.ApiResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * REST Controller for Product-related operations.
 */
@RestController
@RequestMapping("/api/products")
@RequiredArgsConstructor
@Tag(name = "Product Management", description = "APIs for catalog management")
public class ProductController {

    private final ProductService productService;

    @PostMapping
    @Operation(summary = "Add a new product", description = "Creates a new product in the catalog.")
    public ResponseEntity<ApiResponse<Product>> addProduct(@Valid @RequestBody Product product) {
        Product savedProduct = productService.saveProduct(product);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success("Product added successfully", savedProduct));
    }

    @GetMapping
    @Operation(summary = "Get all products", description = "Retrieves the full product catalog.")
    public ResponseEntity<ApiResponse<List<Product>>> getAllProducts() {
        return ResponseEntity.ok(ApiResponse.success("Products retrieved", productService.getAllProducts()));
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get product by ID", description = "Fetches details of a specific product.")
    public ResponseEntity<ApiResponse<Product>> getProductById(@PathVariable Long id) {
        return ResponseEntity.ok(ApiResponse.success("Product found", productService.getProductById(id)));
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Delete product", description = "Removes a product from the catalog.")
    public ResponseEntity<ApiResponse<String>> deleteProduct(@PathVariable Long id) {
        productService.deleteProduct(id);
        return ResponseEntity.ok(ApiResponse.success("Product deleted successfully", null));
    }
}
