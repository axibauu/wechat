package com.gpower.modules.wx.entity;

import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableName;
import com.gpower.common.entity.BaseEntity;
import lombok.Data;

import java.io.Serializable;

/**
 * @description:
 * @author: jingff
 * @date: 2019-07-24 13:57
 */
@TableName("gpwx_imagecontent")
@Data
public class WxImageContent extends BaseEntity  implements Serializable {
    private static final long serialVersionUID = -1178936099011784046L;
    @TableField(exist = false)
    private String name;
    @TableField("imgUrl")
    private  String  imgUrl;
    @TableField("wxContentID")
    private  String  wxContentID;
    @TableField("imageMediaID")
    private  String  imageMediaID;
    @TableField("imagetitle")
    private  String  imagetitle;

    @Override
    public String toString() {
        return "WxImageContent{" +
                "name='" + name + '\'' +
                ", imgUrl='" + imgUrl + '\'' +
                ", wxContentID='" + wxContentID + '\'' +
                ", imageMediaID='" + imageMediaID + '\'' +
                '}';
    }
}
