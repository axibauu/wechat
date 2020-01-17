package com.gpower.modules.wx.service.impl;

import cn.hutool.core.util.ObjectUtil;
import cn.hutool.core.util.StrUtil;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.gpower.common.result.PageInfo;
import com.gpower.common.utils.Query;
import com.gpower.modules.user.entity.User;
import com.gpower.modules.user.service.GroupService;
import com.gpower.modules.wx.dao.UserWxDao;
import com.gpower.modules.wx.dao.WxAccountDao;
import com.gpower.modules.wx.dao.WxContentDao;
import com.gpower.modules.wx.entity.UserWx;
import com.gpower.modules.wx.entity.WxAccount;
import com.gpower.modules.wx.entity.WxContent;
import com.gpower.modules.wx.service.WxAccountService;
import com.gpower.startup.config.ApplicationContextUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

/**
 * @description:微信公众号
 * @author: jingff
 * @date: 2019-07-18 10:09
 */

@Service("wxAccountService")
public class WxAccountServiceImpl extends ServiceImpl<WxAccountDao, WxAccount> implements WxAccountService {

    @Autowired
    WxAccountDao wxAccountDao;
    @Autowired
    WxContentDao wxContentDao;
    @Autowired
    UserWxDao userWxDao;

    @Autowired
    GroupService groupService;

    @Override
    public WxAccount activeAccount(String accountID) {
        WxAccount wxAccount = wxAccountDao.selectById(accountID);
        wxAccount.setStatus(1);
        wxAccountDao.updateById(wxAccount);
        return wxAccount;
    }

    @Override
    public WxAccount disableAccount(String accountID) {
        WxAccount wxAccount = wxAccountDao.selectById(accountID);
        wxAccount.setStatus(0);
        wxAccountDao.updateById(wxAccount);
        return wxAccount;
    }

    @Override
    public WxAccount createAccount(String loginUsername, WxAccount account) {
        account.setCreationDate(new Date());
        account.setStatus(1);
        account.setOwner(loginUsername);
        wxAccountDao.insert(account);
        return account;
    }

    @Override
    public Integer deleteAccount(String accountID) {
        int i = wxAccountDao.deleteById(accountID);
        wxContentDao.delete(new QueryWrapper<WxContent>().eq("wxAccountID", accountID));

        return i;


    }

    @Override
    public Integer updateAccount(WxAccount account) {
        int update = wxAccountDao.updateById(account);
        return update;
    }

    @Override
    public List<WxAccount> selectMyAccounts(String username) {
        List<WxAccount> wxAccounts = wxAccountDao.selectMyAccounts(username);
        return wxAccounts;
    }


    /**
     * @Description: 分页查询
     * @Param:
     * @return:
     * @Author: jingff
     * @date: 2019/7/18
     */
    @Override
    public IPage<WxAccount> queryPage(Integer currentPage, Integer pageSize) {
        Page<WxAccount> objects = new Page<>(currentPage, pageSize);
        QueryWrapper<WxAccount> quer = new QueryWrapper<>();
        quer.orderByDesc("creationDate");
        IPage<WxAccount> wxAccountIPage = wxAccountDao.selectPage(objects, quer);

        if (pageSize * (currentPage - 1) > wxAccountIPage.getTotal()) {
            objects = new Page<>(1, pageSize);
            wxAccountIPage = wxAccountDao.selectPage(objects, quer);
        }
        return wxAccountIPage;
    }

    @Override
    public WxAccount findById(String ID) {
        WxAccount wxAccount = wxAccountDao.selectById(ID);
        return wxAccount;
    }

    @Override
    public IPage<WxAccount> findByuser(Integer currentpage, Integer pageSize, String userid,
                                       String loginUsername) {
        Set<User> users = groupService.selectGroupbyUserId(userid);
        List<String> collect = users.stream().map(User::getId).collect(Collectors.toList());
        List<UserWx> userWxs = userWxDao.selectList(new QueryWrapper<UserWx>().in(collect != null && collect.size() >= 1, "userid", collect));

        List<String> accountids = userWxs.stream().map(UserWx::getWxaccountid).collect(Collectors.toList());

        QueryWrapper<WxAccount> quer = new QueryWrapper<>();

        quer.in(!ObjectUtil.isEmpty(collect), "owner", userid).orderByDesc("creationDate");
        List<WxAccount> wxAccounts = wxAccountDao.selectList(quer);
        List<String> collect2 = wxAccounts.stream().map(WxAccount::getId).collect(Collectors.toList());
        accountids.removeAll(collect2);
        accountids.addAll(collect2);

        Page<WxAccount> objects = new Page<>(currentpage, pageSize);
        QueryWrapper<WxAccount> quer2 = new QueryWrapper<>();
if(accountids!=null&&accountids.size()>=1){
    quer2.in(!ObjectUtil.isEmpty(accountids), "id", accountids).orderByDesc("creationDate");
    IPage<WxAccount> wxAccountIPage = wxAccountDao.selectPage(objects, quer2);
    if (pageSize * (currentpage - 1) > wxAccountIPage.getTotal()) {
        objects = new Page<>(1, pageSize);
        wxAccountIPage = wxAccountDao.selectPage(objects, quer2);
    }
    return wxAccountIPage;
}

        return null;

    }

    @Override
    public IPage<WxAccount> selectByOneUser(Integer currentpage, Integer pageSize, String userid) {
        QueryWrapper<UserWx> quer = new QueryWrapper<>();

        quer.eq("userid", userid);
        List<UserWx> userWxes = userWxDao.selectList(quer);
        List<String> collect = userWxes.stream().map(UserWx::getWxaccountid).collect(Collectors.toList());

        if (collect != null && collect.size() >= 1) {

            Page<WxAccount> objects = new Page<>(currentpage, pageSize);
            QueryWrapper<WxAccount> quer1 = new QueryWrapper<>();
            quer1.in(!ObjectUtil.isEmpty(quer1), "id", collect).orderByDesc("creationdate");
            IPage<WxAccount> wxAccountIPage = wxAccountDao.selectPage(objects, quer1);
            if (pageSize * (currentpage - 1) > wxAccountIPage.getTotal()) {
                objects = new Page<>(1, pageSize);
                wxAccountIPage = wxAccountDao.selectPage(objects, quer1);
            }

            return wxAccountIPage;

        } else {
            return null;
        }

    }


}