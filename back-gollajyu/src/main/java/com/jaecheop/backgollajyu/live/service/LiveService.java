package com.jaecheop.backgollajyu.live.service;

import com.jaecheop.backgollajyu.exception.NotEnoughPointException;
import com.jaecheop.backgollajyu.live.entity.Live;
import com.jaecheop.backgollajyu.live.entity.LiveVoteItem;
import com.jaecheop.backgollajyu.live.model.LiveStartReqDto;
import com.jaecheop.backgollajyu.live.repository.LiveRepository;
import com.jaecheop.backgollajyu.live.repository.LiveVoteItemRepository;
import com.jaecheop.backgollajyu.member.entity.Member;
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
        // 멤버 ID로 이미 라이브 방송이 존재하는지 확인
        if (liveRepository.existsByMemberId(liveStartReqDto.getMemberId())) {
            return new ServiceResult<Void>().fail("이미 라이브 방송이 존재합니다.");
        }

        // 멤버 조회
        Member member = memberRepository.findById(liveStartReqDto.getMemberId())
                .orElse(null);

        if (member == null) {
            return new ServiceResult<Void>().fail("Member not found");
        }

        // 포인트 차감 로직
        try {
            member.minusPoint(10L); // 라이브 방송 시작 시 필요한 포인트 차감
        } catch (NotEnoughPointException e) {
            return new ServiceResult<Void>().fail(e.getMessage());
        }

        // 멤버 조회
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
    }
}
