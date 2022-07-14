package com.stomp.demo.global.security;

import com.stomp.demo.exception.InvalidValueException;
import javax.servlet.http.HttpServletRequest;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

@Component
public class HeaderTokenExtractor {

  private static final String AUTHORIZATION_HEADER = "Authorization";
  private static final String HEADER_PREFIX = "Bearer ";

  public String extractToken(HttpServletRequest request) {
    String bearerHeader = request.getHeader(AUTHORIZATION_HEADER);
    System.out.println("Header 값 :" + bearerHeader);
    if (StringUtils.hasText(bearerHeader) && bearerHeader.startsWith(HEADER_PREFIX)) {
      return bearerHeader.substring(HEADER_PREFIX.length());
    }
    throw new InvalidValueException("잘못된 값 전송");
  }

}