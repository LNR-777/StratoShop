package com.lakhan.stratoshop.product.config;

import com.lakhan.stratoshop.product.Product;
import com.lakhan.stratoshop.product.ProductRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
@Slf4j
public class ProductDataLoader implements CommandLineRunner {

    private final ProductRepository productRepository;

    @Override
    public void run(String... args) {
        List<Product> catalog = buildCatalog();
        Set<String> expectedNames = catalog.stream().map(Product::getName).collect(Collectors.toSet());
        Set<String> existingNames = productRepository.findAll().stream()
                .map(Product::getName)
                .collect(Collectors.toSet());

        if (existingNames.equals(expectedNames)) {
            log.info("Product catalog already seeded ({} items).", existingNames.size());
            return;
        }

        productRepository.deleteAll();
        productRepository.saveAll(catalog);
        log.info("Seeded {} products into the StratoShop catalog.", catalog.size());
    }

    private List<Product> buildCatalog() {
        return List.of(
                product("MacBook Air 15\" (M3)",
                        "Apple MacBook Air with M3 chip, 15.3-inch Liquid Retina display, 16GB unified memory, and all-day battery. Built for work, study, and creative apps.",
                        "1299.99", 24, "Electronics",
                        "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=900&q=80"),
                product("Samsung Galaxy S24 Ultra",
                        "Samsung flagship smartphone with a 6.8-inch AMOLED display, 200MP camera system, S Pen, and all-day battery.",
                        "1199.99", 35, "Electronics",
                        "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=900&q=80"),
                product("Sony WH-1000XM5",
                        "Sony over-ear wireless headphones with industry-leading noise cancellation, premium sound, and up to 30 hours of battery life.",
                        "348.00", 50, "Electronics",
                        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=80"),
                product("Apple iPad Air (M2)",
                        "Apple iPad Air with M2 performance, 11-inch display, Apple Pencil support, and a thin portable design for notes, streaming, and drawing.",
                        "599.00", 40, "Electronics",
                        "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=900&q=80"),
                product("Nike Air Max 90",
                        "Classic Nike Air Max 90 sneakers with visible Air cushioning, leather overlays, and everyday comfort.",
                        "130.00", 80, "Fashion",
                        "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80"),
                product("Levi's 501 Original Fit Jeans",
                        "Levi's 501 original-fit jeans with a straight leg, button fly, and durable denim for daily wear.",
                        "69.50", 120, "Fashion",
                        "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=900&q=80"),
                product("Ray-Ban Aviator Classic",
                        "Ray-Ban Aviator sunglasses with a lightweight metal frame and classic teardrop lenses.",
                        "163.00", 65, "Fashion",
                        "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=900&q=80"),
                product("The North Face ThermoBall Jacket",
                        "The North Face insulated jacket with packable warmth for cold weather commuting and outdoor use.",
                        "249.00", 45, "Fashion",
                        "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=900&q=80"),
                product("Dyson V15 Detect Vacuum",
                        "Dyson cordless stick vacuum with laser dust detection, strong suction, and whole-home cleaning attachments.",
                        "649.99", 18, "Home & Living",
                        "https://images.unsplash.com/photo-1558317374-067fb5f30001?auto=format&fit=crop&w=900&q=80"),
                product("Nespresso Vertuo Next",
                        "Nespresso Vertuo Next coffee machine for one-touch espresso and coffee with a rich crema.",
                        "179.00", 55, "Home & Living",
                        "https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=900&q=80"),
                product("Philips Hue Starter Kit",
                        "Philips Hue smart lighting kit with color bulbs and app/voice control for a modern home.",
                        "199.99", 30, "Home & Living",
                        "https://images.unsplash.com/photo-1507473883502-3fe871df675a?auto=format&fit=crop&w=900&q=80"),
                product("Casper Original Pillow",
                        "Casper supportive pillow with a breathable design for balanced comfort and better sleep.",
                        "89.00", 90, "Home & Living",
                        "https://images.unsplash.com/photo-1584100936595-0494c1dfa596?auto=format&fit=crop&w=900&q=80")
        );
    }

    private Product product(String name, String description, String price, int stock, String category, String imageUrl) {
        return Product.builder()
                .name(name)
                .description(description)
                .price(new BigDecimal(price))
                .stockQuantity(stock)
                .category(category)
                .imageUrl(imageUrl)
                .build();
    }
}
