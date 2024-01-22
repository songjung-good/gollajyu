package com.jaecheop.backgollajyu.vote.service;

import com.jaecheop.backgollajyu.member.controller.MemberController;
import com.jaecheop.backgollajyu.member.entity.Member;
import com.jaecheop.backgollajyu.member.model.VoteResDto;
import com.jaecheop.backgollajyu.member.repostory.MemberRepository;
import com.jaecheop.backgollajyu.vote.entity.Vote;
import com.jaecheop.backgollajyu.vote.entity.VoteItem;
import com.jaecheop.backgollajyu.vote.model.ServiceResult;
import com.jaecheop.backgollajyu.vote.model.VoteItemReqDto;
import com.jaecheop.backgollajyu.vote.model.VoteReqDto;
import com.jaecheop.backgollajyu.vote.repository.VoteItemRepository;
import com.jaecheop.backgollajyu.vote.repository.VoteRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class VoteService {
    private final VoteRepository voteRepository;
    private final VoteItemRepository voteItemRepository;
    private final MemberRepository memberRepository;


    /**
     * 투표 생성
     * - 사용자 존재 여부
     * @param voteReqDto
     */
    public ServiceResult addVote(VoteReqDto voteReqDto) {
        // 사용자 존재 유무 확인
        Optional<Member> optionalMember = memberRepository.findByEmail(voteReqDto.getMemberEmail());
        if(!optionalMember.isPresent()){
            return ServiceResult.fail("해당 멤버가 존재하지 않습니다.");
        }

        // 사용자 존재
        Member member = optionalMember.get();

        // 단일 투표 기본 정보 디비에 저장
        Vote vote = Vote.builder()
                .member(member)
                .title(voteReqDto.getTitle())
                .description(voteReqDto.getDescription())
                .createAt(LocalDateTime.now())
                .code(voteReqDto.getCode())
                .codeType(voteReqDto.getCodeType())
                .build();

        voteRepository.save(vote);

        // 투표 아이템들 디비에 저장
        for(VoteItemReqDto voteItemReqDto : voteReqDto.getVoteItemList()){
            VoteItem voteItem = VoteItem.builder()
                    .vote(vote)
                    .voteItemImgUrl(voteItemReqDto.getVoteItemImgUrl())
                    .voteItemDesc(voteItemReqDto.getVoteItemDesc())
                    .price(voteItemReqDto.getPrice())
                    .build();
            voteItemRepository.save(voteItem);
        }
        return ServiceResult.success();


    }

    // 투표한 Dto

    public List<VoteResDto> findVoteResultsByMemberIdAndCreateVoteResDtoList(Long memberId) {
        // Retrieve VoteResDto instances based on memberId using VoteItemResult query
        List<VoteResDto> initialVoteResDtoList = voteItemResultRepository.findVoteResultsByMemberId(memberId);

        // Extract voteId values from initialVoteResDtoList
        List<Long> voteIds = initialVoteResDtoList.stream()
                .map(VoteResDto::getVoteId)
                .collect(Collectors.toList());

        // Fetch Vote entities based on voteIds
        List<Vote> votes = voteRepository.findAllById(voteIds);

        // Create a new list of VoteResDto using the fetched Vote entities
        return byMemberIdVoteResDtoList(votes);
    }

    private List<VoteResDto> byMemberIdVoteResDtoList(List<Vote> votes) {
        List<VoteResDto> voteResDtoList = new ArrayList<>();

        for (Vote vote : votes) {
            VoteResDto voteResDto = new VoteResDto();
            voteResDto.setVoteId(vote.getId());
            voteResDto.setMemberId(vote.getMember());
            voteResDto.setTitle(vote.getTitle());
            voteResDto.setDescription(vote.getDescription());
            voteResDto.setCreateAt(vote.getCreateAt());
            voteResDto.setCode(vote.getCode());
            voteResDto.setCodeType(vote.getCodeType());
            // You might need to fetch likesId from another source
//            voteResDto.setLikesId(/* fetch likesId based on vote */);

            voteResDtoList.add(voteResDto);
        }

        return voteResDtoList;
    }


    // 투표한 결과 기반 투표 리스트
    public List<VoteResDto> getVotesByResultMemberId(Long memberId) {

        List<VoteResult> voteResults = VoteRepository.findVoteResultsByMemberId(memberId);
        List<Vote> votes = voteRepository.findByVoteId(voteId);
        return ByResultMemberIdVoteResDtoList(votes);
    }

}
