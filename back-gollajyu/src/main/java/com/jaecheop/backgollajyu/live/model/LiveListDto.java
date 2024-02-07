package com.jaecheop.backgollajyu.live.model;

import lombok.*;

@Builder
@Getter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class LiveListDto {
    private Long id;
    private Long memberId;
    private String title;
    private Long count;
    private String imgUrl;
}
