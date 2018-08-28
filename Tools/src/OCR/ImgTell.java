package OCR;

import java.awt.Color;
import java.awt.image.BufferedImage;
import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.nio.Buffer;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.imageio.ImageIO;

import org.apache.poi.hssf.util.HSSFColor.RED;

public class ImgTell {
	/**
	模拟登陆中国税务报
	http://www.ctaxnews.net.cn/dnis/index.jsp  登陆页面
	 * */
	public static void main(String[] args) {
		// TODO Auto-generated method stub
	}
	
	//通过网页链接获得图片
	/**
	 url 图片链接
	 path 图片保存位置
	 * */
	public  BufferedImage getImgByUrl(String url,String path,Map<String, String> headers){
		BufferedImage img=null;
		try {
			URL u=new URL(url.trim());
			HttpURLConnection con=(HttpURLConnection)u.openConnection();
			//con.setRequestProperty("", "");
			for(String key:headers.keySet()){
				con.setRequestProperty(key, headers.get(key));
			}
			con.connect();
			if(con.getResponseCode()==200){
				con.setDoInput(true);
				InputStream in=con.getInputStream();
				
				//通过流保存图片
				if(path!=null){
					OutputStream out=new BufferedOutputStream(new FileOutputStream(new File(path)));
					int len=0;
					byte[] buff=new byte[1024*10];//10K缓冲流  是自己内存大小而定
					while(-1!=(len=new BufferedInputStream(in).read(buff))){
						out.write(buff,0,len);//将图片数组内容写入到图片文件
					}
					con.disconnect();
					out.close();
				}
				img=ImageIO.read(in);
				in.close();
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return img;
	}
	//保存img
	public boolean saveImg(BufferedImage img,String path){
		try {
			ImageIO.write(img, "jpg", new File(path));
			return true;
		} catch (IOException e) {
			e.printStackTrace();
		}
		return false;
	}
	//读取图片
	public BufferedImage getImg(String path){
		try {
			return ImageIO.read(new File(path));
		} catch (IOException e) {
			e.printStackTrace();
		}
		return null;
	}
	//获得灰度值
	public int filterRGB(int rgb) {
		int a = rgb & 0xff000000;//将最高位（24-31）的信息（alpha通道）存储到a变量
		int r = (rgb >> 16) & 0xff;//取出次高位（16-23）红色分量的信息
		int g = (rgb >> 8) & 0xff;//取出中位（8-15）绿色分量的信息
		int b = rgb & 0xff;//取出低位（0-7）蓝色分量的信息
		rgb = (r * 77 + g * 151 + b * 28) >> 8; // NTSC luma，算出灰度值
		return a | (rgb << 16) | (rgb << 8) | rgb;//将灰度值送入各个颜色分量
	}
	//灰度化图片
	public BufferedImage setGrey(BufferedImage img){
		int w=img.getWidth();
		int h=img.getHeight();
		for(int i=0;i<h;i++){
			for(int j=0;j<w;j++){
				int c=img.getRGB(j, i);//此处得到的是负值
//				int r = (c & 16711680) >> 16;
//				int g = (c & 65280) >> 8;
//				int b = (c & 255);
				img.setRGB(j, i, filterRGB(c));
				//System.out.print(r+g+b+"\t");
			}
			//System.out.println();
		}
		return img;		
	}
	//降噪  降噪算法 有问题
	public BufferedImage clearImg(BufferedImage img){
		int w=img.getWidth();
		int h=img.getHeight();
		for(int i=0;i<h;i++){
			for(int j=0;j<w;j++){
				int c=img.getRGB(j, i);//此处得到的是负值
				int r = (c & 16711680) >> 16;
				int g = (c & 65280) >> 8;
				int b = (c & 255);
				int count=r+g+b;
				if(count>450){
					img.setRGB(j, i, new Color(255,255,255).getRGB());
				}else{
					img.setRGB(j, i, new Color(0,0,0).getRGB());
				}
				
				//System.out.print(r+g+b+"\t");
			}
			//System.out.println();
		}
		return img;
	}
	//竖向切割图片
	public List<BufferedImage> subXImg(BufferedImage img){
		List<BufferedImage> imgs=new ArrayList<BufferedImage>();
		//竖向切割
		int w=img.getWidth();
		int h=img.getHeight();
		int star=0;
		for(int i=0;i<w;i++){
			boolean flag=true;
			for(int j=0;j<h;j++){
				int v=getValue(img.getRGB(i, j));
				if(v<100){
					flag=false;
					break;
				}
			}
			if(flag){
				if(w-star>3){//里面有有效数字
					BufferedImage temp=img.getSubimage(star, 0, w-star, h);///前两个值是坐标位置X、Y，后两个是长和宽
					imgs.add(subYImg(temp));
				}
				star=w;
			}
		}
		return imgs;
	}
	//竖向切割图片  避免碰到i j这样的字母  从上下两头切割
	public BufferedImage subYImg(BufferedImage img){
		int w=img.getWidth();
		int h=img.getHeight();
		int star=0;int end=h;
		star:for(int i=0;i<h;i++ ){
			for(int j=0;j<w;j++){
				int v=getValue(img.getRGB(j, i));
				if(v<100){
					star=i;
					break star;
				}
			}
		}
		end:for(int i=h;i<h;i-- ){
			for(int j=0;j<w;j++){
				int v=getValue(img.getRGB(j, i));
				if(v<100){
					end=i;
					break end;
				}
			}
		}
		if(end>star){
			return img.getSubimage(0, star, w, end-star);
		}
		return null;
	}
	//获得该像素的RGB总和
	public int getValue(int c){
		int r = (c & 16711680) >> 16;
		int g = (c & 65280) >> 8;
		int b = (c & 255);
		return r+b+g;
	}
	/**
	 一个构思 
	去掉像素数最多的背景像素  
	有效数字每个像素都是连续的  将连续的像素保存 不连续的去掉 剩下的就是连续的有效的图片 
	 再对图片进行切割
	 从而进行识别
	 * */
	public BufferedImage clearImg1(BufferedImage img){
		int back=getValue(getBcakcolorRGB(img));
		for(int i=0;i<=img.getWidth();i++){
			for(int j=0;j<img.getHeight();j++){
				int v=getValue(img.getRGB(i, j));
				if(Math.abs(back-v)<5){
					img.setRGB(i, j, new Color(255,255,255).getRGB());
					continue;
				} 
				int coun=0;
				if(i-1>0){}
			}
		}
		
		return null;
	}
	//得到背景像素的像素点的RGB值
	public int getBcakcolorRGB(BufferedImage img){
		Map<Integer, Integer> map=new HashMap<Integer, Integer>();
		for(int i=0;i<img.getWidth();i++){
			for(int j=0;j<img.getHeight();j++){
				int v=img.getRGB(i, j);
				if(map.get(v)!=null){
					int val=map.get(v);
					val++;
					map.put(v, val);
				}else{
					map.put(v, 1);
				}
			}
		}
		int max=0;
		int back=0;
		for(Integer key:map.keySet()){
			int count=map.get(key);
			if(count>max){
				max=count;
				back=key;
			}
		}
		return back;
	}
	
}
