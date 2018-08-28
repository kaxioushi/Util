package poiExcel;

import java.io.File;
import java.io.FileInputStream;
import java.util.List;

import org.apache.poi.hssf.usermodel.HSSFCellStyle;
import org.apache.poi.hssf.usermodel.HSSFDataFormat;
import org.apache.poi.hssf.usermodel.HSSFFont;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.hssf.util.HSSFColor;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.Font;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;


/**
 * HSSFWorkbook                      excel���ĵ�����

HSSFSheet                         excel�ı�

HSSFRow                           excel����

HSSFCell                          excel�ĸ��ӵ�Ԫ

HSSFFont                          excel����

HSSFDataFormat                    ���ڸ�ʽ

HSSFHeader                        sheetͷ

HSSFFooter                        sheetβ��ֻ�д�ӡ��ʱ����ܿ���Ч����

��ʽ��

HSSFCellStyle                       cell��ʽ

��������������

HSSFDateUtil                        ����

HSSFPrintSetup                      ��ӡ

HSSFErrorConstants                  ������Ϣ��

���ȣ����һ��һ��Excel���ļ�����֯��ʽ��һ��Excel�ļ���Ӧ��һ��workbook(HSSFWorkbook)��һ��workbook�����ж��sheet��HSSFSheet����ɣ�һ��sheet���ɶ��row��HSSFRow����ɣ�һ��row���ɶ��cell��HSSFCell����ɡ�

���������������裺
1����HSSFWorkbook�򿪻��ߴ�����Excel�ļ�����

2����HSSFWorkbook���󷵻ػ��ߴ���Sheet����

3����Sheet���󷵻��ж������ж���õ�Cell����

4����Cell�����д

HSSF��ȡ�ļ�ͬ������ʹ���⼸������ֻ�ǰ���Ӧ��createXXX���������getXXX�������ɡ�
 * */
public class ExcelUtil {
	private Workbook book;
	private Sheet sheet;
	
	//д��һ������
	public void writeLine(String[] datas){
		int rows=sheet.getLastRowNum();//����С1  ���һ���б�
		if(rows!=0){
			rows=rows+1;
		}
		Row row=sheet.createRow(rows+1);
		for(int i=0;i<datas.length;i++){
			Cell cell=row.createCell(i);
			cell.setCellValue(datas[i]);
		}
	}
	//д��һ������
	public void writeLine(List<String> list){
		int rows=sheet.getLastRowNum();//����С1  ���һ���б�
		if(rows!=0){
			rows=rows+1;
		}
		Row row=sheet.createRow(rows+1);
		for(int i=0;i<list.size();i++){
			Cell cell=row.createCell(i);
			cell.setCellValue(list.get(i));
		}
	}
	//��ָ����Ԫ��д������
	public void writeCell(int row ,int cow ,String content){
		Row ro=sheet.getRow(row);
		if(ro==null){
			ro=sheet.createRow(row);
		}
		Cell cell=ro.getCell(cow);
		if(cell==null){
			cell=ro.createCell(cow);
		}
		cell.setCellValue(content);
	}
	/**
	 * ���book
	 * @param path �ĵ�·��
	 * */
	public Workbook getbook(String path){
		try {
			File file=new File(path);
			if(!file.exists()){file.createNewFile();}
			if(!file.isFile()||!file.getName().endsWith(".xls")||!file.getName().endsWith(".xlsx")){
				file.delete();
				return null;
			}
			FileInputStream fin=new FileInputStream(path);
			if(path.endsWith(".xlsx")){
				book=new XSSFWorkbook(fin);
			}else if(path.endsWith(".xls")){
				book=new HSSFWorkbook(fin);
			}
			return book;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}
	/**
	 * ���sheet
	 * @param sheetname  sheet��
	 * @param flag  ���sheet������ �Ƿ��½�  true �½�
	 * */
	public Sheet getsheet(String sheetName,boolean flag){
		int num=book.getNumberOfSheets();
		for(int i=0;i<num;i++){
			sheet=book.getSheetAt(i);
			if(sheet.getSheetName().equals(sheetName)){
				//sheet.autoSizeColumn(0);//���õ�һ���п��Զ���Ӧ�п�
				return sheet;
			}
		}
		if(flag){
			sheet=book.createSheet(sheetName);
			return sheet;
		}
		return null;
	}
	//����������ʽ
	public Font setFont(){
		Font fontStyle=book.createFont();
		//����������ʽ  
		fontStyle.setFontName("����");    
		//��������߶�  
		fontStyle.setFontHeightInPoints((short)20);    
		//����������ɫ  
		fontStyle.setColor(HSSFColor.BLUE.index);  
		//���ô���  
		fontStyle.setBoldweight(HSSFFont.BOLDWEIGHT_BOLD);  
		//����б��  
		fontStyle.setItalic(true);  
		//�����»���  
		fontStyle.setUnderline(HSSFFont.U_SINGLE);  
		/**
		 //����Ҳ�ǵ�Ԫ���ʽ��һ���֣����Դ�����HSSFCellStyle  
		// ���������ֵ����Ԫ����ʽ����  
		cellStyle.setFont(font);  
		// ����Ԫ����ʽӦ���ڵ�Ԫ��  
		cell.setCellStyle(cellStyle);  
		 * */
		return fontStyle;
	}
	//���õ�Ԫ����ʽ
	public CellStyle setCellStyle(){
		CellStyle cellStyle=book.createCellStyle();
		cellStyle.setAlignment(HSSFCellStyle.ALIGN_JUSTIFY);  
		  
		 cellStyle.setVerticalAlignment(HSSFCellStyle.VERTICAL_CENTER);  
		  
		 /* ���õ�Ԫ�����䷽ʽ���Լ�ǰ����ɫ�ͱ�����ɫ 
		 
		  ����ע�⣺ 
		 
		  1.�����Ҫǰ����ɫ�򱳾���ɫ��һ��Ҫָ����䷽ʽ������˳������ν�� 
		 
		  2.���ͬʱ����ǰ����ɫ�ͱ�����ɫ��ǰ����ɫ������Ҫд��ǰ�棻 
		 
		  3.ǰ����ɫ����������ɫ�� 
		 
		 */  
		  
		 //������䷽ʽ(���ͼ��)  
		  
		 cellStyle.setFillPattern(HSSFCellStyle.DIAMONDS);  
		  
		 //����ǰ��ɫ  
		  
		 cellStyle.setFillForegroundColor(HSSFColor.RED.index);  
		  
		 //���ñ�����ɫ  
		  
		 cellStyle.setFillBackgroundColor(HSSFColor.LIGHT_YELLOW.index);  
		  
		 // ���õ�Ԫ��ײ��ı߿�����ʽ����ɫ  
		  
		 // ����������˵ױ߱߿���߿��ұ߿�Ͷ��߿�ͬ�����  
		  
		 cellStyle.setBorderBottom(HSSFCellStyle.BORDER_SLANTED_DASH_DOT);  
		  
		 cellStyle.setBottomBorderColor(HSSFColor.DARK_RED.index);  
		  
		 //�������������ݵ���ʾ��ʽ  
		  
		 cellStyle.setDataFormat(HSSFDataFormat.getBuiltinFormat("m/d/yy h:mm")); 
		 
		// ָ������Ԫ��������ʾ����ʱ�Զ�����  
		 cellStyle.setWrapText(true);  
		 /**
		  ��ʽӦ��
		  cell.setCellStyle(cellStyle);  
			//����ʽӦ�õ��У�����Щ��ʽֻ�Ե�Ԫ��������  
			row.setRowStyle(cellStyle);
		  * */
		return cellStyle;
	}
}
