package com.jaecheop.backgollajyu.live.model;

import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class LiveVoteItemResDto {
    private Long id;
    private String imgUrl;
    private String description;
    private Long count;
}
