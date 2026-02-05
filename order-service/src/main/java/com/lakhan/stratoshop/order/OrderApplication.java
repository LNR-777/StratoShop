package com.lakhan.stratoshop.order;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.cloud.openfeign.EnableFeignClients;

@SpringBootApplication(scanBasePackages = "com.lakhan.stratoshop")
@EnableDiscoveryClient
@EnableFeignClients(basePackages = "com.lakhan.stratoshop.client")
public class OrderApplication {
    public static void main(String[] args) {
        SpringApplication.run(OrderApplication.class, args);
        System.out.println("📦 StratoShop Order Service started!");
    }
}
