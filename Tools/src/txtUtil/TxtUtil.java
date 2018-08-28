package txtUtil;
/**
 * 涓昏鐢ㄤ簬鏂囨湰鐨勮鍙�  涓�浜涘叾浠栫殑涔熻兘璇诲彇
 * */

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.FileWriter;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.io.RandomAccessFile;
import java.util.ArrayList;
import java.util.List;

public class TxtUtil {
	public static  void main(String[] args) {
		
	}
	public static List<File> getFiles(String path) {
		List<File> list=new ArrayList<File>();
		File file=new File(path);
		if(!file.exists()) {return null;}
		if(file.isFile()) {
			list.add(file);
		}
		if(file.isDirectory()) {
			File[] fils=file.listFiles();
			for(File f:fils) {
				list.add(f);
			}
		}
		return list;
	}
	//璇诲彇鏂囦欢鏂规硶 鎸夎璇诲彇  鎸夋寚瀹氱紪鐮佽鍙� 鏂囨湰缂栫爜涓篏BK
	public static List<String> readFile(File file,String encod){
		List<String> list=new ArrayList<String>();
		if(!file.exists())return list;
		BufferedReader read=null;
		try {
			read=new BufferedReader(new InputStreamReader(new FileInputStream(file),encod));//鏂囨湰涓�鑸负GBK
			String str=null;
			while((str=read.readLine())!=null){
				list.add(str);
			}
			read.close();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return list;
	}
	public static String txt2String(File file,String encod){
		StringBuffer buf=new StringBuffer();
		//buf.append("\n\r");
		BufferedReader read=null;
		try {
			read=new BufferedReader(new InputStreamReader(new FileInputStream(file),encod));//鏂囨湰涓�鑸负GBK
			String str=null;
			while((str=read.readLine())!=null){
				//buf.append(str+"\r\n");
				buf.append(str);
				//System.out.println(str);
			}
			read.close();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return buf.toString();
	}
	//鎶婁竴涓枃浠惰拷鍔犲埌鍙︿竴涓枃浠朵腑
	public static void fIle2File(File comfile,File targetfile,String encod) {
		List<String> list=readFile(comfile, encod);
		for(int i=0;i<list.size();i++) {
			String str=list.get(i);
			append1(targetfile, str);
		}
	}
	//杩藉姞鍐呭
	public static void append1(File file, String conent) {     
        BufferedWriter out = null;     
        try {     
            out = new BufferedWriter(new OutputStreamWriter(new FileOutputStream(file, true)));     
            out.write(conent);     
        } catch (Exception e) {     
            e.printStackTrace();     
        } finally {     
            try {     
                if(out != null){  
                    out.close();     
                }  
            } catch (IOException e) {     
                e.printStackTrace();     
            }     
        }     
    } 
	 /**   
     * 杩藉姞鏂囦欢锛氫娇鐢‵ileWriter   
     *    
     * @param fileName   
     * @param content
     *  @param flag    true琛ㄧず浠ヨ拷鍔犲舰寮忓啓鏂囦欢     
     */    
    public static void append2(String fileName, String content,boolean flag) {   
        FileWriter writer = null;  
        try {     
            writer = new FileWriter(fileName, flag);     
            writer.write(content);       
        } catch (IOException e) {     
            e.printStackTrace();     
        } finally {     
            try {     
                if(writer != null){  
                    writer.close();     
                }  
            } catch (IOException e) {     
                e.printStackTrace();     
            }     
        }   
    } 
    /**   
     * 杩藉姞鏂囦欢锛氫娇鐢≧andomAccessFile   
     *    
     * @param fileName 鏂囦欢鍚�   
     * @param content 杩藉姞鐨勫唴瀹�   
     */    
    public static void append3(String fileName, String content) {   
        RandomAccessFile randomFile = null;  
        try {     
            // 鎵撳紑涓�涓殢鏈鸿闂枃浠舵祦锛屾寜璇诲啓鏂瑰紡     
            randomFile = new RandomAccessFile(fileName, "rw");     
            // 鏂囦欢闀垮害锛屽瓧鑺傛暟     
            long fileLength = randomFile.length();     
            // 灏嗗啓鏂囦欢鎸囬拡绉诲埌鏂囦欢灏俱��     
            randomFile.seek(fileLength);     
            randomFile.writeBytes(content);      
        } catch (IOException e) {     
            e.printStackTrace();     
        } finally{  
            if(randomFile != null){  
                try {  
                    randomFile.close();  
                } catch (IOException e) {  
                    e.printStackTrace();  
                }  
            }  
        }  
    }    
}
