package com.gpower.modules.wx.dao;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.gpower.modules.wx.entity.WxAccount;

import java.util.List;

/**
 * @description:
 * @author: jingff
 * @date: 2019-07-17 16:31
 */
public interface WxAccountDao extends BaseMapper<WxAccount> {
    /**
    *@Description: 
    *@Param: 
    *@return: 
    *@Author: jingff
    *@date: 2019/7/18
    */
    public List<WxAccount> selectMyAccounts(String username);

    List<String> selectids();
}
