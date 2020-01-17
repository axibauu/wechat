package com.gpower.modules.log.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.gpower.common.result.PageInfo;
import com.gpower.modules.log.entity.Log;

import java.util.Map;

public interface LogService extends IService<Log> {

    PageInfo queryPage(Map<String, Object> params);
}
