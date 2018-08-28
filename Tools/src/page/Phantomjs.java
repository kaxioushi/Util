package page;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;

public class Phantomjs {

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		getAjaxContent("D:\\phantomjs-1.9.2-windows\\phantomjs.exe", "src\\page\\phantomjstest.js", "https://www.douyin.com/share/user/86519255991");
	}
	/**
	 1 var system=require(��system��); //���ϵͳ�������󣬰��������в�����phantomjsϵͳ���õ���Ϣ

2 var page = require(��webpage��); //��ȡ����dom��web��ҳ�Ķ���ͨ�������Դ���ҳ��������ҳ�� �ݡ�request��response��������Ϊ����Ķ���

3 var fs = require(��fs��); //��ȡ�ļ�ϵͳ����ͨ�������Բ�������ϵͳ���ļ�����������read��write�� move��copy��delete��
	 * */
	//ͨ����js�ں˵ļ���  ��ִ��js
	public static String getAjaxContent(String phamtomjspath,String jsPath,String url){
		Runtime rt=Runtime.getRuntime();
		try {
			Process p=rt.exec(phamtomjspath+" "+jsPath+" "+url);
			//Process p = rt.exec("phantomjs.exe c:/phantomjs/codes.js "+url);//�����ҵ�codes.js�Ǳ�����c�������phantomjsĿ¼
			InputStream is=p.getInputStream();
			BufferedReader br=new BufferedReader(new InputStreamReader(is));
			StringBuffer buff=new StringBuffer();
			String temp=null;
			while(null!=(temp=br.readLine())){
				buff.append(temp);
			}
			System.out.println(buff.toString());
			return buff.toString();
		} catch (IOException e) {
			e.printStackTrace();
		}
		return null;
	}
}
