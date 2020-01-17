package com.gpower.modules.wx.service;

import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.service.IService;
import com.gpower.modules.wx.entity.WxContent;
import com.gpower.modules.wx.entity.WxImageContent;
import com.gpower.modules.wx.entity.WxNewsContent;
import com.gpower.modules.wx.entity.WxTextContent;

import java.util.Date;
import java.util.List;
import java.util.Map;

/**
 * @description:
 * @author: jingff
 * @date: 2019-07-24 14:20
 */
public interface WxContentService extends IService<WxContent> {
    WxContent findById(String id) ;


    WxContent createTextContent(String accountID, String content, String username, Date date,
                                String cmd,String title,String groupSendId);

    WxContent createImageContent(String accountID, String newFileName, String username, Date date
            , String cmd,String imagetitle,String groupSendId);

    public WxContent publishText(WxContent wxContent,WxTextContent text);
    public WxContent publishImage(WxContent wxContent,WxImageContent image);

    List<WxContent> selectByCondition(Map<String, Object> map);

    void updatePublishStatus(Date publishDateEnd, int statusPublishing);

    public WxTextContent getText(String wxContentID)throws Exception;

    WxImageContent getImage(String id);

    List<WxNewsContent> getNews(String id);

    IPage<WxContent> findNotPublishArticle(Integer pageSize, Integer currentPage ,String id,
                                           String loginUsername);

    IPage<WxContent> findNotAllPublishArticle(Integer pageSize, Integer currentPage );

    IPage<WxContent> findPublishArticle(Integer pageSize, Integer currentPage ,String id,
                                       String loginUsername);

    IPage<WxContent> findAllPublishArticle(Integer pageSize, Integer currentPage );

    IPage<WxContent> PublishArticle(Integer pageSize,Integer currentPage, String id,
                                    String loginUsername);

    IPage<WxContent> AllPublishArticle(Integer pageSize, Integer currentPage);

    void deletePulishArticle(WxContent wxContent);

    IPage<WxContent> draftArticle(Integer pageSize, Integer currentPage,String id,
                                 String loginUsername);

    IPage<WxContent> AlldraftArticle(Integer pageSize, Integer currentPage);

    WxContent createNewsContent(String accountID, List<WxNewsContent> newsList, String username,
                                Date date, String cmd,String groupSendId) throws Exception;
    public String publishWxNews(WxContent wxContent,List<WxNewsContent> newsList) throws Exception;

    IPage<WxContent> findDraftAticlebyuser(String title,Integer pageSize, Integer currentPage,
                                           String id,
                                           String loginUsername);

    void updateTextContent(String aid,String wcid, String content, String username, Date finalDate,
                           String cmd,String title);

    void updateImageContent(String accountID, String imgPath, String username, Date date,
                            String cmd,String imagetitle);

    IPage<WxContent> publicArticleByUser(Integer pageSize, Integer currentPage, String id, String loginUsername);

    IPage<WxContent>  findNotAllPublishArticleByUser(Integer pageSize, Integer currentPage,String id, String loginUsername);

    IPage<WxContent> findAllPublishArticleByUser( Integer pageSize, Integer currentPage,
                                                  String id, String loginUsername);

    WxContent updateNewsContent(String id, String aid, List<WxNewsContent> newsList,
                                String username, Date finalDate2, String cmd) throws  Exception;
}
