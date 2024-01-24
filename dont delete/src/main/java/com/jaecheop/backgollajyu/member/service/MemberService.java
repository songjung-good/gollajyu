package com.jaecheop.backgollajyu.member.service;

import com.jaecheop.backgollajyu.member.entity.Member;
import com.jaecheop.backgollajyu.member.entity.Type;
import com.jaecheop.backgollajyu.member.model.Birthday;
import com.jaecheop.backgollajyu.member.model.Gender;
import com.jaecheop.backgollajyu.member.model.SignUpReqDto;
import com.jaecheop.backgollajyu.member.repostory.MemberRepository;
import com.jaecheop.backgollajyu.member.repostory.TypeRepository;
import com.jaecheop.backgollajyu.vote.model.ServiceResult;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class MemberService {

    private final MemberRepository memberRepository;
    private final TypeRepository typeRepository;

    private String getEncryptedPassword(String plainPassword) {
        return new BCryptPasswordEncoder().encode(plainPassword);
    }

    public ServiceResult signUp(SignUpReqDto signUpReqDto) {
        // 사용자 중복 여부
        Optional<Member> optionalMember = memberRepository.findByEmail(signUpReqDto.getEmail());
        if(optionalMember.isPresent()){
            return ServiceResult.fail("이미 존재하는 이메일입니다");
        }

        // 패스워드 일치 확인
        if(!signUpReqDto.getPassword().equals(signUpReqDto.getVerifyPassword())){
            return ServiceResult.fail("비밀번호가 일치하지 않습니다.");
        }

        // 일치할 경우 비밀번호 암호화
        String encryptedPassword = getEncryptedPassword(signUpReqDto.getPassword());

        // 소비성향 존재 확인
        Optional<Type> optionalType = typeRepository.findById(signUpReqDto.getTypeId());
        if(optionalType.isEmpty()){
            return ServiceResult.fail("존재하지 않는 소비성향입니다.");
        }

        Type type = optionalType.get();

        // gender 설정
        Gender gender = null;
        if(signUpReqDto.getGender().equals("F")){
            gender = Gender.FEMALE;
        } else{
            gender = Gender.MALE;
        }

        // 멤버의 기본 정보 및 소비성향 저장
        Member member = Member.builder()
                .email(signUpReqDto.getEmail())
                .type(type)
                .password(encryptedPassword)
                .nickname(signUpReqDto.getNickname())
                .birthDay(
                        Birthday.builder()
                        .year(signUpReqDto.getYear())
                        .month(signUpReqDto.getMonth())
                        .day(signUpReqDto.getDay())
                        .build()
                )
                .gender(gender)
                .point(0L)
                .profileImgUrl(type.getTypeImgUrl())
                .createAt(LocalDateTime.now())
                .build();

        memberRepository.save(member);
        return ServiceResult.success();
    }
}
