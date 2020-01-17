package com.gpower.modules.wx.entity;

import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

import java.io.Serializable;

/**
 * @description:
 * @author: jingff
 * @date: 2019-09-16 17:54
 */
@TableName("gpuser_wb")
@Data
public class UserWb implements Serializable {

private String userid;
private String wbaccountid;

}


