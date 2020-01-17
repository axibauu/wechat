package com.gpower.modules.user.dao;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.gpower.modules.user.entity.Group;
import com.gpower.modules.user.entity.UserGroup;
import org.apache.ibatis.annotations.Param;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;

/**
 * @description:
 * @author: jingff
 * @date: 2019-08-15 14:44
 */
public interface UserGroupDao  extends BaseMapper <UserGroup> {

       public List <Group> findGroupId(@Param("name") String name);
}
