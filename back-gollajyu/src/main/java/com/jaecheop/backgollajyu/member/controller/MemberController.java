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
import com.jaecheop.backgollajyu.vote.model.*;
import com.jaecheop.backgollajyu.vote.repository.CategoryRepository;
import com.jaecheop.backgollajyu.vote.service.VoteService;
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

import java.net.http.HttpResponse;
import java.util.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/members")
public class MemberController {
    private final MemberService memberService;
    private final VoteService voteService;
    private final CategoryRepository categoryRepository;
    private final MemberRepository memberRepository;

    /**
     * 회원가입
     *
     * @param signUpReqDto
     * @return
     */
    @PostMapping("")
    public ResponseEntity<ResponseMessage> signUp(@RequestBody SignUpReqDto signUpReqDto) {
        ServiceResult result = memberService.signUp(signUpReqDto);

        if (!result.isResult()) {
            return ResponseEntity.ok().body(ResponseMessage.fail(result.getMessage()));
        }

        return ResponseEntity.ok().body(ResponseMessage.success());
    }


    @PostMapping("/login")
    public ResponseEntity<ResponseMessage> login(@RequestBody(required = false) LoginReqDto loginReqDto, HttpSession session,
                                                 @AuthenticationPrincipal Object info) {
        System.out.println("###############################################");
        System.out.println("info = " + info);
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        System.out.println("email:::::::::::authentication.getPrincipal() = " + authentication.getPrincipal());

        ServiceResult result = memberService.login(loginReqDto, session);
        if (!result.isResult()) {
            return ResponseEntity.ok().body(ResponseMessage.fail(result.getMessage()));
        }
        return ResponseEntity.ok().body(ResponseMessage.success(result.getData()));
    }

    @GetMapping("/socialLogin")
    public ResponseEntity<ResponseMessage> socialLogin(Authentication authentication) {
        System.out.println("111111111111111111111111111111");
        System.out.println("authentication = " + authentication);
        System.out.println("222222222222222222222222222222");
//        PrincipalDetails principalDetails = (PrincipalDetails) authentication;
        System.out.println("333333333333333333333333333333");
//        System.out.println("principalDetails.getAttributes() = " + principalDetails.getAttributes());
        System.out.println("authentication.getPrincipal() = " + authentication.getPrincipal());
        Object principal = authentication.getPrincipal();
        System.out.println("principal = " + principal);
        System.out.println("4444444444444444444444444444444444");
//        System.out.println("principalDetails.getMember() = " + principalDetails.getMember());
        System.out.println("5555555555555555555555555555555555");
        return ResponseEntity.ok().body(ResponseMessage.success());

    }

    @GetMapping("/addInfo")
    public ResponseEntity<ResponseMessage> addInfo(HttpServletRequest request) {
        // 쿠키에서 string을 쪼개서 providerId를 가져옴
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
            return ResponseEntity.ok().body(ResponseMessage.fail("없는 사용자의 쿠키 정보 입니다."));
        }
        Member member = optionalMember.get();
        // 회원가입 폼에 가진 정보를 채워즘 - 채워진 값(이메일, 닉네임)은 수정 불가 했으면 합니다!
        AddInfoResDto addInfoResDto = AddInfoResDto.builder()
                .email(member.getEmail())
                .nickname(member.getNickname())
                .build();

        // TODO::  POST 컨트롤러를 하나 만들어서 비어있는 정보를 넣어 멤버 정보 업데이트 시킴
        return ResponseEntity.ok().body(ResponseMessage.success(addInfoResDto));
    }

    @PutMapping("")
    public ResponseEntity<ResponseMessage> updateMember(@RequestBody AddInfoReqDto addInfoReqDto){
        // TODO: Member Service에서 업데이트
        ServiceResult result = memberService.updateMember(addInfoReqDto);

        if(!result.isResult()){
            return ResponseEntity.ok().body(ResponseMessage.fail(result.getMessage()));
        }

        return ResponseEntity.ok().body(ResponseMessage.success());


    }



    // 내가 작성한 투표 모아보기
    @GetMapping("/{memberId}/votes")
    public ResponseEntity<List<VoteResDto>> getVotesByMemberId(
            @PathVariable Long memberId) {
        List<VoteResDto> voteResDtoList = voteService.getVotesByMemberId(memberId);

        if (voteResDtoList.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(voteResDtoList, HttpStatus.OK);
        }
    }

    @GetMapping("/{memberId}/votes/participation")
    public ResponseEntity<List<VoteResDto>> getVotesByResultMemberId(
            @PathVariable Long memberId) {
        List<VoteResDto> voteResDtoList = voteService.findVotesByResultMemberId(memberId);
        if (voteResDtoList.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(voteResDtoList, HttpStatus.OK);
        }
    }

    @GetMapping("/{memberId}/votes/likes")
    public ResponseEntity<List<VoteResDto>> getLikedVotesByMemberId(
            @PathVariable Long memberId) {
        List<VoteResDto> voteResDtoList = voteService.getLikedVotesByMemberId(memberId);

        if (voteResDtoList.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(voteResDtoList, HttpStatus.OK);
        }
    }

    @GetMapping("/{memberId}/comments")
    public ResponseEntity<List<CommentResDto>> getVotesByCommentMemberId(
            @PathVariable Long memberId) {
        List<CommentResDto> voteResDtoList = voteService.findVotesByCommentMemberId(memberId);
        if (voteResDtoList.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(voteResDtoList, HttpStatus.OK);
        }
    }

    @GetMapping("/{memberId}/votes/statistics")
    public ResponseEntity<Map<String, List<Map<String, Long>>>> statisticMemberResult(
            @PathVariable Long memberId) {
        Map<String, List<Map<String, Long>>> categoryInfoMap = new HashMap<>();
        List<Category> categories = categoryRepository.findAll();
        for (Category category : categories) {
            List<Map<String, Long>> categoryInfoList = memberService.makeCategoryInfoMypage(memberId, category.getId());

            // <category.getName(), categoryInfoResDtoList>
            categoryInfoMap.put(category.getCategoryName(), categoryInfoList);
        }
        if (categoryInfoMap.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(categoryInfoMap, HttpStatus.OK);
        }
    }
}