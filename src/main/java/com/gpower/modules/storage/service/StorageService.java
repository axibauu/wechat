package com.gpower.modules.storage.service;

import org.springframework.core.io.Resource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

/**
 * Created by wenpu_Di on 2019/4/29.
 */
public interface StorageService {

    /**
     * 从指定读取文件
     */
    ResponseEntity<Resource> get(String baseDir, String fileName);

    /**
     * 从默认路径读取文件
     */
    ResponseEntity<Resource> get(String fileName);

    /**
     * 从默认配置进行文件上传
     * 返回一个系统指定的文件名：
     * systemSpecifiedFileName【uuid组成】
     */
    String store(MultipartFile file);

    /**
     * 根据文件路径上传
     * 返回一个系统指定的文件名：
     * systemSpecifiedFileName【uuid组成】
     */
    String store(String baseDir, MultipartFile file);

    void delete(String fileName);

    void delete(String baseDir, String fileName);

    /**
     * 删除指定目录下的文件
     */
    void deleteDir(String dirPath);

    ResponseEntity<Resource> getwx(String name);

    ResponseEntity<Resource> getwb(String name);

    ResponseEntity<Resource> getwbimage(String id,String name);
}
