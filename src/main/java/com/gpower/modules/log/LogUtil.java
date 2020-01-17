package com.gpower.modules.log;

import com.fasterxml.jackson.core.JsonFactory;
import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.gpower.common.utils.SpringContextUtil;
import com.gpower.modules.log.entity.Log;
import com.gpower.modules.log.service.LogService;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.subject.Subject;
import org.apache.shiro.web.subject.WebSubject;

import javax.servlet.ServletRequest;
import java.io.StringWriter;
import java.util.Date;

public class LogUtil {
    public static LogUtil getInstance() {
        return new LogUtil();
    }

    private final JsonFactory jsonFactory = new ObjectMapper().getFactory();

    public void writeLog(int status, String modelName, String entityID, String entityName, String operate, Object obj, String desc) {
        Subject subject = SecurityUtils.getSubject();
        String username = (String) subject.getPrincipal();
        ServletRequest request = ((WebSubject) SecurityUtils.getSubject()).getServletRequest();
        String ip = request.getRemoteAddr();
        writeLog(username, ip, status, modelName, entityID, entityName, operate, obj, desc);
    }

    public void writeLog(String username, String ip, int status, String modelName, String entityID, String entityName, String operate, Object obj, String desc) {
        try {
            Log log = new Log();
            log.generateKey();
            log.setIp(ip);
            log.setUser(username);
            log.setModelName(modelName);
            log.setEntityId(entityID);
            log.setEntityName(entityName);
            log.setRemark(desc);
            log.setOperate(operate);
            log.setStatus(status);
            log.setOpTime(new Date());
            if (obj != null) {
                StringWriter writer = new StringWriter();
                JsonGenerator gen = jsonFactory.createGenerator(writer);
                gen.writeObject(obj);
                log.setJson(writer.toString());
            }
            LogService logService = SpringContextUtil.getBean(LogService.class);
            logService.save(log);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
