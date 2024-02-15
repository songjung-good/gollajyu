package com.jaecheop.backgollajyu.live.model;

import lombok.*;

@Builder
@Getter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class LiveListDto {
    private Long id;
    private String title;
    private String nickName;
    private Long count;
    private String imgUrl;
    private String sessionId;
}
