package com.gpower.modules.storage.service.impl;


import com.gpower.StartupApplication;
import com.gpower.modules.storage.service.StorageService;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

/**
 * Created by wenpu_Di on 2019/4/29.
 */
@RunWith(SpringJUnit4ClassRunner.class)
@SpringBootTest(classes= StartupApplication.class)
public class StorageServiceImplTest {

    @Autowired
    StorageService storageService;

    @Test
    public void testFileUpload() {
    }
}