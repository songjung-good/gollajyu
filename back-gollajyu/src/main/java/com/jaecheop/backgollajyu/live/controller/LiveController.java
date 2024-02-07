package com.jaecheop.backgollajyu.live.controller;

import com.jaecheop.backgollajyu.live.model.LiveDetailResDto;
import com.jaecheop.backgollajyu.live.model.LiveListDto;
import com.jaecheop.backgollajyu.live.model.LiveStartReqDto;
import com.jaecheop.backgollajyu.live.service.LiveService;
import com.jaecheop.backgollajyu.vote.model.ResponseMessage;
import com.jaecheop.backgollajyu.vote.model.ServiceResult;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/lives")
public class LiveController {

    private final LiveService liveService;

    @Value("${file.dir}")
    private String fileDir;

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

    @GetMapping("")
    @Operation(summary = "라이브 방송 리스트 조회", description = "returns LiveListDto")
    public ResponseEntity<ResponseMessage<List<LiveListDto>>> listLive() {
        ServiceResult<List<LiveListDto>> result = liveService.findAllLives();

        ResponseMessage<List<LiveListDto>> responseMessage = new ResponseMessage<>();
        if (!result.isResult()) {
            return ResponseEntity.ok().body(responseMessage.fail(result.getMessage()));
        }

        return ResponseEntity.ok().body(responseMessage.success(result.getData()));
    }

    @DeleteMapping("/{sessionId}")
    @Operation(summary = "라이브 방송 삭제", description = "No body")
    public ResponseEntity<ResponseMessage<Void>> deleteLive(@PathVariable Long sessionId) {
        ServiceResult<Void> result = liveService.deleteLiveRoom(sessionId);

        ResponseMessage<Void> responseMessage = new ResponseMessage<>();
        if (!result.isResult()) {
            return ResponseEntity.ok().body(responseMessage.fail(result.getMessage()));
        }

        return ResponseEntity.ok().body(responseMessage.success());
    }

    @GetMapping("/{liveId}")
    @Operation(summary = "라이브 방송 상세 조회", description = "returns LiveDetailDto")
    public ResponseEntity<ResponseMessage<LiveDetailResDto>> detailLive(@PathVariable Long liveId) {
        ServiceResult<LiveDetailResDto> result = liveService.findLiveDetail(liveId);

        ResponseMessage<LiveDetailResDto> responseMessage = new ResponseMessage<>();
        if (!result.isResult()) {
            return ResponseEntity.ok().body(responseMessage.fail(result.getMessage()));
        }

        return ResponseEntity.ok().body(responseMessage.success(result.getData()));
    }

    @PostMapping("/{liveId}/enter/{memberId}")
    @Operation(summary = "라이브 방송 입장", description = "No body")
    public ResponseEntity<?> enterLive(@PathVariable Long liveId, @PathVariable Long memberId) {
        if (!liveService.enterLive(liveId, memberId)) {
            // 이미 참여 중인 경우, 오류 메시지와 함께 409 Conflict 상태 코드 반환
            return ResponseEntity.status(HttpStatus.CONFLICT).body(new ResponseMessage<Void>().fail("이미 라이브 방송에 참여 중입니다."));
        }
        return ResponseEntity.ok().body(new ResponseMessage<Void>().success());
    }

    @PostMapping("/{liveId}/exit/{memberId}")
    @Operation(summary = "라이브 방송 퇴장", description = "No body")
    public ResponseEntity<?> exitLive(@PathVariable Long liveId, @PathVariable Long memberId) {
        boolean success = liveService.exitLive(liveId, memberId);

        if (!success) {
            // 참여자 정보가 존재하지 않는 경우, 404 Not Found 상태 코드와 오류 메시지 반환
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ResponseMessage<Void>().fail("참여자 정보가 존재하지 않습니다."));
        }

        return ResponseEntity.ok().body(new ResponseMessage<Void>().success());
    }
}
