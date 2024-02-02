package com.jaecheop.backgollajyu.config;

import com.jaecheop.backgollajyu.socialLogin.CustomOAuth2UserService;
import com.jaecheop.backgollajyu.socialLogin.Oauth2LoginSuccessHandler;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {
    private final CustomOAuth2UserService customOAuth2UserService;
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http.csrf(AbstractHttpConfigurer::disable); // csrf
        http.cors(AbstractHttpConfigurer::disable); // cors
        http.authorizeHttpRequests(
                authorizeRequests ->
                        authorizeRequests.anyRequest().permitAll()
        );

        http.oauth2Login(oauth2Login ->
                oauth2Login
                        .successHandler(
                                 oauth2LoginSuccessHandler()
                        )
                        .failureHandler((request, response, exception) -> {
                            System.out.println("fail");
                        })
                        .userInfoEndpoint(userInfoEndpoint ->
                                userInfoEndpoint
                                        .userService(customOAuth2UserService)
                        )
                        .defaultSuccessUrl("/members/addInfo")// 리다이렉트 할 URL
        );




//        //OAuth 2.0 기반 인증을 처리하기위해 Provider와의 연동을 지원
//        http.oauth2Login()
//                //인증에 성공하면 실행할 handler (redirect 시킬 목적)
//                .successHandler(MyAuthenticationSuccessHandler())
//                //OAuth 2.0 Provider로부터 사용자 정보를 가져오는 엔드포인트를 지정하는 메서드
//                .userInfoEndpoint()
//                //OAuth 2.0 인증이 처리되는데 사용될 사용자 서비스를 지정하는 메서드
//                .userService(oAuthService);
        return http.build();
    }

    @Bean
    public AuthenticationSuccessHandler oauth2LoginSuccessHandler() {
        return new Oauth2LoginSuccessHandler();
    }
}
