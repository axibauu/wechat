package com.gpower.modules.user.dao;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.gpower.modules.user.entity.Group;
import com.gpower.modules.user.entity.User;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 * @description:
 * @author: jingff
 * @date: 2019-07-11 10:45
 */
public interface GroupDao  extends BaseMapper<Group> {


    List<User> selectGroupUserById(String id);

    void deleteGroupUser(String groupID);

    void insertGroupUser(@Param("groupID")String groupID, @Param("userID")String userID);
    List<Group>  selectGroupbyUserId(@Param("id") String id);
}
