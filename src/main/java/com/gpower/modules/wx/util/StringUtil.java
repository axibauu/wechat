package com.gpower.modules.wx.util;

import org.apache.commons.lang.ArrayUtils;

import java.io.*;
import java.nio.ByteBuffer;
import java.nio.CharBuffer;
import java.nio.charset.Charset;
import java.nio.charset.CharsetDecoder;
import java.nio.charset.CharsetEncoder;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Hashtable;
import java.util.List;
import java.util.StringTokenizer;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class StringUtil {
	/**
	 * <p>@description :目前已支持的匹配号段
	 * 中国电信号段
	 * 33、149、153、173、177、180、181、189、199
	 * 中国联通号段
	 * 130、131、132、145、155、156、166、175、176、185、186
	 * 中国移动号段
	 * 134(0-8)、135、136、137、138、139、147、150、151、152、157、158、159、178、182、183、184、187、188、198
	 * 其他号段
	 *   14号段以前为上网卡专属号段，如中国联通的是145，中国移动的是147等等。
	 *   虚拟运营商
	 *   电信：1700、1701、1702
	 *   移动：1703、1705、1706
	 *   联通：1704、1707、1708、1709、171</p>
	 * <p>@param mobile : </p>
	 * <p>@return boolean</p>
	 * <p>@Time :2019/4/24 9:41</p>
	 * <p>@author :liuzl</p>
	 *	<p>@version :0.1</p>
	 **/
	public static boolean isMobile(String mobile) {
		String regex = "^((13[0-9])|(14[5,7])|(15[0-3,5-9])|(17[0,3,5-8])|(18[0-9])|166|198|199|(147))\\d{8}$";
		Pattern p = Pattern.compile(regex, Pattern.CASE_INSENSITIVE);
		Matcher m = p.matcher(mobile);
		return m.matches();
	}
	public static boolean isUrl(String url) {
		if(url==null){
			return false;
		}
        boolean isurl = false;
        String regex = "^([hH][tT]{2}[pP]://|[hH][tT]{2}[pP][sS]://)(([A-Za-z0-9-~]+).)+([A-Za-z0-9-~\\/])+$";//设置正则表达式
        Pattern pattern = Pattern.compile(regex);
        Matcher mat = pattern.matcher(url.trim());
        isurl = mat.matches();//判断是否匹配
        if (isurl) {
            isurl = true;
        }
        return isurl;
    }
	
	
	 private static final String EOL = System.getProperty("line.separator");

	  // 一级域名提取  
	  private static final String RE_TOP1 = "(\\w*\\.?){1}\\.(com.cn|net.cn|gov.cn|org\\.nz|org.cn|com|net|org|gov|cc|biz|info|cn|co)$";  
	    
	  // 二级域名提取  
	  private static final String RE_TOP2 = "(\\w*\\.?){2}\\.(com.cn|net.cn|gov.cn|org\\.nz|org.cn|com|net|org|gov|cc|biz|info|cn|co)$";  
	    
	  // 三级域名提取  
	  private static final String RE_TOP3 = "(\\w*\\.?){3}\\.(com.cn|net.cn|gov.cn|org\\.nz|org.cn|com|net|org|gov|cc|biz|info|cn|co)$";  
	
	  public static boolean isEmail(String string) {
	        if (string == null)
	            return false;
	        String regEx1 = "^([a-z0-9A-Z]+[-|\\.]?)+[a-z0-9A-Z]@([a-z0-9A-Z]+(-[a-z0-9A-Z]+)?\\.)+[a-zA-Z]{2,}$";
	        Pattern p;
	        Matcher m;
	        p = Pattern.compile(regEx1);
	        m = p.matcher(string);
	        if (m.matches())
	            return true;
	        else
	            return false;
	    }
	  public static String getSecondLevelDomain(String url){
		  Pattern pattern = Pattern.compile(RE_TOP2 , Pattern.CASE_INSENSITIVE);  
		  Matcher matcher = pattern.matcher(url);  
          if(matcher.find()){
        	  return matcher.group(); 
          }
          return null;
	  }
	  public static String getTopDomain(String url){
		  Pattern pattern = Pattern.compile(RE_TOP1 , Pattern.CASE_INSENSITIVE);  
		  Matcher matcher = pattern.matcher(url);  
		  if(matcher.find()){
        	  return matcher.group(); 
          }
          return null;
	  }
	  private static MessageDigest digest = null;
	   public static String captureFirstLetter(String name) {
	        char[] cs=name.toCharArray();
	        cs[0]-=32;
	        return String.valueOf(cs);
	        
	    }
	  private static final char[] zeroArray = "0000000000000000000000000000000000000000000000000000000000000000"
	    .toCharArray();

	  public static String LocalEncoding(String str)
	  {
	    try
	    {
	      return new String(str.getBytes("iso-8859-1"), "GBK"); } catch (Exception e) {
	    }
	    return str;
	  }

	  public static String JavaEncoding(String str)
	  {
	    return str;
	  }

	  public static String substring(String str, int len) {
		  if(str==null){
			  return "";
		  }
	    int reInt = 0;
	    String reStr = "";
	    char[] tempChar = str.toCharArray();
	    for (int kk = 0; (kk < tempChar.length) && (len > reInt); kk++) {
	      String s1 = String.valueOf(tempChar[kk]);
	      byte[] b = s1.getBytes();
	      reInt += b.length;
	      reStr = reStr + tempChar[kk];
	    }
	    if ((len == reInt) || (len == reInt - 1))
	      reStr = reStr + "...";
	    return reStr;
	  }

	  public static String utf82gb(String str) {
	    try {
	      byte[] bytes = str.getBytes();
	      Charset utf8Charset = Charset.forName("UTF-8");
	      CharsetDecoder decoder = utf8Charset.newDecoder();
	      ByteBuffer byteBuffer = ByteBuffer.wrap(bytes);
	      CharBuffer srcChars = decoder.decode(byteBuffer);
	      Charset gbkCharset = Charset.forName("GBK");
	      CharsetEncoder encoder = gbkCharset.newEncoder();
	      byteBuffer = encoder.encode(srcChars);
	      return new String(byteBuffer.array()); } catch (Exception e) {
	    }
	    return str;
	  }

	  public static String utf82gb(byte[] bytes)
	  {
	    String str = null;
	    try {
	      Charset utf8Charset = Charset.forName("UTF-8");
	      CharsetDecoder decoder = utf8Charset.newDecoder();
	      ByteBuffer byteBuffer = ByteBuffer.wrap(bytes);
	      CharBuffer srcChars = decoder.decode(byteBuffer);
	      Charset gbkCharset = Charset.forName("GBK");
	      CharsetEncoder encoder = gbkCharset.newEncoder();
	      byteBuffer = encoder.encode(srcChars);
	      return new String(byteBuffer.array()); } catch (Exception e) {
	    }
	    return str;
	  }

	  public static String iso2gb(String str)
	  {
	    try {
	      return new String(str.getBytes("iso-8859-1"), "GBK"); } catch (Exception e) {
	    }
	    return str;
	  }

	  public static String gb2iso(String str)
	  {
	    try {
	      return new String(str.getBytes("GBK"), "iso-8859-1"); } catch (Exception e) {
	    }
	    return str;
	  }

	  public static String nullFilter(String str)
	  {
	    if (str == null)
	      return "";
	    return str;
	  }


	  public static String IPEncode(String IPAddress)
	  {
	    return IPAddress.substring(0, IPAddress.lastIndexOf(".") + 1) + "*";
	  }

	  public static final synchronized String hash(String data)
	  {
	  	if(data==null){
	  		return null;
		}
	    if (digest == null) {
	      try {
	        digest = MessageDigest.getInstance("MD5");
	      } catch (NoSuchAlgorithmException nsae) {
	        nsae.printStackTrace();
	      }
	    }

	    digest.update(data.getBytes());
	    return toHex(digest.digest());
	  }

	  public static final String toHex(byte[] hash) {
	    StringBuffer buf = new StringBuffer(hash.length * 2);

	    for (int i = 0; i < hash.length; i++) {
	      if ((hash[i] & 0xFF) < 16) {
	        buf.append("0");
	      }
	      buf.append(Long.toString(hash[i] & 0xFF, 16));
	    }
	    return buf.toString();
	  }

	  public static String[] split(String s, String s1) {
	    if (s == null)
	      return null;
	    StringTokenizer stringtokenizer = new StringTokenizer(s, s1);
	    int i = stringtokenizer.countTokens();
	    String[] as = new String[i];
	    for (int j = 0; j < i; j++) {
	      as[j] = stringtokenizer.nextToken();
	    }
	    return as;
	  }

	  public static String getFileExtension(String filename) {
	    int index = filename.lastIndexOf(".");
	    String fileExt = "";
	    if (index != -1)
	      fileExt = filename.substring(index + 1);
	    return fileExt;
	  }

	  public static String repeatString(int count, String str) {
	    String retStr = "";
	    for (int i = 0; i < count; i++) {
	      retStr = retStr + str;
	    }
	    return retStr;
	  }

	  public static final String replace(String line, String oldString, String newString)
	  {
	    return line.replaceAll(oldString, newString);
	  }
	  public static final String extractFilename(String path,String fileSeparator) {
		    int index = path.lastIndexOf(fileSeparator);
		    String filename = path;
		    if (index != -1){
		    	 filename = path.substring(index + 1);
		    }
		    return filename;
		  }
	  public static final String extractFilename(String path) {
	    int index = path.lastIndexOf("/");
	    String filename = path;
	    if (index != -1){
	    	 filename = path.substring(index + 1);
	    }else{
	    	index = path.lastIndexOf(File.separator);
		    filename = path;
		    if (index != -1){
		    	 filename = path.substring(index + 1);
		    }
	    }
	    return filename;
	  }

	  public static final String summary(String str, int length) {
		  if(str==null){
			  return "";
		  }
	    if ((str != null) && (str.length() > length)) {
	      str = str.substring(0, length);
	      str = str + "...";
	      return str;
	    }
	    return str;
	  }

	  public static final String summaryE(String in, int len)
	  {
		  if(in==null){
			 return "";
		  }
	    int doubleLen = len * 2;
	    char[] origArr = in.toCharArray();
	    char[] outArr = new char[origArr.length * 2];
	    String outStr = "";
	    int cnt = 0;

	    while ((doubleLen >= 1) && (cnt < origArr.length)) {
	      char tmpChar = origArr[cnt];
	      if ((tmpChar >= 'a') && (tmpChar <= 'z')) {
	        outArr[cnt] = tmpChar;
	        doubleLen--;
	      } else if ((tmpChar >= 'A') && (tmpChar <= 'Z')) {
	        outArr[cnt] = tmpChar;
	        doubleLen--;
	      } else if ((tmpChar >= 0) && (tmpChar <= '\t')) {
	        outArr[cnt] = tmpChar;
	        doubleLen--;
	      } else if (Character.isLetter(tmpChar)) {
	        outArr[cnt] = tmpChar;
	        doubleLen -= 2;
	      } else {
	        outArr[cnt] = tmpChar;
	        doubleLen--;
	      }
	      cnt++;
	    }
	    outStr = String.valueOf(outArr).trim();

	    if (outStr.length() < origArr.length) {
	      outStr = outStr + "…";
	    }
	    return outStr;
	  }

	  public static final String extractPath(String path) {
	    int index = path.lastIndexOf("/");
	    String dirPath = path;
	    if (index != -1)
	      dirPath = path.substring(0, index);
	    return dirPath;
	  }

	  public static final String extractFilePref(String path) {
	    int index = path.lastIndexOf(".");
	    String filePref = path;
	    if (index != -1)
	      filePref = path.substring(0, index);
	    return filePref;
	  }

	  public static final String replace(String line, String oldString, String newString, int[] count)
	  {
	    if (line == null) {
	      return null;
	    }
	    int i = 0;
	    if ((i = line.indexOf(oldString, i)) >= 0) {
	      int counter = 0;
	      counter++;
	      char[] line2 = line.toCharArray();
	      char[] newString2 = newString.toCharArray();
	      int oLength = oldString.length();
	      StringBuffer buf = new StringBuffer(line2.length);
	      buf.append(line2, 0, i).append(newString2);
	      i += oLength;
	      int j = i;
	      while ((i = line.indexOf(oldString, i)) > 0) {
	        counter++;
	        buf.append(line2, j, i - j).append(newString2);
	        i += oLength;
	        j = i;
	      }
	      buf.append(line2, j, line2.length - j);
	      count[0] = counter;
	      return buf.toString();
	    }
	    return line;
	  }

	  public static final String encodeHex(byte[] bytes) {
	    StringBuffer buf = new StringBuffer(bytes.length * 2);
	    for (int i = 0; i < bytes.length; i++) {
	      if ((bytes[i] & 0xFF) < 16)
	        buf.append("0");
	      buf.append(Long.toString(bytes[i] & 0xFF, 16));
	    }

	    return buf.toString();
	  }

	  public static final byte[] decodeHex(String hex) {
	    char[] chars = hex.toCharArray();
	    byte[] bytes = new byte[chars.length / 2];
	    int byteCount = 0;
	    for (int i = 0; i < chars.length; i += 2) {
	      int newByte = 0;
	      newByte |= hexCharToByte(chars[i]);
	      newByte <<= 4;
	      newByte |= hexCharToByte(chars[(i + 1)]);
	      bytes[byteCount] = (byte)newByte;
	      byteCount++;
	    }

	    return bytes;
	  }

	  private static final byte hexCharToByte(char ch) {
	    switch (ch) {
	    case '0':
	      return 0;
	    case '1':
	      return 1;
	    case '2':
	      return 2;
	    case '3':
	      return 3;
	    case '4':
	      return 4;
	    case '5':
	      return 5;
	    case '6':
	      return 6;
	    case '7':
	      return 7;
	    case '8':
	      return 8;
	    case '9':
	      return 9;
	    case 'a':
	      return 10;
	    case 'b':
	      return 11;
	    case 'c':
	      return 12;
	    case 'd':
	      return 13;
	    case 'e':
	      return 14;
	    case 'f':
	      return 15;
	    case ':':
	    case ';':
	    case '<':
	    case '=':
	    case '>':
	    case '?':
	    case '@':
	    case 'A':
	    case 'B':
	    case 'C':
	    case 'D':
	    case 'E':
	    case 'F':
	    case 'G':
	    case 'H':
	    case 'I':
	    case 'J':
	    case 'K':
	    case 'L':
	    case 'M':
	    case 'N':
	    case 'O':
	    case 'P':
	    case 'Q':
	    case 'R':
	    case 'S':
	    case 'T':
	    case 'U':
	    case 'V':
	    case 'W':
	    case 'X':
	    case 'Y':
	    case 'Z':
	    case '[':
	    case '\\':
	    case ']':
	    case '^':
	    case '_':
	    case '`':
	    }

	    return 0;
	  }

	  public String concat(List list)
	  {
	    StringBuffer sb = new StringBuffer();
	    int size = list.size();

	    for (int i = 0; i < size; i++) {
	      sb.append(list.get(i).toString());
	    }
	    return sb.toString();
	  }

	  public static String getPackageAsPath(String pckge)
	  {
	    return pckge.replace('.', File.separator.charAt(0)) + File.separator;
	  }

	  public static String removeUnderScores(String data)
	  {
	    String temp = null;
	    StringBuffer out = new StringBuffer();
	    temp = data;

	    StringTokenizer st = new StringTokenizer(temp, "_");
	    while (st.hasMoreTokens()) {
	      String element = (String)st.nextElement();
	      out.append(firstLetterCaps(element));
	    }
	    return out.toString();
	  }

	  public static String firstLetterCaps(String data)
	  {
	    String firstLetter = data.substring(0, 1).toUpperCase();
	    String restLetters = data.substring(1).toLowerCase();
	    return firstLetter + restLetters;
	  }

	  public static String chop(String s, int i)
	  {
	    return chop(s, i, EOL);
	  }

	  public static String chop(String s, int i, String eol)
	  {
	    char[] sa = s.toCharArray();
	    int length = sa.length;

	    if (eol.length() == 2) {
	      char eol1 = eol.charAt(0);
	      char eol2 = eol.charAt(1);
	      for (; i > 0; i--)
	        if ((sa[(length - 1)] == eol2) && (sa[(length - 2)] == eol1))
	          length -= 2;
	        else
	          length--;
	    }
	    else
	    {
	      length -= i;
	    }

	    return new String(sa, 0, length);
	  }

	  public static StringBuffer stringSubstitution(String argStr, Hashtable vars)
	  {
	    StringBuffer argBuf = new StringBuffer();

	    for (int cIdx = 0; cIdx < argStr.length(); ) {
	      char ch = argStr.charAt(cIdx);

	      switch (ch) {
	      case '$':
	        StringBuffer nameBuf = new StringBuffer();
	        for (cIdx++; cIdx < argStr.length(); cIdx++) {
	          ch = argStr.charAt(cIdx);
	          if ((ch != '_') && (!Character.isLetterOrDigit(ch))) break;
	          nameBuf.append(ch);
	        }

	        if (nameBuf.length() <= 0) continue;
	        String value = (String)vars.get(nameBuf.toString());

	        if (value == null) continue;
	        argBuf.append(value);

	        break;
	      default:
	        argBuf.append(ch);
	        cIdx++;
	      }

	    }

	    return argBuf;
	  }

	  public static final String chopAtWord(String string, int length)
	  {
	    if (string == null) {
	      return string;
	    }

	    char[] charArray = string.toCharArray();
	    int sLength = string.length();
	    if (length < sLength) {
	      sLength = length;
	    }

	    for (int i = 0; i < sLength - 1; i++)
	    {
	      if ((charArray[i] == '\r') && (charArray[(i + 1)] == '\n')) {
	        return string.substring(0, i + 1);
	      }

	      if (charArray[i] == '\n') {
	        return string.substring(0, i);
	      }
	    }

	    if (charArray[(sLength - 1)] == '\n') {
	      return string.substring(0, sLength - 1);
	    }

	    if (string.length() < length) {
	      return string;
	    }

	    for (int i = length - 1; i > 0; i--) {
	      if (charArray[i] == ' ') {
	        return string.substring(0, i).trim();
	      }

	    }

	    return string.substring(0, length);
	  }

	  public static String fileContentsToString(String file)
	  {
	    String contents = "";

	    File f = new File(file);

	    if (f.exists()) {
			FileReader fr = null;
	      try {
	        fr = new FileReader(f);
	        char[] template = new char[(int)f.length()];
	        fr.read(template);
	        contents = new String(template);
	      } catch (Exception e) {
	        e.printStackTrace();
	      }finally {
	      	if(fr!=null){
				try {
					fr.close();
				} catch (IOException e) {
				}
			}
		  }
	    }

	    return contents;
	  }

	  public static String collapseNewlines(String argStr)
	  {
	    char last = argStr.charAt(0);
	    StringBuffer argBuf = new StringBuffer();

	    for (int cIdx = 0; cIdx < argStr.length(); cIdx++) {
	      char ch = argStr.charAt(cIdx);
	      if ((ch != '\n') || (last != '\n')) {
	        argBuf.append(ch);
	        last = ch;
	      }
	    }

	    return argBuf.toString();
	  }

	  public static String collapseSpaces(String argStr)
	  {
	    char last = argStr.charAt(0);
	    StringBuffer argBuf = new StringBuffer();

	    for (int cIdx = 0; cIdx < argStr.length(); cIdx++) {
	      char ch = argStr.charAt(cIdx);
	      if ((ch != ' ') || (last != ' ')) {
	        argBuf.append(ch);
	        last = ch;
	      }
	    }

	    return argBuf.toString();
	  }

	  public static final String sub(String line, String oldString, String newString)
	  {
	    int i = 0;
	    if ((i = line.indexOf(oldString, i)) >= 0) {
	      char[] line2 = line.toCharArray();
	      char[] newString2 = newString.toCharArray();
	      int oLength = oldString.length();
	      StringBuffer buf = new StringBuffer(line2.length);
	      buf.append(line2, 0, i).append(newString2);
	      i += oLength;
	      int j = i;
	      while ((i = line.indexOf(oldString, i)) > 0) {
	        buf.append(line2, j, i - j).append(newString2);
	        i += oLength;
	        j = i;
	      }
	      buf.append(line2, j, line2.length - j);
	      return buf.toString();
	    }
	    return line;
	  }

	  public static final String stackTrace(Throwable e)
	  {
	    String foo = null;
	    try
	    {
	      ByteArrayOutputStream ostr = new ByteArrayOutputStream();
	      e.printStackTrace(new PrintWriter(ostr, true));
	      foo = ostr.toString();
	    }
	    catch (Exception localException) {
	    }
	    return foo;
	  }

	  public static final String normalizePath(String path)
	  {
	    String normalized = path;
	    if (normalized.indexOf('\\') >= 0) {
	      normalized = normalized.replace('\\', '/');
	    }

	    if (!normalized.startsWith("/")) {
	      normalized = "/" + normalized;
	    }

	    while (true)
	    {
	      int index = normalized.indexOf("//");
	      if (index < 0)
	        break;
	      normalized = normalized.substring(0, index) + 
	        normalized.substring(index + 1);
	    }

	    while (true)
	    {
	      int index = normalized.indexOf("%20");
	      if (index < 0)
	        break;
	      normalized = normalized.substring(0, index) + " " + 
	        normalized.substring(index + 3);
	    }

	    while (true)
	    {
	      int index = normalized.indexOf("/./");
	      if (index < 0)
	        break;
	      normalized = normalized.substring(0, index) + 
	        normalized.substring(index + 2);
	    }

	    while (true)
	    {
	      int index = normalized.indexOf("/../");
	      if (index < 0)
	        break;
	      if (index == 0)
	        return null;
	      int index2 = normalized.lastIndexOf('/', index - 1);
	      normalized = normalized.substring(0, index2) + 
	        normalized.substring(index + 3);
	    }

	    return normalized;
	  }

	  public String select(boolean state, String trueString, String falseString)
	  {
	    if (state) {
	      return trueString;
	    }
	    return falseString;
	  }

	  public boolean allEmpty(List list)
	  {
	    int size = list.size();

	    for (int i = 0; i < size; i++) {
	      if ((list.get(i) != null) && (list.get(i).toString().length() > 0)) {
	        return false;
	      }
	    }
	    return true;
	  }

	  public static final String zeroPadString(String string, int length) {
	    if ((string == null) || (string.length() > length)) {
	      return string;
	    }
	    StringBuffer buf = new StringBuffer(length);
	    buf.append(zeroArray, 0, length - string.length()).append(string);
	    return buf.toString();
	  }
	  /**
	    * <p>@description :字符串是否包含在带有分隔符号的字符串里</p>
	    *	<p>@version :0.1</p>
	    * <p>@author :liuzl</p>
	    * <p>@Time :2017-06-05</p>
	    * <p>@param str
	    * <p>@param allString
	    * <p>@param split
	    * <p>@return</p>
	   */
	  public static boolean strInSplitString(String str,String allString,String split){
		 String[] array = allString.split(",");
		 return  ArrayUtils.contains(array, str);
	  }
	  public static boolean isInArray(Object[] array,Object obj){
			  if(array==null || obj==null){
				  return false;
			  }
			 return  ArrayUtils.contains(array, obj);
	  }
}
