package com.gpower.modules.user.entity;

import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import com.gpower.common.utils.UUIDGenerator;

import java.io.Serializable;

@TableName("gprole_permission")
public class RolePermisson implements Serializable {

    private static final long serialVersionUID = 6862930615124695700L;
    @TableId
    private String id;
    private String permissionId;
    private String roleId;

    public RolePermisson() {

    }

    public RolePermisson(String roleId, String permissionId) {
        this.permissionId = permissionId;
        this.roleId = roleId;
    }
    public void generateKey() {
        this.id = UUIDGenerator.getUUID();
    }
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getPermissionId() {
        return permissionId;
    }

    public void setPermissionId(String permissionId) {
        this.permissionId = permissionId;
    }

    public String getRoleId() {
        return roleId;
    }

    public void setRoleId(String roleId) {
        this.roleId = roleId;
    }
}
