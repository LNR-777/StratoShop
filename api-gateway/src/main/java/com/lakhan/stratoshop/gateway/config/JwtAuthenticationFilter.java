package com.lakhan.stratoshop.gateway.config;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.cloud.gateway.filter.GatewayFilterChain;
import org.springframework.cloud.gateway.filter.GlobalFilter;
import org.springframework.core.Ordered;
import org.springframework.http.HttpStatus;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.http.server.reactive.ServerHttpResponse;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Mono;

import java.security.Key;
import java.util.List;
import java.util.function.Predicate;

@Component
public class JwtAuthenticationFilter implements GlobalFilter, Ordered {

    private final Key key;

    public JwtAuthenticationFilter(@Value("${jwt.secret}") String secret) {
        this.key = Keys.hmacShaKeyFor(secret.getBytes());
    }

    @Override
    public Mono<Void> filter(ServerWebExchange exchange, GatewayFilterChain chain) {
        ServerHttpRequest request = exchange.getRequest();

        final List<String> openApiEndpoints = List.of(
                "/api/auth/login",
                "/api/users/register",
                "/eureka",
                "/swagger-ui",
                "/v3/api-docs");

        Predicate<ServerHttpRequest> isApiSecured = r -> openApiEndpoints.stream()
                .noneMatch(uri -> r.getURI().getPath().contains(uri));

        if (isApiSecured.test(request)) {
            if (!request.getHeaders().containsKey("Authorization")) {
                return onError(exchange, "No Authorization Header", HttpStatus.UNAUTHORIZED);
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
                return onError(exchange, "Invalid Token", HttpStatus.UNAUTHORIZED);
            }
        }
        return chain.filter(exchange);
    }

    private Mono<Void> onError(ServerWebExchange exchange, String err, HttpStatus httpStatus) {
        ServerHttpResponse response = exchange.getResponse();
        response.setStatusCode(httpStatus);
        return response.setComplete();
    }

    @Override
    public int getOrder() {
        return -1;
    }
}
