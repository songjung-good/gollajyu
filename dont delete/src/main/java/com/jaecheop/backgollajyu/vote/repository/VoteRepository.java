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
    @Query("SELECT vir.vote FROM VoteItemResult vir " +
            "WHERE vir.member.id = :memberId")
    List<Vote> findVoteIdsByResultMemberId(@Param("memberId") Long memberId);

    // 좋아요한 투표 리스트
    List<Vote> findByLikedMembersMemberId(Long memberId);

    // 댓글 작성한 투표 리스트
    @Query("SELECT v FROM Vote v " +
            "JOIN Comment c ON v.voteId = c.voteId " +
            "WHERE c.memberId = :memberId")
    List<Vote> findVotesByCommentMemberId(@Param("memberId") Long memberId);
}