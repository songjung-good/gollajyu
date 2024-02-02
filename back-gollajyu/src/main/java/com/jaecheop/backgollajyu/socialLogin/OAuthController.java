package com.jaecheop.backgollajyu.socialLogin;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;

@RestController
public class OAuthController {
    @GetMapping("/test/login")
    public @ResponseBody String longinTest(Authentication authentication){
        System.out.println("/test/login ==================" );

        OAuth2User oAuth2User = (OAuth2User) authentication.getPrincipal();
        System.out.println("authentication: " +oAuth2User.getAttributes());
        return "세션정보 확인하기";

    }

    @GetMapping("/user")
    public @ResponseBody String userTest(Authentication principalDetails){
        System.out.println("principalDetails.getMember() = " + (OAuth2User)principalDetails.getPrincipal());
        return "세션정보 확인하기";

    }
}
