package com.jaecheop.backgollajyu.member.service;

import com.jaecheop.backgollajyu.member.entity.Member;
import com.jaecheop.backgollajyu.member.model.Birthday;
import com.jaecheop.backgollajyu.member.model.LoginReqDto;
import com.jaecheop.backgollajyu.member.model.LoginResDto;
import com.jaecheop.backgollajyu.member.repostory.MemberRepository;
import com.jaecheop.backgollajyu.vote.model.ServiceResult;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class MemberService {

    private final MemberRepository memberRepository;

    private String getEncryptedPassword(String plainPassword) {
        return new BCryptPasswordEncoder().encode(plainPassword);
    }

    public ServiceResult login(LoginReqDto loginReqDto, HttpSession session) {
        // 사용자 존재 여부
        Optional<Member> optionalMember = memberRepository.findByEmail(loginReqDto.getEmail());
        if (optionalMember.isEmpty()) {
            return ServiceResult.fail("존재하지 않는 사용자입니다.");
        }
        Member member = optionalMember.get();

        // 비밀번호 암호화 및 일치 여부 - Bcrypt
        // TODO: 멤버 등록 시 비밀번호 저장할 때에도 BCRYPT를 사용해서 저장하고 여기 부분을 다시 테스트 해보자!
        if (!BCrypt.checkpw(loginReqDto.getPassword(), member.getPassword())) {
            return ServiceResult.fail("틀린 비밀번호입니다");
        }

        // 로그인 완료 - LoginResponseDto
        LoginResDto loginResDto = LoginResDto.builder()
                .memberId(member.getId())
                .email(member.getEmail())
                .typeName(member.getType().getTypeName())
                .nickname(member.getNickname())
                .birthday(
                        Birthday.builder()
                                .year(member.getBirthDay().getYear())
                                .month(member.getBirthDay().getMonth())
                                .day(member.getBirthDay().getDay())
                                .build()
                )
                .gender(member.getGender().name())
                .point(member.getPoint())
                .profileImgUrl(member.getProfileImgUrl())
                .build();

        // 1. 세션에 값 담아주기
        session.setAttribute("memberInfo", loginResDto);
        // 4. loginResDto에 멤버정보와 세션정보를 담아 반환하기
        return ServiceResult.success(loginResDto);
    }
}
