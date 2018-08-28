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
	//����
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
	//�������
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
            //����http��������
//            connection.setDoOutput(true);// http�����ڣ������Ҫ��Ϊtrue, Ĭ���������false;
//            connection.setDoInput(true);// �����Ƿ��httpUrlConnection���룬Ĭ���������true;
            connection.setRequestMethod("GET");; // ���Ը�����Ҫ �ύ GET��POST��DELETE��PUT��http�ṩ�Ĺ���
            //connection.setUseCaches(false);//���û��棬ע���������󷽷�Ϊpost�����û���
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
            connection.setConnectTimeout(3000);  //��������������ʱ����λ�����룩  
            connection.setReadTimeout(2000);     //���ô�������ȡ���ݳ�ʱ����λ�����룩  
            connection.connect();
            /**
             *
               // �����������淢������
            if (Json != null && !TextUtils.isEmpty(Json)) {
                byte[] writebytes = Json.getBytes();
                // �����ļ�����
                conn.setRequestProperty("Content-Length", String.valueOf(writebytes.length));
                OutputStream outwritestream = conn.getOutputStream();
                outwritestream.write(Json.getBytes());//json��������
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
        //��������
        URL url = new URL(path);
        HttpURLConnection connection ;
        StringBuffer sbuffer=null;
        try {
	    //��� ��������
            connection= (HttpURLConnection) url.openConnection();
            //����http��������
            connection.setDoOutput(true);// http�����ڣ������Ҫ��Ϊtrue, Ĭ���������false;
            connection.setDoInput(true);// �����Ƿ��httpUrlConnection���룬Ĭ���������true;
            connection.setRequestMethod("PUT"); // ���Ը�����Ҫ �ύ GET��POST��DELETE��PUT��http�ṩ�Ĺ���
            //connection.setUseCaches(false);//���û��棬ע���������󷽷�Ϊpost�����û���
            // connection.setInstanceFollowRedirects(true);

            connection.setRequestProperty("Host", "*******");  //������ ��ķ�������ַ������������***.**.***.***
            connection.setRequestProperty("Content-Type", " application/json");//�趨 �����ʽ json��Ҳ�����趨xml��ʽ��
            connection.setRequestProperty("Accept-Charset", "utf-8");  //���ñ�������
            connection.setRequestProperty("X-Auth-Token", "token");  //���������token
            connection.setRequestProperty("Connection", "keep-alive");  //�������ӵ�״̬
            connection.setRequestProperty("Transfer-Encoding", "chunked");//���ô������
connection.setRequestProperty("Content-Length", obj.toString().getBytes().length + ""); //�����ļ�����ĳ���  
            connection.setReadTimeout(10000);//���ö�ȡ��ʱʱ��          
            connection.setConnectTimeout(10000);//�������ӳ�ʱʱ��           
            connection.connect();            
            OutputStream out = connection.getOutputStream();//����������д�����ݣ���Щ���ݽ��浽�ڴ滺������          
            out.write(obj.toString().getBytes());            //out.write(new String("��������").getBytes());            //ˢ�¶�������������κ��ֽڶ�д��Ǳ�ڵ�����       
            out.flush();     
            // �ر�������,��ʱ������������������д���κ����ݣ���ǰд������ݴ������ڴ滺������          
            out.close();           
            //��ȡ��Ӧ           
            if (connection.getResponseCode()==200)            {
                // �ӷ��������һ��������
InputStreamReader inputStream =new InputStreamReader(connection.getInputStream());//����HttpURLConnection���Ӷ����getInputStream()����, ���ڴ滺�����з�װ�õ�������HTTP������ķ��͵�����ˡ�
BufferedReader reader = new BufferedReader(inputStream);  
		String lines;                
		sbuffer= new StringBuffer("");  
  		while ((lines = reader.readLine()) != null) {                
			lines = new String(lines.getBytes(), "utf-8");                    
			sbuffer.append(lines);                }                
			reader.close();         
 	   }else{          
		        Log.i(TAG,"����ʧ��"+connection.getResponseCode());    
        	}    
		//�Ͽ�����           
 		connection.disconnect();    
 	} catch (IOException e) {  
         	 e.printStackTrace();     
     }   
 }
json����
public  static String QueryLoginBody(String type,String userid,String checksum){
    String json="{\"type\":\""+type+"\","+"\"jid\":\""+userid+"\","+"\"checkSum\":\""+checksum+"\"}";
    return json;
}
���÷���,����Ҫ����Ĳ�����Ȼ��ֱ�Ӱ�json���ݷŽ�ȥ�ͺ���
String json=AppUtils.QueryLoginBody("login","usr","123132");
AppUtils.getUploadInformation("http://www.xxx.com", json);
 
 * */
