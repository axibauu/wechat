package com.gpower.modules.user.entity;

import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableName;
import com.gpower.common.entity.BaseEntity;
import lombok.Data;

import java.io.Serializable;
import java.util.List;

@TableName("gprole")
@Data
public class Role extends BaseEntity implements Serializable {

    private static final long serialVersionUID = -6807357553567958414L;

    private String name; //角色名字

    private String code; //角色编码
   @TableField(exist = false)
    private Integer status; //角色编码

    @TableField(exist = false)
    private List<Permission> permissionList;//角色包含的权限

    public List<Permission> getPermissionList() {
        return permissionList;
    }

    public void setPermissionList(List<Permission> permissionList) {
        this.permissionList = permissionList;
    }

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
