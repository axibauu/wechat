package com.gpower.modules.data.entity;

import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableName;
import com.gpower.common.entity.BaseEntity;
import lombok.Data;

import java.io.Serializable;

/**
 * @description:
 * @author: jingff
 * @date: 2019-08-05 17:32
 */
@Data
@TableName("gpwb_data")
public class WbInfo extends BaseEntity implements Serializable {
   private static final long serialVersionUID = -5497495031123280878L;
   @TableField(value = "friendscount")
   private String friendscount;
   @TableField(value = "statusescount")
   private String statusescount;
   @TableField(value = "followerscount")
   private String followerscount;
   @TableField(value = "wbaccountID")
   private String wbaccountID;
}
