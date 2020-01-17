package com.gpower.modules.log.dao;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.gpower.modules.log.entity.Log;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface LogDao extends BaseMapper<Log> {

}
