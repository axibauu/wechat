package com.gpower.modules.email.service;

import com.gpower.modules.async.AsyncTaskService;
import com.gpower.modules.email.entity.Email;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

/**
 * Created by wenpu_Di on 2019/5/24.
 */
@RunWith(SpringRunner.class)
@SpringBootTest
public class MailServiceTest {

    @Autowired
    private MailService mailService;

    @Autowired
    private AsyncTaskService asyncTaskService;

    @Test
    public void testAsync() throws InterruptedException {
        System.out.println("主线程开始。。。");
        asyncTaskService.testMethod();
        System.out.println("主线程开始结束。。。");

        // 多等待3s
        Thread.sleep(8000);
    }

    /**
     * 异步发送
     */
    @Test
    public void asyncSendEmail() {
        Email email = new Email();
        email.setContent("白雪公主和七个大个子");
        email.setSubject("测试发送邮件");
        email.setSendEmail("826868193@qq.com");
        asyncTaskService.sendMail(email);
    }

    /**
     * 非异步发送
     */
    @Test
    public void sendEmail() {
        mailService.sendSimpleMail("826868193@qq.com", "主题", "测试发送！！！！");
    }


}