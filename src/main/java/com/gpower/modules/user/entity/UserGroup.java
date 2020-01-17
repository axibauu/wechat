package com.gpower.modules.user.entity;

import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableName;
import com.gpower.common.entity.BaseEntity;
import lombok.Data;

import java.io.Serializable;

/**
 * @description:
 * @author: jingff
 * @date: 2019-08-15 14:41
 */
@TableName("gpuser_group")
@Data
public class UserGroup implements Serializable {
    private static final long serialVersionUID = 8463753534796779891L;
    @TableField("userId")
    private String  userId;
    @TableField("groupId")
    private  String groupId;
}
