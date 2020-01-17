package com.gpower.modules.wb.service.impl;

import cn.hutool.core.util.ObjectUtil;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.gpower.common.exception.GpException;
import com.gpower.common.utils.ShiroUtil;
import com.gpower.modules.user.dao.GroupDao;
import com.gpower.modules.user.dao.UserDao;
import com.gpower.modules.user.entity.User;
import com.gpower.modules.user.service.GroupService;
import com.gpower.modules.user.service.UserService;
import com.gpower.modules.wb.dao.WbAccountDao;
import com.gpower.modules.wb.dao.WbContentDao;
import com.gpower.modules.wb.entity.WbAccount;
import com.gpower.modules.wb.entity.WbContent;
import com.gpower.modules.wb.service.WbContentService;

import com.gpower.modules.wx.dao.WxContentDao;
import com.gpower.modules.wx.entity.WxContent;

import com.gpower.modules.wx.util.WbUtils;
import org.apache.commons.collections4.CollectionUtils;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.IOException;
import java.util.*;
import java.util.stream.Collectors;

import static com.gpower.modules.wx.util.WbUtils.sendimgtext;

/**
 * @description:
 * @author: jingff
 * @date: 2019-08-02 13:54
 */
@Service("wbContentService")
public class WbContentServiceImpl extends ServiceImpl <WbContentDao, WbContent> implements WbContentService {


    @Autowired
    WbContentDao wbContentDao;
    @Autowired
    WbAccountDao wbAccountDao;
    @Autowired
    UserDao userDao;
    @Autowired
    Environment env;
    @Autowired
    GroupService groupService;

    @Autowired
    GroupDao groupDao;


    @Override
    public void createTextContent(String accoutid, String content, String username, String cmd, Date publishDate, String img) {
        System.out.println(img+"image-");
        User user = userDao.selectOne(new QueryWrapper <User>().eq("name", username));
        String userId = user.getId();
        Collection <String> allPermissions = ShiroUtil.getAllPermissions(username);

        WbContent wbContent = new WbContent();
        wbContent.generateKey();
        wbContent.setContent(content);
        if(!"undefined".equals(img)){
            wbContent.setImgurl(img);
        }
        wbContent.setCreationDate(new Date());
        wbContent.setOwner(userId);
        wbContent.setWeiboID(accoutid);
        boolean publishNow = false;
        if (allPermissions.contains("user") || allPermissions.contains("group") || allPermissions.contains("role")) {
            if ("save".equals(cmd)) {
                wbContent.setStatus(WxContent.STATUS_CAOGAO);//caogaoxingao
            } else {
                wbContent.setSendDate(publishDate == null ? wbContent.getCreationDate() : publishDate);
                if (publishDate == null) {
                    publishNow = true;
                } else {
                    wbContent.setStatus(WxContent.STATUS_REVOKED);
                }
            }
            wbContentDao.insert(wbContent);
            if (publishNow) {
                String wxResult = null;
                WbAccount wbAccount = wbAccountDao.selectById(accoutid);
                String clientSecret = wbAccount.getClientSecret();
                String token = wbAccount.getToken();
                Integer clength = 0;
                if (content.length() > 140) {
                    clength = 1;
                }
                if ("undefined".equals(img)) {
                    publishText(wbContent, accoutid, token, clength, null);
                } else {
                    publishText(wbContent, accoutid, token, clength, img);
                }

            }
        } else {


            if ("save".equals(cmd)) {
                wbContent.setStatus(WxContent.STATUS_CAOGAO);
                wbContent.setCreationDate(publishDate);
            } else {
                wbContent.setSendDate(publishDate == null ? wbContent.getCreationDate() : publishDate);
                if (publishDate == null) {
                    publishNow = true;
                    wbContent.setStatus(WxContent.STATUS_NEW);

                   // throw new GpException("您没有权限立即发布，请提交给管理员审核");

                } else {
                    wbContent.setStatus(WxContent.STATUS_NEW);

                }
            }
            wbContentDao.insert(wbContent);


        }


    }

    @Override
    public String publishText(WbContent wbcontent, String accoutid, String token, Integer clength, String img) {

        WbContent wbContent = wbContentDao.selectById(wbcontent.getId());
        String property = env.getProperty("gpower.publish.path");
        String path =
                property + File.separator + "wb" + File.separator + accoutid + File.separator;
        String imag = path + img;
        if (img != null) {
            String sendimgtext = sendimgtext(token, wbContent.getContent(), clength, imag);

            JSONObject json1 = new JSONObject(sendimgtext);
            if (sendimgtext.contains("error_code")) {
                wbContent.setImgurl(img);
                wbContent.setStatus(WxContent.STATUS_PUBLISHFAIL);
                wbContent.setWbresult(sendimgtext);
                wbContentDao.updateById(wbContent);
                if(Integer.valueOf(json1.get("error_code").toString())==20012){
                    throw new GpException("微博超过140字符，请减少字数");
                }else{
                    throw new GpException("微博发送失败，请稍后重试");
                }


            } else {
                wbContent.setImgurl(img);
                wbContent.setWbresult(sendimgtext);
                wbContent.setStatus(WxContent.STATUS_PUBLISHED);
                wbContentDao.updateById(wbContent);
            }

        } else {
            String sendtext = null;
            try {
                sendtext = WbUtils.sendtext(token, wbContent.getContent(), clength);
            } catch (IOException e) {
                e.printStackTrace();
            }
            JSONObject json1 = new JSONObject(sendtext);
            if (sendtext.contains("error_code")) {
                wbContent.setStatus(WxContent.STATUS_PUBLISHFAIL);
                wbContent.setWbresult(sendtext);
                wbContentDao.updateById(wbContent);
                throw new GpException("微博发送失败，请稍后重试");
            } else {
                wbContent.setWbresult(sendtext);
                wbContent.setStatus(WxContent.STATUS_PUBLISHED);
                wbContentDao.updateById(wbContent);
            }

        }


        return "";
    }

    /**
    *@Description: 用户组已发列表
    *@Param:
    *@return:
    *@Author: jingff
    *@date: 2019/8/20
    */
    @Override
    public IPage<WbContent> PublishList(Integer pageSize, Integer currentPage,String id, String loginUsername) {
        List<String> strings = wbContentDao.selectIds();
        Page <WbContent> objects = new Page <>(currentPage, pageSize);
        Set <User> users = groupService.selectGroupbyUserId(id);
        List <String> collect = users.stream().map(User::getId).collect(Collectors.toList());
        QueryWrapper <WbContent> quer = new QueryWrapper <>();
        List <Integer> collect1 = new ArrayList <>();
        collect1.add(WxContent.STATUS_PUBLISHED);
        collect1.add(WxContent.STATUS_PUBLISHFAIL);
        collect1.add(WxContent.STATUS_PUBLISHDELETE);
        quer.in(!ObjectUtil.isEmpty(collect), "owner", collect).in("status", collect1).in(CollectionUtils.isNotEmpty(strings),"weiboID",strings);;
       // List <WbContent> wxContentList = wbContentDao.selectList(quer);
        IPage <WbContent> wbContentIPage = wbContentDao.selectPage(objects, quer);
        List <WbContent> wbContentList =wbContentIPage.getRecords();
        if(pageSize*(currentPage-1)>wbContentIPage.getTotal()){
            objects = new Page <>(1, pageSize);
            wbContentIPage=  wbContentDao.selectPage(objects, quer);
            wbContentList=wbContentIPage.getRecords();
        }
        if(wbContentList.size()>0){
            for (WbContent wbContent : wbContentList) {
                String userID = wbContent.getOwner();
                String weiboID = wbContent.getWeiboID();
                WbAccount wbAccount = wbAccountDao.selectById(weiboID);
                User user = userDao.selectById(userID);
                wbContent.setWbAccount(wbAccount);
                wbContent.setUser(user);
            }

        }


        return wbContentIPage;
    }

    /**
    *@Description: 总的发布帐号
    *@Param:
    *@return:
    *@Author: jingff
    *@date: 2019/8/20
    */
    @Override
    public IPage <WbContent> AllPublishList(Integer pageSize, Integer currentPage) {
        Page <WbContent> objects = new Page <>(currentPage, pageSize);
        List <Integer> collect1 = new ArrayList <>();
        collect1.add(WxContent.STATUS_PUBLISHED);
        collect1.add(WxContent.STATUS_PUBLISHFAIL);
        collect1.add(WxContent.STATUS_PUBLISHDELETE);
        List<String> strings = wbContentDao.selectIds();
        QueryWrapper <WbContent> queryWrapper = new QueryWrapper <>();
        queryWrapper.in("status", collect1).in(CollectionUtils.isNotEmpty(strings),"weiboID",strings).orderByDesc("sendDate");

        IPage <WbContent> wbContentIPage = wbContentDao.selectPage(objects, queryWrapper);
        List <WbContent> wContentList =wbContentIPage.getRecords();
        if(pageSize*(currentPage-1)>wbContentIPage.getTotal()){
            objects = new Page <>(1, pageSize);
            wbContentIPage=  wbContentDao.selectPage(objects, queryWrapper);
            wContentList =wbContentIPage.getRecords();
        }
        if(wContentList.size()>0){
            for (WbContent wbContent : wContentList) {
                String userID = wbContent.getOwner();
                String weiboID = wbContent.getWeiboID();
                WbAccount wbAccount = wbAccountDao.selectById(weiboID);
                User user = userDao.selectById(userID);
                wbContent.setWbAccount(wbAccount);
                wbContent.setUser(user);
            }}

        return wbContentIPage;
    }

    @Override
    public IPage <WbContent> PublishListByUser(Integer pageSize, Integer currentPage,String id) {
        List<String> strings = wbContentDao.selectIds();
        Page <WbContent> objects = new Page <>(currentPage, pageSize);

        List <Integer> collect1 = new ArrayList <>();
        collect1.add(WxContent.STATUS_PUBLISHED);
        collect1.add(WxContent.STATUS_PUBLISHFAIL);
        collect1.add(WxContent.STATUS_PUBLISHDELETE);
        QueryWrapper <WbContent> queryWrapper = new QueryWrapper <>();
        queryWrapper.in("status", collect1).eq("owner", id).in(CollectionUtils.isNotEmpty(strings),"weiboID",strings);;
        IPage <WbContent> wbContentIPage = wbContentDao.selectPage(objects, queryWrapper);
        List <WbContent> wContentList =wbContentIPage.getRecords();
        if(pageSize*(currentPage-1)>wbContentIPage.getTotal()){
            objects = new Page <>(1, pageSize);
            wbContentIPage=  wbContentDao.selectPage(objects, queryWrapper);
            wContentList =wbContentIPage.getRecords();
        }
        if(wContentList.size()>0){
            for (WbContent wbContent : wContentList) {
                String userID = wbContent.getOwner();
                String weiboID = wbContent.getWeiboID();
                WbAccount wbAccount = wbAccountDao.selectById(weiboID);
                User user = userDao.selectById(userID);
                wbContent.setWbAccount(wbAccount);
                wbContent.setUser(user);
            }}

        return wbContentIPage;
    }

    @Override
    public List <WbContent> selectByCondition(Map <String, Object> map) {
        return wbContentDao.selectByCondition(map);
    }

    @Override
    public IPage<WbContent> waitAuditlist(Integer pageSize, Integer currentPage,String id,
                                          String loginUsername) {
        List<String> strings = wbContentDao.selectIds();
        Page <WbContent> objects = new Page <>(currentPage, pageSize);
        Set <User> users = groupService.selectGroupbyUserId(id);
        List <String> collect = users.stream().map(User::getId).collect(Collectors.toList());
        QueryWrapper <WbContent> quer = new QueryWrapper <>();
        quer.in(!ObjectUtil.isEmpty(collect), "owner", collect).in(CollectionUtils.isNotEmpty(strings),"weiboID",strings).eq("status", WxContent.STATUS_NEW).orderByDesc(
                "creationDate");

        IPage <WbContent> wbContentIPage = wbContentDao.selectPage(objects, quer);

        if(pageSize*(currentPage-1)>wbContentIPage.getTotal()){
            objects = new Page <>(1, pageSize);
            wbContentIPage=  wbContentDao.selectPage(objects, quer);
        }
        List <WbContent> wbContentList =wbContentIPage.getRecords();
        if (wbContentList.size() > 0) {
            wbContentList.forEach(wxContent -> {
                String weiboID = wxContent.getWeiboID();
                WbAccount wbAccount = wbAccountDao.selectById(weiboID);
                wxContent.setWbAccount(wbAccount);

            });
        }

        return wbContentIPage;
    }

    @Override
    public IPage<WbContent> waitAllAuditList(Integer pageSize, Integer currentPage) {

        List<String> strings = wbContentDao.selectIds();
        Page <WbContent> objects = new Page <>(currentPage, pageSize);
        QueryWrapper <WbContent> quer = new QueryWrapper <>();
        quer.eq("status", WxContent.STATUS_NEW).orderByDesc(
                "creationDate").in(CollectionUtils.isNotEmpty(strings),"weiboID",strings);
        IPage <WbContent> wbContentIPage = wbContentDao.selectPage(objects, quer);

        if(pageSize*(currentPage-1)>wbContentIPage.getTotal()){
            objects = new Page <>(1, pageSize);
            wbContentIPage=  wbContentDao.selectPage(objects, quer);
        }
        List <WbContent> wbContentList =wbContentIPage.getRecords();


        if (wbContentList.size() > 0) {
            wbContentList.forEach(wxContent -> {
                String weiboID = wxContent.getWeiboID();
                WbAccount wbAccount = wbAccountDao.selectById(weiboID);
                wxContent.setWbAccount(wbAccount);

            });
        }
        return wbContentIPage;
    }

    @Override
    public  IPage<WbContent> waitAuditByUser(Integer pageSize, Integer currentPage,String id) {
        Page <WbContent> objects = new Page <>(currentPage, pageSize);
        List<String> strings = wbContentDao.selectIds();
        QueryWrapper <WbContent> quer = new QueryWrapper <>();
        quer.eq("status", WxContent.STATUS_NEW).orderByDesc(
                "creationDate").eq("owner", id).in(CollectionUtils.isNotEmpty(strings),"weiboID",strings);


        IPage <WbContent> wbContentIPage = wbContentDao.selectPage(objects, quer);
        List <WbContent> wContentList =wbContentIPage.getRecords();
        if(pageSize*(currentPage-1)>wbContentIPage.getTotal()){
            objects = new Page <>(1, pageSize);
            wbContentIPage=  wbContentDao.selectPage(objects, quer);
        }
        List <WbContent> wbContentList =wbContentIPage.getRecords();

        if (wbContentList.size() > 0) {
            wbContentList.forEach(wxContent -> {
                String weiboID = wxContent.getWeiboID();
                WbAccount wbAccount = wbAccountDao.selectById(weiboID);
                wxContent.setWbAccount(wbAccount);

            });
        }

        return wbContentIPage;
    }

    @Override
    public IPage hasauditList(Integer pageSize, Integer currentPage, String id, String loginUsername) {
        Page <WbContent> objects = new Page <>(currentPage, pageSize);
        Set <User> users = groupService.selectGroupbyUserId(id);
        List<String> strings = wbContentDao.selectIds();
        List <String> collect = users.stream().map(User::getId).collect(Collectors.toList());
        QueryWrapper <WbContent> quer = new QueryWrapper <>();
        quer.in(!ObjectUtil.isEmpty(collect), "owner", collect).eq("status",
                WxContent.STATUS_AUDIT).orderByDesc(
                "creationDate").in(CollectionUtils.isNotEmpty(strings),"weiboID",strings);

        IPage <WbContent> wbContentIPage = wbContentDao.selectPage(objects, quer);

        if(pageSize*(currentPage-1)>wbContentIPage.getTotal()){
            objects = new Page <>(1, pageSize);
            wbContentIPage=  wbContentDao.selectPage(objects, quer);
        }
        List <WbContent> wbContentList =wbContentIPage.getRecords();
        if (wbContentList.size() > 0) {
            wbContentList.forEach(wxContent -> {
                String weiboID = wxContent.getWeiboID();
                WbAccount wbAccount = wbAccountDao.selectById(weiboID);
                wxContent.setWbAccount(wbAccount);

            });
        }

        return wbContentIPage;


    }

    @Override
    public IPage AllhasauditList(Integer pageSize, Integer currentPage) {
        List<String> strings = wbContentDao.selectIds();
        Page <WbContent> objects = new Page <>(currentPage, pageSize);
        QueryWrapper <WbContent> quer = new QueryWrapper <>();
        quer.eq("status", WxContent.STATUS_AUDIT).in(CollectionUtils.isNotEmpty(strings),"weiboID",strings).orderByDesc(
                "creationDate");
        IPage <WbContent> wbContentIPage = wbContentDao.selectPage(objects, quer);

        if(pageSize*(currentPage-1)>wbContentIPage.getTotal()){
            objects = new Page <>(1, pageSize);
            wbContentIPage=  wbContentDao.selectPage(objects, quer);
        }
        List <WbContent> wbContentList =wbContentIPage.getRecords();


        if (wbContentList.size() > 0) {
            wbContentList.forEach(wxContent -> {
                String weiboID = wxContent.getWeiboID();
                WbAccount wbAccount = wbAccountDao.selectById(weiboID);
                wxContent.setWbAccount(wbAccount);

            });
        }
        return wbContentIPage;
    }

    @Override
    public IPage hasAuditListByUser(Integer pageSize, Integer currentPage, String id) {
        Page <WbContent> objects = new Page <>(currentPage, pageSize);
        QueryWrapper <WbContent> quer = new QueryWrapper <>();
        List<String> strings = wbContentDao.selectIds();
        quer.eq("status", WxContent.STATUS_AUDIT).orderByDesc(
                "creationDate").eq("owner", id).in(CollectionUtils.isNotEmpty(strings),"weiboID",strings);


        IPage <WbContent> wbContentIPage = wbContentDao.selectPage(objects, quer);
        List <WbContent> wContentList =wbContentIPage.getRecords();
        if(pageSize*(currentPage-1)>wbContentIPage.getTotal()){
            objects = new Page <>(1, pageSize);
            wbContentIPage=  wbContentDao.selectPage(objects, quer);
        }
        List <WbContent> wbContentList =wbContentIPage.getRecords();

        if (wbContentList.size() > 0) {
            wbContentList.forEach(wxContent -> {
                String weiboID = wxContent.getWeiboID();
                WbAccount wbAccount = wbAccountDao.selectById(weiboID);
                wxContent.setWbAccount(wbAccount);

            });
        }

        return wbContentIPage;
    }

    @Override
    public void updateTextContent(String  id,String accoutid, String content, String username, String cmd, Date publishDate, String img) {
        System.out.println(img+"image-");
        User user = userDao.selectOne(new QueryWrapper <User>().eq("name", username));
        String userId = user.getId();
        Collection <String> allPermissions = ShiroUtil.getAllPermissions(username);

        WbContent wbContent = wbContentDao.selectById(id);

        wbContent.setContent(content);
        if(!"undefined".equals(img)&&!"".equals(img)){
            wbContent.setImgurl(img);
        }
        wbContent.setCreationDate(new Date());
        wbContent.setOwner(userId);
        wbContent.setWeiboID(accoutid);
        boolean publishNow = false;
        if (allPermissions.contains("user") || allPermissions.contains("group") || allPermissions.contains("role")) {
            if ("save".equals(cmd)) {
                wbContent.setStatus(WxContent.STATUS_CAOGAO);//caogaoxingao
            } else {
                wbContent.setSendDate(publishDate == null ? wbContent.getCreationDate() : publishDate);
                if (publishDate == null) {
                    publishNow = true;
                } else {
                    wbContent.setStatus(WxContent.STATUS_REVOKED);
                }
            }
            wbContentDao.updateById(wbContent);
            if (publishNow) {
                String wxResult = null;
                WbAccount wbAccount = wbAccountDao.selectById(accoutid);
                String clientSecret = wbAccount.getClientSecret();
                String token = wbAccount.getToken();
                Integer clength = 0;
                if (content.length() > 140) {
                    clength = 1;
                }
                if ("undefined".equals(img)||"".equals(img)) {
                    publishText(wbContent, accoutid, token, clength, null);
                } else {
                    publishText(wbContent, accoutid, token, clength, img);
                }

            }
        } else {


            if ("save".equals(cmd)) {
                wbContent.setStatus(WxContent.STATUS_CAOGAO);
                wbContent.setCreationDate(publishDate);
                wbContentDao.updateById(wbContent);
            } else {
                wbContent.setSendDate(publishDate == null ? wbContent.getCreationDate() : publishDate);
                if (publishDate == null) {
                    publishNow = true;
                    wbContent.setStatus(WxContent.STATUS_NEW);
                    wbContentDao.updateById(wbContent);
                   // throw new GpException("您没有权限立即发布，请提交给管理员审核");

                } else {
                    wbContent.setStatus(WxContent.STATUS_NEW);
                    wbContentDao.updateById(wbContent);
                }
            }


        }




    }


}
