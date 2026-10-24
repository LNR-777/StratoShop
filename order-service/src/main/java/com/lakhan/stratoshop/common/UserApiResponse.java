package com.lakhan.stratoshop.common;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class UserApiResponse {
    private boolean success;
    private String message;
    private com.lakhan.stratoshop.dto.UserDTO data;
}
