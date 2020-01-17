package com.gpower.modules.storage.controller;

import com.gpower.common.result.Result;
import com.gpower.modules.storage.service.StorageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

/**
 * Created by wenpu_Di on 2019/4/29.
 */
@RestController
@RequestMapping("/storage")
public class StorageController {

    @Autowired
    StorageService storageService;

    /**
     * 上传文件
     */
    @ResponseBody
    @RequestMapping(method = RequestMethod.POST)
    public Result uploadReferenceFile(@RequestParam(value = "file", required = false) MultipartFile file, String name) {
        String systemSpecifiedFileName = storageService.store(file);
        return Result.ok(systemSpecifiedFileName);
    }

    /**
     * 下载文件
     */
    @ResponseBody
    @RequestMapping(value = "/{name}", method = RequestMethod.GET)
    public ResponseEntity<Resource> getResources(@PathVariable("name") String name) {
        return storageService.get(name);
    }

    /**
     * 下载文件
     */
    @ResponseBody
    @RequestMapping(value = "/wx/{name}", method = RequestMethod.GET)
    public ResponseEntity<Resource> getwxResources(@PathVariable("name") String name) {
        return storageService.getwx(name);
    }

    @ResponseBody
    @RequestMapping(value = "/wbimage/{id}/{name}", method = RequestMethod.GET)
    public ResponseEntity<Resource> getwbResources(@PathVariable("name") String name,@PathVariable("id") String id) {
        return storageService.getwbimage(id,name);
    }

    @ResponseBody
    @RequestMapping(value = "/wb/{name}", method = RequestMethod.GET)
    public ResponseEntity<Resource> getwbResources(@PathVariable("name") String name) {
        return storageService.getwb(name);
    }


}
