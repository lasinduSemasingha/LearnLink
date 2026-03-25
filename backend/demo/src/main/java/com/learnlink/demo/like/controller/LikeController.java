package com.learnlink.demo.like.controller;

import com.learnlink.demo.like.dto.LikeDTO;
import com.learnlink.demo.like.service.LikeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/likes")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class LikeController {

    @Autowired
    private LikeService likeService;

    @PostMapping
    public ResponseEntity<Void> addLike(@RequestBody LikeDTO dto) {
        likeService.addLike(dto);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping
    public ResponseEntity<Void> removeLike(@RequestBody LikeDTO dto) {
        likeService.removeLike(dto);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/count/{postId}")
    public ResponseEntity<Long> getLikeCount(@PathVariable Long postId) {
        return ResponseEntity.ok(likeService.getLikeCount(postId));
    }

    @GetMapping("/isLiked/{postId}")
    public ResponseEntity<Boolean> isLiked(@PathVariable Long postId) {
        return ResponseEntity.ok(likeService.isPostLiked(postId));
    }
}