package com.jaecheop.backgollajyu.vote.repository;

import com.jaecheop.backgollajyu.vote.entity.Vote;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface VoteRepository extends JpaRepository<Vote, Long> {
    List<Vote> findByMemberId(Long memberId);

    // 투표한 투표 리스트
    @Query("SELECT vir.vote FROM VoteResult vir " +
            "WHERE vir.member.id = :memberId")
    List<Vote> findVoteIdsByResultMemberId(@Param("memberId") Long memberId);


    // 댓글 작성한 투표 리스트 이게아닌듯 모든 댓글을 기준으로 해야함.
//    @Query("SELECT v FROM Vote v " +
//            "JOIN Comment c ON v.id = c.voteId " +
//            "WHERE c.memberId = :memberId")
//    List<Vote> findVotesByCommentMemberId(@Param("memberId") Long memberId);


    @Query("SELECT r.vote FROM VoteResult r WHERE r.member.id = :memberId")
    List<Vote> findVoteLikesByMemberId(@Param("memberId") Long memberId);

    List<Vote> findAllByOrderByCreateAtDesc();

    List<Vote> findAllByCategoryIdOrderByCreateAtDesc(int categoryId);
}