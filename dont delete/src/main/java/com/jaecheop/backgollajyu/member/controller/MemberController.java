package com.jaecheop.backgollajyu.member.controller;

import com.jaecheop.backgollajyu.Info.model.CategoryInfoResDto;
import com.jaecheop.backgollajyu.Info.model.StatisticsSearchReqDto;
import com.jaecheop.backgollajyu.comment.model.CommentResDto;
import com.jaecheop.backgollajyu.member.model.SignUpReqDto;
import com.jaecheop.backgollajyu.member.service.MemberService;
import com.jaecheop.backgollajyu.vote.model.*;
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

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/members")
public class MemberController {
    private final MemberService memberService;
    private final VoteService voteService;

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


    // Controller method to handle GET request for votes by member ID
    @GetMapping("/{memberId}/votes")
    public ResponseEntity<List<VoteResDto>> getVotesByMemberId(
            @PathVariable Long memberId,
            @RequestBody StatisticsSearchReqDto statisticsSearchReqDto) {
        List<VoteResDto> voteResDtoList = voteService.getVotesByMemberId(memberId, statisticsSearchReqDto);

        if (voteResDtoList.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(voteResDtoList, HttpStatus.OK);
        }
    }

    @GetMapping("/{memberId}/votes/participation")
    public ResponseEntity<List<VoteResDto>> getVotesByResultMemberId(
            @PathVariable Long memberId,
            @RequestBody StatisticsSearchReqDto statisticsSearchReqDto) {
        List<VoteResDto> voteResDtoList = voteService.getVotesByResultMemberId(memberId, statisticsSearchReqDto);
        if (voteResDtoList.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(voteResDtoList, HttpStatus.OK);
        }
    }

    @GetMapping("/{memberId}/votes/likes")
    public ResponseEntity<List<VoteResDto>> getLikedVotesByMemberId(
            @PathVariable Long memberId,
            @RequestBody StatisticsSearchReqDto statisticsSearchReqDto) {
        List<VoteResDto> voteResDtoList = voteService.getLikedVotesByMemberId(memberId, statisticsSearchReqDto);

        if (voteResDtoList.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(voteResDtoList, HttpStatus.OK);
        }
    }
    @GetMapping("/{memberId}/comments")
    public ResponseEntity<List<CommentResDto>> getVotesByCommentMemberId(
            @PathVariable Long memberId,
            @RequestBody StatisticsSearchReqDto statisticsSearchReqDto) {
        List<CommentResDto> voteResDtoList = voteService.findVotesByCommentMemberId(memberId, statisticsSearchReqDto);
        if (voteResDtoList.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(voteResDtoList, HttpStatus.OK);
        }
    }

    @GetMapping("/{memberId}/votes/statistics")
    public ResponseEntity<List<CategoryInfoResDto>> statisticMemberResult(
            @PathVariable Long memberId,
            @RequestParam(required = false) Integer categoryId) {

        List<CategoryInfoResDto> categoryInfoResDtoList = memberService.makeCategoryInfoResDto(memberId, categoryId);
        if (categoryInfoResDtoList.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(categoryInfoResDtoList, HttpStatus.OK);
        }
    }
}