package com.gpower.common.utils;

import java.io.*;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * @description:
 * @author: jingff
 * @date: 2019-07-12 9:26
 */
public class ReadLog {

    public static void main(String[] args) {

String  filename="E:/残联apache日志文件/rizhi2015-2019/weblogs1/20190228_rs_access_log";
File  file=new  File(filename);
        BufferedReader br = null;
if(!file.exists()){


}else {


    try {

        br = new BufferedReader(new FileReader(filename));
        String s;


      /*  while ( s!= null&&s.matches("(.*)https?://")) {*/
       /* https{0,1}://[^\x{4e00}-\x{9fa5}\n\r\s]{3,}*/
        while((s = br.readLine())!=null){
           /* System.out.println(s);*/
           if(s.contains("htm")) {

               /* System.out.println(s+"______________________________-");*/
               /* Pattern  ipPattern=Pattern.compile("((2(5[0-5]|[0-4]\\\\d))|[0-1]?\\\\d{1,2})" +
                        "(\\\\.((2(5[0-5]|[0-4]\\\\d))|[0-1]?\\\\d{1,2})){3}");*/
               Pattern ipPattern = Pattern.compile("(2[0-4]\\d|25[0-5]|[01]\\d\\d|\\d\\d|\\d)\\." +
                       "(2[0-4]\\d|25[0-5]|[01]\\d\\d|\\d\\d|\\d)\\.(2[0-4]\\d|25[0-5]|[01]\\d\\d|\\d\\d|\\d)\\.(2[0-4]\\d|25[0-5]|[01]\\d\\d|\\d\\d|\\d)");
               Matcher matcher = ipPattern.matcher(s);
               StringBuffer sb = new StringBuffer();
               while (matcher.find()) {
                   String group = matcher.group();
                     /*ip地址为*/
               }

           }

          /*  }*/
       /*  if(!s.contains("htm")){

       }*/
        }
    } catch (FileNotFoundException e) {
        e.printStackTrace();
    } catch (IOException e) {
        e.printStackTrace();
    }finally {
        try {
            br.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }


}}}




