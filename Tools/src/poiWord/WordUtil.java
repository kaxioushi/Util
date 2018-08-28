package poiWord;
	/**
	 * ����ʾһ��word doc�ĵ�����HWPFDocument��������ô�������

l  Range������ʾһ����Χ�������Χ�����������ĵ���Ҳ�����������ĳһС�ڣ�Section����Ҳ������ĳһ�����䣨Paragraph������������ӵ�й�ͬ���Ե�һ���ı���CharacterRun����

l  Section��word�ĵ���һ��С�ڣ�һ��word�ĵ������ɶ��С�ڹ��ɡ�

l  Paragraph��word�ĵ���һ�����䣬һ��С�ڿ����ɶ�����乹�ɡ�

l  CharacterRun��������ͬ���Ե�һ���ı���һ����������ɶ��CharacterRun��ɡ�

l  Table��һ�����

l  TableRow������Ӧ���С�

l  TableCell������Ӧ�ĵ�Ԫ��

       Section��Paragraph��CharacterRun��Table���̳���Range��
	 * */

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.HashMap;
import java.util.Map;

import org.apache.poi.hwpf.HWPFDocument;
import org.apache.poi.hwpf.usermodel.Range;

public class WordUtil {
	public static void main(String[] args) {
		Map<String, String> map =new HashMap<String ,String>();
		writeWord(new File("temp.docx"), new File("targetfile.docx"), map);
	}
	//����ģ��д������
	/**
	 * @param mubanfile  ģ���ļ�
	 * @param targetfile  Ҫ���ɵ�Ŀ���ļ�
	 * @param map  ��Ҫ����������
	 * */
	public static void writeWord(File mubanfile,File targetfile,Map<String, String> map){
		if(!mubanfile.exists()){
			try {
				mubanfile.createNewFile();
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
		try {
			InputStream is=new FileInputStream(mubanfile);
			HWPFDocument doc=new HWPFDocument(is);
			Range rang=doc.getRange();
			for(String key:map.keySet()){
				rang.replaceText(key, map.get(key));
			}
			OutputStream os = new FileOutputStream(targetfile); 
			doc.write(os); 
			if (is != null) {    
		        try {    
		           is.close();    
		        } catch (IOException e) {    
		           e.printStackTrace();    
		        }   
			}
			if (os != null) {    
		         try {    
		            os.close();    
		         } catch (IOException e) {    
		            e.printStackTrace();    
		         }    
		      } 
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	public static void readWord(){}
}
