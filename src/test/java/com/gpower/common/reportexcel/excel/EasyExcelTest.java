package com.gpower.common.reportexcel.excel;


import com.gpower.common.exception.GpException;
import org.apache.poi.openxml4j.exceptions.InvalidFormatException;
import org.junit.Test;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

/**
 * Created by wenpu_Di on 2019/5/27.
 */
public class EasyExcelTest {

    // 由内存生成excel文件
    @Test
    public void testCreateExcelFromList() throws IOException, InvalidFormatException {
        EasyExcel fastExcel = new EasyExcel("D:/tmp/data.xlsx");
        List<TestUser> list = new ArrayList<TestUser>();
        for (int i = 0; i < 10; i++) {
            TestUser testUser = new TestUser();
            testUser.setId(i+"");
            testUser.setName("张三" + i);
            testUser.setAge(20 + i);
            testUser.setStatus(i % 3 +"");
            testUser.setPhone("13463685663");
            testUser.setPrice(i * 1.1);
            testUser.setSize(i);
            testUser.setCreateTime(new Date());
            testUser.setXx(i % 2 == 0);
            list.add(testUser);
        }
        fastExcel.createExcel(list);
        fastExcel.close();
    }

    // 加载excel文件到内存
    @Test
    public void testCreateListFromExcel() throws FileNotFoundException {
        File file = new File("D:/tmp/data.xlsx");
        FileInputStream input = new FileInputStream(file);
        EasyExcel easyExcel;
        List<TestUser> list;
        try {
            easyExcel = new EasyExcel(input);
            list = easyExcel.parse(TestUser.class);

            for (TestUser user : list) {
                System.out.println(user);
            }
        } catch (InvalidFormatException e) {
            throw new GpException("格式不正确！", e);
        } catch (IOException e) {
            throw new GpException("上传失败！", e);
        }
    }


}