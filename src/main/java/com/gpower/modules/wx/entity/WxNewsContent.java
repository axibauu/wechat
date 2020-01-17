package com.gpower.modules.wx.entity;

import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableName;
import com.gpower.common.entity.BaseEntity;
import lombok.Data;

import java.io.Serializable;

/**
 * @description:
 * @author: jingff
 * @date: 2019-07-24 14:07
 */
@TableName("gpwx_newscontent")
@Data
public class WxNewsContent extends BaseEntity implements Serializable {
    private static final long serialVersionUID = -6501763663738451236L;
    @TableField("wxContentID")
    private String wxContentID;
    @TableField(exist = false)
    private String name;
    @TableField("sortID")
    private int sortID = 0; //升序排序(多图文使用)
    @TableField("thumbImageName")
    private String thumbImageName; //封面图片文件名
    @TableField("thumbMediaId")
    private String thumbMediaId; //微信中封面的id
    private String author;   //图文消息的作者
    private String title;    //图文消息的标题
    @TableField("content_source_url")
    private String content_source_url;  //在图文消息页面点击“阅读原文”后的页面
    private String content;  //图文消息页面的内容，支持HTML标签。具备微信支付权限的公众号，可以使用a标签，其他公众号不能使用
    private String digest;   //图文消息的描述
    private int show_cover_pic = 0;  //是否显示封面，1为显示，0为不显示
    @TableField("msgID")
    private String msgID;

    @Override
    public String toString() {
        return "WxNewsContent{" +
                "wxContentID='" + wxContentID + '\'' +
                ", name='" + name + '\'' +
                ", sortID=" + sortID +
                ", thumbImageName='" + thumbImageName + '\'' +
                ", thumbMediaId='" + thumbMediaId + '\'' +
                ", author='" + author + '\'' +
                ", title='" + title + '\'' +
                ", content_source_url='" + content_source_url + '\'' +
                ", content='" + content + '\'' +
                ", digest='" + digest + '\'' +
                ", show_cover_pic=" + show_cover_pic +
                ", msgID='" + msgID + '\'' +
                '}';
    }
}
