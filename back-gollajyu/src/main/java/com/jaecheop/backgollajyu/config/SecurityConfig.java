package com.jaecheop.backgollajyu.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http.csrf(AbstractHttpConfigurer::disable); // csrf
        http.cors(AbstractHttpConfigurer::disable); // cors
        http.authorizeHttpRequests(
                authorizeRequests ->
                        authorizeRequests.anyRequest().permitAll()
        ); // 모든 경로에 대한 요청 인증 없이 허용
//        http
//                .authorizeHttpRequests(
//                        authorize -> authorize
//                                .requestMatchers("/member/join").permitAll()
//                                .requestMatchers("/member/login").permitAll()
//                                .anyRequest().authenticated()
//                );
        return http.build();
    }
}
