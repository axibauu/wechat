package com.gpower.base.user.service.impl;

import com.gpower.StartupApplication;
import com.gpower.common.annotation.SysLog;
import com.gpower.modules.user.entity.User;
import com.gpower.modules.user.service.UserService;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import java.util.Date;

/**
 * Created by wenpu_Di on 2019/4/15.
 */
@RunWith(SpringJUnit4ClassRunner.class)
@SpringBootTest(classes= StartupApplication.class)
public class UserServiceImplTest {

    @Autowired
    UserService userService;

    @Test
    @SysLog("创建新用户")
    public void testInsert() {
        User user = new User();
        user.generateKey();
        user.setName("test2");
        user.setPassword("21232f297a57a5a743894a0e4a801fc3");
        user.setCreateTime(new Date());
        userService.save(user);
    }


}