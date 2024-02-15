package com.jaecheop.backgollajyu.vote.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.http.HttpStatus;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ResponseMessage<T> {
    private ResponseMessageHeader header;
    private T body;

    public ResponseMessage<T> success(T data) {

        return new ResponseMessage<>(
                ResponseMessageHeader.builder()
                        .result(true)
                        .status(HttpStatus.OK.value())
                        .message("")
                        .build()
                , data);
    }

    public ResponseMessage<T> success() {
        return this.success(null);
    }

//    public static ResponseMessage success(Object data) {
//        return ResponseMessage.builder()
//                .header(
//                        ResponseMessageHeader.builder()
//                                .result(true)
//                                .status(HttpStatus.OK.value())
//                                .message("")
//                                .build()
//                )
//                .body(data)
//                .build();
//    }
//
//    public static ResponseMessage success() {
//        return ResponseMessage.success(null);
//    }

//    public static ResponseMessage fail(String message, Object data) {
//        return ResponseMessage.builder()
//                .header(
//                        ResponseMessageHeader.builder()
//                                .result(false)
//                                .status(HttpStatus.BAD_REQUEST.value())
//                                .message(message)
//                                .build()
//                )
//                .body(data)
//                .build();
//    }

    //    public static ResponseMessage fail(String message) {
//        return ResponseMessage.fail(message, null);
//    }


    public ResponseMessage<T> fail(String message, T data) {
        return new ResponseMessage<>(
                ResponseMessageHeader.builder()
                        .result(false)
                        .status(HttpStatus.BAD_REQUEST.value())
                        .message(message)
                        .build()
                , data);
    }

    public ResponseMessage<T> fail(String message) {
        return this.fail(message, null);
    }
}