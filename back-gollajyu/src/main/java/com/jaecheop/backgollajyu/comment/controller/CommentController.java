package com.jaecheop.backgollajyu.comment.controller;


import com.jaecheop.backgollajyu.comment.entity.Comment;
import com.jaecheop.backgollajyu.comment.model.CommentLikesReqDto;
import com.jaecheop.backgollajyu.comment.model.CommentReqDto;
import com.jaecheop.backgollajyu.comment.repository.CommentRepository;
import com.jaecheop.backgollajyu.member.entity.Member;
import com.jaecheop.backgollajyu.member.repostory.MemberRepository;
import com.jaecheop.backgollajyu.vote.entity.Vote;
import com.jaecheop.backgollajyu.vote.entity.VoteItem;
import com.jaecheop.backgollajyu.vote.repository.VoteItemRepository;
import com.jaecheop.backgollajyu.vote.repository.VoteRepository;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/votes")
public class CommentController {


    private final MemberRepository memberRepository;
    private final VoteRepository voteRepository;
    private final VoteItemRepository voteItemRepository;
    private final CommentRepository commentRepository;


    @PostMapping("/details/comments")
    @Operation(summary = "댓글 생성", description = "returns String")

    public ResponseEntity<String> createComment(@RequestBody CommentReqDto commentReqDto) {
        // Retrieve related entities
        Optional<Member> memberOptional = memberRepository.findById(commentReqDto.getMemberId());
        Optional<Vote> voteOptional = voteRepository.findById(commentReqDto.getVoteId());
        Optional<VoteItem> voteItemOptional = voteItemRepository.findById(commentReqDto.getVoteItemId());

        // Check if entities exist
        if (memberOptional.isPresent() && voteOptional.isPresent() && voteItemOptional.isPresent()) {
            Member member = memberOptional.get();
            Vote vote = voteOptional.get();
            VoteItem voteItem = voteItemOptional.get();

            // Create a new comment
            Comment newComment = Comment.createNewComment(vote, member, voteItem, commentReqDto.getCommentDesc(), commentReqDto.getCommentMentionId());

            // Save the new comment
            Comment savedComment = commentRepository.save(newComment);
            return ResponseEntity.ok("Comment created successfully with ID: " + savedComment.getId());

        } else {
            // Handle the case where entities are not found (return an appropriate response or throw an exception)
            // For simplicity, returning null here; you might want to handle this case more elegantly
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Failed to create comment. One or more entities not found.");
        }
    }


    @PostMapping("/details/comments/{commentId}")
    @Operation(summary = "투표 삭제", description = "returns String")

    public ResponseEntity<String> deleteComment(@PathVariable Long commentId) {
        // Check if the comment exists
        Optional<Comment> commentOptional = commentRepository.findById(commentId);

        if (commentOptional.isPresent()) {
            // Mark the comment as deleted by updating the isDeleted field
            Comment comment = commentOptional.get();
            comment.setDeleted(true);
            commentRepository.save(comment);
            return ResponseEntity.ok("Comment marked as deleted");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Comment not found. Unable to delete.");
        }

    }
    @PostMapping("/details/comments/likes")
    @Operation(summary = "댓글 좋아요", description = "returns Comment")

    public ResponseEntity<String> addCommentLike(@RequestBody CommentLikesReqDto commentLikesReqDto) {
        Optional<Comment> commentOptional = commentRepository.findById(commentLikesReqDto.getCommentId());

        if (commentOptional.isPresent()) {
            Comment comment = commentOptional.get();
            Optional<Member> memberOptional = memberRepository.findById(commentLikesReqDto.getMemberId());
            if (memberOptional.isPresent()) {
                Member member = memberOptional.get();
                comment.addCommentLike(member);
                return ResponseEntity.ok(String.valueOf(commentRepository.save(comment)));
            } else {
                return ResponseEntity.badRequest().body("Member not found");
            }
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/details/comments/likes")
    @Operation(summary = "댓글 좋아요 삭제", description = "returns Comment")

    public ResponseEntity<String> removeCommentLike(@RequestBody CommentLikesReqDto commentLikesReqDto) {
        Optional<Comment> commentOptional = commentRepository.findById(commentLikesReqDto.getCommentId());

        if (commentOptional.isPresent()) {
            Comment comment = commentOptional.get();
            Optional<Member> memberOptional = memberRepository.findById(commentLikesReqDto.getMemberId());
            if (memberOptional.isPresent()) {
                Member member = memberOptional.get();
                comment.removeCommentLike(member);
                return ResponseEntity.ok(String.valueOf(commentRepository.save(comment)));
            } else {
                return ResponseEntity.badRequest().body("Member not found");
            }
        } else {
            return ResponseEntity.notFound().build();
        }
    }

}
