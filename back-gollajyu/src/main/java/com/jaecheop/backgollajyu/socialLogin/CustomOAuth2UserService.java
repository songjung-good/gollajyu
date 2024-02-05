package com.jaecheop.backgollajyu.socialLogin;

import com.jaecheop.backgollajyu.cookieUtils.CookieUtils;
import com.jaecheop.backgollajyu.member.entity.Member;
import com.jaecheop.backgollajyu.member.repostory.MemberRepository;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;

@RequiredArgsConstructor
@Service
public class CustomOAuth2UserService extends DefaultOAuth2UserService {
    private final MemberRepository memberRepository;

    private String getEncryptedPassword(String plainPassword) {
        return new BCryptPasswordEncoder().encode(plainPassword);
    }

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
//        System.out.println("userRequest = " + userRequest);
        // 우리 서버의 기본 정보 - registrationId로 어떤 OAUTH로 로그인 했는지 확인 가능
//        System.out.println("userRequest.getClientRegistration() = " + userRequest.getClientRegistration());
//        System.out.println("userRequest.getAccessToken().getTokenValue() = " + userRequest.getAccessToken().getTokenValue());

        OAuth2User oAuth2User = super.loadUser(userRequest);
        // 구글 로그인 버튼 클릭 -> 구글 로그인창 -> 로그인 완료 -> CODE리턴(oauth-client라이브러리)-> accesstoken 요청
        // userRequest 정보 -> loadUser함수호출-> 구글로부터 회원프로필받아줌
//        System.out.println("oAuth2User.getAttributes() = " + oAuth2User.getAttributes());

        // getAttributes()로 가져온 내용으로 회원가입 강제 진행
        String provider = userRequest.getClientRegistration().getRegistrationId(); // google
        String providerId = oAuth2User.getAttribute("sub");
        String nickName = oAuth2User.getAttribute("name");
        String email = oAuth2User.getAttribute("email");
        String profileImgUrl = oAuth2User.getAttribute("picture");
        String password = getEncryptedPassword("소셜 구글 로그인");

        Member member = null;

        Optional<Member> optionalMember = memberRepository.findByEmail(email);
        if (optionalMember.isEmpty()) {
            member = Member.builder()
                    .email(email)
                    .password(password)
                    .nickname(nickName)
                    .profileImgUrl(profileImgUrl)
                    .provider(provider)
                    .providerId(providerId)
                    .createAt(LocalDateTime.now())
                    .point(0L)
                    .build();
            memberRepository.save(member);
            System.out.println("111111111111111111111");

            Authentication authentication = new UsernamePasswordAuthenticationToken(member.getEmail(), "google");
            SecurityContextHolder.getContext().setAuthentication(authentication);
            System.out.println("2222222222222222222222");

        } else {
            // 예외 던져주기
            System.out.println("구글 회원가입을 한 사용자 입니다");
            // 바로 로그인이 됨!
            // TODO:: 로그인 시켜주기!!!!
            member = optionalMember.get();
            Authentication authentication = new UsernamePasswordAuthenticationToken(member.getEmail(), "google");
            SecurityContextHolder.getContext().setAuthentication(authentication);
//            Authentication result = SecurityContextHolder.getContext().getAuthentication();
//            System.out.println("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%");
//            System.out.println("result = " + result);

        }

        //        System.out.println("================================customoauth2userService2=======================");
//        System.out.println("oAuth2User = " + oAuth2User.getAttributes());
//        System.out.println(principalDetails);
//        System.out.println(" ============================================================================ ");
        PrincipalDetails principalDetails = new PrincipalDetails(member, oAuth2User.getAttributes());
        System.out.println("3333333333333333333333333333333333");
        return principalDetails;
    }


}
