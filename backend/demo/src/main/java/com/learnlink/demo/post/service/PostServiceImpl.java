package com.learnlink.demo.post.service;

import com.learnlink.demo.post.dto.PostDTO;
import com.learnlink.demo.post.entity.Post;
import com.learnlink.demo.post.repository.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class PostServiceImpl implements PostService {

    private final PostRepository repository;

    @Autowired
    public PostServiceImpl(PostRepository repository) {
        this.repository = repository;
    }

    private PostDTO mapToDTO(Post post) {
        PostDTO dto = new PostDTO();
        dto.setId(post.getId());
        dto.setTitle(post.getTitle());
        dto.setDescription(post.getDescription());
        return dto;
    }

    private Post mapToEntity(PostDTO dto) {
        Post post = new Post();
        post.setId(dto.getId());
        post.setTitle(dto.getTitle());
        post.setDescription(dto.getDescription());
        return post;
    }

    @Override
    public PostDTO createPost(PostDTO dto) {
        return mapToDTO(repository.save(mapToEntity(dto)));
    }

    @Override
    public PostDTO getPost(Long id) {
        return repository.findById(id).map(this::mapToDTO).orElse(null);
    }

    @Override
    public List<PostDTO> getAllPosts() {
        return repository.findAll().stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    public PostDTO updatePost(Long id, PostDTO dto) {
        Post post = repository.findById(id).orElseThrow();
        post.setTitle(dto.getTitle());
        post.setDescription(dto.getDescription());
        return mapToDTO(repository.save(post));
    }

    @Override
    public void deletePost(Long id) {
        repository.deleteById(id);
    }
}
