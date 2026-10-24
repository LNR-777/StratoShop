package com.lakhan.stratoshop.order;

import com.lakhan.stratoshop.client.ProductClient;
import com.lakhan.stratoshop.client.UserClient;
import com.lakhan.stratoshop.common.ProductApiResponse;
import com.lakhan.stratoshop.common.UserApiResponse;
import com.lakhan.stratoshop.dto.ProductDTO;
import com.lakhan.stratoshop.exception.ResourceNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class OrderService {

    private final OrderRepository orderRepository;
    private final UserClient userClient;
    private final ProductClient productClient;

    @Transactional
    public Order placeOrder(OrderRequest request) {
        if (request.getUserId() == null) {
            throw new IllegalArgumentException("User id is required");
        }
        if (request.getItems() == null || request.getItems().isEmpty()) {
            throw new IllegalArgumentException("Order must contain at least one item");
        }

        UserApiResponse userResponse = userClient.getUserById(request.getUserId());
        if (userResponse == null || !userResponse.isSuccess() || userResponse.getData() == null) {
            throw new ResourceNotFoundException("User not found with id: " + request.getUserId());
        }

        Order order = Order.builder()
                .userId(request.getUserId())
                .status("CONFIRMED")
                .orderDate(LocalDateTime.now())
                .totalAmount(BigDecimal.ZERO)
                .build();

        BigDecimal totalAmount = BigDecimal.ZERO;

        for (OrderRequest.OrderItemRequest itemRequest : request.getItems()) {
            if (itemRequest.getQuantity() == null || itemRequest.getQuantity() < 1) {
                throw new IllegalArgumentException("Item quantity must be at least 1");
            }

            ProductApiResponse productResponse = productClient.getProductById(itemRequest.getProductId());
            if (productResponse == null || !productResponse.isSuccess() || productResponse.getData() == null) {
                throw new ResourceNotFoundException("Product not found with id: " + itemRequest.getProductId());
            }
            ProductDTO product = productResponse.getData();

            if (product.getStockQuantity() == null || product.getStockQuantity() < itemRequest.getQuantity()) {
                throw new IllegalStateException("Insufficient stock for product: " + product.getName());
            }

            ProductApiResponse stockUpdateResponse = productClient.updateStock(product.getId(), itemRequest.getQuantity());
            if (stockUpdateResponse == null || !stockUpdateResponse.isSuccess()) {
                throw new IllegalStateException("Failed to update stock for product: " + product.getName());
            }

            OrderItem orderItem = OrderItem.builder()
                    .productId(product.getId())
                    .productName(product.getName())
                    .quantity(itemRequest.getQuantity())
                    .price(product.getPrice())
                    .build();
            order.addOrderItem(orderItem);

            totalAmount = totalAmount.add(product.getPrice().multiply(BigDecimal.valueOf(itemRequest.getQuantity())));
        }

        order.setTotalAmount(totalAmount);
        return orderRepository.save(order);
    }

    @Transactional(readOnly = true)
    public List<Order> getOrdersByUserId(Long userId) {
        return orderRepository.findByUserIdWithItems(userId);
    }

    @Transactional(readOnly = true)
    public Order getOrderById(Long id) {
        return orderRepository.findByIdWithItems(id)
                .orElseThrow(() -> new ResourceNotFoundException("Order not found with id: " + id));
    }
}
