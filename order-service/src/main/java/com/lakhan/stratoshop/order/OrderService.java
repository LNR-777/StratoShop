package com.lakhan.stratoshop.order;

import com.lakhan.stratoshop.client.ProductClient;
import com.lakhan.stratoshop.client.UserClient;
import com.lakhan.stratoshop.common.ApiResponse;
import com.lakhan.stratoshop.dto.ProductDTO;
import com.lakhan.stratoshop.dto.UserDTO;
import com.lakhan.stratoshop.exception.ResourceNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

/**
 * Service class for Order business logic in a Microservices architecture.
 * Uses Feign clients to communicate with User and Product services.
 */
@Service
@RequiredArgsConstructor
public class OrderService {

    private final OrderRepository orderRepository;
    private final UserClient userClient;
    private final ProductClient productClient;

    @Transactional
    public Order placeOrder(OrderRequest request) {
        // Validate User exists via Feign
        ApiResponse<UserDTO> userResponse = userClient.getUserById(request.getUserId());
        if (!userResponse.isSuccess()) {
            throw new ResourceNotFoundException("User not found with id: " + request.getUserId());
        }

        Order order = Order.builder()
                .userId(request.getUserId())
                .status("PENDING")
                .orderDate(LocalDateTime.now())
                .build();

        BigDecimal totalAmount = BigDecimal.ZERO;

        for (OrderRequest.OrderItemRequest itemRequest : request.getItems()) {
            // Fetch Product via Feign
            ApiResponse<ProductDTO> productResponse = productClient.getProductById(itemRequest.getProductId());
            if (!productResponse.isSuccess()) {
                throw new ResourceNotFoundException("Product not found with id: " + itemRequest.getProductId());
            }
            ProductDTO product = productResponse.getData();

            // Validate stock
            if (product.getStockQuantity() < itemRequest.getQuantity()) {
                throw new RuntimeException("Insufficient stock for product: " + product.getName());
            }

            // Sync stock update with Product Service
            ApiResponse<Void> stockUpdateResponse = productClient.updateStock(product.getId(),
                    itemRequest.getQuantity());
            if (!stockUpdateResponse.isSuccess()) {
                throw new RuntimeException("Failed to update stock for product: " + product.getName());
            }

            OrderItem orderItem = OrderItem.builder()
                    .order(order)
                    .productId(product.getId())
                    .quantity(itemRequest.getQuantity())
                    .price(product.getPrice())
                    .build();

            order.addOrderItem(orderItem);

            BigDecimal itemTotal = product.getPrice().multiply(BigDecimal.valueOf(itemRequest.getQuantity()));
            totalAmount = totalAmount.add(itemTotal);
        }

        order.setTotalAmount(totalAmount);
        return orderRepository.save(order);
    }

    public List<Order> getOrdersByUserId(Long userId) {
        return orderRepository.findByUserId(userId);
    }
}
