package com.jaecheop.backgollajyu.live.model;

import lombok.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class LiveStartReqDto {
    private Long sessionId;
    private Long memberId;
    private String liveTitle;
    private MultipartFile liveImgUrl;
    List<LiveVoteItemDto> liveVoteItemDtoList;
}
