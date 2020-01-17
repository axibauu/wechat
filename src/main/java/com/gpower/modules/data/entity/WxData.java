package com.gpower.modules.data.entity;

import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableName;
import com.gpower.common.entity.BaseEntity;
import lombok.Data;


import java.io.Serializable;
import java.util.Date;
import java.util.List;

/**
 * @description:
 * @author: jingff
 * @date: 2019-08-13 9:25
 */

@Data
@TableName("gpwx_data")
public class WxData  extends BaseEntity implements Serializable {
    //文章群发日期
    private String refdate;
   private  String msgid;
   @TableField(value = "wxaccountID")
    private  String wxaccountID;
    @TableField(exist = false)
    private  String name;


    @TableField(value = "wxcontentID")
    private  String wxcontentID;


    private  String title;
    private Integer  usersource;
    private String url;
    @TableField(exist = false)
    private List <Details> details;



}
