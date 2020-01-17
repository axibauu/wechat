package com.gpower.common.utils;

import com.gpower.startup.config.ApplicationContextUtil;
import javafx.application.Application;
import org.springframework.core.env.Environment;

import java.io.File;

/**
 * Created by wenpu_Di on 2018/12/28.
 */
public class WorkSpaceConstants {
    /**
     * 工作空间文件夹
     */
    public static String WORKSPACE;
    /**
     * 导出文件存放路径
     */
    private static String EXPORT_FILE_PATH;

    /**
     * 上传文件存放路径
     */
    private static String UPLOAD_FILE_PATH;

    /**
     * 富文本编辑器文件存放路径
     */
    private static String UPLOAD_FILE_UEDITOR_PATH;


    public static String getUploadFilePath() {
        if (null == UPLOAD_FILE_PATH) {
            UPLOAD_FILE_PATH = WORKSPACE + File.separator + "file" + File.separator + "upload";
            File dir = new File(UPLOAD_FILE_PATH);
            if (!dir.exists()) {
                dir.mkdirs();
            }
        }
        return UPLOAD_FILE_PATH;
    }

    public static String getExportFilePath() {
        if (null == EXPORT_FILE_PATH) {
            EXPORT_FILE_PATH = WORKSPACE ;
            File dir = new File(UPLOAD_FILE_PATH);
            if (!dir.exists()) {
                dir.mkdirs();
            }
        }
        return EXPORT_FILE_PATH;
    }

    public static String getUploadFileUeditorPath() {
        Environment bean = ApplicationContextUtil.getBean(Environment.class);
        String property = bean.getProperty(
                "gpower.publish.path");

        System.out.println("UPLOAD_FILE_UEDITOR_PATH"+UPLOAD_FILE_UEDITOR_PATH);
        String filepath=property+File.separator+"wx";
        File dir = new File(filepath);
        if (!dir.exists()) {
            dir.mkdirs();}
        //WORKSPACE
      /*  if (null == UPLOAD_FILE_UEDITOR_PATH) {
            UPLOAD_FILE_UEDITOR_PATH = getUploadFilePath() + File.separator + "ueditor";
            File dir = new File(UPLOAD_FILE_PATH);
            if (!dir.exists()) {
                dir.mkdirs();
            }
        }*/
        return filepath;
    }
}
