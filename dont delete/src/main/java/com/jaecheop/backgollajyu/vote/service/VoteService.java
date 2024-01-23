package com.jaecheop.backgollajyu.vote.service;

import com.jaecheop.backgollajyu.exception.NotEnoughPointException;
import com.jaecheop.backgollajyu.member.entity.Member;
import com.jaecheop.backgollajyu.vote.model.*;
import com.jaecheop.backgollajyu.member.repostory.MemberRepository;
import com.jaecheop.backgollajyu.vote.entity.*;
import com.jaecheop.backgollajyu.vote.model.ChoiceReqDto;
import com.jaecheop.backgollajyu.vote.model.ServiceResult;
import com.jaecheop.backgollajyu.vote.model.VoteItemReqDto;
import com.jaecheop.backgollajyu.vote.model.VoteReqDto;
import com.jaecheop.backgollajyu.vote.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class VoteService {
    private final VoteResultRepository voteResultRepository;
    private final VoteRepository voteRepository;
    private final VoteItemRepository voteItemRepository;
    private final MemberRepository memberRepository;

    private final CategoryRepository categoryRepository;
    private final TagRepository tagRepository;

    /**
     * 투표 생성
     * - 사용자 존재 여부
     *
     * @param voteReqDto
     */
    public ServiceResult addVote(VoteReqDto voteReqDto) {

        // 사용자 존재 유무 확인
        Optional<Member> optionalMember = memberRepository.findByEmail(voteReqDto.getMemberEmail());

        if (optionalMember.isEmpty()) {
            return ServiceResult.fail("해당 멤버가 존재하지 않습니다.");
        }

        // 사용자 존재
        Member member = optionalMember.get();

        // 포인트 차감 - 투표 생성 : 10포인트
        try{
            member.minusPoint(10L);
        } catch (NotEnoughPointException e){
            return ServiceResult.fail(e.getMessage());
        }

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
        for (VoteItemReqDto voteItemReqDto : voteReqDto.getVoteItemList()) {
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



    // 투표 리스트를 Dto 형태로 변환 ( 기준을 통해서 넘어온 리스트로 )
    private List<VoteResDto> makeVoteResDtoList(List<Vote> votes, Long currentMemberId) {
        List<VoteResDto> voteResDtoList = new ArrayList<>();


        for (Vote vote : votes) {
            List<VoteItemResDto> voteItemResDtoList = mapVoteItemsToDto(getVoteItemsForVote(vote));
            Optional<VoteResult> byMemberIdAndVoteId = voteResultRepository.findByMemberIdAndVoteId(currentMemberId, vote.getId());
            Long selectedItemId;
            if (byMemberIdAndVoteId.isPresent()) {
                selectedItemId = byMemberIdAndVoteId.get().getVoteItem().getId();
            } else {
                selectedItemId = -1L;
            }

            VoteResDto voteResDto = VoteResDto.builder()
                    .voteId(vote.getId())
                    .memberId(vote.getMember())
                    .title(vote.getTitle())
                    .description(vote.getDescription())
                    .createAt(vote.getCreateAt())
                    .category()// 카테고리 참조하기
                    .voteItems(voteItemResDtoList)
                    .selectedItemId(selectedItemId) // 투표 참여한게 있다면 투표아이템 id를 준다.
//                    .likesId(/* fetch likesId based on vote */)// 좋아요 전체 참조하기? 수 + 여부참조하가ㅣ
                    .build();

            voteResDtoList.add(voteResDto);
        }
        return voteResDtoList;
    }
    // 투표에 아이템을 참조
    public List<VoteItem> getVoteItemsForVote(Vote vote) {
        return voteItemRepository.findVoteItemsByVote(vote);
    }

    // 위에서 참조된 아이템을 Dto로 바꾸기
    private List<VoteItemResDto> mapVoteItemsToDto(List<VoteItem> voteItems) {
        return voteItems.stream()
                .map(this::mapVoteItemToDto)
                .collect(Collectors.toList());
    }

    // 위의 voteItems 리스트를 Dto 리스트로 바꾸는 과정에서 Dto 형태로 바꾸기
    private VoteItemResDto mapVoteItemToDto(VoteItem voteItem) {


        return VoteItemResDto.builder()
                .voteItemId(voteItem.getId())
                .voteItemImgUrl(voteItem.getVoteItemImgUrl())
                .voteItemDesc(voteItem.getVoteItemDesc())
                .price(voteItem.getPrice())
                .voteResultCountResDtoList(generateStatistics(voteItem)) //
                .build();
    }

    // ItemResDto를 만드는 과정에서 태그별 투표수 첨부 해주기
    public Map<Tag, Long> generateStatistics(VoteItem voteItem) {
        Map<Tag, Long> statistics = new HashMap<>();

        // Assuming VoteItem has a method to retrieve associated VoteItemResults
        List<VoteResult> voteResults = voteResultRepository.findByVoteItem(voteItem);

        for (VoteResult voteResult : voteResults) {
            // Assuming VoteResult has a method to retrieve associated Tag
            Tag tag = voteResult.getTag();

            // Update count for the tag
            statistics.put(tag, statistics.getOrDefault(tag, 0L) + 1);
        }

        return statistics;
    }


    // 투표 작성자 Id로 투표 리스트 생성..
    public List<VoteResDto> getVotesByMemberId(Long memberId) {
        List<Vote> votes = voteRepository.findByMemberId(memberId);
        return makeVoteResDtoList(votes, memberId);
    }

    // 투표한 투표 리스트
    public List<VoteResDto> getVotesByResultMemberId(Long memberId) {

        List<Vote> votes = voteRepository.findVoteIdsByResultMemberId(memberId);
        return makeVoteResDtoList(votes, memberId);
    }

    // 좋아요한 투표 리스트
    public List<VoteResDto> getLikedVotesByMemberId(Long memberId) {
        List<Vote> votes = voteRepository.findByLikedMembersMemberId(memberId);
        return makeVoteResDtoList(votes, memberId);
    }

//     댓글 작성한 투표 리스트 +@ Dto 만들어야함 (VoteResDto + 댓글 설명 + 댓글 생성일자) 로 반환할
    public List<CommentResDto> findVotesByCommentMemberId(Long memberId) {
        List<Vote> votes = voteRepository.findVotesByCommentMemberId(memberId);

        List<VoteResDto> voteResDtoList = makeVoteResDtoList(votes, memberId);

        List<CommentResDto> commentResDtoList = mapVotesToCommentResDto(voteResDtoList);

        return commentResDtoList;
    }
    public List<CommentResDto> mapVotesToCommentResDto(List<VoteResDto> voteResDtoList) {
        return voteResDtoList.stream()
                .map(this::buildCommentResDto)
                .collect(Collectors.toList());
    }

    private CommentResDto buildCommentResDto(VoteResDto voteResDto) {
        return CommentResDto.builder()
                .commentId(/* set commentId based on your requirements */)
                .commentCreateAt(/* set commentCreateAt based on your requirements */)
                .commentDescription(/* set commentDescription based on your requirements */)
                .voteResDto(voteResDto)
                // Set other properties of CommentResDto based on your requirements
                .build();
    }



//
//    // Dto 만들자아아아아아ㅏ아ㅏ아ㅏ앙아ㅏ아ㅏㅇ아아
//    public List<CategoryInfoResDto> perfectResultsMethod(Integer voteId, Integer memberId, Integer age, char gender, String type) {
//        List<CategoryInfoResDto> result1;
//
//        if (memberId != null) {
//            result1 = voteItemResultRepository.findAllByMemberId(memberId);
//        } else if (voteId != null) {
//            result1 = voteItemResultRepository.findByVoteId(voteId);
//        } else {
//            result1 = voteItemResultRepository.findAllByType(type);
//        }
//
//        if (type != null) {
//            result1 = result1.stream().filter(result -> result.getType().equals(type)).collect(Collectors.toList());
//        }
//        if (age != null) {
//            result1 = result1.stream().filter(result -> result.getAge() == age).collect(Collectors.toList());
//        }
//        if (gender != 0) {
//            result1 = result1.stream().filter(result -> result.getGender() == gender).collect(Collectors.toList());
//        }
//
//        return result1;
//    }




    public ServiceResult choiceMain(ChoiceReqDto choiceReqDto) {
        // member 존재 유무
        Optional<Member> optionalMember = memberRepository.findById(choiceReqDto.getMemberId());
        if (optionalMember.isEmpty()) {
            return ServiceResult.fail("존재하지 않는 사용자입니다.");
        }

        Member member = optionalMember.get();

        // 투표 존재 유무
        Optional<Vote> optionalVote = voteRepository.findById(choiceReqDto.getVoteId());
        if (optionalVote.isEmpty()) {
            return ServiceResult.fail("존재하지 않는 투표입니다.");
        }

        Vote vote = optionalVote.get();

        // 카테고리 존재 여부
        Optional<Category> optionalCategory = categoryRepository.findById(choiceReqDto.getCategoryId());
        if(optionalCategory.isEmpty()){
            return ServiceResult.fail("존재하지 않는 카테고리입니다.");
        }

        Category category = optionalCategory.get();


        // 투표 내 아이템 존재 유무
        List<VoteItem> voteItemList = voteItemRepository.findAllByVoteId(vote.getId());
        System.out.println(voteItemList);

        boolean isItemExist = false;
        for(VoteItem voteItem : voteItemList){
            if(Objects.equals(voteItem.getId(), choiceReqDto.getVoteItemId())){
                isItemExist = true;
                break;
            }
        }
        if (!isItemExist) {
            return ServiceResult.fail("존재하지 않는 투표 아이템입니다.");
        }

        VoteItem voteItem = voteItemRepository.findById(choiceReqDto.getVoteItemId()).get();


        // 카테고리와 태그 매칭 여부
        List<Tag> tagList = tagRepository.findAllByCategoryId(category.getId());
        boolean isTagExist = false;
        for(Tag tag : tagList){
            if(tag.getId() == choiceReqDto.getTagId()){
                isTagExist = true;
                break;
            }
        }
        if(!isTagExist){
            return ServiceResult.fail("카테고리에 존재하지 않는 태그입니다.");
        }

        Tag tag = tagRepository.findById(choiceReqDto.getTagId()).get();


        // 중복 투표 여부
        Optional<VoteResult> optionalVoteResult = voteResultRepository.findByMemberIdAndVoteId(choiceReqDto.getMemberId(), choiceReqDto.getVoteId());
        if(optionalVoteResult.isPresent()){
            return ServiceResult.fail("이미 참여한 투표입니다.");
        }

        // 투표결과 저장
        VoteResult voteResult = VoteResult.builder()
                .vote(vote)
                .voteItem(voteItem)
                .member(member)
                .birthday(member.getBirthDay())
                .type(member.getType())
                .gender(member.getGender())
                .tag(tag)
                .build();
        voteResultRepository.save(voteResult);

        // 포인트 획득 - 투표 참여: 2포인트
        member.plusPoint(2L);
        memberRepository.save(member);

        return ServiceResult.success();
    }
}
