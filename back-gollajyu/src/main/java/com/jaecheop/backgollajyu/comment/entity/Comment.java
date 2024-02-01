package com.jaecheop.backgollajyu.comment.entity;

import com.jaecheop.backgollajyu.member.entity.Member;
import com.jaecheop.backgollajyu.vote.entity.Vote;
import com.jaecheop.backgollajyu.vote.entity.VoteItem;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Comment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "comment_id")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "vote_id")
    private Vote vote;

    @ManyToOne
    @JoinColumn(name = "member_id")
    private Member member;

    @ManyToOne
    @JoinColumn(name = "vote_item_id")
    private VoteItem voteItem;

    private String commentDesc;

    private LocalDateTime createAt;

    private boolean isDeleted;

    private Long commentMentionId;

    @OneToMany(mappedBy = "comment", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<CommentLikes> commentLikes = new ArrayList<>();

    public void addCommentLike(Member member) {
        CommentLikes commentLike = CommentLikes.builder()
                .member(member)
                .comment(this)
                .createAt(LocalDateTime.now())
                .build();
        commentLikes.add(commentLike);
    }

    public void removeCommentLike(Member member) {
        commentLikes.removeIf(commentLike -> commentLike.getMember().equals(member));
    }

    public static Comment createNewComment(Vote vote, Member member, VoteItem voteItem, String commentDesc, Long commentMentionId) {
        Comment comment = new Comment();
        comment.setVote(vote);
        comment.setMember(member);
        comment.setVoteItem(voteItem);
        comment.setCommentDesc(commentDesc);
        comment.setCreateAt(LocalDateTime.now());
        comment.setDeleted(false);
        comment.setCommentMentionId(commentMentionId);
        return comment;
    }
}
