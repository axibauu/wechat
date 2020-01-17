package com.gpower.modules.log.service.impl;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.gpower.common.result.PageInfo;
import com.gpower.common.utils.Query;
import com.gpower.modules.log.dao.LogDao;
import com.gpower.modules.log.entity.Log;
import com.gpower.modules.log.service.LogService;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service("logService")
public class LogServiceImpl extends ServiceImpl<LogDao, Log> implements LogService {
    @Override
    public PageInfo queryPage(Map<String, Object> params) {

        IPage<Log> page = this.page(
                new Query<Log>(params).getPage(), null );
        return new PageInfo(page);
    }
}
