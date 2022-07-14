package com.stomp.demo.user;

import java.util.HashMap;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class TokenProvider {

  private final JwtProvider jwtProvider;

  public Token createToken(Long userId, String nickname){

    Map<String, Object> payloads = new HashMap<>();
    payloads.put("userId",userId);
    payloads.put("nickname", nickname);

    String jwt = jwtProvider.accessToken(payloads);

    return new Token(jwt);
  }

}