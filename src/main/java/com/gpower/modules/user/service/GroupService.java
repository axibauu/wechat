package com.gpower.modules.user.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.gpower.common.result.PageInfo;
import com.gpower.modules.user.entity.Group;
import com.gpower.modules.user.entity.RolePermisson;
import com.gpower.modules.user.entity.User;

import java.util.Collection;
import java.util.List;
import java.util.Map;
import java.util.Set;

/**
 * @description:
 * @author: jingff
 * @date: 2019-07-11 10:46
 */
public interface GroupService   extends IService<Group> {

    PageInfo queryPage(Map<String, Object> params,  Collection <String> allPermissions,
                       String  loginname);


    /**
     * 保存用户zu
     */
    boolean create(Group user);

     void delete(String  id);

    List<User> selectGroupUserById(String id);

    Group updateGroupUser(String groupID, String userID);

    Set <User> selectGroupbyUserId(String id);
}
