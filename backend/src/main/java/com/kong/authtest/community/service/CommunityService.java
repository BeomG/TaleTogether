package com.kong.authtest.community.service;

import com.kong.authtest.community.dto.*;
import com.kong.authtest.community.model.Community;
import com.kong.authtest.community.repository.CommunityRepository;
import com.kong.authtest.likes.service.LikesService;
import com.kong.authtest.tale.model.Tale;
import com.kong.authtest.tale.repository.TaleRepository;
import com.kong.authtest.user.model.User;
import com.kong.authtest.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class CommunityService {

    private final CommunityRepository communityRepository;
    private final UserRepository userRepository;
    private final TaleRepository taleRepository;
    private final LikesService likesService;

    //    이것도 user의 id가 Long 형태로 바뀌어야 함
    @Transactional
    public CommunityDtoResponse register(CommunityDtoRequest communityDtoRequest) {
        return new CommunityDtoResponse(communityRepository.save(communityDtoRequest.toCommunity()
                .addUser(getUser(communityDtoRequest))
                .addTale(getTale(communityDtoRequest))));
    }

    public CommunityDtoGetResponse getCommunityInfo(Long communityId) {
        CommunityDtoGetResponse communityDtoGetResponse = new CommunityDtoGetResponse(findCommunityById(communityId));
        communityDtoGetResponse.setLikes(likesService.getLikesCount(communityId));
        return communityDtoGetResponse;
    }

    public CommunityDtoResponse modify(CommunityDtoPutRequest communityDtoPutRequest) {
        findCommunityById(communityDtoPutRequest.getCommunityId())
                .updateCommunity(communityDtoPutRequest);
        return new CommunityDtoResponse(findCommunityById(communityDtoPutRequest.getCommunityId()));
    }

    @Transactional
    public void delete(Long communityId) {
        communityRepository.deleteById(communityId);
    }

    public List<CommunityDtoGetResponse> getAll(int page){
        return communityRepository.findAll(PageRequest.of(page, 9))
                .stream()
                .map((CommunityDtoGetResponse::new))
                .collect(Collectors.toList());
    }

    private User getUser(CommunityDtoRequest communityDtoRequest) {
        return userRepository.findUserByUserId(communityDtoRequest.getUserId())
                .orElseThrow(() -> new IllegalArgumentException("id 실수?"));
    }

    private Tale getTale(CommunityDtoRequest communityDtoRequest) {
        return taleRepository.findById(communityDtoRequest.getTaleId())
                .orElseThrow(() -> new IllegalArgumentException("taleId 문제"));
    }

    private Community findCommunityById(Long communityId) {

        return communityRepository
                .findById(communityId)
                .orElseThrow(() -> new IllegalArgumentException("not found"));
    }
}
