package com.stomp.demo.user;

import com.stomp.demo.user.User;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {

  Optional<User> findByNickname(String nickname);
}
