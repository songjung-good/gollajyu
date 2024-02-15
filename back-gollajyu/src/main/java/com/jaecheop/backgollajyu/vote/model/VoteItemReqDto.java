package com.jaecheop.backgollajyu.vote.model;

import com.jaecheop.backgollajyu.vote.entity.VoteItem;
import lombok.*;
import org.springframework.web.multipart.MultipartFile;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class VoteItemReqDto {
    private MultipartFile voteItemImg;
    private String voteItemDesc;
    private Long price;


}
