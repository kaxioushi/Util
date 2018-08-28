package OCR;

import java.awt.image.BufferedImage;
import java.io.InputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.Map;

import javax.imageio.ImageIO;

public class ZhongGuoShuiWu extends ImgTell{

	public static void main(String[] args) {
		ZhongGuoShuiWu enty=new ZhongGuoShuiWu();
		//BufferedImage img=enty.getImgByUrl("http://www.ctaxnews.net.cn/dnis/validatecodegen", "", null);
		//enty.saveImg(img, "src/OCR/imgdate/1.jpg");
		//enty.getImg("src/OCR/imgdate/1.jpg");
		BufferedImage img=enty.setGrey(enty.getImg("src/OCR/imgdate/2.jpg"));
		enty.saveImg(enty.clearImg(img), "src/OCR/imgdate/3.jpg");
		
		System.out.println("结束");
	}
	@Override
	public  BufferedImage getImgByUrl(String url,String path,Map<String, String> headers){
		try{
			URL u=new URL(url);
			HttpURLConnection con=(HttpURLConnection)u.openConnection();
			if(headers!=null){
				for(String key:headers.keySet()){
					con.setRequestProperty(key, headers.get(key));
				}
			}
			con.setDoInput(true);
			InputStream in=con.getInputStream();
			BufferedImage img=ImageIO.read(in);
			in.close();
			return img;
		}catch(Exception e){
			e.printStackTrace();
		}
		return null;
	}
}
