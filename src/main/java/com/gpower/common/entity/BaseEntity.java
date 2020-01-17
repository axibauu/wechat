package com.gpower.common.entity;

import com.baomidou.mybatisplus.annotation.TableId;
import com.gpower.common.utils.UUIDGenerator;
import org.apache.commons.lang.builder.ReflectionToStringBuilder;

import java.io.Serializable;


public class BaseEntity implements Serializable {
    private static final long serialVersionUID = 1L;
    @TableId
    private String id;
    private String name;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public void generateKey() {
        this.id = UUIDGenerator.getUUID();
    }

    @Override
    public String toString() {
        return ReflectionToStringBuilder.toString(this);
    }

}
