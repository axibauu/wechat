package com.gpower.modules.user.dao;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.gpower.modules.user.entity.Role;

import java.util.List;

public interface RoleDao extends BaseMapper<Role> {


    List<Role> selectAll();
}
