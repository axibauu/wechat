package com.gpower.modules.user.entity;


import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableName;
import com.gpower.common.entity.BaseEntity;

import java.io.Serializable;
import java.util.Date;

@TableName("gpuser_info")
public class UserInfo extends BaseEntity implements Serializable {

    private static final long serialVersionUID = 6862930615124695700L;
    private String  phone; // 手机号
    @TableField("username")
    private String userName;// 真实用户名，姓名
    private Date createTime;    // 创建时间

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public Date getCreateTime() {
        return createTime;
    }

    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
    }

    public static long getSerialversionuid() {
        return serialVersionUID;
    }

}
