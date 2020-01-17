package com.gpower.modules.user.dao;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.gpower.modules.user.entity.User;

import java.util.List;

public interface UserDao extends BaseMapper<User> {
    List<User> selectAll();


}
