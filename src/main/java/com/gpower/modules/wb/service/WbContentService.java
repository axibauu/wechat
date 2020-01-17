package com.gpower.modules.wb.service;

import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.service.IService;
import com.gpower.modules.wb.entity.WbContent;
import com.gpower.modules.wx.entity.WxContent;

import java.util.Date;
import java.util.List;
import java.util.Map;

/**
 * @description:
 * @author: jingff
 * @date: 2019-08-02 13:53
 */
public interface WbContentService extends IService<WbContent> {

    void createTextContent(String accoutid, String content, String username, String cmd,
                           Date finalDate,String  img);

    public  String publishText(WbContent wbcontent, String accountid, String token, Integer clength,
                               String img);

    IPage <WbContent> PublishList(Integer pageSize, Integer currentPage,String id, String loginUsername);



    IPage <WbContent> AllPublishList(Integer pageSize, Integer currentPage);

    IPage <WbContent> PublishListByUser(Integer pageSize, Integer currentPage,String id);


    List<WbContent> selectByCondition(Map<String, Object> map);

    IPage <WbContent> waitAuditlist(Integer pageSize, Integer currentPage,String id,
                                    String loginUsername);

    IPage <WbContent>  waitAllAuditList(Integer pageSize, Integer currentPage);

    IPage <WbContent>  waitAuditByUser(Integer pageSize, Integer currentPage,String id);

    IPage hasauditList(Integer pageSize, Integer currentPage, String id, String loginUsername);

    IPage AllhasauditList(Integer pageSize, Integer currentPage);

    IPage hasAuditListByUser(Integer pageSize, Integer currentPage, String id);

    void updateTextContent(String id,String accoutid, String content, String username, String cmd, Date finalDate, String img);
}
