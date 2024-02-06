package com.jaecheop.backgollajyu.socialLogin;

import com.jaecheop.backgollajyu.member.entity.Type;
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
        System.out.println("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
        System.out.println("principal.getMember().getType() = " + principal.getMember().getType());
//        Object oauthemail = principal.getAttributes().get("email");
        // Perform actions based on authorities or any other custom logic
        // TODO:: 추가 정보 받기!!!!
        // 리다이렉트밖에 클라이언트 쪽으로 정보를 보내는 방법이 없음 -> 쿠키에 담아주기

//        System.out.println("5555555555555555555");
        String cookieValue = principal.getMember().getProvider()+ "-"+principal.getMember().getProviderId();
        Cookie myCookie = new Cookie("gollajyu-cookie", cookieValue);
        myCookie.setPath("/");
        response.addCookie(myCookie);
        System.out.println("6666666666666666666666");

        // 만약 getmember에 추가 정보가 없다면, addinfo로, 아니라면 로그인된 메인으로!
        Type type = principal.getMember().getType();
        if(type == null) {
            System.out.println("7777777777777777777777");
            redirectStrategy.sendRedirect(request, response, "http://localhost:8080/api/members/addInfo");
            System.out.println("888888888888888888888888");
        }
        else {
            System.out.println("999999999999999999999");
            redirectStrategy.sendRedirect(request, response, "http://localhost:5173");
            // 쿠키에 담으면 cors *이 안된다, withCredentials을 잘 설정해야한다.
            System.out.println("101010101010101010101010");
        }
        super.onAuthenticationSuccess(request, response, authentication);
    }
}
