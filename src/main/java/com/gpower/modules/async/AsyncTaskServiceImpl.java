package com.gpower.modules.async;

import com.gpower.modules.email.entity.Email;
import com.gpower.modules.email.service.impl.MailServiceImpl;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * Created by wenpu_Di on 2019/1/11.
 */
@Service
public class AsyncTaskServiceImpl implements AsyncTaskService {
    private static final Logger logger = LoggerFactory.getLogger(AsyncTaskServiceImpl.class);

    @Autowired
    MailServiceImpl mailService;


    @Override
    public void testMethod() {
        try {
            System.out.println("异步任务开始执行");
            Thread.sleep(5000);
            System.out.println("异步任务结束！");
        } catch (InterruptedException e) {
            logger.debug("发送失败！！");
        }
    }

    @Override
    public void sendMail(Email email) {
        mailService.sendSimpleMail(email.getSendEmail(), email.getSubject(), email.getContent());
    }
}
