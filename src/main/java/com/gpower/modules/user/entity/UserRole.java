package com.gpower.modules.user.entity;

import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import com.gpower.common.utils.UUIDGenerator;

import java.io.Serializable;

@TableName("gpuser_role")
public class UserRole implements Serializable {

    private static final long serialVersionUID = 6862930615124695700L;
    @TableId
    private String id;
    private String userId;
    private String roleId;

    public UserRole() {
    }

    public UserRole(String userId, String roleId) {
        this.userId = userId;
        this.roleId = roleId;
    }

    public void generateKey() {
        this.id = UUIDGenerator.getUUID();
    }
    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getRoleId() {
        return roleId;
    }

    public void setRoleId(String roleId) {
        this.roleId = roleId;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }
}
