package com.gpower.modules.wx.util;


import com.gpower.startup.config.ApplicationContextUtil;
import org.apache.commons.codec.binary.Base64;
import org.apache.commons.lang.ArrayUtils;
import org.json.JSONObject;

import javax.crypto.Cipher;
import java.io.*;
import java.security.Key;
import java.security.KeyPair;
import java.security.KeyPairGenerator;
import java.security.SecureRandom;

public class RSAUtil {
	  public static void main(String[] args) throws Exception
	  {
		  RSAUtil rs = new RSAUtil();
		  JSONObject json = new JSONObject();
		  json.put("siteName", "北京通元");
		  json.put("username", "admin");
		  json.put("password", "96e79218965eb72c92a549dd5a330112");
		  json.put("url", "http://192.168.2.229:8443/cms/");
		  String source = json.toString();
		  System.out.println(source);
	        String cryptograph = rs.encrypt(source);//生成的密文
	        System.out.println("生成的密文--->"+cryptograph);
	        cryptograph = cryptograph.replaceAll("\\+", "%2B");
	        System.out.println("nw:"+cryptograph);
	        
	        String ncryptograph =cryptograph.replaceAll("%2B", "+");
	        System.out.println("nw2:"+ncryptograph);
	        String target = rs.decrypt(ncryptograph);//解密密文
	        System.out.println("解密密文--->"+target);
		  //generateKeyPair();
			    //true  
	  }
	  private static void generateKeyPair() throws Exception{
	      /** RSA算法要求有一个可信任的随机数源 */
	      SecureRandom sr = new SecureRandom();
	      /** 为RSA算法创建一个KeyPairGenerator对象 */
	      KeyPairGenerator kpg = KeyPairGenerator.getInstance("RSA");
	      /** 利用上面的随机数据源初始化这个KeyPairGenerator对象 */
	      kpg.initialize(1024, sr);
	      /** 生成密匙对 */
	      KeyPair kp = kpg.generateKeyPair();
	      /** 得到公钥 */
	      Key publicKey = kp.getPublic();
	      /** 得到私钥 */
	      Key privateKey = kp.getPrivate();
	      /** 用对象流将生成的密钥写入文件 */
	      ObjectOutputStream oos1 = new ObjectOutputStream(new FileOutputStream("D:\\test\\publickey.keystore"));
	      ObjectOutputStream oos2 = new ObjectOutputStream(new FileOutputStream("D:\\test\\privatekey.keystore"));
	      oos1.writeObject(publicKey);
	      oos2.writeObject(privateKey);
	      /** 清空缓存，关闭文件输出流 */
	      oos1.close();
	      oos2.close();
	  }
	  /**
	    * <p>@description :加密</p>
	    *	<p>@version :0.1</p>
	    * <p>@author :liuzl</p>
	    * <p>@Time :2018-04-26</p>
	    * <p>@param source
	    * <p>@return
	    * <p>@throws Exception </p>
	   */
	  public  String encrypt(String source) throws Exception{

	        /** 将文件中的公钥对象读出 */
		   String keyPath = ApplicationContextUtil.getEnvironment().getProperty("cms.license.path")+File.separator+"publickey.keystore";
		   //String keyPath = "D:\\cms8\\license\\publickey.keystore";
	        ObjectInputStream ois = new ObjectInputStream(new FileInputStream(keyPath));
	        Key key = (Key) ois.readObject();
	        ois.close();
	        /** 得到Cipher对象来实现对源数据的RSA加密 */
	        Cipher cipher = Cipher.getInstance("RSA");
	        cipher.init(Cipher.ENCRYPT_MODE, key);
	        byte[] b = source.getBytes();
	        byte[] dataReturn = new byte[]{};
	        /** 执行加密操作 */
            for (int i = 0; i < b.length; i += 100) {  
                byte[] doFinal = cipher.doFinal(ArrayUtils.subarray(b, i,  i + 100));
                dataReturn = ArrayUtils.addAll(dataReturn, doFinal);
            }  
	        return new Base64().encodeToString(dataReturn);
	    }
	  /**
	    * <p>@description :解密</p>
	    *	<p>@version :0.1</p>
	    * <p>@author :liuzl</p>
	    * <p>@Time :2018-04-26</p>
	    * <p>@param cryptograph
	    * <p>@return
	    * <p>@throws Exception </p>
	   */
	  public  String decrypt(String cryptograph) throws Exception{
	        /** 将文件中的私钥对象读出 */
		 String keyPath = ApplicationContextUtil.getEnvironment().getProperty("cms.license.path")+File.separator+"privatekey.keystore";
		// String keyPath = "D:\\cms8\\license\\privatekey.keystore";
	        ObjectInputStream ois = new ObjectInputStream(new FileInputStream(keyPath));
	        Key key = (Key) ois.readObject();
	        ois.close();
	        /** 得到Cipher对象对已用公钥加密的数据进行RSA解密 */
	        Cipher cipher = Cipher.getInstance("RSA");
	        cipher.init(Cipher.DECRYPT_MODE, key);
	        byte[] b1 = new Base64().decode(cryptograph);
	        /** 执行解密操作 */
	        StringBuilder sb = new StringBuilder();  
	        for (int i = 0; i < b1.length; i += 128) {  
                byte[] doFinal = cipher.doFinal(ArrayUtils.subarray(b1, i, i + 128));
                sb.append(new String(doFinal));  
            }  
	   
	        return sb.toString();
	    }
}
