package jxlExcel;

import java.io.File;
import java.util.ArrayList;
import java.util.List;

import jxl.Cell;
import jxl.CellView;
import jxl.Workbook;
import jxl.write.Label;
import jxl.write.WritableSheet;
import jxl.write.WritableWorkbook;
import jxl.write.WriteException;
import jxl.write.biff.RowsExceededException;
/**
 * jxl生成excel  支持多线程调用
 * */
public class ExcelUtil {
	public static void main(String[] args){
		
	}
	private WritableWorkbook book;
	private WritableSheet sheet;
	public WritableWorkbook getBook() {
		return book;
	}
	public void setBook(WritableWorkbook book) {
		this.book = book;
	}
	public WritableSheet getSheet() {
		return sheet;
	}
	public void setSheet(WritableSheet sheet) {
		this.sheet = sheet;
	}
	/**
	 * 生成操作excel的book对象
	 * @param path  生成的 excel地址
	 * @param flag   是否创建新数据 true新建
	 * */
	public void getWorkBook(String path ,boolean flag){
		File file=new File(path);
		try {
			if(!file.exists()||flag){
				book=Workbook.createWorkbook(file);
			}else{//追加数据
				Workbook wb=Workbook.getWorkbook(file);
				book=Workbook.createWorkbook(file, wb);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	/**
	 * 获得sheet 是否对同名的sheet名进行追加 
	 * @param sheetname sheet名
	 * @param list   是否添加表头 为NULL的时候则添加表头
	 * */
	public WritableSheet getWorkSheet(String sheetname,List<String> list){
		WritableSheet[] sheets=book.getSheets();
		for(int i=0;i<sheets.length;i++){
			WritableSheet tsheet=sheets[i];
			if(tsheet.getName().equals(sheetname)){
				sheet=tsheet;
				return sheet;
			}
		}
		sheet=book.createSheet(sheetname, sheets.length);
		if(list!=null){
			setSheetHead(list);
		}
		return sheet;
	}
	//给sheet表加表头
	private void setSheetHead(List<String> list){
		int rows=sheet.getRows();
		if(rows==0){
			for(int i=0;i<list.size();i++){
				write(i,0,list.get(i));
			}
		}
	}
	/**
	 * 按列写入数据
	 * @param row 行
	 * @param list  数据
	 * */
	public void writeLine(int row,List<String> list){
		for(int i=0;i<list.size();i++){
			write(i, row, list.get(i));
		}
	}
	/**
	 * 填写单元格
	 * @param cow 列
	 * @param row 行
	 * @param content 内容
	 * */
	public void write(int cow ,int row,String content) {
		try {
			Label la=new Label(cow, row, content);
			CellView view=new CellView();
			view.setAutosize(true);//自动调整单元格宽度
			sheet.setColumnView(cow, view);
			sheet.addCell(la);
		} catch (RowsExceededException e) {
			e.printStackTrace();
		} catch (WriteException e) {
			e.printStackTrace();
		}
	}
	//关闭
		public void close() {
			try {
				book.write();
				book.close();
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
	//获得目标sheet
	public WritableSheet getTargetSheet(String sheetname){
		WritableSheet[] sheets=book.getSheets();
		for(int i=0;i<sheets.length;i++){
			WritableSheet tsheet=sheets[i];
			if(tsheet.getName().equals(sheetname)){
				sheet=tsheet;
				return sheet;
			}
		}
		return null;
	}
	/**
	 * 获得整张表的数据
	 * */
	public List<List<String>> getData(){
		if(sheet==null)return null;
		List<List<String>> list=new ArrayList<List<String>>();
		for(int i=0;i<sheet.getRows();i++){
			List<String> lis=new ArrayList<String>();
			for(int j=0;j<sheet.getColumns();j++){
				Cell cell = sheet.getCell(j,i);  
				lis.add(cell.getContents());
			}
			list.add(lis);
		}
		return list;
	}
	//读取指定行
	public List<String> getlineData(int row){
		List<String> list=new ArrayList<String>();
		if(row>=sheet.getRows()||sheet==null){//所要行数超出所有行数
			return null;
		}
		for(int i=0;i<sheet.getColumns();i++){
			Cell cell=sheet.getCell(i, row);
			list.add(cell.getContents());
		}
		return list;
	}
	//读取指定单元格数据
	public String getcell(int row,int cow){
		if(row>=sheet.getRows()||sheet==null){//所要行数超出所有行数
			return null;
		}
		Cell cell=sheet.getCell(cow-1, row);
		return cell.getContents();
	}
}
