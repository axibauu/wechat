package com.gpower.common.utils;

import java.util.UUID;

/**
 * 创建人 :liuzhongliang
 * 日    期 :2015年8月17日
 * 类说明 :生成UUID工具类
 */
public class UUIDGenerator {
    public UUIDGenerator() {
    }

    /**
     * 创  建  人:liuzhongliang
     * 日       期 :2015年8月17日
     * 功能描述 :生成32位uuid
     * 参数说明 :
     * 返  回  值 :
     */
    public static String getUUID() {
        UUID uuid = UUID.randomUUID();
        String str = uuid.toString();
        return str.replace("-", "");
    }
}
