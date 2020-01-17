package com.gpower.modules.wx.entity;

import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableName;
import com.gpower.common.entity.BaseEntity;
import lombok.Data;


import java.io.Serializable;

import java.util.Calendar;
import java.util.Date;
import java.util.List;

/**
 * @description:
 * @author: jingff
 * @date: 2019-07-24 14:17
 */
@TableName("gpwx_content")
@Data
public class WxContent extends BaseEntity implements Serializable {
    private static final long serialVersionUID = -6173404867179661603L;
    @TableField("owner")
    private String owner; //原创人
    @TableField(exist = false)
    private String name;
    @TableField("groupsendid")
    private String groupsendid;

    @TableField("createDate")
    private Date createDate; //创建时间
    @TableField("publishDate")
    private Date publishDate; //发送时间
    @TableField("status")
    private int status = 1;//状态  0草稿  1待审核  2退回 3修改 4已审核  5发布中 6已发布 7发布失败
    @TableField("wxAccountID")
    private String wxAccountID; //公众号ID
    @TableField("type")
    private int type = 1;//类型  1文本  2图片  3图文
    @TableField("mpnewsMediaId")
    private String mpnewsMediaId;//图文的媒体id
    @TableField("wxResult")
    private String wxResult;//微信群发返回结果
    @TableField(exist = false)
    private String statusValue = "新稿";
    @TableField(exist = false)
    private String typeValue = "文本";
    @TableField(exist = false)
    private  String dateValue;

    @TableField("auditreason")
    private String auditReason;

    @TableField(exist = false)
    private WxTextContent text;
    @TableField(exist = false)
    private WxImageContent image;
    @TableField(exist = false)
    private List<WxNewsContent> newsList;

    @TableField(exist = false)
    private WxAccount  wxAccount;

    public void  setDateValue(Date createDate){
        String[] weeks = {"星期日","星期一","星期二","星期三","星期四","星期五","星期六"};
        this.createDate = createDate;
        Calendar cal = Calendar.getInstance();
        cal.setTime(createDate);
        int week_index = cal.get(Calendar.DAY_OF_WEEK) - 1;
        if(week_index<0){
            week_index = 0;
        }

        this.dateValue=weeks[week_index];

    }

    public String getDateValue(){
        return dateValue;
    };
    public int getType() {
        return type;
    }
    public void setType(int type) {
        this.type = type;
        if(type==TYPE_TEXT){
            this.typeValue = "文本";
        }else if(type==TYPE_IMAGE){
            this.typeValue = "图片";
        }else if(type==TYPE_MPNEWS){
            this.typeValue = "图文";
        }
    }
    /**
     * 微信内容类型:文本
     */
    public static final int TYPE_TEXT = 1;
    /**
     * 微信内容类型:图片
     */
    public static final int TYPE_IMAGE = 2;
    /**
     * 微信内容类型:图文
     */
    public static final int TYPE_MPNEWS = 3;
    /**
     * 状态草稿
     */
    public static final int STATUS_CAOGAO = 0;
    /**
     * 状态:待审核
     */
    public static final int STATUS_NEW = 1;
    /**
     * 状态:退回
     */
    public static final int STATUS_MODIFIED = 2;
    /**
     * 状态:修改
     */
    public static final int STATUS_SUBMIT = 3;
    /**
     * 状态：已审核
     */
    public static final int STATUS_AUDIT =4;
    /**
     * 状态:待发布
     */
    public static final int STATUS_REVOKED = 5;
    /**
     * 状态:已发布
     */
    public static final int STATUS_PUBLISHED = 6;
    /**
     * 状态:发布失败
     */
    public static final int STATUS_PUBLISHFAIL = 7;
    /**
     * 状态:发布后删除
     */
    public static final int STATUS_PUBLISHDELETE = 8;
    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
        switch (status) {
            case STATUS_CAOGAO:
                this.statusValue = "草稿";
                break;
            case STATUS_PUBLISHDELETE:
                this.statusValue="发布删除";
                break;
            case STATUS_NEW:
                this.statusValue = "审核中";
                break;
            case STATUS_MODIFIED:
                this.statusValue = "退回";
                break;
            case STATUS_SUBMIT:
                this.statusValue = "已修改 ";
                break;
            case STATUS_AUDIT:
                this.statusValue = "已审核 ";
                break;
            case STATUS_REVOKED:
                this.statusValue = "待发布 ";
                break;

            case STATUS_PUBLISHED:
                this.statusValue = "已发布";
                break;
            case STATUS_PUBLISHFAIL:
                this.statusValue = "发布失败";
                break;


            default:
                this.statusValue = "未知状态";
                break;
        }
    }


}
