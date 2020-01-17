package com.gpower.modules.wb.entity;

import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableName;
import com.gpower.common.entity.BaseEntity;
import lombok.Data;

/**
 * @description:
 * @author: jingff
 * @date: 2019-08-15 17:58
 */
@TableName("gpwb_emotion")
@Data
public class WbEmotion extends BaseEntity {

    private  String  phrase;
    private  String  type;
    private  String  url;
    private   Boolean hot;
    private  Boolean  common;
    @TableField(value = "category")
    private  String  catagory;
    private String  icon;
    private String  value;
    private String picid;

}
