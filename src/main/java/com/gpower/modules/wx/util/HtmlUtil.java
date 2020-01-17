package com.gpower.modules.wx.util;

import cn.hutool.core.util.StrUtil;
import org.apache.commons.lang.StringUtils;
import org.htmlparser.NodeFilter;
import org.htmlparser.Parser;
import org.htmlparser.filters.TagNameFilter;
import org.htmlparser.tags.ImageTag;
import org.htmlparser.util.NodeList;

import java.util.HashSet;
import java.util.Set;

public class HtmlUtil {
    private static final char[] LT_ENCODE = "&lt;".toCharArray();
    private static final char[] GT_ENCODE = "&gt;".toCharArray();

    public static String clearFormat(String content) {
        content = content.substring(content.indexOf(">") + 1, content.indexOf("</body>"));
        return content;
    }

    public static Set <String> getImageUrlList(String resource) throws Exception {
        if(StringUtils.isBlank(resource)){
            return null;
        }
        Set<String> set = new HashSet <String>();
        Parser parser = Parser.createParser(resource, "UTF-8");
        String filterStr = "img";
        NodeFilter filter = new TagNameFilter(filterStr);
        NodeList nodeList = parser.extractAllNodesThatMatch(filter);
        for (int i = 0; i < nodeList.size(); i++) {
            ImageTag imgtag = (ImageTag) nodeList.elementAt(i);
            String imageUrl = imgtag.getImageURL();
            set.add(imageUrl);
        }
        return set;
    }

    public static final String stripTags(String in) {
        if (in == null)
            return null;
        int i = 0;
        int last = 0;
        char[] input = in.toCharArray();
        int len = input.length;
        StringBuffer out = new StringBuffer((int) (len * 1.3D));
        for (; i < len; i++) {
            char ch = input[i];
            if (ch > '>')
                continue;
            if (ch == '<') {
                if ((i + 3 < len) && (input[(i + 1)] == 'b') && (input[(i + 2)] == 'r') && (input[(i + 3)] == '>')) {
                    i += 3;
                } else {
                    if (i > last) {
                        if (last > 0)
                            out.append(" ");
                        out.append(input, last, i - last);
                    }
                    last = i + 1;
                }
            } else if (ch == '>') {
                last = i + 1;
            }
        }
        if (last == 0)
            return in;
        if (i > last)
            out.append(input, last, i - last);
        String str = out.toString();
        str = str.replaceAll("&nbsp;", " ");
        str = str.replaceAll("&raquo;", "");
        return str;
    }

    public static final String escapeHTMLTags(String in) {
        if (in == null) {
            return null;
        }

        int i = 0;
        int last = 0;
        char[] input = in.toCharArray();
        int len = input.length;
        StringBuffer out = new StringBuffer((int) (len * 1.3D));
        for (; i < len; i++) {
            char ch = input[i];
            if (ch > '>')
                continue;
            if (ch == '<') {
                if (i > last) {
                    out.append(input, last, i - last);
                }
                last = i + 1;
                out.append(LT_ENCODE);
            } else if (ch == '>') {
                if (i > last) {
                    out.append(input, last, i - last);
                }
                last = i + 1;
                out.append(GT_ENCODE);
            }
        }
        if (last == 0) {
            return in;
        }
        if (i > last) {
            out.append(input, last, i - last);
        }
        return out.toString();
    }

    public static final String highlightWords(String string, String[] words, String startHighlight, String endHighlight) {
        if ((string == null) || (words == null) ||
                (startHighlight == null) || (endHighlight == null)) {
            return null;
        }
        for (int i = 0; i < words.length; i++) {
            string = string.replaceAll(words[i], startHighlight + words[i] + endHighlight);
        }
        return string;
    }

    public static String filterXSS(String queryString) {
        if (queryString == null) {
            return null;
        }
        if (queryString.length() < 1) {
            return "";
        }
        String filter = cn.hutool.http.HtmlUtil.filter(queryString);
        return StrUtil.replace(filter, "&quot;", "\"");
    }

    /*
          public static String filterXSS(String queryString)
          {
            if (queryString == null) {
              return null;
            }
            if (queryString.length() < 1) {
              return "";
            }

            String result = queryString;

            String rep = "";

            result = result.replaceAll("%3c", rep);
            result = result.replaceAll("%3e", rep);
            result = result.replaceAll("%22", rep);
            result = result.replaceAll("%27", rep);
            result = result.replaceAll("%3d", rep);
            result = result.replaceAll("%2f", rep);
            result = result.replaceAll("%3a", rep);
            result = result.replaceAll("%3f", rep);

            result = result.replaceAll("/[\\s]{0,20}>", rep);
            result = result.replaceAll("<[\\s]{0,20}/", rep);
            result = result.replaceAll("<", rep);
            result = result.replaceAll(">", rep);
            //result = result.replaceAll("\"", rep);

            //result = result.replaceAll("'", rep);
            //result = result.replaceAll("=", rep);
            //result = result.replaceAll("/", rep);
            //result = result.replaceAll(":", rep);
            result = result.replace("*", rep);
            //result = result.replace(".", rep);
            result = result.replace("?", rep);

            result = result.replaceAll("(?i)onclick", rep);
            result = result.replaceAll("(?i)ondblclick", rep);
            result = result.replaceAll("(?i)onmousedown", rep);
            result = result.replaceAll("(?i)onmouseup", rep);
            result = result.replaceAll("(?i)onmouseover", rep);
            result = result.replaceAll("(?i)onmousemove", rep);
            result = result.replaceAll("(?i)onkeypress", rep);
            result = result.replaceAll("(?i)onkeydown", rep);
            result = result.replaceAll("(?i)onkeyup", rep);
            result = result.replaceAll("(?i)onabort", rep);
            result = result.replaceAll("(?i)onbeforeunload", rep);
            result = result.replaceAll("(?i)onerror", rep);
            result = result.replaceAll("(?i)onload", rep);
            result = result.replaceAll("(?i)onmove", rep);
            result = result.replaceAll("(?i)onresize", rep);
            result = result.replaceAll("(?i)onscroll", rep);
            result = result.replaceAll("(?i)onstop", rep);
            result = result.replaceAll("(?i)onunload", rep);
            result = result.replaceAll("(?i)onblur", rep);
            result = result.replaceAll("(?i)onchange", rep);
            result = result.replaceAll("(?i)onfocus", rep);
            result = result.replaceAll("(?i)onreset", rep);
            result = result.replaceAll("(?i)onsubmit", rep);
            result = result.replaceAll("(?i)onbounce", rep);
            result = result.replaceAll("(?i)onfinish", rep);
            result = result.replaceAll("(?i)onstart", rep);
            result = result.replaceAll("(?i)onbeforecopy", rep);
            result = result.replaceAll("(?i)onbeforecut", rep);
            result = result.replaceAll("(?i)onbeforeeditfocus", rep);
            result = result.replaceAll("(?i)onbeforepaste", rep);
            result = result.replaceAll("(?i)onbeforeupdate", rep);
            result = result.replaceAll("(?i)oncontextmenu", rep);
            result = result.replaceAll("(?i)oncopy", rep);
            result = result.replaceAll("(?i)oncut", rep);
            result = result.replaceAll("(?i)ondrag", rep);
            result = result.replaceAll("(?i)ondragdrop", rep);
            result = result.replaceAll("(?i)ondragend", rep);
            result = result.replaceAll("(?i)ondragenter", rep);
            result = result.replaceAll("(?i)ondragleave", rep);
            result = result.replaceAll("(?i)ondragover", rep);
            result = result.replaceAll("(?i)ondragstart", rep);
            result = result.replaceAll("(?i)ondrop", rep);
            result = result.replaceAll("(?i)onlosecapture", rep);
            result = result.replaceAll("(?i)onpaste", rep);
            result = result.replaceAll("(?i)onselect", rep);
            result = result.replaceAll("(?i)onselectstart", rep);
            result = result.replaceAll("(?i)onafterupdate", rep);
            result = result.replaceAll("(?i)oncellchange", rep);
            result = result.replaceAll("(?i)ondataavailable", rep);
            result = result.replaceAll("(?i)ondatasetcomplete", rep);
            result = result.replaceAll("(?i)onerrorupdate", rep);
            result = result.replaceAll("(?i)onrowenter", rep);
            result = result.replaceAll("(?i)onrowexit", rep);
            result = result.replaceAll("(?i)onrowsdelete", rep);
            result = result.replaceAll("(?i)onrowsinserted", rep);
            result = result.replaceAll("(?i)onafterprint", rep);
            result = result.replaceAll("(?i)onbeforeprint", rep);
            result = result.replaceAll("(?i)onfilterchange", rep);
            result = result.replaceAll("(?i)onhelp", rep);
            result = result.replaceAll("(?i)onpropertychange", rep);
            result = result.replaceAll("(?i)onreadystatechange", rep);
            result = result.replaceAll("(?i)alert", rep);
            result = result.replaceAll("(?i)prompt", rep);
            result = result.replaceAll("(?i)confirm", rep);
            result = result.replaceAll("(?i)eval", rep);
            result = result.replaceAll("(?i)window", rep);
            result = result.replaceAll("(?i)style", rep);

            while (result.toLowerCase().indexOf("script") > 0) {
              result = result.replaceAll("(?i)script", "");
            }
            while (result.toLowerCase().indexOf("expression") > 0) {
              result = result.replaceAll("(?i)expression", "");
            }

            result = result.replace("(", rep);
            result = result.replace(")", rep);

            return result;
          }
    */
    public static String filteXSSHtmlCodeMinimal(String queryString) {
        String content = queryString.replaceAll("&", "&amp;amp;");
        content = queryString.replaceAll("<", "&amp;lt;");
        content = queryString.replaceAll(">", "&amp;gt;");
        content = queryString.replaceAll("'", "&amp;#039;");
        content = queryString.replaceAll("\"", "&amp;quot;");
        return content;
    }
}
