package com.gpower.modules.wx.entity;

import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

import java.io.Serializable;

/**
 * @description:
 * @author: jingff
 * @date: 2019-09-16 17:49
 */
@TableName("gpuser_wx")
@Data
public class UserWx   implements Serializable {
    private  String userid;
    private String  wxaccountid;



}
