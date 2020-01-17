package com.gpower.modules.wb.service;

import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.service.IService;
import com.gpower.common.result.PageInfo;
import com.gpower.modules.wb.entity.WbAccount;
import com.gpower.modules.wx.entity.WxAccount;

import java.util.Date;
import java.util.List;
import java.util.Map;

/**
 * @description:
 * @author: jingff
 * @date: 2019-07-31 16:49
 */
public interface WbAccountService extends IService<WbAccount> {
    IPage<WbAccount> queryPage(Integer currentPage, Integer pageSize) ;

    void createTextContent(String accoutid, String content, String username, String cmd,Date date);

    WbAccount findById(String ID);

    IPage<WbAccount> findByuser(Integer currentPage, Integer pageSize,String userid, String loginUsername);

    IPage<WbAccount> selectByOneUser(Integer currentPage, Integer pageSize, String userid);
}
