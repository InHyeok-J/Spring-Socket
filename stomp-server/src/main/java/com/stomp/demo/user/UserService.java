package com.stomp.demo.user;

import com.stomp.demo.user.dto.SignInRequest;
import com.stomp.demo.user.dto.SignUpRequest;
import com.stomp.demo.exception.InvalidValueException;
import com.stomp.demo.exception.NotFoundEntityException;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {

  private final UserRepository userRepository;
  private final TokenProvider tokenProvider;

  public User signUp(SignUpRequest request) {
    return userRepository.save(request.toEntity());
  }

  public Token login(SignInRequest request) {
    User findUser = userRepository.findByNickname(request.getNickname())
        .orElseThrow(() -> new NotFoundEntityException("user"));

    if (!findUser.getPassword().equals(request.getPassword())) {
      throw new InvalidValueException("password가 일치하지 않습니다");
    }

    return tokenProvider.createToken(findUser.getId(), findUser.getNickname());
  }

  public User getUser(String userId) {
    Optional<User> findUser = userRepository.findById(Long.valueOf(userId));
    findUser.orElseThrow(() -> new NotFoundEntityException("user"));
    return findUser.get();
  }
}
