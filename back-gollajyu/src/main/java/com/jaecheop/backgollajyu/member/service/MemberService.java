package com.jaecheop.backgollajyu.member.service;

import com.jaecheop.backgollajyu.Info.model.CategoryInfoResDto;
import com.jaecheop.backgollajyu.Info.model.StatisticsSearchReqDto;
import com.jaecheop.backgollajyu.member.entity.Member;
import com.jaecheop.backgollajyu.member.entity.Type;
import com.jaecheop.backgollajyu.member.model.*;
import com.jaecheop.backgollajyu.member.repostory.MemberRepository;
import com.jaecheop.backgollajyu.member.repostory.TypeRepository;
import com.jaecheop.backgollajyu.vote.entity.Category;
import com.jaecheop.backgollajyu.vote.model.ServiceResult;
import com.jaecheop.backgollajyu.vote.repository.CategoryRepository;
import com.jaecheop.backgollajyu.vote.repository.VoteResultRepository;
import com.jaecheop.backgollajyu.vote.service.VoteService;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class MemberService {

    private final MemberRepository memberRepository;
    private final TypeRepository typeRepository;
    private final CategoryRepository categoryRepository;
    private final VoteService voteService;
    private final VoteResultRepository voteResultRepository;

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
    
    public ServiceResult login(LoginReqDto loginReqDto, HttpSession session) {
        // 사용자 존재 여부
        Optional<Member> optionalMember = memberRepository.findByEmail(loginReqDto.getEmail());
        if (optionalMember.isEmpty()) {
            return ServiceResult.fail("존재하지 않는 사용자입니다.");
        }
        Member member = optionalMember.get();

        // 비밀번호 암호화 및 일치 여부 - Bcrypt
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




    // myPage 카테고리별 나의 투표 비율
    public List<Map<String, Long>> makeCategoryInfoMypage(Long memberId, Integer categoryId) {

        List<Category> categories = (categoryId != null)
                ? categoryRepository.findAllById(categoryId) : categoryRepository.findAll();

        List<Map<String, Long>> sortedList = null;

        for (Category category : categories) {
            Map<String, Long> categoryStatistics = voteService.generateStatistics(voteResultRepository.findAllByMemberIdAndCategoryId(memberId, category.getId()), null);

            List<Map.Entry<String, Long>> entryList = new ArrayList<>(categoryStatistics.entrySet());

            // Sort the list based on values
            entryList.sort(Map.Entry.comparingByValue(Comparator.reverseOrder()));

            // Create a new list of maps from the sorted list
            sortedList = entryList.stream()
                    .map(entry -> Collections.singletonMap(entry.getKey(), entry.getValue()))
                    .collect(Collectors.toList());

            // Print the result
            sortedList.forEach(System.out::println);
        }

        return sortedList;
    }
}
