package com.jaecheop.backgollajyu.vote.controller;

import com.jaecheop.backgollajyu.vote.entity.Vote;
import com.jaecheop.backgollajyu.vote.model.*;
import com.jaecheop.backgollajyu.vote.repository.VoteResultRepository;
import com.jaecheop.backgollajyu.vote.service.VoteService;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.hibernate.annotations.Parameter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.parameters.P;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequiredArgsConstructor
@RequestMapping("/votes")
public class VoteController {

    private final VoteService voteService;

    @Value("${file.dir}")
    private String fileDir;
    // TODO: 투표 생성 시 받아온 투표 아이템 이미지 저장 done
    // TODO: 투표 상세에서 저장된 이미지 파일 전달
    // TODO: main GET들...

    /**
     * 투표 생성 - create
     *
     * @return
     */
    @PostMapping("")
    public ResponseEntity<ResponseMessage> addVote(VoteReqDto voteReqDto) {

        // 서비스단으로 넘겨서 로직 처리 -> ServiceResult(result, message, object-data)로 반환
        ServiceResult result = voteService.addVote(voteReqDto, fileDir);

        // 받아온 결과에 따라 에러 메세지 출력하거나 return 하거나
        if (!result.isResult()) {
            return ResponseEntity.ok().body(ResponseMessage.fail(result.getMessage()));
        }
        return ResponseEntity.ok().body(ResponseMessage.success());
    }

    /**
     * 메인에서 투표하기
     * @param choiceReqDto
     * @return
     */
    @PostMapping("/choices")
    public ResponseEntity<ResponseMessage> choiceMain(@RequestBody ChoiceReqDto choiceReqDto) {

        ServiceResult result = voteService.choiceMain(choiceReqDto);

        if (!result.isResult()) {
            return ResponseEntity.ok().body(ResponseMessage.fail(result.getMessage()));
        }
        return ResponseEntity.ok().body(ResponseMessage.success());

    }

    /**
     * 투표 상세
     * @param voteDetailReqDto
     * @return
     */

    @GetMapping("/{voteId}")
    public ResponseEntity<ResponseMessage> voteDetail(@PathVariable String voteId, @RequestBody VoteDetailReqDto voteDetailReqDto){

        ServiceResult result = voteService.voteDetail(voteDetailReqDto);

        if(!result.isResult()){
            return ResponseEntity.ok().body(ResponseMessage.fail(result.getMessage()));
        }


        return ResponseEntity.ok().body(ResponseMessage.success(result.getData()));

    }

    @PostMapping("/test")
    public String test(MultipartFile file) throws IOException {
       String path =  voteService.test(file, fileDir);
        System.out.println("path = " + path);
        return path;
    }

}
