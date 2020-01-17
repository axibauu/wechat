package com.gpower.modules.user.entity;

import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import com.gpower.common.entity.BaseEntity;
import lombok.*;

import java.io.Serializable;
import java.util.Date;

/**
 * @description:
 * @author: jingff
 * @date: 2019-07-11 10:22
 */

@Data
@TableName("gp_group")
public class Group  implements Serializable {

    private static final long serialVersionUID = 4649358575450074173L;

    @TableId
    private  String id;
    private  String  name;
    private String  description;
    @TableField("createtime")
    private Date createtime;
}
