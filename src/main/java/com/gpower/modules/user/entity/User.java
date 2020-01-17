package com.gpower.modules.user.entity;

import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableName;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.gpower.common.entity.BaseEntity;
import lombok.Data;

import javax.validation.constraints.NotBlank;
import java.io.Serializable;
import java.util.Date;

@TableName("gpuser")
@Data
public class User extends BaseEntity implements Serializable {

    private static final long serialVersionUID = 6862930615124695700L;

    @NotBlank(message = "密码不能为空")
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private String password;
   @TableField("fullName")
    private String fullName;
    private Date createTime;
    @TableField(exist = false)
  private Integer  status;
    @TableField(exist = false)
    private String  phone;
    @TableField(exist = false)
    private String  role;



    public static long getSerialVersionUID() {
        return serialVersionUID;
    }



    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Date getCreateTime() {
        return createTime;
    }

    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
    }
}
