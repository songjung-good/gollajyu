package com.jaecheop.backgollajyu.vote.service;

import com.jaecheop.backgollajyu.member.entity.Member;
import com.jaecheop.backgollajyu.vote.model.*;
import com.jaecheop.backgollajyu.member.repostory.MemberRepository;
import com.jaecheop.backgollajyu.vote.entity.Vote;
import com.jaecheop.backgollajyu.vote.entity.VoteItem;
import com.jaecheop.backgollajyu.vote.repository.VoteItemRepository;
import com.jaecheop.backgollajyu.vote.repository.VoteRepository;
import lombok.RequiredArgsConstructor;
import org.aspectj.apache.bcel.generic.Tag;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class VoteService {
    private final VoteRepository voteRepository;
    private final VoteItemRepository voteItemRepository;
    private final MemberRepository memberRepository;
    private Vote vote;


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



    // 투표 리스트를 Dto 형태로 변환
    private List<VoteResDto> makeVoteResDtoList(List<Vote> votes) {
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
            voteResDto.setVoteItems(mapVoteItemsToDto(getVoteItemsForVote(vote)));  // Set the list of VoteItemDto
            // You might need to fetch likesId from another source
//            voteResDto.setLikesId(/* fetch likesId based on vote */);

            voteResDtoList.add(voteResDto);
        }

        return voteResDtoList;
    }
    public List<VoteItem> getVoteItemsForVote(Vote vote) {
        return voteItemRepository.findVoteItemsByVote(vote);
    }

    private List<VoteItemResDto> mapVoteItemsToDto(List<VoteItem> voteItems) {
        return voteItems.stream()
                .map(this::mapVoteItemToDto)
                .collect(Collectors.toList());
    }

    private VoteItemResDto mapVoteItemToDto(VoteItem voteItem) {
        return VoteItemResDto.builder()
                .voteItemId(voteItem.getId())
                .voteItemImgUrl(voteItem.getVoteItemImgUrl())
                .voteItemDesc(voteItem.getVoteItemDesc())
                .price(voteItem.getPrice())
                .voteResultCountResDtoList(generateStatistics(voteItem)) // 후아아아아
                .build();
    }

    public static Map<Tag, Long> generateStatistics(VoteItem voteItem) {
        Map<Tag, Long> statistics = new HashMap<>();

        // Assuming VoteItem has a method to retrieve associated VoteItemResults
        List<VoteItemResult> voteItemResults = voteItem.getVoteItemResults();

        for (VoteItemResult voteItemResult : voteItemResults) {
            // Assuming VoteResult has a method to retrieve associated Tag
            Tag tag = voteItemResult.getTag();

            // Update count for the tag
            statistics.put(tag, statistics.getOrDefault(tag, 0L) + 1);
        }

        return statistics;
    }












    // 투표 작성자 Id로 투표 리스트 생성
    public List<VoteResDto> getVotesByMemberId(Long memberId) {
        List<Vote> votes = voteRepository.findByMemberId(memberId);
        return makeVoteResDtoList(votes);
    }

    // 투표한 투표 리스트
    public List<VoteResDto> getVotesByResultMemberId(Long memberId) {

        List<Vote> votes = VoteRepository.findVoteIdsByResultMemberId(memberId);
        return makeVoteResDtoList(votes);
    }

    // 좋아요한 투표 리스트
    public List<VoteResDto> getLikedVotesByMemberId(Long memberId) {
        List<Vote> votes = voteRepository.findByLikedMembersMemberId(memberId);
        return makeVoteResDtoList(votes);
    }

    // 댓글 작성한 투표 리스트 +@ Dto 만들어야함 VoteResDto + 댓글 설명 + 댓글 생성일자
    public List<CommentResDto> findVotesByCommentMemberId(Long memberId) {
        List<Vote> votes = voteRepository.findVotesByCommentMemberId(memberId);
        return makeVoteResDtoList(votes);
    }







    // Dto 만들자아아아아아ㅏ아ㅏ아ㅏ앙아ㅏ아ㅏㅇ아아
    public List<CategoryInfoResDto> perfectResultsMethod(Integer voteId, Integer memberId, Integer age, char gender, String type) {
        List<CategoryInfoResDto> result1;

        if (memberId != null) {
            result1 = voteItemResultRepository.findAllByMemberId(memberId);
        } else if (voteId != null) {
            result1 = voteItemResultRepository.findByVoteId(voteId);
        } else {
            result1 = voteItemResultRepository.findAllByType(type);
        }

        if (type != null) {
            result1 = result1.stream().filter(result -> result.getType().equals(type)).collect(Collectors.toList());
        }
        if (age != null) {
            result1 = result1.stream().filter(result -> result.getAge() == age).collect(Collectors.toList());
        }
        if (gender != 0) {
            result1 = result1.stream().filter(result -> result.getGender() == gender).collect(Collectors.toList());
        }

        return result1;
    }




}
