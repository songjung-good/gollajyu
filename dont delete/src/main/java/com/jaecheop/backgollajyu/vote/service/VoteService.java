package com.jaecheop.backgollajyu.vote.service;

import com.jaecheop.backgollajyu.exception.NotEnoughPointException;
import com.jaecheop.backgollajyu.member.entity.Member;
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
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class VoteService {
    private final VoteRepository voteRepository;
    private final VoteItemRepository voteItemRepository;
    private final MemberRepository memberRepository;
    private final VoteResultRepository voteResultRepository;
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
            return ServiceResult.fail("존재하지 않는 사용자입니다.");
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


        // 중복 투표 여부.
        Optional<VoteResult> optionalVoteResult = voteResultRepository.findByMemberIdAndVoteId(choiceReqDto.getMemberId(), choiceReqDto.getVoteId());
        if(optionalVoteResult.isPresent()){
            return ServiceResult.fail("이미 참여한 투표입니다.");
        }

        // 투표결과 저장.
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
