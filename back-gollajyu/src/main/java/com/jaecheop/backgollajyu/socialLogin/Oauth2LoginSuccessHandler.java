package com.jaecheop.backgollajyu.socialLogin;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.DefaultRedirectStrategy;
import org.springframework.security.web.RedirectStrategy;
import org.springframework.security.web.authentication.SavedRequestAwareAuthenticationSuccessHandler;

import java.io.IOException;


public class Oauth2LoginSuccessHandler extends SavedRequestAwareAuthenticationSuccessHandler {

    private RedirectStrategy redirectStrategy = new DefaultRedirectStrategy();


    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
                                        Authentication authentication) throws ServletException, IOException {
        // Custom logic after successful OAuth2 login
//        System.out.println("my succcesss handelr!!!!!!!!!!!!!");

        PrincipalDetails principal = (PrincipalDetails)authentication.getPrincipal();
//        System.out.println("principal.getMember() = " + principal.getMember());
//        Object oauthemail = principal.getAttributes().get("email");
        // Perform actions based on authorities or any other custom logic
        // TODO:: 추가 정보 받기!!!!
        // 리다이렉트밖에 클라이언트 쪽으로 정보를 보내는 방법이 없음 -> 쿠키에 담아주기

//        System.out.println("5555555555555555555");
        String cookieValue = principal.getMember().getProvider()+ "-"+principal.getMember().getProviderId();
        Cookie myCookie = new Cookie("gollajyu-cookie", cookieValue);
        myCookie.setPath("/");
        response.addCookie(myCookie);
//        System.out.println("6666666666666666666666");

        redirectStrategy.sendRedirect(request, response, "http://localhost:5173");
        // 쿠키에 담으면 cors *이 안된다, withCredentials을 잘 설정해야한다.
        super.onAuthenticationSuccess(request, response, authentication);
    }
}
