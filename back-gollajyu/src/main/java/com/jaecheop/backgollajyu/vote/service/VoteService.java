package com.jaecheop.backgollajyu.vote.service;

import com.jaecheop.backgollajyu.Info.model.StatisticsSearchReqDto;
import com.jaecheop.backgollajyu.comment.entity.Comment;
import com.jaecheop.backgollajyu.comment.model.CommentResDto;
import com.jaecheop.backgollajyu.comment.repository.CommentRepository;
import com.jaecheop.backgollajyu.exception.NotEnoughPointException;
import com.jaecheop.backgollajyu.member.entity.Member;
import com.jaecheop.backgollajyu.member.model.MemberDto;
import com.jaecheop.backgollajyu.member.model.LoginResDto;
import com.jaecheop.backgollajyu.vote.model.*;
import com.jaecheop.backgollajyu.member.repostory.MemberRepository;
import com.jaecheop.backgollajyu.vote.entity.*;
import com.jaecheop.backgollajyu.vote.model.ChoiceReqDto;
import com.jaecheop.backgollajyu.vote.model.ServiceResult;
import com.jaecheop.backgollajyu.vote.model.VoteItemReqDto;
import com.jaecheop.backgollajyu.vote.model.VoteReqDto;
import com.jaecheop.backgollajyu.vote.repository.*;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import lombok.Value;
import org.springframework.cglib.core.Local;
import org.springframework.context.annotation.PropertySource;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.time.LocalDateTime;
import java.time.Year;
import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@PropertySource("classpath:application.properties")
public class VoteService {
    private final VoteResultRepository voteResultRepository;
    private final VoteRepository voteRepository;
    private final VoteItemRepository voteItemRepository;
    private final MemberRepository memberRepository;
    private final LikeRepository likeRepository;

    private final CategoryRepository categoryRepository;
    private final TagRepository tagRepository;
    private final CommentRepository commentRepository;


    /**
     * 투표 생성
     * - 사용자 존재 여부
     * - 카테고리 존재 여부
     * - 포인트 차감 (-10)
     * - 투표 등록
     * - 투표 아이템 등록
     *
     * @param voteReqDto
     */
    public ServiceResult addVote(VoteReqDto voteReqDto, String fileDir) {

        // 사용자 존재 유무 확인
        Optional<Member> optionalMember = memberRepository.findByEmail(voteReqDto.getMemberEmail());

        if (optionalMember.isEmpty()) {
            return ServiceResult.fail("존재하지 않는 사용자입니다.");
        }

        // 사용자 존재
        Member member = optionalMember.get();

        // 카테고리 존재 유무 확인
        Optional<Category> optionalCategory = categoryRepository.findById(voteReqDto.getCategoryId());
        if (optionalCategory.isEmpty()) {
            return ServiceResult.fail("존재하지 않는 카테고리입니다.");
        }
        Category category = optionalCategory.get();

        // 포인트 차감 - 투표 생성 : 10포인트
        try {
            member.minusPoint(10L);
        } catch (NotEnoughPointException e) {
            return ServiceResult.fail(e.getMessage());
        }

        // 단일 투표 기본 정보 디비에 저장
        Vote vote = Vote.builder()
                .member(member)
                .title(voteReqDto.getTitle())
                .description(voteReqDto.getDescription())
                .createAt(LocalDateTime.now())
                .category(category)
                .build();

        voteRepository.save(vote);
        // 투표 아이템들 디비에 저장
        for (VoteItemReqDto voteItemReqDto : voteReqDto.getVoteItemList()) {
            // 받은 MultipartFile 이미지 파일을 저장
            String fullPath = "";
            try {
                fullPath = saveFile(voteItemReqDto.getVoteItemImg(), fileDir);
            } catch (IOException e) {
                return ServiceResult.fail(e.getMessage());
            }
            // 저장한 경로 반환
            // VoteItem 저장시 이미지가 저장된 경로를 DB에 저장
            VoteItem voteItem = VoteItem.builder()
                    .vote(vote)
                    .voteItemDesc(voteItemReqDto.getVoteItemDesc())
                    .price(voteItemReqDto.getPrice())
                    .build();
            voteItem.updateImgPath(fullPath);
            voteItemRepository.save(voteItem);
        }

        return ServiceResult.success();
    }

    private String saveFile(MultipartFile file, String fileDir) throws IOException {
        String imgPath = "";

        if (!file.isEmpty()) {
            imgPath = UUID.randomUUID() + "_" + file.getOriginalFilename();
            file.transferTo(new File(fileDir + "\\" + imgPath));
        }
        return fileDir + "\\" + imgPath;
    }


    // 투표 리스트를 Dto 형태로 변환 ( 기준을 통해서 넘어온 리스트로 )
    public List<VoteResDto> makeVoteResDtoList(List<Vote> votes, Long currentMemberId) {
        List<VoteResDto> voteResDtoList = new ArrayList<>();

        for (Vote vote : votes) {
            // 현재 투표의 아이템 리스트
            List<VoteItemResDto> voteItemResDtoList = mapVoteItemsToDto(voteItemRepository.findVoteItemsByVote(vote));

            // 투표에 내가 투표한 결과가 있는지
            Optional<VoteResult> byMemberIdAndVoteId = voteResultRepository.findByMemberIdAndVoteId(currentMemberId, vote.getId());
            Long selectedItemId;

            // 투표한 아이템이 있다면 itemId 할당 없다면 -1 할당.
            if (byMemberIdAndVoteId.isPresent()) {
                selectedItemId = byMemberIdAndVoteId.get().getVoteItem().getId();
            } else {
                selectedItemId = -1L;
            }
            List<Likes> likes = likeRepository.findByVote(vote);

            VoteResDto voteResDto = VoteResDto.builder()
                    .voteId(vote.getId())
                    .memberDto(MemberDto.builder()//
                            .memberNickname(vote.getMember().getNickname())
                            .memberId(vote.getMember().getId())
                            .build())
                    .title(vote.getTitle())
                    .description(vote.getDescription())
                    .createAt(vote.getCreateAt())
                    .selectedItemId(selectedItemId) // 투표 참여한게 있다면 투표아이템 id를 준다.
                    .likes(mapLikesToDto(likes)) // 좋아요 리스트 매핑
                    .categoryDto(mapCategoryEntityToDto(vote)) // 카테고리 매핑
                    //TODO 위까지 하나의 Dto로 메서드로 붙이기 메서드 다른 곳에서 활용하기(메인 페이지)
                    .voteItems(voteItemResDtoList)
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
    public List<VoteItemResDto> mapVoteItemsToDto(List<VoteItem> voteItems) {
        return voteItems.stream()
                .map(this::mapVoteItemToDto)
                .collect(Collectors.toList());
    }

    // 위의 voteItems 리스트를 Dto 리스트로 바꾸는 과정에서 Dto 형태로 바꾸기
    public VoteItemResDto mapVoteItemToDto(VoteItem voteItem) {
        return VoteItemResDto.builder()
                .voteItemId(voteItem.getId())
                .voteItemImgUrl(voteItem.getVoteItemImgUrl())
                .voteItemDesc(voteItem.getVoteItemDesc())
                .price(voteItem.getPrice())
                .resultSize((long) voteResultRepository.findByVoteItem(voteItem).size()) //
                // 밑에건 빼도 될거 같음
                .voteResultCountResDtoList(generateStatistics(voteResultRepository.findByVoteItem(voteItem), null)) //
                .build();
    }


    // Like 엔터티를 LikeDto->LikeDtoList 로 변환하는 메서드
    public List<LikeDto> mapLikesToDto(List<Likes> likes) {
        return likes.stream()
                .map(this::mapLikeToDto)
                .collect(Collectors.toList());
    }

    public LikeDto mapLikeToDto(Likes likes) {
        if (likes != null) {
            // Implement mapping logic from Like entity to LikeDto using builder
            return LikeDto.builder()
                    .likeId(likes.getId())
                    .memberId(likes.getMember().getId()) // 예시로 Member의 ID를 매핑
                    .build();
        } else {
            return null;
        }
    }


    // CategoryDto 빌더
    public CategoryDto mapCategoryEntityToDto(Vote vote) {
        // Retrieve the Category entity associated with the vote

        Category categoryEntity = vote.getCategory();
        List<Tag> tagList = tagRepository.findAllByCategoryId(categoryEntity.getId());

        return CategoryDto.builder()
                .categoryId(categoryEntity.getId())
                .categoryName(categoryEntity.getCategoryName())
                .tagNameList(tagList.stream().map(Tag::getName).collect(Collectors.toList()))
                .build();
    }


    // 태그별 투표수 첨부 해주기 For ItemResDto 결과랑 sSReq(null true)
    public List<CategoryTagDto> generateStatistics(List<VoteResult> voteResults, StatisticsSearchReqDto statisticsSearchReqDto) {
        List<CategoryTagDto> statisticsList = new ArrayList<>();

        // Check if statisticsSearchReqDto is provided before calling perfectResultsMethod
        List<VoteResult> voteResultList = (statisticsSearchReqDto != null)
                ? perfectResultsMethod(voteResults, statisticsSearchReqDto)
                : voteResults;

        // Going through the loop, all: creates a list of the overall size and the size of each tag.
        for (VoteResult voteResult : voteResultList) {
            // Assuming VoteResult has a method to retrieve associated Tag
            Tag tag = voteResult.getTag();
            CategoryTagDto categoryTagDto = CategoryTagDto.builder()
                    .category(tag.getCategory().getCategoryName())
                    .tag(tag.getName())
                    .tagId(tag.getId()) // Unique identifier for the tag
                    .build();

            // Check if the categoryTagDto already exists in the list
            boolean existingDtoFound = false;
            for (CategoryTagDto existingDto : statisticsList) {
                if (existingDto.equals(categoryTagDto)) {
                    // If the categoryTagDto exists, update its count
                    existingDto.setCount(existingDto.getCount() + 1);
                    existingDtoFound = true;
                    break;
                }
            }

            if (!existingDtoFound) {
                // If the categoryTagDto doesn't exist, add it to the list
                categoryTagDto.setCount(1L);
                statisticsList.add(categoryTagDto);
            }

            // Update count for the 'all' categoryTagDto
            CategoryTagDto allCategoryTagDto = new CategoryTagDto(0, "all", "all", 0L);
            boolean allDtoFound = statisticsList.stream().anyMatch(allCategoryTagDto::equals);

            if (allDtoFound) {
                // If the 'all' categoryTagDto exists, update its count
                statisticsList.stream()
                        .filter(allCategoryTagDto::equals)
                        .findFirst()
                        .ifPresent(dto -> dto.setCount(dto.getCount() + 1));
            } else {
                // If the 'all' categoryTagDto doesn't exist, add it to the list
                allCategoryTagDto.setCount(1L);
                statisticsList.add(allCategoryTagDto);
            }
        }

        return statisticsList;
    }


    // StatisticsSearchReqDto 에 따른 필터링 작업 ,,,voteResultList(byVoteItem or byMemberId or byAll)
    public List<VoteResult> perfectResultsMethod(List<VoteResult> voteResultList, StatisticsSearchReqDto statisticsSearchReqDto) {
        List<VoteResult> resultList = voteResultList;

        // 소비성향이 있다면
        if (statisticsSearchReqDto.getTypeId() != null) {
            resultList = resultList.stream()
                    .filter(result -> result.getType().getId() == statisticsSearchReqDto.getTypeId())
                    .collect(Collectors.toList());
        }
        // 나이 정보가 있다면
        if (statisticsSearchReqDto.getAge() != null) {
            resultList = resultList.stream()
                    .filter(result -> (result.getAge()/10) == statisticsSearchReqDto.getAge())
                    .collect(Collectors.toList());
        }
        // 성별 정보가 있다면
        if (statisticsSearchReqDto.getGender() != null) {
            resultList = resultList.stream()
                    .filter(result -> result.getGender().name().equals(statisticsSearchReqDto.getGender()))
                    .collect(Collectors.toList());
        }
        return resultList;
    }


    // 투표 작성자 Id로 투표 리스트 생성..
    public List<VoteResDto> getVotesByMemberId(Long memberId) {
//        List<Vote> votes = voteRepository.findByMemberId(memberId);
        List<Vote> votes = voteRepository.findByMemberId(memberId, Sort.by(Sort.Order.asc("createAt")));

        return makeVoteResDtoList(votes, memberId);
    }

    // 투표한 투표 리스트
    public List<VoteResDto> findVotesByResultMemberId(Long memberId) {

        List<Vote> votes = voteRepository.findVoteIdsByResultMemberId(memberId);
        return makeVoteResDtoList(votes, memberId);
    }

    // 좋아요한 투표 리스트
    public List<VoteResDto> getLikedVotesByMemberId(Long memberId) {
        // 멤버가 좋아요 한 투표찾기
        List<Vote> votes = voteRepository.findVoteLikesByMemberId(memberId);
        return makeVoteResDtoList(votes, memberId);
    }

    // 댓글 작성한 투표 리스트 /// TODO 상훈 최적화 필.
    public List<CommentResDto> findVotesByCommentMemberId(Long memberId) {
        List<Comment> comments = commentRepository.findByMemberId(memberId);
        List<CommentResDto> commentResDtoList = new ArrayList<>();

        for (Comment comment : comments) {
            List<Vote> votes = voteRepository.findVoteByCommentId(comment.getId());
            CommentResDto commentResDto = CommentResDto.builder()
                    .commentId(comment.getId())
                    .commentCreateAt(comment.getCreateAt())
                    .commentDescription(comment.getCommentDesc())
                    .voteResDto(makeVoteResDtoList(votes, memberId).get(0))
                    .build();

            commentResDtoList.add(commentResDto);

        }

        return commentResDtoList;
    }


    /**
     * 메인에서 투표하기
     * - 멤버 존재 유무
     * - 투표 존재 유무
     * - 카테고리 존재 여부
     * - 투표 내 아이템 존재 여부
     * - 카테고리와 태그 매칭 여부
     * - 중복 투표 여부
     * - 포인트 획득 (+2)
     *
     * @param choiceReqDto
     * @return
     */
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
        if (optionalCategory.isEmpty()) {
            return ServiceResult.fail("존재하지 않는 카테고리입니다.");
        }

        Category category = optionalCategory.get();


        // 투표 내 아이템 존재 유무
        List<VoteItemDto> voteItemList = voteItemRepository.findAllByVoteId(vote.getId()).stream().map(vi->VoteItem.convertToDto(vi)).toList();

        boolean isItemExist = false;
        for (VoteItemDto voteItem : voteItemList) {
            if (Objects.equals(voteItem.getId(), choiceReqDto.getVoteItemId())) {
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
        for (Tag tag : tagList) {
            if (tag.getId() == choiceReqDto.getTagId()) {
                isTagExist = true;
                break;
            }
        }
        if (!isTagExist) {
            return ServiceResult.fail("카테고리에 존재하지 않는 태그입니다.");
        }

        Tag tag = tagRepository.findById(choiceReqDto.getTagId()).get();



        // 중복 투표 여부.
        Optional<VoteResult> optionalVoteResult = voteResultRepository.findByMemberIdAndVoteId(choiceReqDto.getMemberId(), choiceReqDto.getVoteId());
        if (optionalVoteResult.isPresent()) {
            return ServiceResult.fail("이미 참여한 투표입니다.");
        }

        int memberYear = member.getBirthDay().getYear();
        int currentYear = Year.now().getValue();
        int memberAge = currentYear - memberYear;


        // 투표결과 저장.
        VoteResult voteResult = VoteResult.builder()
                .vote(vote)
                .voteItem(voteItem)
                .member(member)
                .age(memberAge)
                .type(member.getType())
                .gender(member.getGender())
                .tag(tag)
                .category(vote.getCategory())
                .createAt(LocalDateTime.now())
                .build();
        voteResultRepository.save(voteResult);

        // 포인트 획득 - 투표 참여: 2포인트
        member.plusPoint(2L);
        memberRepository.save(member);

        return ServiceResult.success();
    }

    /**
     * 투표 상세
     *
     * @param voteDetailReqDto
     * @return
     */

    public ServiceResult voteDetail(VoteDetailReqDto voteDetailReqDto) {

        // 사용자 존재 여부
        Optional<Member> optionalMember = memberRepository.findById(voteDetailReqDto.getMemberId());
        if (optionalMember.isEmpty()) {
            return ServiceResult.fail("존재하지 않는 사용자입니다");
        }
        Member member = optionalMember.get();

        // 투표 존재 여부
        Optional<Vote> optionalVote = voteRepository.findById(voteDetailReqDto.getVoteId());
        if (optionalVote.isEmpty()) {
            return ServiceResult.fail("존재하지 않는 투표입니다");
        }
        Vote vote = optionalVote.get();

        // 이 사용자의 투표 참여 여부
        Optional<VoteResult> optionalVoteResult = voteResultRepository.findByMemberIdAndVoteId(member.getId(), vote.getId());
        if (optionalVoteResult.isEmpty()) {
            return ServiceResult.fail("투표하지 않은 사용자입니다.");
        }
        VoteResult voteResult = optionalVoteResult.get();

        // 상세정보 - 나이, 성별, 성향 별
        // 1. 투표 관련 정보 + 총 투표 수 + 좋아요
        // 필터링 된 투표 결과 리스트 받아오기
        List<VoteResult> voteResultList = filteredVoteResultList(vote.getVoteResultList(), voteDetailReqDto.getFilter());

        VoteInfoDto voteInfoDto = VoteInfoDto.builder()
                .memberId(vote.getMember().getId())
                .title(vote.getTitle())
                .description(vote.getDescription())
                .createAt(vote.getCreateAt())
                .likesCnt((long) vote.getLikesList().size())
                .totalChoiceCnt((long) voteResultList.size())
                .build();
        // 2. 각 아이템 기본 정보
        List<VoteItemInfoDto> voteItemInfoDtoList = new ArrayList<>();
        for (VoteItem voteItem : vote.getVoteItemList()) {
            // 아이템 당 표 개수 choiceCount
            List<VoteResult> voteResultListPerItem = filteredVoteResultList(voteItem.getVoteResultList(), voteDetailReqDto.getFilter());
            Long choiceCnt = (long) voteResultListPerItem.size();

            // 아이템 - 태그 별 개수 ==> 즉, TagCount의 모든 개수를 더하면 = choiceCnt
            List<TagCount> tagCountList = new ArrayList<>(); // 각 태그 별 개수를 담은 리스트
            List<Tag> tagList = vote.getCategory().getTagList(); // 어떤 카테고리의 태그리스트(static)
            // TODO:::::: map으로 바꾸면 for문 덜 돌게 할 수 있으므로 고치기!!
            for (Tag tag : tagList) {
                Long count = 0L;
                for (VoteResult vr : voteResultListPerItem) {
                    if (vr.getTag().getId() == tag.getId()) count++;
                }
                tagCountList.add(
                        TagCount.builder()
                                .tagId(tag.getId())
                                .tagName(tag.getName())
                                .count(count)
                                .build()
                );
            }

            // 개별 투표 아이템 기본 정보
            VoteItemInfoDto voteItemInfoDto = VoteItemInfoDto.builder()
                    .voteItemId(voteItem.getId())
                    .voteItemDesc(voteItem.getVoteItemDesc())
                    .voteItemImgUrl(voteItem.getVoteItemImgUrl())
                    .price(voteItem.getPrice())
                    .choiceCnt(choiceCnt) // 해당 아이템 선택 개수
                    .tagCountList(tagCountList) // 해당 아이템 내 각 태그 별 선택 개수
                    .build();
            voteItemInfoDtoList.add(voteItemInfoDto);
        }
        // 3. 댓글
        List<Comment> commentList = commentRepository.findByVoteId(vote.getId());

        VoteDetailResDto voteDetailResDto = VoteDetailResDto.builder()
                .chosenItem(voteResult.getId())
                .voteInfo(voteInfoDto)
                .voteItemListInfo(voteItemInfoDtoList)
                .commentList(commentList)
                .build();

        return ServiceResult.success(voteDetailResDto);
    }

    // 필터링된 투표 결과 리스트 가져오기
    private List<VoteResult> filteredVoteResultList(List<VoteResult> voteResultList, Filter filter) {
        // 소비성향으로 거르기
        List<VoteResult> filterByType = new ArrayList<>();
        if (filter.getTypeId() != -1) {
            for (VoteResult vr : voteResultList) {
                if (vr.getType().getId() == filter.getTypeId()) {
                    filterByType.add(vr);
                }
            }
        } else {
            filterByType = voteResultList;
        }

        // 나이로 거르기
        List<VoteResult> filterByTypeAndAge = new ArrayList<>();
        if (filter.getAge() != -1) {
            for (VoteResult vr : filterByType) {
                if (vr.getAge() % 10 != filter.getAge()) {
                    filterByTypeAndAge.add(vr);
                }
            }
        } else {
            filterByTypeAndAge = filterByType;
        }

        // 성별으로 거르기
        List<VoteResult> filterByTypeAndAgeAndGender = new ArrayList<>();
        if (!filter.getGender().equals("A")) {
            for (VoteResult vr : filterByTypeAndAge) {
                if (vr.getGender().name().equals(filter.getGender())) {
                    filterByTypeAndAgeAndGender.add(vr);
                }
            }
        } else {
            filterByTypeAndAgeAndGender = filterByTypeAndAge;
        }

        return filterByTypeAndAgeAndGender;

    }

    public ServiceResult getVoteListByCategory(int categoryId, LoginResDto memberSession) {
        // 반환 할 결과
        VoteListResDto voteListResDto = null;

        // 로그인 하지 않은 사용자
        if (memberSession == null) {
            // 카테고리가 전체일때,
            if (categoryId == 0) {
                // 기본 정보
                voteListResDto = VoteListResDto.builder()
                        .categoryName("All")
                        .tagList(null) // 전체에서는 tagList를 특정할 수 없으므로 null로 주고, 각 투표마다 태그 리스트를 따로 저장해준다.
                        .build();
                // 단일 투표의 상세 리스트
                List<ListVoteDto> allVoteList = voteRepository
                        .findAllByOrderByCreateAtDesc()
                        .stream()
                        .map(v -> ListVoteDto.convertToDto(v)).toList();
                makeVoteDetail(allVoteList);
                voteListResDto.updateVoteInfoList(allVoteList);
            }

            // 카테고리가 전체가 아닐 때
            else {
                // 카테고리 유무 확인
                Optional<Category> optionalCategory = categoryRepository.findById(categoryId);
                if (optionalCategory.isEmpty()) {
                    return ServiceResult.fail("존재하지 않는 카테고리입니다.");
                }
                Category category = optionalCategory.get();

                // 순환참조 오류 해결 - Dto 사용
                List<Tag> allByCategoryId = tagRepository.findAllByCategoryId(category.getId());
                List<TagDto> tagList = allByCategoryId.stream().map(t -> TagDto.convertToDto(t)).toList();

                // 기본 정보 담기
                voteListResDto = VoteListResDto.builder()
                        .categoryName(category.getCategoryName())
                        .tagList(tagList)
                        .build();

                // 해당 카테고리 투표 리스트 최신순으로 담기
                List<ListVoteDto> allVoteList = voteRepository
                        .findAllByCategoryIdOrderByCreateAtDesc(categoryId)
                        .stream()
                        .map(v -> ListVoteDto.convertToDto(v))
                        .toList();

                //  단일 투표들의 상세 정보 리스트 생성
                makeVoteDetail(allVoteList);
                voteListResDto.updateVoteInfoList(allVoteList);
            }
        }
//         로그인 한 사용자
        else {
            // 로그인 한 사용자
            long memberId = memberSession.getMemberId();

            // 결과에 담을 투표 리스트 기본 정보
            // 카테고리가 전체일때
            if (categoryId == 0) {
                // 전체 투표에서 투표 한 투표 거르기
                List<ListVoteDto> allVoteList = voteRepository
                        .findAllByOrderByCreateAtDesc()
                        .stream()
                        .map(v -> ListVoteDto.convertToDto(v))
                        .toList();
                List<ListVoteResultDto> voteResultList = voteResultRepository
                        .findAllByMemberId(memberSession.getMemberId())
                        .stream()
                        .map(vr -> ListVoteResultDto.convertToDto(vr))
                        .toList();// 참여한 투표 결과 리스트

                List<ListVoteDto> filteredVoteList = filterJoinedVote(allVoteList, voteResultList);

                // 걸러진 투표 사용자의 좋아요 유무 체크
                filteredVoteList.stream().forEach(lvd ->{
                    Optional<Likes> optionalLikes = likeRepository.findByMemberIdAndVoteId(memberId, lvd.getVoteId());
                    if(optionalLikes.isPresent()){
                        lvd.updateIsLiked();
                    }
                });

                // 기본 정보
                voteListResDto = VoteListResDto.builder()
                        .categoryName("All")
                        .tagList(null) // 전체에서는 tagList를 특정할 수 없으므로 null로 주고, 각 투표마다 태그 리스트를 따로 저장해준다.
                        .build();


                //  단일 투표들의 상세 정보 리스트 생성
                makeVoteDetail(filteredVoteList);
                voteListResDto.updateVoteInfoList(filteredVoteList);

            }

//             카테고리가 전체가 아닐 때
            else {
                // 카테고리 유무 확인
                Optional<Category> optionalCategory = categoryRepository.findById(categoryId);
                if (optionalCategory.isEmpty()) {
                    return ServiceResult.fail("존재하지 않는 카테고리입니다.");
                }
                Category category = optionalCategory.get();

                List<Tag> allByCategoryId = tagRepository.findAllByCategoryId(category.getId());
                List<TagDto> tagList = allByCategoryId.stream().map(t -> TagDto.convertToDto(t)).toList();

                // 결과 기본 정보 담기
                voteListResDto = VoteListResDto.builder()
                        .categoryName(category.getCategoryName())
                        .tagList(tagList)
                        .build();

                // 해당 카테고리 투표 리스트 최신순으로 담기
                // 참여한 투표 거르기
                List<ListVoteDto> allVoteList = voteRepository
                        .findAllByCategoryIdOrderByCreateAtDesc(categoryId)
                        .stream()
                        .map(v -> ListVoteDto.convertToDto(v))
                        .toList();
                List<ListVoteResultDto> voteResultList = voteResultRepository
                        .findAllByMemberIdAndCategoryId(memberSession.getMemberId(), category.getId())
                        .stream()
                        .map(vr -> ListVoteResultDto.convertToDto(vr))
                        .toList();
                List<ListVoteDto> filteredVoteList = filterJoinedVote(allVoteList, voteResultList);

                // 걸러진 투표 사용자의 좋아요 유무 체크
                filteredVoteList.stream().forEach(lvd ->{
                    Optional<Likes> optionalLikes = likeRepository.findByMemberIdAndVoteId(memberId, lvd.getVoteId());
                    if(optionalLikes.isPresent()){
                        lvd.updateIsLiked();
                    }
                });

                //  단일 투표들의 상세 정보 리스트 생성
                makeVoteDetail(filteredVoteList);
                voteListResDto.updateVoteInfoList(filteredVoteList);
            }
        }
        return ServiceResult.success(voteListResDto);

    }

    // 투표 상세 정보 for 투표 목록
    private void makeVoteDetail(List<ListVoteDto> voteList) {
        for (ListVoteDto vote : voteList) {
            // 단일 투표 태그 리스트 정보
            List<Tag> allByCategoryId = tagRepository.findAllByCategoryId(vote.getCategoryId());
            List<TagDto> tagList = allByCategoryId.stream().map(t -> TagDto.convertToDto(t)).toList();
            vote.updateTagList(tagList);

            // 아이템들 기본 정보
            List<ListVoteItemDto> listVoteItemDtoList = makeVoteItemDetailList(vote);
            vote.updateVoteItemList(listVoteItemDtoList);
        }
    }

    // voteItem상세 for 목록조회
    private List<ListVoteItemDto> makeVoteItemDetailList(ListVoteDto vote) {
        List<VoteItem> voteItemList = voteRepository.findById(vote.getVoteId()).get().getVoteItemList();
        List<ListVoteItemDto> listVoteItemDtoList = new ArrayList<>();
        for (VoteItem voteItem : voteItemList) {
            listVoteItemDtoList.add(
                    ListVoteItemDto.builder()
                            .voteItemId(voteItem.getId())
                            .voteItemImgUrl(voteItem.getVoteItemImgUrl())
                            .voteItemDesc(voteItem.getVoteItemDesc())
                            .price(voteItem.getPrice())
                            .build()
            );
        }
        return listVoteItemDtoList;
    }

    // 참여한 투표 거르기
    private List<ListVoteDto> filterJoinedVote(List<ListVoteDto> allVoteList, List<ListVoteResultDto> voteResultList) {
        List<ListVoteDto> filteredVoteList = new ArrayList<>();
        for (ListVoteDto vote : allVoteList) {
            boolean isExist = false;
            for (ListVoteResultDto voteResult : voteResultList) {
                if (Objects.equals(vote.getVoteId(), voteResult.getVoteId())) {
                    isExist = true;
                    break;
                }
            }
            if (!isExist) {
                filteredVoteList.add(vote);
            }
        }
        return filteredVoteList;
    }

    /**
     * top 5 - 좋아요, 최신, 참여자, 박빙
     *
     * @return
     */
    public ServiceResult getVoteRanking() {
        // 최근 7일 동안 생성한 투표중에
        LocalDateTime endDate = LocalDateTime.now();
        LocalDateTime startDate = endDate.minusDays(7);
        List<VoteInfoDto> voteList = new ArrayList<>(voteRepository.findAllByCreateAtBetweenOrderByCreateAtDesc(startDate, endDate)
                .stream()
                .map(v -> Vote.convertToVoteInfoDto(v))
                .toList());
        // voteinfodto로 변환해서
        // 각 기준에 맞게 가공하자

        // 좋아요
        List<VoteInfoDto> sortByLikes = voteList.stream()
                .sorted(Comparator.comparingLong(VoteInfoDto::getLikesCnt).reversed())
                .collect(Collectors.toList());


        // 최신
        List<VoteInfoDto> sortByNew = voteList.stream()
                .sorted(Comparator.comparing(VoteInfoDto::getCreateAt).reversed())
                .collect(Collectors.toList());

        // 참여자
        List<VoteInfoDto> sortByVoter = voteList.stream()
                .sorted(Comparator.comparing(VoteInfoDto::getTotalChoiceCnt).reversed())
                .collect(Collectors.toList());

        // 박빙
        // 투표 아이템이 2개인거 고르기
        // TODO:: total count가 0이 아닌거만 뽑기
        List<VoteInfoDto> twoList = voteList.stream().filter(v -> v.getItemCnt() == 2 && v.getTotalChoiceCnt() > 0).collect(Collectors.toList());

        // 결과로 반환할 박빙 투표 리스트로 변경
        List<VoteCloseInfoDto> closeVoteList = twoList
                .stream()
                .map(v -> VoteInfoDto.convertToVoteCloseDto(v))
                .toList();


        // 각 투표의 item 정보를 저장하기
        for (VoteCloseInfoDto voteCloseInfoDto : closeVoteList) {

            // 단일 투표의 아이템리스트 가져오기
            // 각 아이템에서 아이디와 투표 수만 뽑아서 저장
            List<VoteItemCloseInfoDto> voteItemList = voteItemRepository.findAllByVoteId(voteCloseInfoDto.getVoteId())
                    .stream()
                    .map(vi -> VoteItem.convertToVoteItemCloseInfoDto(vi, voteCloseInfoDto.getTotalChoiceCnt()))
                    .toList();
            voteCloseInfoDto.updateVoteItemList(voteItemList);

            voteCloseInfoDto.updatePercentDiff();
        }
        

        // 투표아이템의 비율 차에 따라 정렬
        List<VoteCloseInfoDto> sortByClose = closeVoteList.stream()
                .sorted(Comparator.comparing(VoteCloseInfoDto::getPercentDiff))
                .collect(Collectors.toList());


        // 정렬해서 보여주기
        return ServiceResult.success(
                RankDto.builder()
                        .sortByLikes(sortByLikes)
                        .sortByNew(sortByNew)
                        .sortByVoter(sortByVoter)
                        .sortByClose(sortByClose)
                        .build()
        );
    }

    /**
     * 투표 좋아요
     * @param likesReqDto
     * @return
     */
    public ServiceResult toggleLikes(LikesReqDto likesReqDto) {

        // 멤버 존재 유무
        Optional<Member> optionalMember = memberRepository.findById(likesReqDto.getMemberId());
        if(optionalMember.isEmpty()){
            return ServiceResult.fail("존재하지 않는 사용자입니다.");
        }
        Member member = optionalMember.get();

        // 투표 존재 유무
        Optional<Vote> optionalVote = voteRepository.findById(likesReqDto.getVoteId());
        if(optionalVote.isEmpty()){
            return ServiceResult.fail("존재하지 않는 투표입니다.");
        }
        Vote vote = optionalVote.get();

        // 좋아요 존재 유무
        Optional<Likes> optionalLikes = likeRepository.findByMemberIdAndVoteId(likesReqDto.getMemberId(), likesReqDto.getVoteId());

        LikesResDto likesResDto = LikesResDto.builder()
                .memberId(member.getId())
                .voteId(vote.getId())
                .build();
        // 존재하지 않을 떄,
        if(optionalLikes.isEmpty()){
            likeRepository.save(
                    Likes.builder()
                            .member(member)
                            .vote(vote)
                            .createAt(LocalDateTime.now())
                            .build()
            );
            likesResDto.updateIsLiked(true);
            return ServiceResult.success(likesResDto);
        }
        // 존재할 때
        else{
            Likes likes = optionalLikes.get();
            likeRepository.deleteById(likes.getId());
            likesResDto.updateIsLiked(false);
            return ServiceResult.success(likesResDto);
        }
    }
}
