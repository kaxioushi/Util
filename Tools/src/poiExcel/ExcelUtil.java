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
 * HSSFWorkbook                      excel的文档对象

HSSFSheet                         excel的表单

HSSFRow                           excel的行

HSSFCell                          excel的格子单元

HSSFFont                          excel字体

HSSFDataFormat                    日期格式

HSSFHeader                        sheet头

HSSFFooter                        sheet尾（只有打印的时候才能看到效果）

样式：

HSSFCellStyle                       cell样式

辅助操作包括：

HSSFDateUtil                        日期

HSSFPrintSetup                      打印

HSSFErrorConstants                  错误信息表

首先，理解一下一个Excel的文件的组织形式，一个Excel文件对应于一个workbook(HSSFWorkbook)，一个workbook可以有多个sheet（HSSFSheet）组成，一个sheet是由多个row（HSSFRow）组成，一个row是由多个cell（HSSFCell）组成。

　　基本操作步骤：
1、用HSSFWorkbook打开或者创建“Excel文件对象”

2、用HSSFWorkbook对象返回或者创建Sheet对象

3、用Sheet对象返回行对象，用行对象得到Cell对象

4、对Cell对象读写

HSSF读取文件同样还是使用这几个对象，只是把相应的createXXX方法变成了getXXX方法即可。
 * */
public class ExcelUtil {
	private Workbook book;
	private Sheet sheet;
	
	//写入一行数据
	public void writeLine(String[] datas){
		int rows=sheet.getLastRowNum();//比行小1  最后一行行标
		if(rows!=0){
			rows=rows+1;
		}
		Row row=sheet.createRow(rows+1);
		for(int i=0;i<datas.length;i++){
			Cell cell=row.createCell(i);
			cell.setCellValue(datas[i]);
		}
	}
	//写入一行数据
	public void writeLine(List<String> list){
		int rows=sheet.getLastRowNum();//比行小1  最后一行行标
		if(rows!=0){
			rows=rows+1;
		}
		Row row=sheet.createRow(rows+1);
		for(int i=0;i<list.size();i++){
			Cell cell=row.createCell(i);
			cell.setCellValue(list.get(i));
		}
	}
	//在指定单元格写入内容
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
	 * 获得book
	 * @param path 文档路径
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
	 * 获得sheet
	 * @param sheetname  sheet名
	 * @param flag  如果sheet不存在 是否新建  true 新建
	 * */
	public Sheet getsheet(String sheetName,boolean flag){
		int num=book.getNumberOfSheets();
		for(int i=0;i<num;i++){
			sheet=book.getSheetAt(i);
			if(sheet.getSheetName().equals(sheetName)){
				//sheet.autoSizeColumn(0);//设置第一列列宽自动适应列宽
				return sheet;
			}
		}
		if(flag){
			sheet=book.createSheet(sheetName);
			return sheet;
		}
		return null;
	}
	//设置字体样式
	public Font setFont(){
		Font fontStyle=book.createFont();
		//设置字体样式  
		fontStyle.setFontName("宋体");    
		//设置字体高度  
		fontStyle.setFontHeightInPoints((short)20);    
		//设置字体颜色  
		fontStyle.setColor(HSSFColor.BLUE.index);  
		//设置粗体  
		fontStyle.setBoldweight(HSSFFont.BOLDWEIGHT_BOLD);  
		//设置斜体  
		fontStyle.setItalic(true);  
		//设置下划线  
		fontStyle.setUnderline(HSSFFont.U_SINGLE);  
		/**
		 //字体也是单元格格式的一部分，所以从属于HSSFCellStyle  
		// 将字体对象赋值给单元格样式对象  
		cellStyle.setFont(font);  
		// 将单元格样式应用于单元格  
		cell.setCellStyle(cellStyle);  
		 * */
		return fontStyle;
	}
	//设置单元格样式
	public CellStyle setCellStyle(){
		CellStyle cellStyle=book.createCellStyle();
		cellStyle.setAlignment(HSSFCellStyle.ALIGN_JUSTIFY);  
		  
		 cellStyle.setVerticalAlignment(HSSFCellStyle.VERTICAL_CENTER);  
		  
		 /* 设置单元格的填充方式，以及前景颜色和背景颜色 
		 
		  三点注意： 
		 
		  1.如果需要前景颜色或背景颜色，一定要指定填充方式，两者顺序无所谓； 
		 
		  2.如果同时存在前景颜色和背景颜色，前景颜色的设置要写在前面； 
		 
		  3.前景颜色不是字体颜色。 
		 
		 */  
		  
		 //设置填充方式(填充图案)  
		  
		 cellStyle.setFillPattern(HSSFCellStyle.DIAMONDS);  
		  
		 //设置前景色  
		  
		 cellStyle.setFillForegroundColor(HSSFColor.RED.index);  
		  
		 //设置背景颜色  
		  
		 cellStyle.setFillBackgroundColor(HSSFColor.LIGHT_YELLOW.index);  
		  
		 // 设置单元格底部的边框及其样式和颜色  
		  
		 // 这里仅设置了底边边框，左边框、右边框和顶边框同理可设  
		  
		 cellStyle.setBorderBottom(HSSFCellStyle.BORDER_SLANTED_DASH_DOT);  
		  
		 cellStyle.setBottomBorderColor(HSSFColor.DARK_RED.index);  
		  
		 //设置日期型数据的显示样式  
		  
		 cellStyle.setDataFormat(HSSFDataFormat.getBuiltinFormat("m/d/yy h:mm")); 
		 
		// 指定当单元格内容显示不下时自动换行  
		 cellStyle.setWrapText(true);  
		 /**
		  样式应用
		  cell.setCellStyle(cellStyle);  
			//将样式应用到行，但有些样式只对单元格起作用  
			row.setRowStyle(cellStyle);
		  * */
		return cellStyle;
	}
}
