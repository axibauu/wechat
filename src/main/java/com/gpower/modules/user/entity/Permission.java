package com.gpower.modules.user.entity;

import com.baomidou.mybatisplus.annotation.TableName;
import com.gpower.common.entity.BaseEntity;

import java.io.Serializable;

@TableName("gpermission")
public class Permission extends BaseEntity implements Serializable {

    private static final long serialVersionUID = 523492626668014633L;

    private String name;//权限名字

    private String code;//权限代码

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

}
