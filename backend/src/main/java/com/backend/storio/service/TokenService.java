package com.backend.storio.service;

import com.backend.storio.constants.SecurityConstants;
import com.backend.storio.dto.AuthUserDto;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;
import java.util.function.Function;


@Service
public class TokenService {

    @Value(value = "${auth0.secret-key}")
    private String SECRET_KEY;

    static public UUID getUserId() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        var currentUserId = (String) auth.getPrincipal();
        return UUID.fromString(currentUserId);
    }

    public String extractUserid(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    public Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }

    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    private Claims extractAllClaims(String token) {
        return Jwts.parser().setSigningKey(SECRET_KEY).parseClaimsJws(token).getBody();
    }

    public Boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    public String generateToken(AuthUserDto userDetails) {
        Map<String, Object> claims = new HashMap<>();
        return createToken(claims, userDetails.getId());
    }

    private String createToken(Map<String, Object> claims, UUID subject) {
        SecretKey key = Keys.hmacShaKeyFor(Decoders.BASE64.decode(SECRET_KEY));
        return Jwts.builder()
                .setClaims(claims)
                .setSubject(subject.toString())
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + SecurityConstants.TOKEN_EXPIRATION))
                .signWith(key, SignatureAlgorithm.HS256)
                .compact();
    }

}