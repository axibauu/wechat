package com.gpower.modules.wx.entity;

import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableName;
import com.gpower.common.entity.BaseEntity;
import lombok.Data;

import java.io.Serializable;
import java.util.Date;

/**
 * @description:
 * @author: jingff
 * @date: 2019-07-24 14:41
 */
@TableName("gpwx_follower_summary")
@Data
public class WxFollowerSummary extends BaseEntity  implements Serializable {
    private static final long serialVersionUID = -487694227277313979L;

    @TableField("accountID")
    private String accountID;	//公众号id
    private Date day;			//数据的日期
    @TableField("userSource")
    private int userSource;		//用户的渠道
    @TableField("newUser")
    private int newUser;		//新增的用户数量
    private int cancelUser;		//取消关注的用户数量，new_user减去cancel_user即为净增用户数量
    private int cumulateUser;	//总用户量
    private Date creationDate;	//数据创建时间
    /**
     * 0代表其他合计
     */
    public static final int USER_SOURCE_OTHER = 0;
    /**
     *  1代表公众号搜索
     */
    public static final int USER_SOURCE_SEARCH = 1;
    /**
     *  17代表名片分享
     */
    public static final int USER_SOURCE_SHARE = 17;
    /**
     *  30代表扫描二维码
     */
    public static final int USER_SOURCE_QRCODE = 30;
    /**
     *  43代表图文页右上角菜单
     */
    public static final int USER_SOURCE_TOPMENU = 43;
    /**
     *  51代表支付后关注（在支付完成页）
     */
    public static final int USER_SOURCE_PAYMENT = 51;
    /**
     * 57代表图文页内公众号名称
     */
    public static final int USER_SOURCE_ARTICLEPAGE = 57;
    /**
     *  75代表公众号文章广告
     */
    public static final int USER_SOURCE_ARTICLEAD = 75;
    /**
     *  78代表朋友圈广告
     */
    public static final int USER_SOURCE_FRIENDAD = 78;




}
