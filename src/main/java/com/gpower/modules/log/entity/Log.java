package com.gpower.modules.log.entity;

import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import com.gpower.common.utils.UUIDGenerator;

import java.io.Serializable;
import java.util.Date;

@TableName("gplog")
public class Log implements Serializable {
    private static final long serialVersionUID = 7478094376640126042L;
    @TableId
    private String id;
    private String user;        //操作人
    private String modelName;    //模块名
    private String operate;    //操作
    private String json;    //操作信息
    private int status;        //状态
    private String remark;    //备注
    private String ip;        //ip地址
    private String clazz;    //类名
    private Date opTime;    //日志时间
    private String entityName;//实体名
    private String entityId;  //实体id


    public void generateKey() {
        this.id = UUIDGenerator.getUUID();
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getEntityId() {
        return entityId;
    }

    public void setEntityId(String entityId) {
        this.entityId = entityId;
    }

    public String getUser() {
        return user;
    }


    public void setUser(String user) {
        this.user = user;
    }


    public String getModelName() {
        return modelName;
    }


    public void setModelName(String modelName) {
        this.modelName = modelName;
    }


    public String getOperate() {
        return operate;
    }


    public void setOperate(String operate) {
        this.operate = operate;
    }


    public String getJson() {
        return json;
    }


    public void setJson(String json) {
        this.json = json;
    }


    public int getStatus() {
        return status;
    }


    public void setStatus(int status) {
        this.status = status;
    }


    public String getRemark() {
        return remark;
    }


    public void setRemark(String remark) {
        this.remark = remark;
    }


    public String getIp() {
        return ip;
    }


    public void setIp(String ip) {
        this.ip = ip;
    }


    public String getClazz() {
        return clazz;
    }


    public void setClazz(String clazz) {
        this.clazz = clazz;
    }


    public Date getOpTime() {
        return opTime;
    }


    public void setOpTime(Date opTime) {
        this.opTime = opTime;
    }


    public String getEntityName() {
        return entityName;
    }


    public void setEntityName(String entityName) {
        this.entityName = entityName;
    }

    public enum STATUS {
        SUCCESS(1),
        FAILURE(0);
        public int VALUE;

        private STATUS(int v) {
            this.VALUE = v;
        }
    }
}
