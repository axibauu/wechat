package com.gpower.common.controller;

import com.gpower.common.exception.GpException;
import com.gpower.common.result.ResultStatus;
import com.gpower.common.utils.LocalMessage;
import com.gpower.common.utils.StringUtil;
import com.gpower.common.utils.URLUtil;
import com.gpower.common.utils.UUIDGenerator;
import com.gpower.modules.log.LogUtil;
import com.gpower.modules.log.entity.Log;
import org.apache.commons.codec.Charsets;
import org.apache.commons.lang.StringUtils;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.session.Session;
import org.apache.shiro.subject.Subject;
import org.apache.shiro.web.subject.WebSubject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.dao.DataAccessException;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.ServletRequest;
import javax.servlet.http.HttpServletRequest;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.IOException;

public class BaseController {
    @Autowired
    private LocalMessage localMessage;

    /**
     * <p>@description :验证参数是否为null</p>
     * <p>@version :0.1</p>
     * <p>@author :liuzl</p>
     * <p>@Time :2018-01-19</p>
     * <p>@param request {@link HttpServletRequest}</p>
     * <p>@param parameters 参数数组</p>
     * <p>@throws CmsException </p>
     */
    protected void verifyRequestParametersNull(HttpServletRequest request, String... parameters) throws GpException {
        for (int i = 0; i < parameters.length; i++) {
            String parameter = parameters[i];
            String value = request.getParameter(parameter);
            if (StringUtils.isBlank(value)) {
                throw new GpException("error.parameter.empty", parameter);
            }
        }
    }

    protected String getMessage(Exception e) {
        if (e instanceof DataAccessException) {
            return ResultStatus.DATA_ERROR.msg();
        } else if (e instanceof DataIntegrityViolationException) {
            return "数据完整性违规";
        }
        return getMessage(e.getMessage());
    }

    protected String getMessage(String code) {
        return getMessage(code, null, null);
    }

    /**
     * 创  建  人:liuzhongliang
     * 日       期 :2015年8月20日
     * 功能描述 :从配置文件message.properties中读取值
     * 参数说明 :
     * 返  回  值 :
     */
    protected String getMessage(String code, Object[] objs, String defaultMessage) {
        if (defaultMessage == null) {
            if (objs == null || objs.length == 0) {
                return localMessage.getMessage(code, null, ResultStatus.SERVER_ERROR.msg());
            }
            return localMessage.getMessage(code, objs);
        }
        return localMessage.getMessage(code, objs, defaultMessage);
    }

    /**
     * <p>@description :获取当前登录的用户名</p>
     * <p>@version :0.1</p>
     * <p>@author :liuzl</p>
     * <p>@Time :2018-07-02</p>
     * <p>@return </p>
     */
    protected String getLoginUsername() {
        Subject subject = SecurityUtils.getSubject();
        return (String) subject.getPrincipal();
    }

    /**
     * <p>@description :获取session</p>
     * <p>@version :0.1</p>
     * <p>@author :liuzl</p>
     * <p>@Time :2018-07-02</p>
     * <p>@return </p>
     */
    protected Session getSession() {
        Subject sub = SecurityUtils.getSubject();
        return sub.getSession();
    }

    /**
     * <p>@description :获取request</p>
     * <p>@version :0.1</p>
     * <p>@author :liuzl</p>
     * <p>@Time :2018-07-02</p>
     * <p>@return </p>
     */
    protected ServletRequest getRequest() {
        ServletRequest request = ((WebSubject) SecurityUtils.getSubject()).getServletRequest();
        return request;
    }

    /**
     * <p>@description :写成功日志</p>
     * <p>@version :0.1</p>
     * <p>@author :liuzl</p>
     * <p>@Time :2018-07-02</p>
     * <p>@param modelName 模块名称,例如:用户</p>
     * <p>@param entityID 实体ID</p>
     * <p>@param entityName 实体名称</p>
     * <p>@param operate  操作 </p>
     * <p>@param desc 描述</p>
     */
    protected void writeSuccesssLog(String modelName, String entityID, String entityName, String operate, Object obj, String desc) {
        Subject currentUser = SecurityUtils.getSubject();
        String username = (String) currentUser.getPrincipal();
        String ip = getRequest().getRemoteAddr();
        LogUtil.getInstance().writeLog(username, ip, Log.STATUS.SUCCESS.VALUE, modelName, entityID, entityName, operate, obj, desc);
    }

    /**
     * <p>@description :写失败日志</p>
     * <p>@version :0.1</p>
     * <p>@author :liuzl</p>
     * <p>@Time :2018-07-02</p>
     * <p>@param modelName 模块名称,例如:用户</p>
     * <p>@param entityID 实体ID</p>
     * <p>@param entityName 实体名称</p>
     * <p>@param operate  操作 </p>
     * <p>@param desc 描述</p>
     */
    protected void writeFailureLog(String modelName, String entityID, String entityName, String operate, Object obj, String desc) {
        Subject currentUser = SecurityUtils.getSubject();
        String username = (String) currentUser.getPrincipal();
        String ip = getRequest().getRemoteAddr();
        LogUtil.getInstance().writeLog(username, ip, Log.STATUS.FAILURE.VALUE, modelName, entityID, entityName, operate, obj, desc);

    }

    protected ResponseEntity<Resource> downloadFile(File file, String downloadFileName) throws FileNotFoundException {
        if (file == null || !file.exists()) {
            throw new FileNotFoundException("没有此文件");
        }
        if (downloadFileName == null || downloadFileName.length() == 0) {
            downloadFileName = file.getName();
        } else {
            String suffix = file.getName().substring(file.getName().indexOf("."));
            downloadFileName += suffix;
        }
        Resource resource = new FileSystemResource(file);
        HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder
                .getRequestAttributes()).getRequest();
        String header = request.getHeader("User-Agent");
        // 避免空指针
        header = header == null ? "" : header.toUpperCase();
        HttpStatus status;
        if (header.contains("MSIE") || header.contains("TRIDENT") || header.contains("EDGE")) {
            downloadFileName = URLUtil.encodeURL(downloadFileName, Charsets.UTF_8);
            status = HttpStatus.OK;
        } else {
            downloadFileName = new String(downloadFileName.getBytes(Charsets.UTF_8), Charsets.ISO_8859_1);
            status = HttpStatus.CREATED;
        }
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_OCTET_STREAM);
        headers.setContentDispositionFormData("attachment", downloadFileName);
        return new ResponseEntity<>(resource, headers, status);
    }

    protected String saveUploadFile(MultipartFile file, String dirPath, String UUID) {
        int i = file.getOriginalFilename().lastIndexOf('.');
        String extension = "";
        if (i > 0) {
            extension = file.getOriginalFilename().substring(i + 1);
        }
        String fileName;
        if (StringUtil.isEmpty(UUID)) {
            fileName = UUIDGenerator.getUUID() + "." + extension;
        } else {
            fileName = UUID + "." + extension;
        }
        File directory = new File(dirPath);
        if (!directory.exists()) {
            directory.mkdirs();
        }
        String filePath = dirPath + File.separator + fileName;
        try {
            file.transferTo(new File(filePath));
        } catch (IOException e) {
            e.printStackTrace();
            throw new RuntimeException("上传文件失败");
        }
        return fileName;

    }

}
