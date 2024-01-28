package com.jaecheop.backgollajyu.vote.repository;

import com.jaecheop.backgollajyu.vote.entity.Category;
import com.jaecheop.backgollajyu.vote.entity.VoteItem;
import com.jaecheop.backgollajyu.vote.entity.VoteResult;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface VoteResultRepository extends JpaRepository<VoteResult, Long> {

    Optional<VoteResult> findByMemberIdAndVoteId(Long memberId, Long voteId);

    @Query("SELECT vr FROM VoteResult vr WHERE vr.voteItem = :voteItem")
    List<VoteResult> findByVoteItem(VoteItem voteItem);


    @Query("SELECT vr FROM VoteResult vr")
    List<VoteResult> findByAll();


    List<VoteResult> findByCategoryId(Integer categoryId);

    List<VoteResult> findByMemberIdAndCategoryId(Long memberId, Integer categoryId);
}
