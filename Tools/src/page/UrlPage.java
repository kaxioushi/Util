package page;

import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.zip.GZIPInputStream;

import org.apache.commons.io.IOUtils;

public class UrlPage {

	public static void main(String[] args) {
		String url="";
		url="http://c.miaopai.com/1/recommend/cateChannel.json?vend=miaopai&dpi=480&userId=&token=&carrier=%E7%A7%BB%E5%8A%A8&withExtend=1&idfa=&timestamp=1526024691545&lastUpdateTime=1526024691540&plat=android&cpu=AArch64&facturer=Xiaomi&imei=865903032759846&version=6.7.90&udid=4A93E85858B84EF089C1D45E6B9606F3&vOs=6.0&pName=com.yixia.videoeditor&channel=xiaomi_phone&page=1&type=up&vName=6.7.90&kg_udid=220077276E13F367B037BCA24988506C&vApp=65227&cateid=237&platformId=1&mac=EC:D0:9F:F2:5E:AB&refresh=1&weiboUid=&net=1&density=3.0&appName=%E7%A7%92%E6%8B%8D&os=android&network=WIFI&sessionid=7cdedc607265a314dfb628987b0674dc&abId=50-103&brand=Xiaomi&unique_id=027c0095-2b98-3205-8d2c-f38d4c06b4f7&ip=43.224.47.184&resolution=1080x1920&pcId=xiaomi_phone&devId=BF00C2EE438C0841D27C6D83FE2D7BB1&model=Redmi_Note_4X&partnerId=1";
		InputStream in=getStream(url);
		String txt=getStr(in, "iso-8859-1");
		System.out.println(txt);
	}
	//解码
	public static String getUnZip(InputStream inStream,String charset){
		StringBuffer sb = new StringBuffer();
		try{
			InputStream stream = new GZIPInputStream(inStream);  
			BufferedReader reader = new BufferedReader(new InputStreamReader(stream,charset));  
			String line = "";  
			while ((line = reader.readLine()) != null){  
				sb.append(line);  
			} 
			/**
			 String str = IOUtils.toString(stream,"utf-8");
			 * */
			sb.append(IOUtils.toString(inStream,"utf-8"));
		}catch(Exception e){
			e.printStackTrace();
		}
		
		return sb.toString();
	}
	//解决乱码
	public static String getStr(InputStream inStream,String charset){
		StringBuffer sb = new StringBuffer("");  
		try{
			BufferedReader in = new BufferedReader(new InputStreamReader(inStream, charset));  
			String line = "";  
			while ((line = in.readLine()) != null){  
				sb.append(line);  
			}  
			return sb.toString();
		}catch(Exception e){
			e.printStackTrace();
		}
		return null;
	}
	public static InputStream getStream(String path){
		try {
			URL url=new URL(path);
			HttpURLConnection connection ;
	        StringBuffer sbuffer=new StringBuffer();
	        connection= (HttpURLConnection) url.openConnection();
            //设置http连接属性
//            connection.setDoOutput(true);// http正文内，因此需要设为true, 默认情况下是false;
//            connection.setDoInput(true);// 设置是否从httpUrlConnection读入，默认情况下是true;
            connection.setRequestMethod("GET");; // 可以根据需要 提交 GET、POST、DELETE、PUT等http提供的功能
            //connection.setUseCaches(false);//设置缓存，注意设置请求方法为post不能用缓存
            // connection.setInstanceFollowRedirects(true);
            connection.setRequestProperty("sign","d9bc24c309c04f9109fe3965f7f708b2");  
            connection.setRequestProperty("User-Agent","Miaopai/6.7.90/65227/xiaomi_phone(Xiaomi_Redmi_Note_4X_23)");  
            connection.setRequestProperty("Host","c.miaopai.com");  
            connection.setRequestProperty("Connection","Keep-Alive");  
            //connection.setRequestProperty("Accept-Encoding","gzip");  
            connection.setDoInput(true);
            connection.setDoOutput(false);
            connection.setUseCaches(false);
            connection.setRequestProperty("Connection", "close"); 
            connection.setConnectTimeout(3000);  //设置连接主机超时（单位：毫秒）  
            connection.setReadTimeout(2000);     //设置从主机读取数据超时（单位：毫秒）  
            connection.connect();
            /**
             *
               // 往服务器里面发送数据
            if (Json != null && !TextUtils.isEmpty(Json)) {
                byte[] writebytes = Json.getBytes();
                // 设置文件长度
                conn.setRequestProperty("Content-Length", String.valueOf(writebytes.length));
                OutputStream outwritestream = conn.getOutputStream();
                outwritestream.write(Json.getBytes());//json类型数据
                outwritestream.flush();
                outwritestream.close();
             * */
           return  connection.getInputStream();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}
}
/**
 public static void getUploadInformation(String  path,String obj) throws IOException, JSONException {
        //创建连接
        URL url = new URL(path);
        HttpURLConnection connection ;
        StringBuffer sbuffer=null;
        try {
	    //添加 请求内容
            connection= (HttpURLConnection) url.openConnection();
            //设置http连接属性
            connection.setDoOutput(true);// http正文内，因此需要设为true, 默认情况下是false;
            connection.setDoInput(true);// 设置是否从httpUrlConnection读入，默认情况下是true;
            connection.setRequestMethod("PUT"); // 可以根据需要 提交 GET、POST、DELETE、PUT等http提供的功能
            //connection.setUseCaches(false);//设置缓存，注意设置请求方法为post不能用缓存
            // connection.setInstanceFollowRedirects(true);

            connection.setRequestProperty("Host", "*******");  //设置请 求的服务器网址，域名，例如***.**.***.***
            connection.setRequestProperty("Content-Type", " application/json");//设定 请求格式 json，也可以设定xml格式的
            connection.setRequestProperty("Accept-Charset", "utf-8");  //设置编码语言
            connection.setRequestProperty("X-Auth-Token", "token");  //设置请求的token
            connection.setRequestProperty("Connection", "keep-alive");  //设置连接的状态
            connection.setRequestProperty("Transfer-Encoding", "chunked");//设置传输编码
connection.setRequestProperty("Content-Length", obj.toString().getBytes().length + ""); //设置文件请求的长度  
            connection.setReadTimeout(10000);//设置读取超时时间          
            connection.setConnectTimeout(10000);//设置连接超时时间           
            connection.connect();            
            OutputStream out = connection.getOutputStream();//向对象输出流写出数据，这些数据将存到内存缓冲区中          
            out.write(obj.toString().getBytes());            //out.write(new String("测试数据").getBytes());            //刷新对象输出流，将任何字节都写入潜在的流中       
            out.flush();     
            // 关闭流对象,此时，不能再向对象输出流写入任何数据，先前写入的数据存在于内存缓冲区中          
            out.close();           
            //读取响应           
            if (connection.getResponseCode()==200)            {
                // 从服务器获得一个输入流
InputStreamReader inputStream =new InputStreamReader(connection.getInputStream());//调用HttpURLConnection连接对象的getInputStream()函数, 将内存缓冲区中封装好的完整的HTTP请求电文发送到服务端。
BufferedReader reader = new BufferedReader(inputStream);  
		String lines;                
		sbuffer= new StringBuffer("");  
  		while ((lines = reader.readLine()) != null) {                
			lines = new String(lines.getBytes(), "utf-8");                    
			sbuffer.append(lines);                }                
			reader.close();         
 	   }else{          
		        Log.i(TAG,"请求失败"+connection.getResponseCode());    
        	}    
		//断开连接           
 		connection.disconnect();    
 	} catch (IOException e) {  
         	 e.printStackTrace();     
     }   
 }
json数据
public  static String QueryLoginBody(String type,String userid,String checksum){
    String json="{\"type\":\""+type+"\","+"\"jid\":\""+userid+"\","+"\"checkSum\":\""+checksum+"\"}";
    return json;
}
调用方法,输入要传入的参数，然后直接把json数据放进去就好了
String json=AppUtils.QueryLoginBody("login","usr","123132");
AppUtils.getUploadInformation("http://www.xxx.com", json);
 
 * */
