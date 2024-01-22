package com.jaecheop.backgollajyu.member.controller;

import com.jaecheop.backgollajyu.member.model.VoteResDto;
import com.jaecheop.backgollajyu.vote.entity.Vote;
import com.jaecheop.backgollajyu.vote.service.VoteService;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/members")
public class MemberController {

    private final VoteService voteService;

    // Controller method to handle GET request for votes by member ID
    @GetMapping("/{memberId}/votes")
    public ResponseEntity<List<VoteResDto>> getVotesByMemberId(@PathVariable Long memberId) {
        List<VoteResDto> voteResDtoList = voteService.getVotesByMemberId(memberId);

        // Check if the list is not empty and return the appropriate response
        if (!voteResDtoList.isEmpty()) {
            return ResponseEntity.ok(voteResDtoList);
        } else {
            // You can customize the response based on your requirements (e.g., return 404 if no votes found)
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/{memberId}/votes/participation")
    public ResponseEntity<List<VoteResDto>> getVotesByResultMemberId(@PathVariable Long memberId) {
        List<VoteResDto> voteResDtoList = voteService.getVotesByResultMemberId(memberId);
        return voteResDtoList;
    }

}
