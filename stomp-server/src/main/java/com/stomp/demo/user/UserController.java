package com.stomp.demo.user;

import com.stomp.demo.user.dto.SignInRequest;
import com.stomp.demo.user.dto.SignUpRequest;
import com.stomp.demo.user.dto.UserResponse;
import javax.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
    System.out.println("--");
    User user = userService.signUp(dto);
    return ResponseEntity.ok()
        .body(UserResponse.of(user));
  }

  @PostMapping("/api/user/sign-in")
  public ResponseEntity<?> signIn(@RequestBody SignInRequest dto) {
    User user = userService.login(dto);

    session.setAttribute("sessionId", user.getId());

    return ResponseEntity.ok()
        .body(UserResponse.of(user));
  }

  @GetMapping("/api/user")
  public ResponseEntity<?> getUser() {
    Object userId = session.getAttribute("sessionId");
    if (userId == null) {
      return new ResponseEntity(HttpStatus.BAD_REQUEST);
    } else {
      User user = userService.getUser(userId.toString());
      return ResponseEntity.ok()
          .body(UserResponse.of(user));
    }
  }
}
