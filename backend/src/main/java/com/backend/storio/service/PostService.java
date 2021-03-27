package com.backend.storio.service;

import com.backend.storio.dao.Course;
import com.backend.storio.dao.Post;
import com.backend.storio.dao.User;
import com.backend.storio.dto.PostCreateDto;
import com.backend.storio.exception.EntityNotFoundException;
import com.backend.storio.repository.CourseRepository;
import com.backend.storio.repository.PostRepository;
import com.backend.storio.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class PostService {

    private final PostRepository postRepository;

    private final CourseRepository courseRepository;

    private final UserRepository userRepository;

    @Autowired
    public PostService(final PostRepository postRepository,
                       final CourseRepository courseRepository,
                       final UserRepository userRepository) {
        this.postRepository = postRepository;
        this.courseRepository = courseRepository;
        this.userRepository = userRepository;
    }

    /**
     * Creates a post for the specific course
     *
     * @param postCreateDto information to create a post
     * @param userId current user id. This user will be the post author
     */
    public void createPost(PostCreateDto postCreateDto, UUID userId) {
        Course course = courseRepository.findCourseById(postCreateDto.getCourseId())
                .orElseThrow(() -> new EntityNotFoundException("No such course exists"));

        User user = userRepository.findUserById(userId)
                .orElseThrow(() -> new EntityNotFoundException("No such user exists"));

        Post post = new Post();
        post.setAuthor(user);
        post.setCourse(course);
        post.setText(postCreateDto.getText());

        course.getPosts().add(post);

        postRepository.save(post);
        courseRepository.save(course);
    }

}
