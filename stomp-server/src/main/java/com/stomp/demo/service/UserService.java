package com.stomp.demo.service;

import com.stomp.demo.dto.SignInRequest;
import com.stomp.demo.dto.SignUpRequest;
import com.stomp.demo.entity.User;
import com.stomp.demo.exception.InvalidValueException;
import com.stomp.demo.exception.NotFoundEntityException;
import com.stomp.demo.repository.UserRepository;
import java.util.Optional;
import javax.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {

  private final UserRepository userRepository;

  public User signUp(SignUpRequest request) {
    return userRepository.save(request.toEntity());
  }

  public User login(SignInRequest request) {
    Optional<User> findUser = userRepository.findByNickname(request.getNickname());
    findUser.orElseThrow(() -> new NotFoundEntityException("user"));
    if (!findUser.get().getPassword().equals(request.getPassword())) {
      throw new InvalidValueException("password가 일치하지 않습니다");
    }
    return findUser.get();
  }

  public User getUser(String userId) {
    Optional<User> findUser = userRepository.findById(Long.valueOf(userId));
    findUser.orElseThrow(() -> new NotFoundEntityException("user"));
    return findUser.get();
  }
}
