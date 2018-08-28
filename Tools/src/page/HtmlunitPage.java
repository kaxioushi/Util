package page;

import java.io.IOException;
import java.net.MalformedURLException;
import java.net.URL;

import com.gargoylesoftware.htmlunit.BrowserVersion;
import com.gargoylesoftware.htmlunit.FailingHttpStatusCodeException;
import com.gargoylesoftware.htmlunit.Page;
import com.gargoylesoftware.htmlunit.WebClient;
import com.gargoylesoftware.htmlunit.WebRequest;
import java.util.List;

import com.gargoylesoftware.htmlunit.BrowserVersion;
import com.gargoylesoftware.htmlunit.FailingHttpStatusCodeException;
import com.gargoylesoftware.htmlunit.NicelyResynchronizingAjaxController;
import com.gargoylesoftware.htmlunit.Page;
import com.gargoylesoftware.htmlunit.ScriptResult;
import com.gargoylesoftware.htmlunit.WebClient;
import com.gargoylesoftware.htmlunit.html.HtmlElement;
import com.gargoylesoftware.htmlunit.html.HtmlPage;

public class HtmlunitPage {

	public static void main(String[] args) {
		String url="http://c.miaopai.com/1/recommend/cateChannel.json?vend=miaopai&dpi=480&userId=&token=&carrier=%E8%81%94%E9%80%9A&withExtend=1&idfa=&timestamp=1522158847101&lastUpdateTime=1522158847033&plat=android&cpu=ARMv7&facturer=samsung&imei=359786058632465&version=6.7.90&udid=5A0B6E771E258C7E68A2E492F4BBA12A&vOs=5.0&pName=com.yixia.videoeditor&channel=mobile360_market&page=1&type=up&vName=6.7.90&kg_udid=EC8A01EDF7757CFDB3186855E7A8FB6D&vApp=65227&cateid=128&platformId=1&mac=F0:25:B7:DE:18:D8&refresh=1&weiboUid=&net=1&density=3.0&appName=%E7%A7%92%E6%8B%8D&os=android&network=WIFI&sessionid=42a512a89bbe2bfd0eacdb445b68b96c&abId=50-103&brand=samsung&unique_id=3f979087-f5e9-363b-a55f-73c976f1d9a1&ip=43.224.45.109&resolution=1080x1920&pcId=mobile360_market&devId=4D640AF57C7D22AEFC79EA86DCD69CF9&model=SM-N9006&partnerId=1";
		getPage(url);
	}
	//��ͨ������
	public static void getPage(String url){
		WebClient  client=new WebClient(BrowserVersion.CHROME);
		Page page;
		try {
			page = client.getPage(url);
			String txt=page.getWebResponse().getContentAsString();
			System.out.println(txt);
		} catch (FailingHttpStatusCodeException e) {
			e.printStackTrace();
		} catch (MalformedURLException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	//执行js
	public static  void actionJS(String url){
		WebClient client=new WebClient(BrowserVersion.CHROME);
		client.getOptions().setJavaScriptEnabled(true);//����JS
		client.getOptions().setUseInsecureSSL(true);//����ssl��֤
		client.getOptions().setCssEnabled(false);//����CSS ����css������Ⱦ
		//client.getOptions().setThrowExceptionOnScriptError(false);//���д���ʱ�� ���׳��쳣
		client.setAjaxController(new NicelyResynchronizingAjaxController());//����ajax�첽
		try{
			HtmlPage page=client.getPage(url);
			List<HtmlElement> li=page.getDocumentElement().getElementsByTagName("h1");
			for(int i=0;i<li.size();i++){
				System.out.println(li.get(i).asXml());
			}
			client.waitForBackgroundJavaScript(1000);
			String js="var div=document.getElementById(\"BAIDU_DUP_fp_wrapper\");div.setAttribute(\"class\", \"newDiv\");div.innerHTML = \"js ��̬���div\";";
		
			ScriptResult s = page.executeJavaScript(js);//ִ��js����  
			HtmlPage hpm=(HtmlPage) s.getNewPage();//���ִ�к����page����    
			System.out.println(hpm.asXml());
            client.waitForBackgroundJavaScript(1000); 
            HtmlElement ele=hpm.getHtmlElementById("BAIDU_DUP_fp_wrapper");
           // System.out.println(ele.asXml());
            List<HtmlElement> list=hpm.getDocumentElement().getElementsByAttribute("div", "id", "BAIDU_DUP_fp_wrapper");
            for(int i=0;i<list.size();i++){
            	System.out.println(list.get(i).asXml());
            }
		}catch(Exception e){
			e.printStackTrace();
		}
	}
	//执行抖音JS
	//执行js
		public static  void actionDouYInJS(String url){
			WebClient client=new WebClient(BrowserVersion.CHROME);
			client.getOptions().setJavaScriptEnabled(true);//����JS
			client.getOptions().setUseInsecureSSL(true);//����ssl��֤
			client.getOptions().setCssEnabled(false);//����CSS ����css������Ⱦ
			//client.getOptions().setThrowExceptionOnScriptError(false);//���д���ʱ�� ���׳��쳣
			client.setAjaxController(new NicelyResynchronizingAjaxController());//����ajax�첽
			try{
				HtmlPage page=client.getPage(url);
				
				String js="__M.require('douyin_falcon:page/reflow_user/index').init({ uid: \"86519255991\" });";
				ScriptResult s = page.executeJavaScript(js);//ִ��js����  
				HtmlPage hpm=(HtmlPage) s.getNewPage();//���ִ�к����page����    
				System.out.println(hpm.asXml());
	            client.waitForBackgroundJavaScript(1000); 
	            HtmlElement ele=hpm.getHtmlElementById("BAIDU_DUP_fp_wrapper");
	           // System.out.println(ele.asXml());
	            List<HtmlElement> list=hpm.getDocumentElement().getElementsByAttribute("div", "id", "BAIDU_DUP_fp_wrapper");
	            for(int i=0;i<list.size();i++){
	            	System.out.println(list.get(i).asXml());
	            }
			}catch(Exception e){
				e.printStackTrace();
			}
		}
}
