package com.learnlink.demo.user.service;

import com.learnlink.demo.user.entity.AppUser;
import com.learnlink.demo.user.repository.AppUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserService;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
public class CustomOAuth2UserService implements OAuth2UserService<OAuth2UserRequest, OAuth2User> {

    @Autowired
    private AppUserRepository appUserRepository;

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        System.out.println("🔥 loadUser() method is being called");

        OAuth2User oAuth2User = new DefaultOAuth2UserService().loadUser(userRequest);

        Map<String, Object> attributes = oAuth2User.getAttributes();
        System.out.println("✅ OAuth attributes: " + attributes);

        // Extract user info
        String email = (String) attributes.get("email");
        String name = (String) attributes.get("name");

        // Example debug log
        System.out.println("Saving user: " + email + " - " + name);

        // Save to DB
        AppUser user = appUserRepository.findByEmail(email).orElseGet(AppUser::new);
        user.setEmail(email);
        user.setName(name);
        user.setProvider("GOOGLE");

        appUserRepository.save(user);
        System.out.println("✅ User saved to DB");

        return oAuth2User;
    }

}
