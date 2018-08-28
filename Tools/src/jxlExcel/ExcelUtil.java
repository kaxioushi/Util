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
 * jxl����excel  ֧�ֶ��̵߳���
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
	 * ���ɲ���excel��book����
	 * @param path  ���ɵ� excel��ַ
	 * @param flag   �Ƿ񴴽������� true�½�
	 * */
	public void getWorkBook(String path ,boolean flag){
		File file=new File(path);
		try {
			if(!file.exists()||flag){
				book=Workbook.createWorkbook(file);
			}else{//׷������
				Workbook wb=Workbook.getWorkbook(file);
				book=Workbook.createWorkbook(file, wb);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	/**
	 * ���sheet �Ƿ��ͬ����sheet������׷�� 
	 * @param sheetname sheet��
	 * @param list   �Ƿ���ӱ�ͷ ΪNULL��ʱ������ӱ�ͷ
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
	//��sheet��ӱ�ͷ
	private void setSheetHead(List<String> list){
		int rows=sheet.getRows();
		if(rows==0){
			for(int i=0;i<list.size();i++){
				write(i,0,list.get(i));
			}
		}
	}
	/**
	 * ����д������
	 * @param row ��
	 * @param list  ����
	 * */
	public void writeLine(int row,List<String> list){
		for(int i=0;i<list.size();i++){
			write(i, row, list.get(i));
		}
	}
	/**
	 * ��д��Ԫ��
	 * @param cow ��
	 * @param row ��
	 * @param content ����
	 * */
	public void write(int cow ,int row,String content) {
		try {
			Label la=new Label(cow, row, content);
			CellView view=new CellView();
			view.setAutosize(true);//�Զ�������Ԫ����
			sheet.setColumnView(cow, view);
			sheet.addCell(la);
		} catch (RowsExceededException e) {
			e.printStackTrace();
		} catch (WriteException e) {
			e.printStackTrace();
		}
	}
	//�ر�
		public void close() {
			try {
				book.write();
				book.close();
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
	//���Ŀ��sheet
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
	 * ������ű������
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
	//��ȡָ����
	public List<String> getlineData(int row){
		List<String> list=new ArrayList<String>();
		if(row>=sheet.getRows()||sheet==null){//��Ҫ����������������
			return null;
		}
		for(int i=0;i<sheet.getColumns();i++){
			Cell cell=sheet.getCell(i, row);
			list.add(cell.getContents());
		}
		return list;
	}
	//��ȡָ����Ԫ������
	public String getcell(int row,int cow){
		if(row>=sheet.getRows()||sheet==null){//��Ҫ����������������
			return null;
		}
		Cell cell=sheet.getCell(cow-1, row);
		return cell.getContents();
	}
}
