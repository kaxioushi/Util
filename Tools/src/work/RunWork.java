package work;

import java.io.File;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import byinterface.Url2infoByinterface;
import txtUtil.TxtUtil;

public class RunWork {
	static SimpleDateFormat sdf=new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
	public static void main(String[] args) {
		getFloorByInterface("C:\\Users\\cy0093\\Desktop\\fidder\\养生.txt", "C:\\Users\\cy0093\\Desktop\\fidder\\养生tar.txt");
	}
	//通过接口跑评论
	public static void getFloorByInterface(String path,String tpath){
		List<String> list=TxtUtil.readFile(new File(path), "gbk");
		for(int i=0;i<list.size();i++){
			String str=list.get(i);
			System.out.println(str);
			if(!str.contains("http")){
				continue; 
			}
			try {
				String arr[]=str.split("	");
				System.out.println(arr.length);
				String url=null;
				for(int k=0;k<arr.length;k++){
					TxtUtil.append1(new File(tpath), arr[k]+"\t");
					if(arr[k].contains("http")){
						url=arr[k];
					}
				}
				TxtUtil.append1(new File(tpath),"\r\n");
				System.out.println(i+"\t"+url);

				String txt=Url2infoByinterface.getInfoFromInterface(url,null);
				if(txt==null){
					continue;
				}
				JSONObject json=new JSONObject(txt);
				if(json.has("items")){
					json=json.getJSONObject("items");
					if(json.has("floors")){
						JSONArray jarr=json.getJSONArray("floors");
						for(int j=1;j<jarr.length();j++){
							JSONObject jso=jarr.getJSONObject(j);
							String auther="";
							String date="";
							String con="";
							String like="";
							auther=jso.has("author")?jso.optString("author"):"";
							if(jso.has("t_date")){
								date=sdf.format(new Date(jso.optLong("t_date")));
							}
							con=jso.has("contentText")?jso.optString("contentText").replaceAll("\r|\n|\t", ""):"";
							like=jso.has("c_like")?jso.optString("c_like"):"0";
							TxtUtil.append1(new File(tpath), "\t"+auther+"\t"+date+"\t"+like+"\t"+con+"\r\n"); 
						}
					}
				}
			} catch (JSONException e) {
				e.printStackTrace();
				TxtUtil.append1(new File("C:\\Users\\cy0093\\Desktop\\fidder\\error.txt"), str);
			}
		}
	}
}
