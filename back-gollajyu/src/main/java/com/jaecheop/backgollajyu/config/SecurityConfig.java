package com.jaecheop.backgollajyu.config;

import com.jaecheop.backgollajyu.socialLogin.CustomOAuth2UserService;
import com.jaecheop.backgollajyu.socialLogin.Oauth2LoginSuccessHandler;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.apache.tomcat.util.file.ConfigurationSource;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;
import java.util.List;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {
    private final CustomOAuth2UserService customOAuth2UserService;

    @Bean
    CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowCredentials(true);
        configuration.setAllowedOrigins(List.of("http://localhost:5173"));
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE"));
        configuration.setAllowedHeaders(List.of("*"));
        configuration.setExposedHeaders(Arrays.asList("set-cookie"));
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http.csrf(AbstractHttpConfigurer::disable); // csrf
//        http.cors(AbstractHttpConfigurer::disable); // cors
        http.cors(httpSecurityCorsConfigurer -> httpSecurityCorsConfigurer.configurationSource(corsConfigurationSource()));
        http.authorizeHttpRequests(
                authorizeRequests ->
                        authorizeRequests.anyRequest().permitAll()
        );
//        http.sessionManagement(session -> session
//                        .sessionCreationPolicy(SessionCreationPolicy.ALWAYS)
//                        .sessionFixation().migrateSession()
//
//                );



        http
                .sessionManagement(session -> session
                        .sessionCreationPolicy(SessionCreationPolicy.IF_REQUIRED)
                        .sessionFixation().migrateSession()
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
//                        .defaultSuccessUrl("http://localhost:5173/")// 리다이렉트 할 URL
        );

        // 여기서부터 로그아웃 API 내용~!
        http.logout(logout ->
                        logout.logoutUrl("/api/members/logout")   // 로그아웃 처리 URL (= form action url)
                                //.logoutSuccessUrl("/login") // 로그아웃 성공 후 targetUrl,
                                // logoutSuccessHandler 가 있다면 효과 없으므로 주석처리.
                                .addLogoutHandler((request, response, authentication) -> {
                                    // 사실 굳이 내가 세션 무효화하지 않아도 됨.
                                    // LogoutFilter가 내부적으로 해줌.
                                    System.out.println("logout filter!!!!!!!!");
                                    HttpSession session = request.getSession();
                                    if (session != null) {
                                        session.invalidate();
                                        System.out.println("session invalidated!!!!!!!!");
                                    }
                                })  // 로그아웃 핸들러 추가
//                        .logoutSuccessHandler((request, response, authentication) -> {
//                            response.sendRedirect("/api/members/logout");
//                        }) // 로그아웃 성공 핸들러
                                .deleteCookies("gollajyu-cookie", "login-cookie")
        ); // 로그아웃 후 삭제할 쿠키 지정


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
