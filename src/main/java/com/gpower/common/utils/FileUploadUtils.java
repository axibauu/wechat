package com.gpower.common.utils;

import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;

/**
 * 文件上传工具类
 * Created by wenpu_Di on 2019/4/29.
 */
public class FileUploadUtils {

    /**
     * 默认上传的地址
     */
    private static String defaultBaseDir;

    /**
     * 1.以默认配置进行文件上传
     */
    public static String upload(MultipartFile file) throws IOException {
        return upload(getDefaultBaseDir(), file);
    }

    /**
     * 2.根据文件路径上传
     */
    public static String upload(String baseDir, MultipartFile file) throws IOException {
        String originalFilename = file.getOriginalFilename();
        String saveName = UUIDGenerator.getUUID() + originalFilename.substring(originalFilename.indexOf("."));
        String filePath = baseDir + saveName;
        file.transferTo(new File(filePath));
        return saveName;
    }

    public static String getDefaultBaseDir() {
        return defaultBaseDir;
    }

    public static void setDefaultBaseDir(String defaultBaseDir) {
        FileUploadUtils.defaultBaseDir = defaultBaseDir;
    }
}
