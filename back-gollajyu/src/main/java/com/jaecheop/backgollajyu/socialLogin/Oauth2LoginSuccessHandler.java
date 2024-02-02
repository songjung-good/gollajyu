package com.jaecheop.backgollajyu.socialLogin;

import com.jaecheop.backgollajyu.member.controller.MemberController;
import com.jaecheop.backgollajyu.member.model.LoginResDto;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.SavedRequestAwareAuthenticationSuccessHandler;

import java.io.IOException;
import java.util.Collection;


public class Oauth2LoginSuccessHandler extends SavedRequestAwareAuthenticationSuccessHandler {
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
                                        Authentication authentication) throws ServletException, IOException {
        // Custom logic after successful OAuth2 login
        System.out.println("my succcesss handelr!!!!!!!!!!!!!");

        PrincipalDetails principal = (PrincipalDetails)authentication.getPrincipal();
        System.out.println("principal.getMember() = " + principal.getMember());
        Object oauthemail = principal.getAttributes().get("email");
        // Perform actions based on authorities or any other custom logic
        // TODO:: 추가 정보 받기!!!!
        // 리다이렉트밖에 클라이언트 쪽으로 정보를 보내는 방법이 없음 -> 쿠키에 담아주기

        String cookieValue = principal.getMember().getProvider()+ "-"+principal.getMember().getProviderId();
        Cookie myCookie = new Cookie("gollajyu-cookie", cookieValue);
        myCookie.setPath("/");
        response.addCookie(myCookie);

        // 쿠키에 담으면 cors *이 안된다, withCredentials을 잘 설정해야한다.
        super.onAuthenticationSuccess(request, response, authentication);
    }
}
