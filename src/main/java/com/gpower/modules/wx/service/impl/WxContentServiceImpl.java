package com.gpower.modules.wx.service.impl;

import cn.hutool.core.lang.Console;
import cn.hutool.core.util.ObjectUtil;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.gpower.common.exception.GpException;
import com.gpower.common.exception.WxException;
import com.gpower.common.utils.ShiroUtil;
import com.gpower.common.utils.StringUtil;
import com.gpower.common.utils.UUIDGenerator;
import com.gpower.modules.user.dao.GroupDao;
import com.gpower.modules.user.dao.UserDao;
import com.gpower.modules.user.entity.Group;
import com.gpower.modules.user.entity.User;
import com.gpower.modules.user.service.GroupService;
import com.gpower.modules.wb.entity.WbContent;
import com.gpower.modules.wx.dao.*;
import com.gpower.modules.wx.entity.*;
import com.gpower.modules.wx.service.WxContentService;
import com.gpower.modules.wx.util.HtmlUtil;
import com.gpower.modules.wx.util.HttpUtil;
import com.gpower.modules.wx.util.WxRemoteUtil;
import com.gpower.modules.wx.util.WxUtils;
import com.gpower.startup.config.ApplicationContextUtil;
import org.apache.commons.collections4.CollectionUtils;
import org.apache.commons.lang.ObjectUtils;
import org.apache.commons.lang.StringUtils;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.File;
import java.util.*;
import java.util.stream.Collectors;

/**
 * @description:
 * @author: jingff
 * @date: 2019-07-24 14:21
 */
@Service("wxContentService")
public class WxContentServiceImpl extends ServiceImpl <WxContentDao, WxContent> implements WxContentService {
    @Autowired
    WxContentDao WxContentDao;

    @Autowired
    WxTextContentDao wxTextContentDao;

    @Autowired
    WxImageContentDao wxImageContentDao;

    @Autowired
    WxAccountDao wxAccountDao;
    @Autowired
    WxNewsContentDao wxNewsContentDao;

    @Autowired
    GroupService groupService;
    @Autowired
    UserDao userDao;
    @Autowired
    GroupDao groupDao;
    @Autowired
    Environment env;

    @Override
    public WxContent findById(String id) {
        WxContent wxContent = WxContentDao.selectById(id);
        WxAccount wxAccount = wxAccountDao.selectById(wxContent.getWxAccountID());

        wxContent.setWxAccount(wxAccount);
        if (wxContent.getType() == 1) {
            WxTextContent wxTextContent =
                    wxTextContentDao.selectOne(new QueryWrapper <WxTextContent>().eq(
                            "wxContentID",
                            wxContent.getId()));

            wxContent.setText(wxTextContent);

        } else if (wxContent.getType() == 2) {
            WxImageContent wxImageContent = wxImageContentDao.selectOne(new QueryWrapper <WxImageContent>().eq("wxContentID",
                    wxContent.getId()));
            wxContent.setImage(wxImageContent);

        } else {
            List <WxNewsContent> wxNewslist =
                    wxNewsContentDao.selectList(new QueryWrapper <WxNewsContent>().eq("wxContentID",
                            wxContent.getId()));
            wxContent.setNewsList(wxNewslist);
        }
        return wxContent;
    }

    @Override
    public WxContent createTextContent(String accountID, String content, String username,
                                       Date publishDate, String cmd,String title,String groupSendId) {
        User user = userDao.selectOne(new QueryWrapper <User>().eq("name", username));
        String userId = user.getId();
        Collection <String> allPermissions = ShiroUtil.getAllPermissions(username);
        WxContent wxContent = new WxContent();
        wxContent.generateKey();
        wxContent.setCreateDate(new Date());
        wxContent.setOwner(userId);
        wxContent.setGroupsendid(groupSendId);
        wxContent.setWxAccountID(accountID);
        wxContent.setType(WxContent.TYPE_TEXT);
        WxTextContent text = new WxTextContent();
        text.setContent(content);
        text.setTitle(title);
        text.setWxContentID(wxContent.getId());
        text.generateKey();
        wxTextContentDao.insert(text);
        boolean publishNow = false;
        if (allPermissions.contains("user") || allPermissions.contains("role") || allPermissions.contains("group")) {
            if ("save".equals(cmd)) {
                wxContent.setStatus(WxContent.STATUS_CAOGAO);
                wxContent.setPublishDate(publishDate);
            } else {
                wxContent.setPublishDate(publishDate == null ? wxContent.getCreateDate() : publishDate);
                if (publishDate == null) {
                    publishNow = true;
                    wxContent.setStatus(WxContent.STATUS_PUBLISHED);
                } else {
                    wxContent.setStatus(WxContent.STATUS_REVOKED);
                }
            }
            WxContentDao.insert(wxContent);
            if (publishNow) {
                String wxResult = null;
                if (env.getProperty("gpower.wxpublish.remote.on", "false").equals("true")) {
                    wxResult = WxRemoteUtil.publishText(accountID, content);
                    JSONObject resultJson = new JSONObject(wxResult);
                    if (resultJson.optInt("status", 500) == 200 && StringUtils.isNotBlank(resultJson.optString("wxResult"))) {
                        wxContent.setWxResult(resultJson.optString("wxResult"));
                        wxContent.setStatus(WxContent.STATUS_PUBLISHED);
                        WxContentDao.updateById(wxContent);
                        //WxContentDao.update(wxContent);
                    } else {
                        throw new GpException(resultJson.optString("msg", "系统异常"));
                    }
                } else {
                    try {
                        publishText(wxContent, text);
                    } catch (Exception e) {
                        e.printStackTrace();
                    }
                }
            }
        } else {
            //普通用户
            if ("save".equals(cmd)) {
                wxContent.setStatus(WxContent.STATUS_CAOGAO);
                wxContent.setPublishDate(publishDate);
                WxContentDao.insert(wxContent);
            } else {
                wxContent.setPublishDate(publishDate == null ? wxContent.getCreateDate() : publishDate);
                if (publishDate == null) {
                    publishNow = true;
                    wxContent.setStatus(WxContent.STATUS_NEW);
                    // WxContentDao.insert(wxContent);
                    throw new GpException("您没有权限立即发布，请提交给管理员审核");
                } else {
                    wxContent.setStatus(WxContent.STATUS_NEW);
                    WxContentDao.insert(wxContent);

                }
            }


        }
        return wxContent;
    }

    @Override
    public WxContent createImageContent(String accountID, String newFileName, String username,
                                        Date publishDate, String cmd,String imagtitle,String groupSendId) {
        User user = userDao.selectOne(new QueryWrapper <User>().eq("name", username));
        Collection <String> allPermissions = ShiroUtil.getAllPermissions(username);
        String userId = user.getId();
        WxContent wxContent = new WxContent();
        wxContent.generateKey();
        wxContent.setCreateDate(new Date());
        wxContent.setOwner(userId);
wxContent.setGroupsendid(groupSendId);
        wxContent.setWxAccountID(accountID);
        wxContent.setType(WxContent.TYPE_IMAGE);
        WxImageContent image = new WxImageContent();
        image.generateKey();
        image.setImgUrl(newFileName);
        image.setWxContentID(wxContent.getId());
        image.setImagetitle(imagtitle);
        wxImageContentDao.insert(image);

        boolean publishNow = false;
        if (allPermissions.contains("role") || allPermissions.contains("user") || allPermissions.contains("group")) {
            if ("save".equals(cmd)) {
                wxContent.setStatus(WxContent.STATUS_CAOGAO);
                wxContent.setPublishDate(publishDate);
            } else {
                wxContent.setPublishDate(publishDate == null ? wxContent.getCreateDate() : publishDate);
                if (publishDate == null) {
                    publishNow = true;
                    wxContent.setStatus(WxContent.STATUS_PUBLISHED);
                } else {
                    wxContent.setStatus(WxContent.STATUS_REVOKED);
                }
            }
            WxContentDao.insert(wxContent);
            if (publishNow) {
                if (env.getProperty("gpower.wxpublish.remote.on", "false").equals("true")) {
                    String property = env.getProperty("gpower.publish.path");
                    String path = property + File.separator + "wx" + File.separator + accountID + File.separator + image.getImgUrl();
                    String wxResult = WxRemoteUtil.publishImage(accountID, new File(path));
                    JSONObject resultJson = new JSONObject(wxResult);
                    if (resultJson.optInt("status", 500) == 200 && StringUtils.isNotBlank(resultJson.optString("wxResult"))) {
                        wxContent.setWxResult(resultJson.optString("wxResult"));
                        wxContent.setStatus(WxContent.STATUS_PUBLISHED);
                        WxContentDao.updateById(wxContent);
                    } else {
                        throw new GpException(resultJson.optString("msg", "系统异常"));
                    }
                } else {
                    try {
                         wxContent = publishImage(wxContent, image);

                    } catch (Exception e) {
                        e.printStackTrace();
                    }
                }
            }
        } else {

            if ("save".equals(cmd)) {
                wxContent.setStatus(WxContent.STATUS_CAOGAO);
                wxContent.setPublishDate(publishDate);
                WxContentDao.insert(wxContent);
            } else {
                wxContent.setPublishDate(publishDate == null ? wxContent.getCreateDate() : publishDate);
                if (publishDate == null) {
                    publishNow = true;
                    wxContent.setStatus(WxContent.STATUS_NEW);
                    //WxContentDao.insert(wxContent);


                } else {
                    wxContent.setStatus(WxContent.STATUS_NEW);
                    WxContentDao.insert(wxContent);
                }
            }


        }

        return wxContent;
    }

    @Override
    public WxContent publishText(WxContent wxContent, WxTextContent text) {

        String accountID = wxContent.getWxAccountID();
        String wxResult = WxUtils.sendText(accountID, text.getContent());
        JSONObject json = new JSONObject(wxResult);
        System.out.println("jsonResult___" + wxResult);
        int errcode = json.optInt("errcode", -1);
        System.out.println("errcode------" + errcode);
        if (errcode > 0) {

            wxContent.setWxResult(wxResult);
            wxContent.setStatus(WxContent.STATUS_PUBLISHFAIL);
            WxContentDao.updateById(wxContent);
            if(errcode==48001){
                throw  new GpException("请先认证才可以群发");
            }
            throw new GpException("weixin.errror.code." + errcode);
        } else {
            wxContent.setWxResult(wxResult);
            wxContent.setStatus(WxContent.STATUS_PUBLISHED);
            WxContentDao.updateById(wxContent);
        }

return  wxContent;
    }

    @Override
    public WxContent publishImage(WxContent wxContent, WxImageContent image) {

        String accountID = wxContent.getWxAccountID();
        String property = env.getProperty("gpower.publish.path");
        String path =
                property + File.separator + "wx" + File.separator + accountID + File.separator + image.getImgUrl();
        String mediaID = null;
        try {
            mediaID = WxUtils.uploadMedia(accountID, new File(path), WxUtils.MEDIA_TYPE_THUMB);
        } catch (WxException e) {
            e.printStackTrace();
        }
        image.setImageMediaID(mediaID);
        wxImageContentDao.updateById(image);
        String wxResult = WxUtils.sendImage(accountID, mediaID);
        JSONObject json = new JSONObject(wxResult);
        Integer errcode = (Integer) json.opt("errcode");
        wxContent.setWxResult(wxResult);
        if (errcode > 0) {
            wxContent.setStatus(WxContent.STATUS_PUBLISHFAIL);
            WxContentDao.updateById(wxContent);

        }
        wxContent.setStatus(WxContent.STATUS_PUBLISHED);
        WxContentDao.updateById(wxContent);
        return  wxContent;
    }

    @Override
    public List <WxContent> selectByCondition(Map <String, Object> map) {
        return WxContentDao.selectByCondition(map);
    }

    @Override
    public void updatePublishStatus(Date publishDateEnd, int statusPublishing) {
        WxContentDao.updatePublishStatus(publishDateEnd, statusPublishing);
    }

    @Override
    public WxTextContent getText(String id) {
        return WxContentDao.getText(id);
    }

    @Override
    public WxImageContent getImage(String id) {
        return null;
    }

    @Override
    public List <WxNewsContent> getNews(String id) {
        return null;
    }

    @Override
    public IPage findNotPublishArticle(Integer pageSize, Integer currentPage ,String id,
                                   String loginUsername) {
       List<String> allIDs = wxAccountDao.selectids();



        Page <WxContent> objects = new Page <>(currentPage, pageSize);
        Set <User> users = groupService.selectGroupbyUserId(id);
        List <String> collect = users.stream().map(User::getId).collect(Collectors.toList());
        Console.log("collect-" + collect.toString());
        List <Integer> aa = new ArrayList <>();
        aa.add(1);

        QueryWrapper <WxContent> quer = new QueryWrapper <>();
        quer.in(!ObjectUtil.isEmpty(collect), "owner", collect).in(CollectionUtils.isNotEmpty(allIDs),"wxAccountID",allIDs).in("status", aa).orderByDesc(
                "createDate");
        IPage <WxContent> wxContentIPage = WxContentDao.selectPage(objects, quer);
        List <WxContent> wxContentList = wxContentIPage.getRecords();
        if(pageSize*(currentPage-1)>wxContentIPage.getTotal()){
            objects = new Page <>(1, pageSize);
            wxContentIPage=  WxContentDao.selectPage(objects, quer);
            wxContentList = wxContentIPage.getRecords();
        }

        wxContentList.forEach(wxContent -> {
            if (wxContent.getType() == 1) {
                WxTextContent wxTextContent =
                        wxTextContentDao.selectOne(new QueryWrapper <WxTextContent>().eq(
                                "wxContentID",
                                wxContent.getId()));

                wxContent.setText(wxTextContent);

            } else if (wxContent.getType() == 2) {
                WxImageContent wxImageContent = wxImageContentDao.selectOne(new QueryWrapper <WxImageContent>().eq("wxContentID",
                        wxContent.getId()));
                wxContent.setImage(wxImageContent);

            } else {
                List <WxNewsContent> wxNewslist =
                        wxNewsContentDao.selectList(new QueryWrapper <WxNewsContent>().eq("wxContentID",
                                wxContent.getId()));
                wxContent.setNewsList(wxNewslist);
            }
        });

        return wxContentIPage;

    }

    @Override
    public IPage <WxContent> findNotAllPublishArticle(Integer currentPage, Integer pageSize) {
        Page <WxContent> objects = new Page <>(currentPage, pageSize);
        QueryWrapper <WxContent> queryWrapper = new QueryWrapper <>();
        List <Integer> aa = new ArrayList <>();
        aa.add(1);
       List<String> allIDs = wxAccountDao.selectids();

        queryWrapper.in("status", aa).in(CollectionUtils.isNotEmpty(allIDs),"wxAccountID",allIDs);

        IPage <WxContent> wxContentIPage = WxContentDao.selectPage(objects, queryWrapper);
        List <WxContent> wxContents =wxContentIPage.getRecords();
        if(pageSize*(currentPage-1)>wxContentIPage.getTotal()){
            objects = new Page <>(1, pageSize);
            wxContentIPage=  WxContentDao.selectPage(objects, queryWrapper);
            wxContents =wxContentIPage.getRecords();
        }


        if (wxContents.size() > 0) {
            wxContents.forEach(wxContent -> {
                if (wxContent.getType() == 1) {

                    WxTextContent wxTextContent =
                            wxTextContentDao.selectOne(new QueryWrapper <WxTextContent>().eq(
                                    "wxContentID",
                                    wxContent.getId()));

                    wxContent.setText(wxTextContent);
                    System.out.println("wxContent---" + wxContent.getText());
                } else if (wxContent.getType() == 2) {
                    WxImageContent wxImageContent = wxImageContentDao.selectOne(new QueryWrapper <WxImageContent>().eq("wxContentID",
                            wxContent.getId()));
                    wxContent.setImage(wxImageContent);

                } else {
                    List <WxNewsContent> wxNewslist =
                            wxNewsContentDao.selectList(new QueryWrapper <WxNewsContent>().eq("wxContentID",
                                    wxContent.getId()));
                    wxContent.setNewsList(wxNewslist);
                }
            });

        }
return wxContentIPage;
    }


    @Override
    public IPage <WxContent> findPublishArticle(Integer pageSize, Integer currentPage ,String id, String loginUsername) {
        Page <WxContent> objects = new Page <>(currentPage, pageSize);
        Set <User> users = groupService.selectGroupbyUserId(id);
       List<String> allIDs = wxAccountDao.selectids();

        List <String> collect = users.stream().map(User::getId).collect(Collectors.toList());
        QueryWrapper <WxContent> queryWrapper = new QueryWrapper <>();
        List <Integer> status=new ArrayList <>();
        status.add(WxContent.STATUS_AUDIT);
        status.add(WxContent.STATUS_MODIFIED);
        status.add(WxContent.STATUS_SUBMIT);

        queryWrapper.in(!ObjectUtil.isEmpty(collect), "owner", collect).in("status",
                status). in(CollectionUtils.isNotEmpty(allIDs),"wxAccountID",allIDs).orderByDesc(
                "createDate");

        IPage <WxContent> wxContentIPage = WxContentDao.selectPage(objects, queryWrapper);
        List <WxContent> wxContents =wxContentIPage.getRecords();
        if(pageSize*(currentPage-1)>wxContentIPage.getTotal()){
            objects = new Page <>(1, pageSize);
            wxContentIPage=  WxContentDao.selectPage(objects, queryWrapper);
            wxContents =wxContentIPage.getRecords();
        }
        if (wxContents.size() > 0) {
            wxContents.forEach(wxContent -> {
                if (wxContent.getType() == 1) {
                    WxTextContent wxTextContent =
                            wxTextContentDao.selectOne(new QueryWrapper <WxTextContent>().eq(
                                    "wxContentID",
                                    wxContent.getId()));

                    wxContent.setText(wxTextContent);
                    System.out.println("wxContent---" + wxContent.getText());
                } else if (wxContent.getType() == 2) {
                    WxImageContent wxImageContent = wxImageContentDao.selectOne(new QueryWrapper <WxImageContent>().eq("wxContentID",
                            wxContent.getId()));
                    wxContent.setImage(wxImageContent);

                } else {
                    List <WxNewsContent> wxNewslist =
                            wxNewsContentDao.selectList(new QueryWrapper <WxNewsContent>().eq("wxContentID",
                                    wxContent.getId()));
                    wxContent.setNewsList(wxNewslist);
                }
            });

        }
            return wxContentIPage;

    }

    @Override
    public IPage <WxContent> findAllPublishArticle(Integer pageSize, Integer currentPage) {
        Page <WxContent> objects = new Page <>(currentPage, pageSize);
        QueryWrapper <WxContent> queryWrapper = new QueryWrapper <>();
       List<String> allIDs = wxAccountDao.selectids();

        List <Integer> status=new ArrayList <>();
        status.add(WxContent.STATUS_AUDIT);
        status.add(WxContent.STATUS_MODIFIED);
        status.add(WxContent.STATUS_SUBMIT);
        queryWrapper.in("status",status).in(CollectionUtils.isNotEmpty(allIDs),"wxAccountID",allIDs).orderByDesc(
                "createDate");;


        IPage <WxContent> wxContentIPage = WxContentDao.selectPage(objects, queryWrapper);
        List <WxContent> wxContents =wxContentIPage.getRecords();
        if(pageSize*(currentPage-1)>wxContentIPage.getTotal()){
            objects = new Page <>(1, pageSize);
            wxContentIPage=  WxContentDao.selectPage(objects, queryWrapper);
            wxContents =wxContentIPage.getRecords();
        }
        if (wxContents.size() > 0) {
            wxContents.forEach(wxContent -> {
                if (wxContent.getType() == 1) {

                    WxTextContent wxTextContent =
                            wxTextContentDao.selectOne(new QueryWrapper <WxTextContent>().eq(
                                    "wxContentID",
                                    wxContent.getId()));

                    wxContent.setText(wxTextContent);
                    System.out.println("wxContent---" + wxContent.getText());
                } else if (wxContent.getType() == 2) {
                    WxImageContent wxImageContent = wxImageContentDao.selectOne(new QueryWrapper <WxImageContent>().eq("wxContentID",
                            wxContent.getId()));
                    wxContent.setImage(wxImageContent);

                } else {
                    List <WxNewsContent> wxNewslist =
                            wxNewsContentDao.selectList(new QueryWrapper <WxNewsContent>().eq("wxContentID",
                                    wxContent.getId()));
                    wxContent.setNewsList(wxNewslist);
                }
            });

        }
        return wxContentIPage;}


    @Override
    public   IPage<WxContent>  PublishArticle(Integer pageSize,Integer currentPage,String id,
                                              String loginUsername) {
        Set <User> users = groupService.selectGroupbyUserId(id);
       List<String> allIDs = wxAccountDao.selectids();

        List <String> collect = users.stream().map(User::getId).collect(Collectors.toList());
        QueryWrapper <WxContent> quer = new QueryWrapper <>();
        List <Integer> collect1 = new ArrayList <>();

        collect1.add(WxContent.STATUS_PUBLISHED);
        collect1.add(WxContent.STATUS_PUBLISHFAIL);
        collect1.add(WxContent.STATUS_PUBLISHDELETE);
        quer.in(!ObjectUtil.isEmpty(collect), "owner", collect).in("status", collect1).  in(CollectionUtils.isNotEmpty(allIDs),"wxAccountID",allIDs).orderByDesc("publishDate");
        Page <WxContent> objects = new Page <>(currentPage, pageSize);
        IPage <WxContent> wxContentIPage = WxContentDao.selectPage(objects, quer);
        if(pageSize*(currentPage-1)>wxContentIPage.getTotal()){
            objects = new Page <>(1, pageSize);
            wxContentIPage = WxContentDao.selectPage(objects, quer);
        }
        List <WxContent> wxContentList =wxContentIPage.getRecords();

        if (wxContentList.size() > 0) {
            wxContentList.forEach(wxContent -> {
                if (wxContent.getType() == 1) {
                    WxTextContent wxTextContent =
                            wxTextContentDao.selectOne(new QueryWrapper <WxTextContent>().eq(
                                    "wxContentID",
                                    wxContent.getId()));

                    wxContent.setText(wxTextContent);
                } else if (wxContent.getType() == 2) {
                    WxImageContent wxImageContent = wxImageContentDao.selectOne(new QueryWrapper <WxImageContent>().eq("wxContentID",
                            wxContent.getId()));
                    wxContent.setImage(wxImageContent);

                } else {
                    List <WxNewsContent> wxNewslist =
                            wxNewsContentDao.selectList(new QueryWrapper <WxNewsContent>().eq("wxContentID",
                                    wxContent.getId()));
                    wxContent.setNewsList(wxNewslist);
                }
            });
        }

        return wxContentIPage;

    }

    @Override
    public IPage<WxContent> AllPublishArticle(Integer pageSize,Integer currentPage) {
        List <Integer> collect1 = new ArrayList <>();
        collect1.add(WxContent.STATUS_PUBLISHED);
        collect1.add(WxContent.STATUS_PUBLISHFAIL);
        collect1.add(WxContent.STATUS_PUBLISHDELETE);
       List<String> allIDs = wxAccountDao.selectids();

        QueryWrapper <WxContent> queryWrapper = new QueryWrapper <>();
        queryWrapper.in("status", collect1). in(CollectionUtils.isNotEmpty(allIDs),"wxAccountID",allIDs).orderByDesc("publishDate");

        Page <WxContent> objects = new Page <>(currentPage, pageSize);

        IPage <WxContent> wxContentIPage = WxContentDao.selectPage(objects, queryWrapper);

        if(pageSize*(currentPage-1)>wxContentIPage.getTotal()){
            objects = new Page <>(1, pageSize);
            wxContentIPage=  WxContentDao.selectPage(objects, queryWrapper);
        }
        List <WxContent> wxContents =wxContentIPage.getRecords();

        if (wxContents.size() > 0) {
            wxContents.forEach(wxContent -> {
                if (wxContent.getType() == 1) {

                    WxTextContent wxTextContent =
                            wxTextContentDao.selectOne(new QueryWrapper <WxTextContent>().eq(
                                    "wxContentID",
                                    wxContent.getId()));

                    wxContent.setText(wxTextContent);
                } else if (wxContent.getType() == 2) {
                    WxImageContent wxImageContent = wxImageContentDao.selectOne(new QueryWrapper <WxImageContent>().eq("wxContentID",
                            wxContent.getId()));
                    wxContent.setImage(wxImageContent);

                } else {
                    List <WxNewsContent> wxNewslist =
                            wxNewsContentDao.selectList(new QueryWrapper <WxNewsContent>().eq("wxContentID",
                                    wxContent.getId()));
                    wxContent.setNewsList(wxNewslist);
                }
            });
        }

        return wxContentIPage;

    }

    /*、删除群发消息只能删除图文消息和视频消息，其他类型的消息一经发送，无法删除。
4、如果多次群发发送的是一个图文消息，那么删除其中一次群发，就会删除掉这个图文消息也，导致所有群发都失效*/
    @Override
    public void deletePulishArticle(WxContent wxContent) {
        if (wxContent.getType() == 1) {
            throw new GpException("只能删除图文和图片消息");
        } else if (wxContent.getType() == 2) {
            WxImageContent wxContentID = wxImageContentDao.selectOne(new QueryWrapper <WxImageContent>().eq(
                    "wxContentID",
                    wxContent.getId()));
            String imageMediaID = wxContentID.getImageMediaID();
            String wxAccountID = wxContent.getWxAccountID();
            String wxResult = wxContent.getWxResult();
            //{"errcode":0,"errmsg":"send job submission success","msg_id":1000000050,"msg_data_id":2247484313}
            JSONObject jsonObject=new JSONObject(wxResult);
            int msg_id = jsonObject.optInt("msg_id");

            String s = WxUtils.deletePublishArticle(wxAccountID, msg_id+"");
            wxContent.setWxResult(s);
            int i = WxContentDao.updateById(wxContent);
        } else {
        /*    WxNewsContent wxContentID = wxNewsContentDao.selectOne(new QueryWrapper <WxNewsContent>().eq(
                    "wxContentID",
                    wxContent.getId()));*/
            //WxContent wxContent= WxContentDao.selectById(wxContentID.getWxContentID());
            String wxResult = wxContent.getWxResult();
            if(!StringUtil.isEmpty(wxResult)){
                JSONObject jsonObject=new JSONObject(wxResult);
                int msg_id = jsonObject.optInt("msg_id");

                /* int sortID = wxContentID.getSortID();*/

                String wxAccountID = wxContent.getWxAccountID();
                String s=  WxUtils.deleteNews(wxAccountID,msg_id+"");
                wxContent.setStatus(WxContent.STATUS_PUBLISHDELETE);
                wxContent.setWxResult(s);
                int i = WxContentDao.updateById(wxContent);
                //String s= WxUtils.deletePublishArticle(wxAccountID,mpnewsMediaId);
            }else{
                WxContentDao.deleteById(wxContent);
            }




        }

    }

    @Override
    public IPage <WxContent> draftArticle(Integer pageSize, Integer currentPage,String id,
                                          String loginUsername) {

       List<String> allIDs = wxAccountDao.selectids();

        Page <WxContent> objects = new Page <>(currentPage, pageSize);
        Set <User> users = groupService.selectGroupbyUserId(id);
        List <String> collect = users.stream().map(User::getId).collect(Collectors.toList());
        QueryWrapper <WxContent> queryWrapper = new QueryWrapper <>();
        queryWrapper.in(!ObjectUtil.isEmpty(collect), "owner", collect). in(CollectionUtils.isNotEmpty(allIDs),"wxAccountID",allIDs).eq("status", 0).orderByDesc(
                "createDate");
        IPage <WxContent> wxContentIPage = WxContentDao.selectPage(objects, queryWrapper);
        List <WxContent> wxContents =wxContentIPage.getRecords();
        if(pageSize*(currentPage-1)>wxContentIPage.getTotal()){
            objects = new Page <>(1, pageSize);
            wxContentIPage=  WxContentDao.selectPage(objects, queryWrapper);
            wxContents =wxContentIPage.getRecords();
        }

        if (wxContents.size() > 0) {
            wxContents.forEach(wxContent -> {
                if (wxContent.getType() == 1) {

                    WxTextContent wxTextContent =
                            wxTextContentDao.selectOne(new QueryWrapper <WxTextContent>().eq(
                                    "wxContentID",
                                    wxContent.getId()));

                    wxContent.setText(wxTextContent);
                    System.out.println("wxContent---" + wxContent.getText());
                } else if (wxContent.getType() == 2) {
                    WxImageContent wxImageContent = wxImageContentDao.selectOne(new QueryWrapper <WxImageContent>().eq("wxContentID",
                            wxContent.getId()));
                    wxContent.setImage(wxImageContent);

                } else {
                    List <WxNewsContent> wxNewslist =
                            wxNewsContentDao.selectList(new QueryWrapper <WxNewsContent>().eq("wxContentID",
                                    wxContent.getId()));
                    wxContent.setNewsList(wxNewslist);
                }
            });

        }
        return wxContentIPage;


    }

    @Override
    public IPage<WxContent> AlldraftArticle(Integer pageSize, Integer currentPage) {

       List<String> allIDs = wxAccountDao.selectids();

        QueryWrapper <WxContent> queryWrapper = new QueryWrapper <>();
        queryWrapper.eq("status", 0).in(CollectionUtils.isNotEmpty(allIDs),"wxAccountID",allIDs).orderByDesc("createDate");

        List <WxContent> wxContents = WxContentDao.selectList(queryWrapper);
        if (wxContents.size() > 0) {
            for (WxContent wxContent : wxContents) {
                if (wxContent.getType() == 1) {

                    WxTextContent wxTextContent =
                            wxTextContentDao.selectOne(new QueryWrapper <WxTextContent>().eq(
                                    "wxContentID",
                                    wxContent.getId()));
                    wxContent.setDateValue(wxContent.getCreateDate());
                    wxContent.setText(wxTextContent);
                    System.out.println("wxContent---" + wxContent.getText());
                } else if (wxContent.getType() == 2) {
                    WxImageContent wxImageContent = wxImageContentDao.selectOne(new QueryWrapper <WxImageContent>().eq("wxContentID",
                            wxContent.getId()));
                    wxContent.setImage(wxImageContent);
                    wxContent.setDateValue(wxContent.getCreateDate());

                } else {
                    List <WxNewsContent> wxNewslist =
                            wxNewsContentDao.selectList(new QueryWrapper <WxNewsContent>().eq("wxContentID",
                                    wxContent.getId()));
                    wxContent.setNewsList(wxNewslist);
                    wxContent.setDateValue(wxContent.getCreateDate());
                }

            }
        }

        return null;

    }

    @Override
    @Transactional
    public WxContent createNewsContent(String accountID, List <WxNewsContent> newsList,
                                       String username, Date publishDate, String cmd,
                                       String groupSendId)  throws  Exception{
        String result="";
        User user = userDao.selectOne(new QueryWrapper <User>().eq("name", username));
        String userId = user.getId();
        Collection <String> allPermissions = ShiroUtil.getAllPermissions(username);
        WxContent wxContent = new WxContent();
        wxContent.generateKey();
        wxContent.setCreateDate(new Date());
        wxContent.setPublishDate(publishDate == null ? wxContent.getCreateDate() : publishDate);
        wxContent.setOwner(userId);
        wxContent.setGroupsendid(groupSendId);

        wxContent.setWxAccountID(accountID);
        wxContent.setType(WxContent.TYPE_MPNEWS);
        for (int i = 0; i < newsList.size(); i++) {
            WxNewsContent news = newsList.get(i);
            news.generateKey();
            news.setSortID(i);
            news.setWxContentID(wxContent.getId());
            wxNewsContentDao.insert(news);
        }
        boolean publishNow = false;
        if (allPermissions.contains("user") || allPermissions.contains("role") || allPermissions.contains("group")) {
            if ("save".equals(cmd)) {
                wxContent.setStatus(WxContent.STATUS_CAOGAO);
                wxContent.setPublishDate(publishDate);
            } else {
                wxContent.setPublishDate(publishDate == null ? wxContent.getCreateDate() : publishDate);
                if (publishDate == null) {
                    publishNow = true;
                    wxContent.setStatus(WxContent.STATUS_PUBLISHED);
                } else {
                    wxContent.setStatus(WxContent.STATUS_REVOKED);
                }
            }
            WxContentDao.insert(wxContent);
            if (publishNow) {
                String wxResult = null;
                if (env.getProperty("gpower.wxpublish.remote.on", "false").equals("true")) {
                    wxResult = WxRemoteUtil.publishNews(accountID, newsList);
                    JSONObject resultJson = new JSONObject(wxResult);
                    if (resultJson.optInt("status", 500) == 200 && StringUtils.isNotBlank(resultJson.optString("wxResult"))) {
                        wxContent.setWxResult(resultJson.optString("wxResult"));
                        wxContent.setStatus(WxContent.STATUS_PUBLISHED);
                        WxContentDao.updateById(wxContent);
                    } else {
                        throw new GpException(resultJson.optString("msg", "系统异常"));
                    }
                } else {

                result= publishWxNews(wxContent, newsList);


                }
            }
        } else {
            //普通用户
            if ("save".equals(cmd)) {
                wxContent.setStatus(WxContent.STATUS_CAOGAO);
                wxContent.setPublishDate(publishDate);
                WxContentDao.insert(wxContent);
            } else {
                wxContent.setPublishDate(publishDate == null ? wxContent.getCreateDate() : publishDate);
                if (publishDate == null) {
                    publishNow = true;
                    wxContent.setStatus(WxContent.STATUS_NEW);
                   WxContentDao.insert(wxContent);

                } else {
                    wxContent.setStatus(WxContent.STATUS_NEW);
                    WxContentDao.insert(wxContent);

                }
            }


        }


        return wxContent;
    }

    @Override
    public String publishWxNews(WxContent wxContent, List <WxNewsContent> newsList)  throws Exception {
        int errcode=-1;
        try { String accountID = wxContent.getWxAccountID();
        for (int i = 0; i < newsList.size(); i++) {
            WxNewsContent news = newsList.get(i);
            String property = env.getProperty("gpower.publish.path");
            String path = property + File.separator + "wx" + File.separator + accountID + File.separator + news.getThumbImageName();
                String mediaID = WxUtils.uploadMedia(accountID, new File(path), WxUtils.MEDIA_TYPE_THUMB);
            news.setThumbMediaId(mediaID);
            String   newContent = doNewsContentImage(accountID, news.getContent());
            news.setContent(newContent);
            wxNewsContentDao.updateById(news);

        }
            String mediaID = WxUtils.uploadMpNews(accountID, newsList);
            wxContent.setMpnewsMediaId(mediaID);
            String wxResult = WxUtils.sendNews(accountID, mediaID);
            wxContent.setWxResult(wxResult);

        JSONObject json = new JSONObject(wxResult);
      errcode = json.optInt("errcode", -1);

            wxContent.setWxResult(wxResult);
            wxContent.setStatus(WxContent.STATUS_PUBLISHED);
            WxContentDao.updateById(wxContent);
            return errcode+"";
        }catch (Exception e){

            throw  new Exception(e.getMessage());


        }



    }

    @Override
    public IPage <WxContent> findDraftAticlebyuser(String title,Integer pageSize,
                                                   Integer currentPage,String id,
                                                   String loginUsername) {

        Page <WxContent> objects = new Page <>(currentPage, pageSize);
        Set <String>  collect=new HashSet <>();
        if(!StringUtil.isBlank(title)){


        List <WxNewsContent> wn =
                wxNewsContentDao.selectList(new QueryWrapper <WxNewsContent>().like(!StringUtil.isBlank(title), "title", title));
            List <String> collect3 = wn.stream().map(WxNewsContent::getWxContentID).collect(Collectors.toList());

            List <WxImageContent> wi =
                wxImageContentDao.selectList(new QueryWrapper <WxImageContent>().like(!StringUtil.isBlank(title),
                        "imagetitle", title));

            List <String> collect1 = wi.stream().map(WxImageContent::getWxContentID).collect(Collectors.toList());
            List <WxTextContent> wt =
                wxTextContentDao.selectList(new QueryWrapper <WxTextContent>().like(!StringUtil.isBlank(title),
                        "title", title));


            List <String> collect2 = wt.stream().map(WxTextContent::getWxContentID).collect(Collectors.toList());
            collect.addAll(collect3);
        collect.addAll(collect1);
        collect.addAll(collect2);
        }

       List<String> allIDs = wxAccountDao.selectids();


        QueryWrapper <WxContent> queryWrapper =
                new QueryWrapper <WxContent>().eq("owner", id).eq("status", 0).in(!collect.isEmpty(), "id", collect).in(CollectionUtils.isNotEmpty(allIDs),"wxAccountID",allIDs).orderByDesc(
                        "createDate");
        IPage <WxContent> wxContentIPage = WxContentDao.selectPage(objects, queryWrapper);

        List <WxContent> wxContents =wxContentIPage.getRecords();
        if(pageSize*(currentPage-1)>wxContentIPage.getTotal()){
            objects = new Page <>(1, pageSize);
            wxContentIPage=  WxContentDao.selectPage(objects, queryWrapper);
            wxContents =wxContentIPage.getRecords();
        }
        if (wxContents.size() > 0) {
            wxContents.forEach(wxContent -> {
                if (wxContent.getType() == 1) {
                    WxTextContent wxTextContent =
                            wxTextContentDao.selectOne(new QueryWrapper <WxTextContent>().eq(
                                    "wxContentID",
                                    wxContent.getId()));

                    wxContent.setText(wxTextContent);
                    System.out.println("wxContent---" + wxContent.getText());
                } else if (wxContent.getType() == 2) {
                    WxImageContent wxImageContent = wxImageContentDao.selectOne(new QueryWrapper <WxImageContent>().eq("wxContentID",
                            wxContent.getId()));
                    wxContent.setImage(wxImageContent);

                } else {
                    List <WxNewsContent> wxNewslist =
                            wxNewsContentDao.selectList(new QueryWrapper <WxNewsContent>().eq("wxContentID",
                                    wxContent.getId()));
                    wxContent.setNewsList(wxNewslist);
                }
            });

        }
        return wxContentIPage;
    }
   @Transactional
    @Override
    public void updateTextContent(String aid, String wxcid, String content, String username,
                                  Date publishDate, String cmd,String title) {
        WxContent wxContent = WxContentDao.selectById(wxcid);
        if (wxContent == null) {
            throw new GpException("error.noexist.wxContent");
        }
        WxTextContent test = wxTextContentDao.selectOne(new QueryWrapper <WxTextContent>().eq("WxContentID", wxcid));
        test.setContent(content);
        test.setTitle(title);
        wxTextContentDao.updateById(test);
        User user = userDao.selectOne(new QueryWrapper <User>().eq("name", username));
        String userId = user.getId();
        Collection <String> allPermissions = ShiroUtil.getAllPermissions(username);

        if (allPermissions.contains("user") || allPermissions.contains("role") || allPermissions.contains("group")) {
            if ("save".equals(cmd)) {
                wxContent.setStatus(WxContent.STATUS_CAOGAO);
                wxContent.setPublishDate(publishDate);
            } else {
                wxContent.setPublishDate(publishDate == null ? wxContent.getCreateDate() : publishDate);
                if (publishDate == null) {
                    String wxResult = WxUtils.sendText(wxContent.getWxAccountID(), content);
                    wxContent.setWxResult(wxResult);
                    wxContent.setStatus(WxContent.STATUS_PUBLISHED);
                } else {
                    wxContent.setStatus(WxContent.STATUS_REVOKED);
                }
            }
            WxContentDao.updateById(wxContent);
        } else {
            if ("save".equals(cmd)) {
                wxContent.setStatus(WxContent.STATUS_CAOGAO);
                wxContent.setPublishDate(publishDate);
            } else {
                wxContent.setPublishDate(publishDate == null ? wxContent.getCreateDate() : publishDate);
                if (publishDate == null) {

                    wxContent.setStatus(WxContent.STATUS_NEW);
                } else {
                    wxContent.setStatus(WxContent.STATUS_NEW);
                }
            }
            WxContentDao.updateById(wxContent);

        }


    }

    @Override
    public void updateImageContent(String id, String imgPath, String username, Date publishDate,
                                   String cmd,String imagetitle) {
        WxContent wxContent = WxContentDao.selectById(id);
        if (wxContent == null) {
            throw new GpException("error.noexist.wxContent");
        }
        WxImageContent wxImage = wxImageContentDao.selectOne(new QueryWrapper <WxImageContent>().eq("wxContentID", id));
        if (!wxImage.getImgUrl().equals(imgPath)) {
            wxImage.setImgUrl(imgPath);
        }
        wxImage.setImagetitle(imagetitle);
        String path = env.getProperty("gpower.publish.path") + File.separator + "wx" + File
                .separator + wxContent.getWxAccountID() + File
                .separator + wxImage.getImgUrl();

        try {
            String mediaID = WxUtils.uploadMedia(wxContent.getWxAccountID(), new File(path), WxUtils.MEDIA_TYPE_THUMB);
            wxImageContentDao.updateById(wxImage);
        } catch (WxException e) {
            e.printStackTrace();
        }
        User user = userDao.selectOne(new QueryWrapper <User>().eq("name", username));
        String userId = user.getId();
        Collection <String> allPermissions = ShiroUtil.getAllPermissions(username);

        if (allPermissions.contains("user") || allPermissions.contains("role") || allPermissions.contains("group")) {
            if ("save".equals(cmd)) {
                wxContent.setStatus(WxContent.STATUS_CAOGAO);
                wxContent.setPublishDate(publishDate);
            } else {
                wxContent.setPublishDate(publishDate == null ? wxContent.getCreateDate() : publishDate);
                if (publishDate == null) {
                    String wxResult = WxUtils.sendImage(wxContent.getWxAccountID(), wxImage.getImageMediaID());
                    wxContent.setWxResult(wxResult);
                    wxContent.setStatus(WxContent.STATUS_PUBLISHED);
                } else {
                    wxContent.setStatus(WxContent.STATUS_REVOKED);
                }
            }
            WxContentDao.updateById(wxContent);
        } else {
            if ("save".equals(cmd)) {
                wxContent.setStatus(WxContent.STATUS_CAOGAO);
                wxContent.setPublishDate(publishDate);
            } else {
                wxContent.setPublishDate(publishDate == null ? wxContent.getCreateDate() : publishDate);
                if (publishDate == null) {
                    String wxResult = WxUtils.sendImage(wxContent.getWxAccountID(), wxImage.getImageMediaID());
                    wxContent.setWxResult(wxResult);
                    wxContent.setStatus(WxContent.STATUS_REVOKED);
                } else {
                    wxContent.setStatus(WxContent.STATUS_REVOKED);
                }
                WxContentDao.updateById(wxContent);
            }


        }}

    @Override
    public IPage <WxContent> publicArticleByUser(Integer pageSize, Integer currentPage, String id, String loginUsername) {
        Page <WxContent> objects = new Page <>(currentPage, pageSize);
        List <Integer> collect1 = new ArrayList <>();
        collect1.add(WxContent.STATUS_PUBLISHED);
        collect1.add(WxContent.STATUS_PUBLISHFAIL);
        collect1.add(WxContent.STATUS_PUBLISHDELETE);

       List<String> allIDs = wxAccountDao.selectids();

        QueryWrapper <WxContent> queryWrapper = new QueryWrapper <>();
        queryWrapper.in("status", collect1).orderByDesc("publishDate").eq("owner", id). in(CollectionUtils.isNotEmpty(allIDs),"wxAccountID",allIDs);

        IPage <WxContent> wxContentIPage = WxContentDao.selectPage(objects, queryWrapper);
        List <WxContent> wxContents =wxContentIPage.getRecords();
        if(pageSize*(currentPage-1)>wxContentIPage.getTotal()){
            objects = new Page <>(1, pageSize);
            wxContentIPage=  WxContentDao.selectPage(objects, queryWrapper);
            wxContents =wxContentIPage.getRecords();
        }


        if (wxContents.size() > 0) {
            wxContents.forEach(wxContent -> {
                if (wxContent.getType() == 1) {

                    WxTextContent wxTextContent =
                            wxTextContentDao.selectOne(new QueryWrapper <WxTextContent>().eq(
                                    "wxContentID",
                                    wxContent.getId()));

                    wxContent.setText(wxTextContent);
                    System.out.println("wxContent---" + wxContent.getText());
                } else if (wxContent.getType() == 2) {
                    WxImageContent wxImageContent = wxImageContentDao.selectOne(new QueryWrapper <WxImageContent>().eq("wxContentID",
                            wxContent.getId()));
                    wxContent.setImage(wxImageContent);

                } else {
                    List <WxNewsContent> wxNewslist =
                            wxNewsContentDao.selectList(new QueryWrapper <WxNewsContent>().eq("wxContentID",
                                    wxContent.getId()));
                    wxContent.setNewsList(wxNewslist);
                }
            });

        }

        return  wxContentIPage;}

    @Override
    public IPage <WxContent> findNotAllPublishArticleByUser(Integer pageSize,
                                                            Integer currentPage ,String id, String loginUsername) {


       List<String> allIDs = wxAccountDao.selectids();

        Page <WxContent> objects = new Page <>(currentPage, pageSize);
        QueryWrapper <WxContent> queryWrapper = new QueryWrapper <WxContent>().eq("owner", id).in(CollectionUtils.isNotEmpty(allIDs),"wxAccountID",allIDs).eq("status", 1).orderByDesc("createDate");


        IPage <WxContent> wxContentIPage = WxContentDao.selectPage(objects, queryWrapper);
        List <WxContent> wxContents = wxContentIPage.getRecords();
        if (pageSize * (currentPage - 1) > wxContentIPage.getTotal()) {
            objects = new Page <>(1, pageSize);
            wxContentIPage = WxContentDao.selectPage(objects, queryWrapper);
            wxContents = wxContentIPage.getRecords();
        }


        if (wxContents.size() > 0) {
            wxContents.forEach(wxContent -> {
                if (wxContent.getType() == 1) {

                    WxTextContent wxTextContent =
                            wxTextContentDao.selectOne(new QueryWrapper <WxTextContent>().eq(
                                    "wxContentID",
                                    wxContent.getId()));

                    wxContent.setText(wxTextContent);
                    System.out.println("wxContent---" + wxContent.getText());
                } else if (wxContent.getType() == 2) {
                    WxImageContent wxImageContent = wxImageContentDao.selectOne(new QueryWrapper <WxImageContent>().eq("wxContentID",
                            wxContent.getId()));
                    wxContent.setImage(wxImageContent);

                } else {
                    List <WxNewsContent> wxNewslist =
                            wxNewsContentDao.selectList(new QueryWrapper <WxNewsContent>().eq("wxContentID",
                                    wxContent.getId()));
                    wxContent.setNewsList(wxNewslist);
                }
            });


        } return wxContentIPage;
    }
    @Override
    public IPage <WxContent> findAllPublishArticleByUser(Integer pageSize,
                Integer currentPage,String id, String loginUsername) {

       List<String> allIDs = wxAccountDao.selectids();

        Page <WxContent> objects = new Page <>(currentPage, pageSize);
        QueryWrapper <WxContent> queryWrapper = new QueryWrapper <>();
        List <Integer> status=new ArrayList <>();
        status.add(WxContent.STATUS_AUDIT);
        status.add(WxContent.STATUS_MODIFIED);
        status.add(WxContent.STATUS_SUBMIT);
        queryWrapper.eq("owner", id). in(CollectionUtils.isNotEmpty(allIDs),"wxAccountID",allIDs).in("status",status).orderByDesc(
                "createDate");
        IPage <WxContent> wxContentIPage = WxContentDao.selectPage(objects, queryWrapper);
        List <WxContent> wxContents =wxContentIPage.getRecords();
        if(pageSize*(currentPage-1)>wxContentIPage.getTotal()){
            objects = new Page <>(1, pageSize);
            wxContentIPage=  WxContentDao.selectPage(objects, queryWrapper);
            wxContents =wxContentIPage.getRecords();

        }

        if (wxContents.size() > 0) {
            wxContents.forEach(wxContent -> {
                if (wxContent.getType() == 1) {

                    WxTextContent wxTextContent =
                            wxTextContentDao.selectOne(new QueryWrapper <WxTextContent>().eq(
                                    "wxContentID",
                                    wxContent.getId()));

                    wxContent.setText(wxTextContent);
                    System.out.println("wxContent---" + wxContent.getText());
                } else if (wxContent.getType() == 2) {
                    WxImageContent wxImageContent = wxImageContentDao.selectOne(new QueryWrapper <WxImageContent>().eq("wxContentID",
                            wxContent.getId()));
                    wxContent.setImage(wxImageContent);

                } else {
                    List <WxNewsContent> wxNewslist =
                            wxNewsContentDao.selectList(new QueryWrapper <WxNewsContent>().eq("wxContentID",
                                    wxContent.getId()));
                    wxContent.setNewsList(wxNewslist);
                }
            });

        }

        return wxContentIPage;
    }

    @Override
    public WxContent updateNewsContent(String id, String aid, List <WxNewsContent> newsList,
                                       String username, Date publishDate,
                                       String cmd)throws Exception {
        User user = userDao.selectOne(new QueryWrapper <User>().eq("name", username));

        Collection <String> allPermissions = ShiroUtil.getAllPermissions(username);
        WxContent wxContent = WxContentDao.selectById(id);
            if(wxContent==null){
                throw new  GpException("error.noexist.wxcontent");
            }

        int wxContentID = wxNewsContentDao.delete(new QueryWrapper <WxNewsContent>().eq("wxContentID", id));
        for (int i = 0; i < newsList.size(); i++) {

            WxNewsContent news = newsList.get(i);
            news.generateKey();
            news.setSortID(i);
            news.setWxContentID(wxContent.getId());
            wxNewsContentDao.insert(news);


        }

        boolean publishNow = false;
        if (allPermissions.contains("user") || allPermissions.contains("role") || allPermissions.contains("group")) {
            if ("save".equals(cmd)) {
                wxContent.setStatus(WxContent.STATUS_CAOGAO);
                wxContent.setPublishDate(publishDate);
            } else {
                wxContent.setPublishDate(publishDate == null ? wxContent.getCreateDate() : publishDate);
                if (publishDate == null) {
                    publishNow = true;
                    wxContent.setStatus(WxContent.STATUS_REVOKED);
                } else {
                    wxContent.setStatus(WxContent.STATUS_REVOKED);
                }
            }
            WxContentDao.updateById(wxContent);
            if (publishNow) {
                String wxResult = null;
                if (env.getProperty("gpower.wxpublish.remote.on", "false").equals("true")) {
                    wxResult = WxRemoteUtil.publishNews(aid, newsList);
                    JSONObject resultJson = new JSONObject(wxResult);
                    if (resultJson.optInt("status", 500) == 200 && StringUtils.isNotBlank(resultJson.optString("wxResult"))) {
                        wxContent.setWxResult(resultJson.optString("wxResult"));
                        wxContent.setStatus(WxContent.STATUS_PUBLISHED);
                        WxContentDao.updateById(wxContent);
                        //WxContentDao.update(wxContent);
                    } else {
                        throw new GpException(resultJson.optString("msg", "系统异常"));
                    }
                } else {

                        publishWxNews(wxContent, newsList);
                        //  WxUtils.sendNews(accountID,mediaID);


                }
            }
        } else {
            //普通用户
            if ("save".equals(cmd)) {
                wxContent.setStatus(WxContent.STATUS_CAOGAO);
                wxContent.setPublishDate(publishDate);
                WxContentDao.insert(wxContent);
            } else {
                wxContent.setPublishDate(publishDate == null ? wxContent.getCreateDate() : publishDate);
                if (publishDate == null) {
                    publishNow = true;
                    wxContent.setStatus(WxContent.STATUS_NEW);
                    WxContentDao.insert(wxContent);

                } else {
                    wxContent.setStatus(WxContent.STATUS_NEW);
                    WxContentDao.insert(wxContent);

                }
            }


        }


        return wxContent;




    }


    private String doNewsContentImage (String accountID, String content) throws Exception {
        String property = env.getProperty("gpower.publish.path");
        String property1 = env.getProperty("server.servlet.context-path");


        String wxImagePrefix = env.getProperty("wx.contentimage.prefix", "http://mmbiz.qpic.cn/mmbiz_");
       //获取图片路径
        Set <String> set = HtmlUtil.getImageUrlList(content);
        Iterator <String> it = set.iterator();
        //<p><img src="/medium/upload/image/20191025/1571986688081059481.png" title="1571986688081059481.png" alt="index.png"/></p>
        while (it.hasNext()) {
            String url = it.next();
            if (url.startsWith(wxImagePrefix + "png/") || url.startsWith(wxImagePrefix + "jpg/")) {
                continue;
            }
            File file = null;
            if (url.startsWith(property1)) {
                String fileName = url.substring(url.indexOf("/") + 8);
                String path = property + File.separator + "wx" + File.separator + fileName;
                file = new File(path);
            } else if (url.startsWith("http")) {
                //下载图片
                HttpUtil httpUtil = new HttpUtil();
                String fileName = accountID + "_" + UUIDGenerator.getUUID() + "." + StringUtil.getFileExtension(url);
                String path = property + File.separator + "wx" + File.separator + accountID + File.separator;
                File dir = new File(path);
                if (!dir.exists()) {
                    dir.mkdirs();
                }
                file = httpUtil.download(url, path + fileName);
            }
            if (file != null) {
                String newUrl = WxUtils.uploadContentImage(accountID, file);
                content = content.replace(url, newUrl);
            }

        }

        return content;
    }



}