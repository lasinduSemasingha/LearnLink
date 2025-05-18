package com.learnlink.demo.user.service;

import com.learnlink.demo.user.repository.AppUserRepository;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.Map;
import java.util.Optional;
import com.learnlink.demo.user.entity.AppUser;

@Service
public class CustomOAuth2UserService extends DefaultOAuth2UserService {

    private final AppUserRepository appUserRepository;

    public CustomOAuth2UserService(AppUserRepository appUserRepository) {
        this.appUserRepository = appUserRepository;
    }

    @Override
    @Transactional
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        OAuth2User oAuth2User = super.loadUser(userRequest);

        try {
            return processOAuth2User(oAuth2User);
        } catch (OAuth2AuthenticationException ex) {
            throw ex;
        } catch (Exception ex) {
            throw new OAuth2AuthenticationException(ex.getMessage());
        }
    }

    private OAuth2User processOAuth2User(OAuth2User oAuth2User) {
        Map<String, Object> attributes = oAuth2User.getAttributes();

        String googleId = (String) attributes.get("sub");
        String email = (String) attributes.get("email");
        Boolean emailVerified = (Boolean) attributes.get("email_verified");
        String name = (String) attributes.get("name");
        String givenName = (String) attributes.get("given_name");
        String familyName = (String) attributes.get("family_name");
        String picture = (String) attributes.get("picture");

        Optional<AppUser> existingUser = appUserRepository.findByGoogleId(googleId);
        AppUser appUser;

        if (existingUser.isPresent()) {
            appUser = existingUser.get();
            // Update relevant fields if needed
            appUser.setEmail(email);
            appUser.setEmailVerified(emailVerified);
            appUser.setName(name);
            appUser.setGivenName(givenName);
            appUser.setFamilyName(familyName);
            appUser.setPicture(picture);
            appUserRepository.save(appUser);
        } else {
            appUser = new AppUser(googleId, email, emailVerified, name, givenName, familyName, picture);
            appUserRepository.save(appUser);
        }

        return oAuth2User;
    }
}