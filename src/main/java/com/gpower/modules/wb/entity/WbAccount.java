package com.gpower.modules.wb.entity;

import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableName;
import com.gpower.common.entity.BaseEntity;
import lombok.Data;


import java.io.Serializable;
import java.util.Date;

/**
 * @description:
 * @author: jingff
 * @date: 2019-07-18 9:41
 */
@Data
@TableName("gpwb_account")
public class WbAccount extends BaseEntity implements Serializable {
    private static final long serialVersionUID = -5497495031126280878L;

    private  String  token;
    @TableField(value ="expireDate" )
    private Date expireDate;
    @TableField(value ="creationDate" )
    private  Date  creationDate;

    @TableField(exist = false)
    private  Integer  tempstatus;

    private    String owner  ;
    private    String logo  ;


    @TableField(value ="clientID" )
    private  String  clientID;
    @TableField(value ="clientSecret" )
    private String  clientSecret;
    private Integer  status;
    @TableField(value ="uid" )
    private String  uid;



}
