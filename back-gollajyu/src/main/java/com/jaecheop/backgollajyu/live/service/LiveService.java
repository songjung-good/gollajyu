package com.jaecheop.backgollajyu.live.service;

import com.jaecheop.backgollajyu.exception.NotEnoughPointException;
import com.jaecheop.backgollajyu.live.entity.Live;
import com.jaecheop.backgollajyu.live.entity.LiveVoteItem;
import com.jaecheop.backgollajyu.live.model.LiveListDto;
import com.jaecheop.backgollajyu.live.model.LiveStartReqDto;
import com.jaecheop.backgollajyu.live.model.LiveVoteItemDto;
import com.jaecheop.backgollajyu.live.repository.LiveRepository;
import com.jaecheop.backgollajyu.live.repository.LiveVoteItemRepository;
import com.jaecheop.backgollajyu.member.entity.Member;
import com.jaecheop.backgollajyu.member.repostory.MemberRepository;
import com.jaecheop.backgollajyu.vote.model.ServiceResult;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.PropertySource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@PropertySource("classpath:application.properties")
public class LiveService {

    private final MemberRepository memberRepository;
    private final LiveRepository liveRepository;
    private final LiveVoteItemRepository liveVoteItemRepository;

    @Transactional
    public ServiceResult<Void> startLive(LiveStartReqDto liveStartReqDto, String fileDir) {
        // 멤버 ID로 이미 라이브 방송이 존재하는지 확인
        if (liveRepository.existsByMemberId(liveStartReqDto.getMemberId())) {
            return new ServiceResult<Void>().fail("이미 라이브 방송이 존재합니다.");
        }

        // 멤버 조회
        Member member = memberRepository.findById(liveStartReqDto.getMemberId())
                .orElse(null);

        if (member == null) {
            return new ServiceResult<Void>().fail("존재하지 않는 회원입니다.");
        }

        // 포인트 차감 로직
        try {
            member.minusPoint(10L); // 라이브 방송 시작 시 필요한 포인트 차감
        } catch (NotEnoughPointException e) {
            return new ServiceResult<Void>().fail(e.getMessage());
        }

        // 라이브 방송 이미지 저장
        String liveImagePath = ""; // 라이브 방송 이미지 저장 경로 초기화
        try {
            MultipartFile liveImageFile = liveStartReqDto.getLiveImgUrl();
            if (liveImageFile != null && !liveImageFile.isEmpty()) {
                liveImagePath = saveFile(liveImageFile, fileDir);
            }
        } catch (IOException e) {
            return new ServiceResult<Void>().fail(e.getMessage());
        }

        // 라이브 방송 생성 및 저장
        Live live = liveRepository.save(Live.builder()
                .id(liveStartReqDto.getSessionId())
                .member(member)
                .title(liveStartReqDto.getLiveTitle())
                .imgUrl(liveImagePath)
                .count(0L)
                .build());

        // 라이브 투표 아이템 생성 및 저장
        try {
            for (LiveVoteItemDto item : liveStartReqDto.getLiveVoteItemDtoList()) {
                String fullPath = saveFile(item.getImgUrl(), fileDir); // 파일 저장 로직 호출
                LiveVoteItem liveVoteItem = liveVoteItemRepository.save(LiveVoteItem.builder()
                        .live(live)
                        .imgUrl(fullPath)
                        .description(item.getDescription())
                        .count(0L)
                        .build());
            }
        } catch (IOException e) {
            return new ServiceResult<Void>().fail("파일 저장 중 문제가 발생했습니다: " + e.getMessage());
        }

        return new ServiceResult<Void>().success();
    }

    private String saveFile(MultipartFile file, String fileDir) throws IOException {
        String imgPath = "";

        if (!file.isEmpty()) {
            imgPath = UUID.randomUUID() + "_" + file.getOriginalFilename();
            file.transferTo(new File(fileDir + "\\" + imgPath));
        }
        return fileDir + "\\" + imgPath;
    }

    public ServiceResult<List<LiveListDto>> findAllLives() {
        List<Live> lives = liveRepository.findAll();
        List<LiveListDto> liveListDtos = lives.stream()
                .map(live -> LiveListDto.builder()
                        .id(live.getId())
                        .memberId(live.getMember().getId())
                        .title(live.getTitle())
                        .count(live.getCount())
                        .imgUrl(live.getImgUrl())
                        .build())
                .collect(Collectors.toList());
        return new ServiceResult<List<LiveListDto>>().success(liveListDtos);
    }

    @Transactional
    public ServiceResult<Void> deleteLiveRoom(Long sessionId) {
        // 라이브 방이 존재하는지 확인
        if (!liveRepository.existsById(sessionId)) {
            return new ServiceResult<Void>().fail("Live방이 존재하지 않습니다.");
        }

        // 라이브 방과 관련된 아이템들 삭제
        liveVoteItemRepository.deleteByLiveId(sessionId);

        // 라이브 방 삭제
        liveRepository.deleteById(sessionId);

        return new ServiceResult<Void>().success();
    }
}
