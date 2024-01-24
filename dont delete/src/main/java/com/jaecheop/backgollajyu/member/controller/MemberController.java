package com.jaecheop.backgollajyu.member.controller;

import com.jaecheop.backgollajyu.comment.model.CommentResDto;
import com.jaecheop.backgollajyu.member.model.SignUpReqDto;
import com.jaecheop.backgollajyu.member.service.MemberService;
import com.jaecheop.backgollajyu.vote.model.*;
import com.jaecheop.backgollajyu.vote.service.VoteService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import com.jaecheop.backgollajyu.member.model.LoginReqDto;
import com.jaecheop.backgollajyu.member.model.LoginResDto;
import com.jaecheop.backgollajyu.member.service.MemberService;
import com.jaecheop.backgollajyu.vote.model.ResponseMessage;
import com.jaecheop.backgollajyu.vote.model.ServiceResult;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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


    // Controller method to handle GET request for votes by member ID
    @GetMapping("/{memberId}/votes")
    public ResponseEntity<List<VoteResDto>> getVotesByMemberId(@PathVariable Long memberId) {
        List<VoteResDto> voteResDtoList = voteService.getVotesByMemberId(memberId);

        if (voteResDtoList.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(voteResDtoList, HttpStatus.OK);
        }
    }

    @GetMapping("/{memberId}/votes/participation")
    public ResponseEntity<List<VoteResDto>> getVotesByResultMemberId(@PathVariable Long memberId) {
        List<VoteResDto> voteResDtoList = voteService.getVotesByResultMemberId(memberId);
        if (voteResDtoList.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(voteResDtoList, HttpStatus.OK);
        }
    }

    @GetMapping("/{memberId}/votes/likes")
    public ResponseEntity<List<VoteResDto>> getLikedVotesByMemberId(@PathVariable Long memberId) {
        List<VoteResDto> voteResDtoList = voteService.getLikedVotesByMemberId(memberId);

        if (voteResDtoList.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(voteResDtoList, HttpStatus.OK);
        }
    }
    @GetMapping("/{memberId}/comments")
    public ResponseEntity<List<CommentResDto>> getVotesByCommentMemberId(@PathVariable Long memberId) {
        List<CommentResDto> voteResDtoList = voteService.findVotesByCommentMemberId(memberId);
        if (voteResDtoList.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(voteResDtoList, HttpStatus.OK);
        }
    }

    @PostMapping("/login")
        public ResponseEntity<ResponseMessage> login(@RequestBody LoginReqDto loginReqDto, HttpSession session){
            ServiceResult result = memberService.login(loginReqDto, session);
            if(!result.isResult()){
                return ResponseEntity.ok().body(ResponseMessage.fail(result.getMessage()));
            }
            return ResponseEntity.ok().body(ResponseMessage.success(result.getData()));
        }
    }