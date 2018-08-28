package urlUtil;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;



public class URLUtil {
	public static void main(String[] args) {
		String txt=getTell("鍌婚��");
		System.out.println(txt);
	}
	//正负面分析
	public static String getTell(String txt) {
		for(int i=0;i<4;i++) {
			try {
				URL url=new URL("http://nlp.oaqi.com/nlp/sNpDic.jgi?dic=19&type=");
				HttpURLConnection con = (HttpURLConnection) url.openConnection();
				con.setRequestMethod("POST");
				con.setRequestProperty("Accept", "application/json, text/javascript, */*; q=0.01");
				con.setRequestProperty("Accept-Encoding", "gzip, deflate");
				con.setRequestProperty("Accept-Language", "zh-CN,zh;q=0.9");
				con.setRequestProperty("Connection", "keep-alive");
				con.setRequestProperty("Content-Type", "text/plain; charset=UTF-8");
				con.setRequestProperty("Cookie", "AdminDepartment=; AdminPerm=dd; AdminUserName=%CE%BB%BE%FC%CC%CE; AdminProjMask=%2A; AdminID=1819; AdminLevel=9; adminuid=weijuntao; _sgn=1513595732417");
				con.setRequestProperty("Host", "nlp.oaqi.com");
				con.setRequestProperty("Origin", "http://nlp.oaqi.com");
				con.setRequestProperty("Referer", "http://nlp.oaqi.com/nlp/");
				con.setRequestProperty("User-Agent", "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.84 Safari/537.36");
				//con.setRequestProperty(IJSONReader.JSONCLASSNAME, "nlp.oaqi.com");
				con.setInstanceFollowRedirects(false); 
				con.setDoInput(true);
				con.setDoOutput(true);
				con.connect();
				OutputStream out = con.getOutputStream();
//				if (false) {//是否是压缩数据
//					out = new GZIPOutputStream(out);
//				}
				out.write(txt.getBytes("UTF-8"));
				out.flush();
				out.close();
				con.disconnect();
				InputStream in=con.getInputStream();
				BufferedReader bufferedReader = new BufferedReader(
						 new InputStreamReader(in));
				String str=null;
				StringBuffer buff=new StringBuffer();
				while((str=bufferedReader.readLine())!=null) {
					buff.append(str);
				}
				System.out.println(buff.toString());
				return buff.toString();
			} catch (IOException e) {
				e.printStackTrace();
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
		return null;
	}
	
}
