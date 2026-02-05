package com.lakhan.stratoshop.auth;

import com.lakhan.stratoshop.common.ApiResponse;
import com.lakhan.stratoshop.security.JwtUtils;
import com.lakhan.stratoshop.user.User;
import com.lakhan.stratoshop.user.UserRepository;
import com.lakhan.stratoshop.user.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final UserService userService;
    private final UserRepository userRepository;
    private final JwtUtils jwtUtils;

    @PostMapping("/login")
    public ResponseEntity<ApiResponse<AuthResponse>> login(@RequestBody AuthRequest request) {
        User user = userRepository.findByUsername(request.getUsername())
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!userService.validateCredentials(request.getPassword(), user.getPassword())) {
            return ResponseEntity.status(401)
                    .body(ApiResponse.error("Invalid credentials"));
        }

        String token = jwtUtils.generateToken(user.getUsername(), user.getRole().name());

        AuthResponse response = AuthResponse.builder()
                .token(token)
                .username(user.getUsername())
                .role(user.getRole().name())
                .build();

        return ResponseEntity.ok(ApiResponse.success("Login successful", response));
    }
}
