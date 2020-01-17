package com.gpower.modules.wb.service.impl;

import cn.hutool.core.util.ObjectUtil;
import cn.hutool.core.util.StrUtil;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.gpower.common.result.PageInfo;
import com.gpower.common.utils.Query;
import com.gpower.modules.user.dao.GroupDao;
import com.gpower.modules.user.entity.User;
import com.gpower.modules.user.service.GroupService;
import com.gpower.modules.wb.dao.WbAccountDao;
import com.gpower.modules.wb.entity.WbAccount;
import com.gpower.modules.wb.service.WbAccountService;
import com.gpower.modules.wx.dao.UserWbDao;
import com.gpower.modules.wx.entity.UserWb;
import com.gpower.modules.wx.entity.UserWx;
import com.gpower.modules.wx.entity.WxAccount;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

/**
 * @description:
 * @author: jingff
 * @date: 2019-07-31 16:49
 */
@Service("wbAccountService")
public class WbAccountServiceImpl  extends ServiceImpl<WbAccountDao, WbAccount> implements WbAccountService {

    @Autowired
    WbAccountDao  wbAccountDao;
    @Autowired
    GroupService groupService;
    @Autowired
    UserWbDao userWbDao;
    @Override
    public    IPage<WbAccount> queryPage(Integer currentPage, Integer pageSize) {
        Page<WbAccount> objects = new Page<>(currentPage, pageSize);
        QueryWrapper<WbAccount> quer = new QueryWrapper<>();
        quer.orderByDesc("creationDate");
        IPage<WbAccount> wbAccountIPage = wbAccountDao.selectPage(objects, quer);

        if (pageSize * (currentPage - 1) > wbAccountIPage.getTotal()) {
            objects = new Page<>(1, pageSize);
            wbAccountIPage = wbAccountDao.selectPage(objects, quer);
        }
        return wbAccountIPage;


    }

    @Override
    public void createTextContent(String accoutid, String content, String username, String cmd, Date date) {




    }

    @Override
    public WbAccount findById(String ID) {

        return    wbAccountDao.selectById(ID);
    }

    @Override
    public IPage<WbAccount> findByuser(Integer currentpage, Integer pageSize,String userid, String loginUsername) {
        Set <User> users = groupService.selectGroupbyUserId(userid);
        List <String> collect = users.stream().map(User::getId).collect(Collectors.toList());
        List<UserWb> userWbs = userWbDao.selectList(new QueryWrapper<UserWb>().in(collect != null && collect.size() >= 1, "userid", collect));

        List<String> accountids = userWbs.stream().map(UserWb::getWbaccountid).collect(Collectors.toList());

        QueryWrapper<WbAccount> quer = new QueryWrapper<>();

        quer.eq("owner", userid).orderByDesc("creationDate");
        List<WbAccount> wbAccounts = wbAccountDao.selectList(quer);
        List<String> collect2 = wbAccounts.stream().map(WbAccount::getId).collect(Collectors.toList());
        accountids.removeAll(collect2);
        accountids.addAll(collect2);

        Page<WbAccount> objects = new Page<>(currentpage, pageSize);
        QueryWrapper<WbAccount> quer2 = new QueryWrapper<>();
        if(accountids!=null&&accountids.size()>=1){
            quer2.in(!ObjectUtil.isEmpty(accountids), "id", accountids).orderByDesc("creationDate");
            IPage<WbAccount> wbAccountIPage = wbAccountDao.selectPage(objects, quer2);
            if (pageSize * (currentpage - 1) > wbAccountIPage.getTotal()) {
                objects = new Page<>(1, pageSize);
                wbAccountIPage = wbAccountDao.selectPage(objects, quer2);
            }
            return  wbAccountIPage;
        }
                return  null;

    }

    @Override
    public IPage<WbAccount> selectByOneUser(Integer currentpage, Integer pageSize, String userid) {
        QueryWrapper<UserWb> quer = new QueryWrapper<>();

        quer.eq("userid", userid);
        List<UserWb> userWbes = userWbDao.selectList(quer);
        List<String> collect = userWbes.stream().map(UserWb::getWbaccountid).collect(Collectors.toList());

        if (collect != null && collect.size() >= 1) {
            Page<WbAccount> objects = new Page<>(currentpage, pageSize);
            QueryWrapper<WbAccount> quer1 = new QueryWrapper<>();
            quer1.in(!ObjectUtil.isEmpty(quer1), "id", collect).orderByDesc("creationdate");
            IPage<WbAccount> wbAccountIPage = wbAccountDao.selectPage(objects, quer1);
            if (pageSize * (currentpage - 1) > wbAccountIPage.getTotal()) {
                objects = new Page<>(1, pageSize);
                wbAccountIPage = wbAccountDao.selectPage(objects, quer1);
            }

            System.out.println(wbAccountIPage.getRecords().size()+"111111111");
            return wbAccountIPage;

        } else {
            return null;
        }

    }



}
