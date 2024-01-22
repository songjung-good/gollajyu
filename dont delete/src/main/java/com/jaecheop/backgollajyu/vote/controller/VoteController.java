package com.jaecheop.backgollajyu.vote.controller;

import com.jaecheop.backgollajyu.vote.model.ServiceResult;
import com.jaecheop.backgollajyu.vote.model.VoteReqDto;
import com.jaecheop.backgollajyu.vote.service.VoteService;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class VoteController {

    private final VoteService voteService;

    /**
     * 투표 생성 - create
     * @return
     */
    @PostMapping("/votes")
    public ResponseEntity<?> addVote(@RequestBody VoteReqDto voteReqDto){

        // voteReqDto 잘 받아오는지 확인
        System.out.println(voteReqDto);

        // 서비스단으로 넘겨서 로직 처리 -> ServiceResult(result, message, object-data)로 반환
        ServiceResult result = voteService.addVote(voteReqDto);
        // 받아온 결과에 따라 에러 메세지 출력하거나 return 하거나
        if(!result.isResult()){
            return ResponseEntity.ok().body();
        }
        return ResponseEntity.ok().body(ServiceResult.success());
    }

}
