package com.gpower.common.utils;

import java.nio.charset.Charset;

/**
 * Created by wenpu_Di on 18/09/27.
 * url处理工具类
 */
public class URLUtil extends org.springframework.web.util.UriUtils {

    public static String encodeURL(String source, Charset charset) {
        try {
            return URLUtil.encode(source, charset.name());
        } catch (Exception e) {
            throw new RuntimeException(e.getMessage(), e);
        }
    }


}