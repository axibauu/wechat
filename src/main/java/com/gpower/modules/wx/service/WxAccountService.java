package com.gpower.modules.wx.service;

import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.service.IService;
import com.gpower.common.result.PageInfo;
import com.gpower.modules.wx.entity.WxAccount;


import java.util.List;
import java.util.Map;

/**
 * @description:
 * @author: jingff
 * @date: 2019-07-17 16:49
 */
public interface  WxAccountService  extends IService<WxAccount> {

    /**
     * <p>@description :激活微信账号</p>
     *	<p>@version :0.1</p>
     * <p>@author :qiyx</p>
     * <p>@Time :2017-06-14</p>
     * <p>@return</p>
     */
    public WxAccount activeAccount(String accountID);
    /**
     * <p>@description :禁用微信账号</p>
     *	<p>@version :0.1</p>
     * <p>@author :qiyx</p>
     * <p>@Time :2017-06-14</p>
     * <p>@return</p>
     */
    public WxAccount disableAccount(String accountID);
    /**
     * <p>@description :创建微信账号</p>
     *	<p>@version :0.1</p>
     * <p>@author :qiyx</p>
     * <p>@Time :2017-06-14</p>
     * <p>@return</p>
     */
    public WxAccount createAccount(String loginUsername,WxAccount wxAccount);
    /**
     * <p>@description :删除</p>
     *	<p>@version :0.1</p>
     * <p>@author :qiyx</p>
     * <p>@Time :2017-06-14</p>
     * <p>@return</p>
     */
    public Integer deleteAccount(String accountID);
    /**
     * <p>@description :修改</p>
     *	<p>@version :0.1</p>
     * <p>@author :qiyx</p>
     * <p>@Time :2017-06-14</p>
     * <p>@return</p>
     */
    public Integer updateAccount(WxAccount account);
    /**
     * <p>@description :查询我的公众号</p>
     *	<p>@version :0.1</p>
     * <p>@author :liuzl</p>
     * <p>@Time :2017-09-07</p>
     * <p>@param username
     * <p>@return</p>
     */
    public List<WxAccount> selectMyAccounts(String username);

    IPage<WxAccount>  queryPage( Integer currentPage, Integer pageSize);

    WxAccount findById(String ID);

    IPage<WxAccount> findByuser(Integer currentPage, Integer pageSize,String userid,
                                String loginUsername);

    IPage<WxAccount>  selectByOneUser(Integer currentPage, Integer pageSize, String userid);
}
