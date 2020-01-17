package com.gpower.modules.wx.entity;

import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableName;
import com.gpower.common.entity.BaseEntity;
import lombok.Data;

import java.io.Serializable;
import java.util.Date;

/**
 * @description:
 * @author: jingff
 * @date: 2019-07-17 16:10
 */
@TableName("gpwx_account")
@Data
public class WxAccount extends BaseEntity  implements Serializable {
    private static final long serialVersionUID = 6214121719238255193L;

  /*  private int type = ACCOUNT_TYPE_SUBSCRIBE;//帐号类型  1.订阅号 2.服务号
    private int authentication = ACCOUNT_AUTH_NO;//是否认证    0未认证 1认证*/
  @TableField
  private Integer  type;

   private Integer  authentication;
    @TableField("originalId")
  private String originalId;//原始ID
  @TableField("logo")
  private String logo;//原始Ilog
    @TableField("appId")
    private String appId;//应用ID
    @TableField("appSecret")
    private String appSecret;//应用密钥

  @TableField(exist = false)
  private Integer  tempstatus;
  @TableField("owner")
  private String owner;//应用密钥

  private Integer status;
    /*private int status = ACCOUNT_STATUS_DANGER; //0不正常 1正常*/
    @TableField("creationDate")
    private Date creationDate;
    private String token; //token
   /* @TableField("encodingAESKey")
    private String encodingAESKey; //消息加密的key*/
   /* public static final int ACCOUNT_TYPE_SUBSCRIBE = 1; //订阅号
    public static final int ACCOUNT_TYPE_SERVICE = 2; //服务号
    public static final int ACCOUNT_AUTH_NO = 0; //未认证
    public static final int ACCOUNT_AUTH_YES = 1; //已认证
    public static final int ACCOUNT_STATUS_DANGER = 0; //不正常
    public static final int ACCOUNT_STATUS_ACTIVE = 1; //正常
*/



}
