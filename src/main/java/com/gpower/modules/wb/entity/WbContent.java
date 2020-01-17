package com.gpower.modules.wb.entity;

import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import com.gpower.common.entity.BaseEntity;
import com.gpower.common.utils.UUIDGenerator;
import com.gpower.modules.user.entity.User;
import lombok.Data;

import java.io.Serializable;
import java.util.Date;

/**
 * @description:
 * @author: jingff
 * @date: 2019-08-02 10:46
 */
@Data
@TableName("gpwb_content")
public class WbContent  implements Serializable {
    private static final long serialVersionUID = -1597129303677885996L;
    @TableId
    private String id;
private  String  content;

 @TableField(value = "creationDate")
    private Date creationDate;
    @TableField(value = "sendDate")
    private Date sendDate;


    private String owner;
    @TableField(value = "weiboID")
    private String weiboID;

    private  Integer  status;
    @TableField(value = "imgurl")
    private  String  imgurl;
   @TableField(value = "wbresult")
    private String wbresult;
    public void setId(String id) {
        this.id = id;
    }
    @TableField(exist = false)
    private User user;
    @TableField(exist = false)
    private WbAccount  wbAccount;
    @TableField(value = "auditreason")
    private String  auditreason;


    public void generateKey() {
        this.id = UUIDGenerator.getUUID();
    }


}
