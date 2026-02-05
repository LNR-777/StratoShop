package com.lakhan.stratoshop.discovery;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.server.EnableEurekaServer;

/**
 * Service Discovery Server using Netflix Eureka.
 * This server acts as a registry where all microservices will register
 * themselves.
 */
@SpringBootApplication
@EnableEurekaServer
public class DiscoveryServerApplication {

    public static void main(String[] args) {
        SpringApplication.run(DiscoveryServerApplication.class, args);
        System.out.println("✨ StratoShop Discovery Server is up and running on port 8761!");
    }
}
