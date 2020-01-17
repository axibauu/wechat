package com.gpower.modules.wx.entity;

import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableName;
import com.gpower.common.entity.BaseEntity;
import lombok.Data;

import java.io.Serializable;

/**
 * @description:
 * @author: jingff
 * @date: 2019-07-24 13:50
 */
@TableName("gpwx_textcontent")
@Data
public class WxTextContent extends BaseEntity implements Serializable {
    private static final long serialVersionUID = -2660115490940230725L;
private String  content;
@TableField("wxContentID")
private  String  wxContentID;
    @TableField(exist = false)
    private String name;
    @TableField("title")
    private  String title;

    @Override
    public String toString() {
        return "WxTextContent{" +
                "content='" + content + '\'' +
                ", wxContentID='" + wxContentID + '\'' +
                ", name='" + name + '\'' +
                '}';
    }
}
