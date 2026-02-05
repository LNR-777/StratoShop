package com.lakhan.stratoshop.gateway;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * API Gateway for the StratoShop microservices architecture.
 * This service handles request routing, load balancing, and cross-cutting
 * concerns.
 */
@SpringBootApplication
public class ApiGatewayApplication {

    public static void main(String[] args) {
        SpringApplication.run(ApiGatewayApplication.class, args);
        System.out.println("🌉 StratoShop API Gateway is ready on port 8080!");
    }
}
