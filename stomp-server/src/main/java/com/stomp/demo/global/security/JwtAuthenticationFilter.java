package com.stomp.demo.global.security;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpMethod;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import org.springframework.security.web.util.matcher.OrRequestMatcher;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

@Slf4j
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {

  private final JwtResolver jwtResolver;
  private final HeaderTokenExtractor headerTokenExtractor;

  @Override
  protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response,
      FilterChain filterChain) throws ServletException, IOException {
    log.info("jwt authentication filter");
    String jwtToken = headerTokenExtractor.extractToken(request);

    if (StringUtils.hasText(jwtToken) && jwtResolver.validationToken(jwtToken)) {
      Authentication authentication = jwtResolver.getAuthentication(jwtToken);
      SecurityContextHolder.getContext().setAuthentication(authentication);
    }
    filterChain.doFilter(request, response);
  }

  @Override
  protected boolean shouldNotFilter(HttpServletRequest request) throws ServletException {

    List<AntPathRequestMatcher> skipPathList = new ArrayList<>();
    skipPathList.add(new AntPathRequestMatcher("/api/user/sign-up", HttpMethod.POST.name()));
    skipPathList.add(new AntPathRequestMatcher("/", HttpMethod.GET.name()));
    skipPathList.add(new AntPathRequestMatcher("/api/user/sign-in", HttpMethod.POST.name()));
    OrRequestMatcher orRequestMatcher = new OrRequestMatcher(new ArrayList<>(skipPathList));
    return skipPathList.stream()
        .anyMatch(p -> orRequestMatcher.matches(request));
  }
}