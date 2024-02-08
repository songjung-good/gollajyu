package com.jaecheop.backgollajyu.live.model;

import lombok.*;
import org.springframework.web.multipart.MultipartFile;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class LiveVoteItemResDto {
    private String imgUrl;
    private String description;
    private Long count;
}
