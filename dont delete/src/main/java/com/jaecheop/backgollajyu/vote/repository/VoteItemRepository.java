package com.jaecheop.backgollajyu.vote.repository;

import com.jaecheop.backgollajyu.vote.entity.Vote;
import com.jaecheop.backgollajyu.vote.entity.VoteItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface VoteItemRepository extends JpaRepository<VoteItem, Long> {
    @Override
    Optional<VoteItem> findById(Long voteItemId);

    List<VoteItem> findAllByVoteId(Long voteId);

    List<VoteItem> findVoteItemsByVote(Vote vote);
}
