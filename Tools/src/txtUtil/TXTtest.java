package txtUtil;

import java.io.File;
import java.io.IOException;
import java.net.URL;
import java.util.List;

import org.json.JSONObject;

import com.gargoylesoftware.htmlunit.StringWebResponse;
import com.gargoylesoftware.htmlunit.WebClient;
import com.gargoylesoftware.htmlunit.html.HTMLParser;
import com.gargoylesoftware.htmlunit.html.HtmlElement;
import com.gargoylesoftware.htmlunit.html.HtmlPage;

import byinterface.Url2infoByinterface;

public class TXTtest {

	public static void main(String[] args) {
		String html=TxtUtil.txt2String(new File("C:\\Users\\cy0093\\Desktop\\fidde\\1.txt"), "GBK");
		//System.out.println(html);
		WebClient client=new WebClient();
		client.getOptions().setJavaScriptEnabled(false);
		try {
			StringWebResponse webResponse = new StringWebResponse(html, new URL("https://www.baidu.com/"));
			HtmlPage page = HTMLParser.parseHtml(webResponse, client.getCurrentWindow());
			List<HtmlElement> list=page.getDocumentElement().getElementsByAttribute("strong", "class", "profile_nickname");
			for(int i=0;i<list.size();i++){
				System.out.println(i+"\t"+list.get(i).asText());
			}
			list=page.getDocumentElement().getElementsByTagName("script");
			for(int i=0;i<list.size();i++){
				String txt=list.get(i).asXml();
				//System.out.println(i+"\t"+txt);
				if(txt.contains("msgList")){
					txt=txt.substring(txt.indexOf("msgList =")+11,txt.lastIndexOf("if(!!window.__initCatch)")-2);
					txt=txt.substring(0, txt.lastIndexOf("';")-2);
					txt=txt.replaceAll("&quot;|\\w+:,", "");
					JSONObject json=new JSONObject(txt);
					System.out.println(txt);
				}
			}
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}finally{
			client.close();
		}
	}

}
