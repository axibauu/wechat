package com.gpower.modules.email.entity;

import com.gpower.common.entity.BaseEntity;

/**
 * Created by wenpu_Di on 2018/12/29.
 */
public class Email extends BaseEntity {
    private String content;

    private String sendEmail;

    private String subject;

    public Email() {

    }

    public Email(String content, String sendEmail, String subject) {
        this.content = content;
        this.sendEmail = sendEmail;
        this.subject = subject;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getSendEmail() {
        return sendEmail;
    }

    public void setSendEmail(String sendEmail) {
        this.sendEmail = sendEmail;
    }

    public String getSubject() {
        return subject;
    }

    public void setSubject(String subject) {
        this.subject = subject;
    }
}
