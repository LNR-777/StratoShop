package com.lakhan.stratoshop.gateway.config;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.cloud.gateway.filter.GatewayFilterChain;
import org.springframework.cloud.gateway.filter.GlobalFilter;
import org.springframework.core.Ordered;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.http.server.reactive.ServerHttpResponse;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Mono;

import java.security.Key;
import java.util.List;

@Component
public class JwtAuthenticationFilter implements GlobalFilter, Ordered {

    private final Key key;

    public JwtAuthenticationFilter(@Value("${jwt.secret:5367566B59703373367639792F423F4528482B4D6251655468576D5A71347437}") String secret) {
        this.key = Keys.hmacShaKeyFor(secret.getBytes());
    }

    private static final List<String> OPEN_PATHS = List.of(
            "/api/auth/login",
            "/api/users/register",
            "/actuator",
            "/eureka",
            "/swagger-ui",
            "/v3/api-docs"
    );

    @Override
    public Mono<Void> filter(ServerWebExchange exchange, GatewayFilterChain chain) {
        ServerHttpRequest request = exchange.getRequest();
        String path = request.getURI().getPath();
        HttpMethod method = request.getMethod();

        if (method == HttpMethod.OPTIONS || isPublic(path, method)) {
            return chain.filter(exchange);
        }

        if (!request.getHeaders().containsKey("Authorization")) {
            return onError(exchange, HttpStatus.UNAUTHORIZED);
        }

        String token = request.getHeaders().getOrEmpty("Authorization").get(0);
        if (token != null && token.startsWith("Bearer ")) {
            token = token.substring(7);
        }

        try {
            Claims claims = Jwts.parserBuilder()
                    .setSigningKey(key)
                    .build()
                    .parseClaimsJws(token)
                    .getBody();

            ServerHttpRequest mutatedRequest = exchange.getRequest().mutate()
                    .header("loggedInUser", claims.getSubject())
                    .header("role", String.valueOf(claims.get("role")))
                    .build();
            return chain.filter(exchange.mutate().request(mutatedRequest).build());
        } catch (Exception e) {
            return onError(exchange, HttpStatus.UNAUTHORIZED);
        }
    }

    private boolean isPublic(String path, HttpMethod method) {
        if (OPEN_PATHS.stream().anyMatch(path::contains)) {
            return true;
        }
        return method == HttpMethod.GET && path.startsWith("/api/products");
    }

    private Mono<Void> onError(ServerWebExchange exchange, HttpStatus httpStatus) {
        ServerHttpResponse response = exchange.getResponse();
        response.setStatusCode(httpStatus);
        return response.setComplete();
    }

    @Override
    public int getOrder() {
        return -1;
    }
}
