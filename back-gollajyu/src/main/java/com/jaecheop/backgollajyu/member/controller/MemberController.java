package com.jaecheop.backgollajyu.member.controller;

import com.jaecheop.backgollajyu.Info.model.CategoryInfoResDto;
import com.jaecheop.backgollajyu.Info.model.StatisticsSearchReqDto;
import com.jaecheop.backgollajyu.comment.model.CommentResDto;
import com.jaecheop.backgollajyu.member.model.SignUpReqDto;
import com.jaecheop.backgollajyu.member.service.MemberService;
import com.jaecheop.backgollajyu.vote.entity.Category;
import com.jaecheop.backgollajyu.vote.model.*;
import com.jaecheop.backgollajyu.vote.repository.CategoryRepository;
import com.jaecheop.backgollajyu.vote.service.VoteService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.jaecheop.backgollajyu.member.model.LoginReqDto;
import com.jaecheop.backgollajyu.member.model.LoginResDto;
import com.jaecheop.backgollajyu.member.service.MemberService;
import com.jaecheop.backgollajyu.vote.model.ResponseMessage;
import com.jaecheop.backgollajyu.vote.model.ServiceResult;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/members")
public class MemberController {
    private final MemberService memberService;
    private final VoteService voteService;
    private final CategoryRepository categoryRepository;

    /**
     * 회원가입
     * @param signUpReqDto
     * @return
     */
    @PostMapping("")
    public ResponseEntity<ResponseMessage> signUp(@RequestBody SignUpReqDto signUpReqDto){
       ServiceResult result =  memberService.signUp(signUpReqDto);

       if(!result.isResult()){
           return ResponseEntity.ok().body(ResponseMessage.fail(result.getMessage()));
       }

       return ResponseEntity.ok().body(ResponseMessage.success());
    }


    @PostMapping("/login")
    public ResponseEntity<ResponseMessage> login(@RequestBody LoginReqDto loginReqDto, HttpSession session){
        ServiceResult result = memberService.login(loginReqDto, session);
        if(!result.isResult()){
            return ResponseEntity.ok().body(ResponseMessage.fail(result.getMessage()));
        }
        return ResponseEntity.ok().body(ResponseMessage.success(result.getData()));
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

    @GetMapping("/{memberId}/recommends")
    public ResponseEntity<List<Map<String, String>>> crawling(
            @PathVariable Long memberId) {

        List<Map<String, String>> crawlingResult = memberService.crawlNaverSearchResults("기능성+신발");


        return new ResponseEntity<>(crawlingResult, HttpStatus.OK);

    }
}