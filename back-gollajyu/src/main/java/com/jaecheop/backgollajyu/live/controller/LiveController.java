package com.jaecheop.backgollajyu.live.controller;

import com.jaecheop.backgollajyu.member.model.SignUpReqDto;
import com.jaecheop.backgollajyu.vote.model.ResponseMessage;
import com.jaecheop.backgollajyu.vote.model.ServiceResult;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/lives")
public class LiveController {

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
}
