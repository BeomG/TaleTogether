package com.kong.authtest.page.dto;

import com.kong.authtest.page.model.Page;
import lombok.Data;

@Data
public class PageDtoResponse {
    private Long pageId;
    private String content;
    private String image;
    private int sequence;
    private String title;
    private String titleImage;

    public PageDtoResponse(Page page) {
        this.pageId = page.getPageId();
        this.content = page.getContent().getContent();
        this.sequence = page.getSequence();
        this.image = page.getImage();
        this.title = page.getTitle();
        this.titleImage = page.getTitleImage();
    }
}
