package com.kong.authtest.comment.controller;

import com.kong.authtest.auth.service.TokenService;
import com.kong.authtest.comment.dto.CommentDtoPutRequest;
import com.kong.authtest.comment.dto.CommentDtoRequest;
import com.kong.authtest.comment.dto.CommentDtoResponse;
import com.kong.authtest.comment.service.CommentService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import javax.mail.search.HeaderTerm;

import static com.kong.authtest.auth.util.JwtTokenUtil.HEADER_STRING;

@RequestMapping("/api/comment")
@RequiredArgsConstructor
@Slf4j
@RestController
@Api(tags = "comment")
public class CommentController {
    private final CommentService commentService;
    private final TokenService tokenService;

    @PostMapping("/register")
    @ApiOperation(value = "comment 작성 API", notes = "comment를 작성하기 위한 API, content, userId, communityId가 필요하다.", response = CommentDtoResponse.class)
    public ResponseEntity<?> register(@RequestBody CommentDtoRequest commentDtoRequest, final Authentication authentication) {
        try{
            commentDtoRequest.setUserId((String) authentication.getPrincipal());
            return ResponseEntity.ok(commentService.register(commentDtoRequest));
        }catch (Exception e){
            return ResponseEntity.badRequest().body("comment register 오류");
        }
    }

    @GetMapping("/info/{commentId}")
    @ApiOperation(value = "comment 정보를 얻는 API", notes = "comment정보를 얻기위한 API, commentId가 필요하다", response = CommentDtoResponse.class)
    public ResponseEntity<?> getComment(@PathVariable Long commentId) {
        try {
            return ResponseEntity.ok(commentService.getInfo(commentId));
        }catch (Exception e){
            return ResponseEntity.badRequest().body("getComment 오류");
        }
    }

    @PutMapping("/modify")
    @ApiOperation(value = "comment 정보 수정 API", notes = "comment 정보 수정하기위한 API, content, commentId가 필요하다.", response = CommentDtoResponse.class)
    public ResponseEntity<?> modifyComment(@RequestBody CommentDtoPutRequest commentDtoPutRequest) {
        try {
            return ResponseEntity.ok(commentService.modifyComment(commentDtoPutRequest));
        }catch (Exception e){
            return ResponseEntity.badRequest().body("modifyComment 오류");
        }
    }

    @DeleteMapping("/delete/{commentId}")
    @ApiOperation(value = "comment 삭제 API", notes = "comment 정보를 삭제하기 위한 API, commentId가 필요하다.", response = Boolean.class)
    public ResponseEntity<?> delete(@PathVariable Long commentId) {
        try {
            commentService.delete(commentId);
            return ResponseEntity.ok(true);
        }catch (Exception e) {
            return ResponseEntity.badRequest().body("delete comment 오류");
        }
    }
}
