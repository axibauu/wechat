package com.gpower.modules.storage.service.impl;

import com.gpower.common.exception.GpException;
import com.gpower.common.utils.UUIDGenerator;
import com.gpower.common.utils.WorkSpaceConstants;
import com.gpower.modules.storage.service.StorageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Paths;

/**
 * Created by wenpu_Di on 2019/4/29.
 */
@Service("storageService")
public class StorageServiceImpl implements StorageService {

    @Autowired
    Environment env;

    @Override
    public ResponseEntity<Resource> get(String fileName) {
        return get(WorkSpaceConstants.getUploadFilePath(), fileName);
    }

    @Override
    public ResponseEntity<Resource> get(String baseDir, String fileName) {
        File file = new File(baseDir + File.separator + fileName);
        return getResourceEntity(file);
    }

    @Override
    public String store(MultipartFile file) {
        return this.store(WorkSpaceConstants.getUploadFilePath(), file);
    }

    @Override
    public String store(String baseDir, MultipartFile file) {
        System.out.println("baseDir----"+baseDir);
        if (null == file) {
            throw new GpException("上传文件不能为空！");
        }
        String originalFilename = file.getOriginalFilename();
        String systemSpecifiedFileName = UUIDGenerator.getUUID() + originalFilename.substring(originalFilename.indexOf("."));
        String fileSavePath = baseDir + File.separator ;

        File fileSavePath1 = new File(fileSavePath);
        File file1 = new File(fileSavePath,systemSpecifiedFileName);
        try {
            file.transferTo(Paths.get(file1.getAbsolutePath()));
            System.out.println(file1.getAbsolutePath()+"file1.getAbsolutePath()");
            System.out.println(systemSpecifiedFileName+"file1.getAbsolutePath()");
            return systemSpecifiedFileName;
        } catch (IOException e) {
            throw new GpException("文件上传失败！", e);
        }
    }

    @Override
    public void delete(String fileName) {
        delete(WorkSpaceConstants.getUploadFilePath(), fileName);
    }

    @Override
    public void delete(String baseDir, String fileName) {
        File file = new File(baseDir + File.separator + fileName);
        delete(file);
    }

    @Override
    public void deleteDir(String dirPath) {
        // todo 实现递归删除文件
    }

    @Override
    public ResponseEntity<Resource> getwx(String fileName) {
        String[] s = fileName.split("_");
        String property = env.getProperty("gpower.publish.path");
        String path=  property+File.separator+"wx"+File.separator+s[0];
        return get(path, fileName);
    }

    @Override
    public ResponseEntity<Resource> getwb(String fileName) {
        String[] s = fileName.split("_");
        String property = env.getProperty("gpower.publish.path");
        String path=  property+File.separator+"wb"+File.separator+s[0];
        return get(path, fileName);

    }

    @Override
    public ResponseEntity<Resource> getwbimage(String id,String fileName) {

        String property = env.getProperty("gpower.publish.path");
        String path=  property+File.separator+"wb"+File.separator+id;
        return get(path, fileName);
    }

    private ResponseEntity<Resource> getResourceEntity(File file) {
        System.out.println(file+"file--");
        if (!file.exists()) {
            throw new GpException("文件不存在!");
        }
        Resource resource = new FileSystemResource(file);
        return ResponseEntity.ok()
                .contentType(MediaType.APPLICATION_OCTET_STREAM)
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + resource.getFilename() + "\"")
                .body(resource);
    }

    private void delete(File file) {
        if (!file.exists()) {
            throw new GpException("文件不存在!");
        }
        if (!file.isFile()) {
            throw new GpException("删除文件失败！改目录为文件");
        }
        file.delete();
    }

}
