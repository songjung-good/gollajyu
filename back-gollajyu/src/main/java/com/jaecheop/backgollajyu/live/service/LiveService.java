package com.jaecheop.backgollajyu.live.service;

import com.jaecheop.backgollajyu.live.entity.Live;
import com.jaecheop.backgollajyu.live.entity.LiveVoteItem;
import com.jaecheop.backgollajyu.live.model.LiveStartReqDto;
import com.jaecheop.backgollajyu.live.repository.LiveRepository;
import com.jaecheop.backgollajyu.live.repository.LiveVoteItemRepository;
import com.jaecheop.backgollajyu.member.repostory.MemberRepository;
import com.jaecheop.backgollajyu.vote.model.ServiceResult;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class LiveService {

    private final MemberRepository memberRepository;
    private final LiveRepository liveRepository;
    private final LiveVoteItemRepository liveVoteItemRepository;

    @Transactional
    public ServiceResult<Void> startLive(LiveStartReqDto liveStartReqDto) {
        // 멤버 조회
        return memberRepository.findById(liveStartReqDto.getMemberId())
                .map(member -> {
                    // 라이브 방송 생성 및 저장
                    Live live = liveRepository.save(Live.builder()
                            .member(member)
                            .title(liveStartReqDto.getLiveTitle())
                            .imgUrl(liveStartReqDto.getLiveImgUrl())
                            .count(0L)
                            .build());

                    // 라이브 투표 아이템 생성 및 저장
                    liveStartReqDto.getLiveVoteItemDtoList().forEach(item -> {
                        LiveVoteItem liveVoteItem = liveVoteItemRepository.save(LiveVoteItem.builder()
                                .live(live)
                                .imgUrl(item.getImgUrl())
                                .description(item.getDescription())
                                .count(0L)
                                .build());
                    });

                    return new ServiceResult<Void>().success();
                })
                .orElseGet(() -> new ServiceResult<Void>().fail("Member not found"));
    }
}
