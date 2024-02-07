package com.jaecheop.backgollajyu.live.controller;

import com.jaecheop.backgollajyu.live.model.LiveListDto;
import com.jaecheop.backgollajyu.live.model.LiveStartReqDto;
import com.jaecheop.backgollajyu.live.service.LiveService;
import com.jaecheop.backgollajyu.vote.model.ResponseMessage;
import com.jaecheop.backgollajyu.vote.model.ServiceResult;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/lives")
public class LiveController {

    private final LiveService liveService;

    @Value("${file.dir}")
    private String fileDir;

    // 라이브 방송 생성
    @PostMapping("")
    @Operation(summary = "라이브 방송 생성", description = "No body")
    public ResponseEntity<ResponseMessage<?>> startLive(LiveStartReqDto liveStartReqDto) {
        ServiceResult<?> result = liveService.startLive(liveStartReqDto, fileDir);

        ResponseMessage<?> responseMessage = new ResponseMessage<>();

        if (!result.isResult()) {
            return ResponseEntity.ok().body(responseMessage.fail(result.getMessage()));
        }

        return ResponseEntity.ok().body(responseMessage.success());
    }

    // 라이브 방송 전체 조회
    @GetMapping("")
    @Operation(summary = "라이브 방송 리스트 조회", description = "returns LiveListDto")
    public ResponseEntity<ResponseMessage<List<LiveListDto>>> getAllLives() {
        ServiceResult<List<LiveListDto>> result = liveService.findAllLives();

        ResponseMessage<List<LiveListDto>> responseMessage = new ResponseMessage<>();
        if (!result.isResult()) {
            return ResponseEntity.ok().body(responseMessage.fail(result.getMessage()));
        }

        return ResponseEntity.ok().body(responseMessage.success(result.getData()));
    }
}
