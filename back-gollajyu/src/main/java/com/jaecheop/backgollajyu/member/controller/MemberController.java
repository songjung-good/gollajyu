package com.jaecheop.backgollajyu.member.controller;

import com.jaecheop.backgollajyu.Info.model.CategoryInfoResDto;
import com.jaecheop.backgollajyu.Info.model.StatisticsSearchReqDto;
import com.jaecheop.backgollajyu.comment.model.CommentResDto;
import com.jaecheop.backgollajyu.member.entity.Member;
import com.jaecheop.backgollajyu.member.model.*;
import com.jaecheop.backgollajyu.member.repostory.MemberRepository;
import com.jaecheop.backgollajyu.member.service.MemberService;
import com.jaecheop.backgollajyu.socialLogin.PrincipalDetails;
import com.jaecheop.backgollajyu.vote.entity.Category;
import com.jaecheop.backgollajyu.vote.entity.VoteResult;
import com.jaecheop.backgollajyu.vote.model.*;
import com.jaecheop.backgollajyu.vote.repository.CategoryRepository;
import com.jaecheop.backgollajyu.vote.repository.VoteResultRepository;
import com.jaecheop.backgollajyu.vote.service.VoteService;
import io.swagger.v3.oas.annotations.Operation;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import com.jaecheop.backgollajyu.member.service.MemberService;
import com.jaecheop.backgollajyu.vote.model.ResponseMessage;
import com.jaecheop.backgollajyu.vote.model.ServiceResult;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;

import java.util.*;
import java.util.stream.Collectors;
import java.net.http.HttpResponse;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/members")
public class MemberController {
    private final MemberService memberService;
    private final VoteService voteService;
    private final CategoryRepository categoryRepository;
    private final VoteResultRepository voteResultRepository;
    private final MemberRepository memberRepository;

    /**
     * 회원가입
     *
     * @param signUpReqDto
     * @return
     */
    @PostMapping("")
    @Operation(summary = "Sign up method", description = "No body")
    public ResponseEntity<ResponseMessage> signUp(@RequestBody SignUpReqDto signUpReqDto) {
        ServiceResult result = memberService.signUp(signUpReqDto);

        ResponseMessage responseMessage = new ResponseMessage();

        if (!result.isResult()) {
            return ResponseEntity.ok().body(responseMessage.fail(result.getMessage()));
        }

        return ResponseEntity.ok().body(responseMessage.success());
    }


    @PostMapping("/login")
    @Operation(summary = "Login method", description = "returns LoginResDto")
    public ResponseEntity<ResponseMessage<LoginResDto>> login(@RequestBody(required = false) LoginReqDto loginReqDto, HttpSession session,
                                                 @AuthenticationPrincipal Object info) {
        System.out.println("###############################################");
        System.out.println("info = " + info);
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        System.out.println("email:::::::::::authentication.getPrincipal() = " + authentication.getPrincipal());

        ServiceResult<LoginResDto> result = memberService.login(loginReqDto, session);
        if (!result.isResult()) {
            return ResponseEntity.ok().body(new ResponseMessage<LoginResDto>().fail(result.getMessage()));
        }
        return ResponseEntity.ok().body(new ResponseMessage<LoginResDto>().success(result.getData()));
    }


    /**
     * 소셜 로그인 유저가 구글에서 받은 정보를 입력폼에 보여주기위해 요청하는  api
     * @param request
     * @return
     */
    @GetMapping("/addInfo")
    @Operation(summary = " 추가정보 입력 폼", description = "returns AddInfoResDto : 소셜로그인으로 받아온 정보를 입력해서 넣어주고(AddInfoResDto) 추가 정보를 입력받는 폼을 반환합니다.")
    public ResponseEntity<ResponseMessage<AddInfoResDto>> addInfo(HttpServletRequest request) {
        // 쿠키에서 string을 쪼개서 providerId를 가져옴
        System.out.println("4444444444444444444444444444444");
        Cookie[] cookieList = request.getCookies();
        String providerId = "";
        for (Cookie cookie : cookieList) {
            if (cookie.getName().equals("gollajyu-cookie")) {
                providerId = cookie.getValue().split("-")[1];
            }
        }
        // provider ID로 멤버 레포지토리에서 멤버 정보 찾아옴
        Optional<Member> optionalMember = memberRepository.findByProviderId(providerId);
        if (optionalMember.isEmpty()) {
            return ResponseEntity.ok().body(new ResponseMessage<AddInfoResDto>().fail("없는 사용자의 쿠키 정보 입니다."));
        }
        Member member = optionalMember.get();
        // 회원가입 폼에 가진 정보를 채워즘 - 채워진 값(이메일, 닉네임)은 수정 불가 했으면 합니다!
        AddInfoResDto addInfoResDto = AddInfoResDto.builder()
                .email(member.getEmail())
                .nickname(member.getNickname())
                .build();

        // 이 응답을 가지고 POST 컨트롤러를 하나 만들어서 비어있는 정보를 넣어 멤버 정보 업데이트 시킴(axios요청을 두번 보내야 한다는 뜻)
        return ResponseEntity.ok().body(new ResponseMessage<AddInfoResDto>().success(addInfoResDto));
    }

    // TODO: 로그아웃
    // getmapping - security context 에서 정보 인증 정보 삭제, 쿠키 삭제
    @GetMapping("/logout")
    @Operation(summary = "logout", description = "로그아웃에 성공하면 로그아웃 성공이라는 문자열을 반환합니다")
    public ResponseEntity<ResponseMessage<String>> logout(HttpServletRequest request){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        System.out.println("authentication = " + authentication);
        return ResponseEntity.ok().body(new ResponseMessage<String>().success("로그아웃 성공"));
    }

    /**
     * 소셜 로그인 후 추가 정보 받기
     * @param addInfoReqDto
     * @return
     */
    @PutMapping("")
    @Operation(summary = "멤버 정보 업데이트", description = "No body")
    public ResponseEntity<ResponseMessage> updateMember(@RequestBody AddInfoReqDto addInfoReqDto){
        // 소셜 로그인 추가 정보 저장
        ServiceResult result = memberService.updateMember(addInfoReqDto);

        if(!result.isResult()){
            return ResponseEntity.ok().body(new ResponseMessage<>().fail(result.getMessage()));
        }

        return ResponseEntity.ok().body(new ResponseMessage<>().success());


    }



    // 내가 작성한 투표 모아보기
    @GetMapping("/{memberId}/votes")
    @Operation(summary = "내가 작성한 투표 모아보기", description = "returns VoteResDtoList")
    public ResponseEntity<List<VoteResDto>> getVotesByMemberId(
            @PathVariable Long memberId) {
        List<VoteResDto> voteResDtoList = voteService.getVotesByMemberId(memberId);

        if (voteResDtoList.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(voteResDtoList, HttpStatus.OK);
        }
    }

    // 내가 참여한 투표
    @GetMapping("/{memberId}/votes/participation")
    @Operation(summary = "내가 참여한 투표 모아보기", description = "returns VoteREsDtoList")
    public ResponseEntity<List<VoteResDto>> getVotesByResultMemberId(
            @PathVariable Long memberId) {
        List<VoteResDto> voteResDtoList = voteService.findVotesByResultMemberId(memberId);
        if (voteResDtoList.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(voteResDtoList, HttpStatus.OK);
        }
    }

    // 내가 좋아요한 투표
    @GetMapping("/{memberId}/votes/likes")
    @Operation(summary = "내가 좋아요한 투표 보여주기", description = "returns VoteResDtoList")
    public ResponseEntity<List<VoteResDto>> getLikedVotesByMemberId(
            @PathVariable Long memberId) {
        List<VoteResDto> voteResDtoList = voteService.getLikedVotesByMemberId(memberId);

        if (voteResDtoList.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(voteResDtoList, HttpStatus.OK);
        }
    }

    // 내가 댓글쓴 투표
    @GetMapping("/{memberId}/comments")
    @Operation(summary = "내가 댓글 쓴 투표 모아보기", description = "returns VoteResDtoList")
    public ResponseEntity<List<CommentResDto>> getVotesByCommentMemberId(
            @PathVariable Long memberId) {
        List<CommentResDto> voteResDtoList = voteService.findVotesByCommentMemberId(memberId);
        if (voteResDtoList.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(voteResDtoList, HttpStatus.OK);
        }
    }


    // 카테고리별 통계?
    @GetMapping("/{memberId}/votes/statistics")
    @Operation(summary = "카테고리별 통계", description = "returns CategoryInfoMap")
    public ResponseEntity<Map<String, List<List<CategoryTagDto>>>> statisticMemberResult(
            @PathVariable Long memberId) {
        Map<String, List<List<CategoryTagDto>>> categoryInfoMap = new HashMap<>();
        List<Category> categories = categoryRepository.findAll();
        for (Category category : categories) {
            List<List<CategoryTagDto>> categoryInfoList = memberService.makeCategoryInfoMypage(memberId, category.getId());

            // <category.getName(), categoryInfoResDtoList>
            categoryInfoMap.put(category.getCategoryName(), categoryInfoList);
        }
        if (categoryInfoMap.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(categoryInfoMap, HttpStatus.OK);
        }
    }

    @GetMapping("/{memberId}/recommends")
    @Operation(summary = "크롤링", description = "returns crawlingResult : 멤버 아이디 기반 추천 사이트 크롤링")
    public ResponseEntity<List<Map<String, String>>> crawling(
            @PathVariable Long memberId) {

        List<CategoryTagDto> categoryTagDtoList = voteService.generateStatistics(voteResultRepository.findAllByMemberId(memberId), null);
        // Ensure there are at least two elements in the list
        CategoryTagDto secondLargestDto = new CategoryTagDto();
        if (categoryTagDtoList.size() >= 2) {
            // Sort the list in descending order based on the count
            List<CategoryTagDto> sortedList = categoryTagDtoList.stream()
                    .sorted(Comparator.comparing(CategoryTagDto::getCount).reversed())
                    .toList();

            // Get the second element from the sorted list
            secondLargestDto = sortedList.get(1);

        } else {
            // Handle the case where there are fewer than two elements in the list
            // You might want to throw an exception or handle it according to your requirements
        }
        String categoryNameAndTag = secondLargestDto.getCategory() + " " + secondLargestDto.getTag();

        System.out.println(categoryNameAndTag);
        List<Map<String, String>> crawlingResult = memberService.crawlNaverSearchResults(categoryNameAndTag);


        return new ResponseEntity<>(crawlingResult, HttpStatus.OK);

    }

}