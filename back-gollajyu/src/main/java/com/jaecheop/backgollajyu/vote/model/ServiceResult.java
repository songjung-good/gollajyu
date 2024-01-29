package com.jaecheop.backgollajyu.vote.model;

import lombok.*;

@Builder
@Data
@AllArgsConstructor
@RequiredArgsConstructor
public class ServiceResult {
    private boolean result;
    private String message;
    private Object data;

    // fail
    public static ServiceResult fail(String message){
        return ServiceResult.builder()
                .result(false)
                .message(message)
                .build();
    }

    // success
    public static ServiceResult success(Object data){
        return ServiceResult.builder()
                .result(true)
                .data(data)
                .build();
    }

    public static ServiceResult success(){
        return success(null);
    }
}
