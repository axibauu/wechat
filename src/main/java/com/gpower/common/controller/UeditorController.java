package com.gpower.common.controller;

import com.gpower.common.ueditor.UeditorService;
import com.gpower.common.utils.WorkSpaceConstants;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.io.File;

@RestController
public class UeditorController extends BaseController {
    @Autowired
    private UeditorService ueditorService;

    /**
     * ueditor编辑器
     */
    @RequestMapping("/ueditor")
    public ResponseEntity<String> ueditor(HttpServletRequest request) {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.TEXT_HTML);
        String json = ueditorService.exec(request);
        return new ResponseEntity<>(json, headers, HttpStatus.OK);
    }

    @RequestMapping("/upload/**/*")
    public ResponseEntity<Resource> getResources(HttpServletRequest request) {
        String path = request.getServletPath();
        System.out.println("path"+path);
        try {
            String filePath = WorkSpaceConstants.getUploadFileUeditorPath() + path;
            System.out.println("filePath"+filePath);
            File file = new File(filePath);
            return downloadFile(file, null);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

}
