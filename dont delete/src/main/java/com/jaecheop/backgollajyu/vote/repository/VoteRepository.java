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

    @Query("SELECT cm.vote FROM Comment cm WHERE cm.id = :commentId")
    List<Vote> findVoteByCommentId(@Param("commentId") int commentId);

    @Query("SELECT r.vote FROM VoteResult r WHERE r.member.id = :memberId")
    List<Vote> findVoteLikesByMemberId(@Param("memberId") Long memberId);
}