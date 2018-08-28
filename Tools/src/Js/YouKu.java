package Js;

import java.io.FileReader;

import javax.script.Invocable;
import javax.script.ScriptEngine;
import javax.script.ScriptEngineManager;

import com.gargoylesoftware.htmlunit.WebClient;

public class YouKu {

	public static void main(String[] args) {
		//String path=YouKu.class.getName();
		//System.out.println(path);
		//getcomment();
		String key=executeJavaScript(1);
	}
	//获得优酷评论
	public static void getcomment(){
		WebClient client=new WebClient();
		long time=System.currentTimeMillis()/1000;
		String sign=executeJavaScript(time);
		String url="https://p.comments.youku.com/ycp/comment/pc/commentList?app=100-DDwODVkv&objectId=947530569&objectType=1&listType=0&currentPage=2&pageSize=30&sign="+sign+"&time="+time;
		try{
			String txt=client.getPage(url).getWebResponse().getContentAsString();
			System.out.println(txt);
		}catch(Exception e){
			e.printStackTrace();
		}finally{
			client.close();
		}
	}
	/**
	 * 获得当前评论链接
	 * */
	public static String executeJavaScript(long time) {
		int i=1534937950;
		String app="100-DDwODVkv";
		String t="6c4aa6af6560efff5df3c16c704b49f1";
		//100-DDwODVkv&6c4aa6af6560efff5df3c16c704b49f1&1534937950
		String ll=app+"&"+t+"&"+time;
		ScriptEngineManager sem = new ScriptEngineManager();
		ScriptEngine se = sem.getEngineByName("javascript");
		try {
			FileReader reader = new FileReader("src/Js/youku1.js");
			//engine.eval("println('Hello!');");
			se.eval(reader);
		} catch (Exception e) {
			e.printStackTrace();
		}
		String p = null;
		if (se instanceof Invocable) {
			Invocable invoke = (Invocable) se;
			try {
				//p = (String) invoke.invokeFunction("generateSignature", username).toString();
				p = (String) invoke.invokeFunction("o", ll).toString();
				//Object obj=invoke.invokeFunction("o", ll);
				System.out.println(p.replaceAll(",", ""));
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
		return p.replaceAll(",", "");
	}
}
