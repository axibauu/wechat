package com.gpower.modules.data.entity;

import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableName;
import com.gpower.common.entity.BaseEntity;
import lombok.Data;

import java.io.Serializable;

/**
 * @description:
 * @author: jingff
 * @date: 2019-08-13 9:37
 */
@Data
@TableName("gpwx_detail")
public class Details  extends BaseEntity implements Serializable {
    @TableField(exist = false)
    private  String name;
    private String  statdate;
    private Integer  targetuser;
    @TableField(value = "wxaccountID")
    private  String wxaccountID;
    private   Integer  intpagereaduser;   //图文阅读认数
    private  Integer    intpagereadcount;  //图文阅读次数
    private Integer   oripagereaduser;//原文阅读认数
    private Integer  oripagereadcount; //原文阅读次数
    private  Integer  shareuser ;  //分享认数；
    private  Integer  sharecount; //分享次数；
    private  String  msgid; //分享次数；



    private  Integer addtofavuser; //收藏认数
    private  Integer   addtofavcount;//收藏次数
    private  Integer sharescene;//分享场景

    private Integer intpagefromsessionreaduser;
    private Integer intpagefromsessionreadcount;
}
