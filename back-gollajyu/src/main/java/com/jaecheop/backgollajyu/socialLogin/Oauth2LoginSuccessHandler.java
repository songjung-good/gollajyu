package com.jaecheop.backgollajyu.socialLogin;

import com.jaecheop.backgollajyu.member.entity.Type;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.DefaultRedirectStrategy;
import org.springframework.security.web.RedirectStrategy;
import org.springframework.security.web.authentication.SavedRequestAwareAuthenticationSuccessHandler;

import java.io.IOException;


public class Oauth2LoginSuccessHandler extends SavedRequestAwareAuthenticationSuccessHandler {

    @Value("${api.url}")
    private String apiUrl;

    private RedirectStrategy redirectStrategy = new DefaultRedirectStrategy();

    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
                                        Authentication authentication) throws ServletException, IOException {
        // Custom logic after successful OAuth2 login


        // Custom logic after successful OAuth2 login
        PrincipalDetails principal = (PrincipalDetails)authentication.getPrincipal();
//        Object oauthemail = principal.getAttributes().get("email");
        // Perform actions based on authorities or any other custom logic
        // 추가 정보 받기!!!!
        // 리다이렉트밖에 클라이언트 쪽으로 정보를 보내는 방법이 없음 -> 쿠키에 담아주기

        String cookieValue = principal.getMember().getProvider()+ "-"+principal.getMember().getProviderId();
        Cookie myCookie = new Cookie("gollajyu-cookie", cookieValue);
        myCookie.setPath("/");
        response.addCookie(myCookie);

        // 만약 getmember에 추가 정보가 없다면, addinfo로, 아니라면 로그인된 메인으로!
        Type type = principal.getMember().getType();

        redirectStrategy.sendRedirect(request, response, apiUrl);

        super.onAuthenticationSuccess(request, response, authentication);
    }
}
