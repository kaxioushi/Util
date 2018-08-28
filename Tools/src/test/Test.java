package test;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.net.URLEncoder;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import txtUtil.TxtUtil;


public class Test {

	public static void main(String[] args) {
		List<String> list=TxtUtil.readFile(new File("C:\\Users\\cy0093\\Desktop\\苏宁易购\\股市教练.txt"), "GBK");
		for(String str:list){
			System.out.println(str);
		}
//		System.out.println("?".getBytes().length); // \u29100
//	    System.out.println("?".toCharArray().length);
////	    System.out.println("?".toCharArray()[0]);
////	    System.out.println("?".toCharArray()[1]);
//	    System.out.println("A".getBytes().length); // \u4E2D
//	    System.out.println("涓�".toCharArray().length);
	    test4();
	}
	public static void test7(){
		String url="GET /aweme/v1/challenge/search/?cursor=0&keyword=%E9%9C%89%E5%8F%98+%E5%9C%A3%E5%85%83&count=10&ts=1529571351&app_type=normal&os_api=22&device_type=Lenovo%20K50-t5&device_platform=android&ssmix=a&iid=36041042890&manifest_version_code=187&dpi=480&uuid=867200020997795&version_code=187&app_name=aweme&version_name=1.8.7&openudid=6e14efa807a81222&device_id=54100975497&resolution=1080*1920&os_version=5.1&language=zh&device_brand=Lenovo&ac=wifi&update_version_code=1872&aid=1128&channel=wandouji";
		Matcher ma=Pattern.compile("keyword=(.*)(&offset=0)?&count=10").matcher(url);
		if(ma.find()){
			test8(ma.group(1));
		}
	}
	public static void test6(String keyWord){
		try {
			System.out.println(URLEncoder.encode(keyWord, "UTF-8"));
		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
		}
	}
	public static void test8(String keyWord){
		try {
			System.out.println(URLDecoder.decode(keyWord, "UTF-8"));
		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
		}
	}
	public static void test5(){
		for(int i=0;i<3;i++){
			System.out.println(i);
		}
	}
	public static void test4(){
		try {
			String txt=URLEncoder.encode("閮戝窞甯�", "UTF-8");
			System.out.println(txt);
			
		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
		}
	}
	public static void test3(){
		SimpleDateFormat sdf=new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		System.out.println(sdf.format(new Date(1527800456000L)));//1533459839
	}
	public static void test2(){
		double dp=Double.parseDouble("13.3");
		System.out.println(dp);
	}
	public static void test1(){
		try {
			FileReader reader = new FileReader("C:\\Users\\cy0093\\Desktop\\鎶栭煶\\BY.js");
			System.out.println(reader);
		} catch (FileNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}

}
