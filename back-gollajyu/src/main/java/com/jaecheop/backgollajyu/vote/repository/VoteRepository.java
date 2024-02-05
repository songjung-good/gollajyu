package com.jaecheop.backgollajyu.vote.repository;

import com.jaecheop.backgollajyu.vote.entity.Vote;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.Collection;
import java.util.List;

@Repository
public interface VoteRepository extends JpaRepository<Vote, Long> {


    // 작성한 투표 시간순
    // List<Vote> findByMemberId(Long memberId);
    List<Vote> findByMemberId(@Param("memberId") Long memberId, Sort sort);

    // 투표한 투표 리스트 시간 순
    @Query("SELECT vir.vote FROM VoteResult vir " +
            "WHERE vir.member.id = :memberId " +
            "ORDER BY vir.createAt DESC")
    List<Vote> findVoteIdsByResultMemberId(@Param("memberId") Long memberId);


    // 댓글 쓴 투표 시간 순
    @Query("SELECT cm.vote FROM Comment cm WHERE cm.id = :commentId " +
            "ORDER BY cm.createAt DESC")
    List<Vote> findVoteByCommentId(@Param("commentId") Long commentId);


    // 좋아요한 투표 시간순 정렬
    @Query("SELECT li.vote FROM Likes li WHERE li.member.id = :memberId " +
            "ORDER BY li.createAt DESC")
    List<Vote> findVoteLikesByMemberId(@Param("memberId") Long memberId);

    List<Vote> findAllByOrderByCreateAtDesc();

    List<Vote> findAllByCategoryIdOrderByCreateAtDesc(int categoryId);

    List<Vote> findAllByCreateAtBetweenOrderByCreateAtDesc(LocalDateTime startDate, LocalDateTime endDate);

    List<Vote> findAllByCategoryIdAndTitleContainingOrDescriptionContainingOrderByCreateAtDesc(int categoryId, String keyword1, String keyword2);

    List<Vote> findAllByTitleContainingOrDescriptionContainingOrderByCreateAtDesc(String keyword1, String keyword2);

}