package com.gpower.modules.email.service;

public interface MailService {
    // 发送普通邮件
    void sendSimpleMail(String to, String subject, String content);
}
