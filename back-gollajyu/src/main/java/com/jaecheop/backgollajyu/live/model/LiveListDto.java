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
    private Long count;
    private String imgUrl;
}
