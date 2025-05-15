package com.learnlink.demo.auth.token;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.oauth2.client.OAuth2AuthorizedClient;
import org.springframework.security.oauth2.client.OAuth2AuthorizedClientService;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TokenController {

    @Autowired
    private OAuth2AuthorizedClientService authorizedClientService;

    @GetMapping("/api/token")
    public ResponseEntity<String> getToken(OAuth2AuthenticationToken authentication) {
        OAuth2AuthorizedClient client = authorizedClientService
                .loadAuthorizedClient(
                        authentication.getAuthorizedClientRegistrationId(),
                        authentication.getName());

        if (client == null || client.getAccessToken() == null) {
            return ResponseEntity.badRequest().body("Access token not available");
        }

        String accessToken = client.getAccessToken().getTokenValue();
        return ResponseEntity.ok(accessToken);
    }
}
