package com.jaecheop.backgollajyu.member.service;

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
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import org.jsoup.select.Elements;
import java.io.IOException;
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



    public List<Map<String, String>> crawlNaverSearchResults(String query) {
        String url = "https://search.naver.com/search.naver?query=" + query;
        List<Map<String, String>> resultList = new ArrayList<>();

        try {
            Document document = Jsoup.connect(url).get();

            // 큰 박스 하나 지정
            Elements linkElements = document.select("div.title_url_area");

            int maxResults = Math.min(10, linkElements.size());
            for (int i = 0; i < maxResults; i++) {
                // 각 div.title_url_area 요소 안에서 첫번째 a.lnk_head 선택
                Element linkElement = linkElements.get(i).selectFirst("a.lnk_head");

                // 링크 URL 가져오기 lnk_head에 붙어있는 url
                String linkUrl = (linkElement != null) ? linkElement.attr("href") : "";

                // 헤드라인 텍스트 가져오기 이것도 1개만 이건 여러개 해도 가능할 듯?
                String headlineText = (linkElement != null) ? linkElement.selectFirst("span.lnk_tit:first-child").text() : "";

                // 맵 생성 및 매핑
                Map<String, String> resultMap = new HashMap<>();
                resultMap.put("url", linkUrl);
                resultMap.put("text", headlineText);

                // 리스트에 추가
                resultList.add(resultMap);
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
        return resultList;
    }
}
