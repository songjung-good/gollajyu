package com.jaecheop.backgollajyu.vote.model;

import lombok.*;

@Builder
@Data
@AllArgsConstructor
@RequiredArgsConstructor
public class ServiceResult<T> {
    private boolean result;
    private String message;
//    private Object data;
    private T data;

    // fail
//    public static ServiceResult fail(String message){
//        return ServiceResult.builder()
//                .result(false)
//                .message(message)
//                .build();
//    }

    public ServiceResult fail(String message){
        return new ServiceResult(false, message, null);
    }

    // success
//    public static ServiceResult success(Object data){
//        return ServiceResult.builder()
//                .result(true)
//                .data(data)
//                .build();
//    }
//
//    public static ServiceResult success(){
//        return success(null);
//    }

    public ServiceResult<T> success(T data){
        return new ServiceResult<>(result, null, data);
    }

    public ServiceResult<T> success(){
        return success(null);
    }
}
