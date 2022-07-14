package com.stomp.demo.user;

import com.stomp.demo.user.dto.SignInRequest;
import com.stomp.demo.user.dto.SignUpRequest;
import com.stomp.demo.user.dto.UserResponse;
import javax.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class UserController {

  private final UserService userService;
  private final HttpSession session;

  @PostMapping("/api/user/sign-up")
  public ResponseEntity<?> signUp(@RequestBody SignUpRequest dto) {

    User user = userService.signUp(dto);
    return ResponseEntity.ok()
        .body(UserResponse.of(user));
  }

  @PostMapping("/api/user/sign-in")
  public ResponseEntity<?> signIn(@RequestBody SignInRequest dto) {
    Token  token = userService.login(dto);

    return ResponseEntity.ok()
        .body(token);
  }

  @GetMapping("/api/user")
  public ResponseEntity<?> getUser(@LoginUser AuthUser user) {

    return ResponseEntity.ok()
          .body(UserResponse.of(userService.getUser(user.getUserId())));
  }
}
