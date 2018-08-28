package poiExcel;

import java.util.List;

import org.apache.poi.hssf.usermodel.HSSFCell;
import org.apache.poi.hssf.usermodel.HSSFCellStyle;
import org.apache.poi.hssf.usermodel.HSSFFont;
import org.apache.poi.hssf.usermodel.HSSFRichTextString;
import org.apache.poi.hssf.usermodel.HSSFRow;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.hssf.util.HSSFColor;
import org.apache.poi.ss.util.CellRangeAddress;

public class test {
	
	public void export(String title,String[] rowName,List<Object[]>  dataList){
		HSSFWorkbook workbook=new HSSFWorkbook();//��������������
		HSSFSheet sheet=workbook.createSheet(title);//����������
		//������������
		HSSFRow rowm=sheet.createRow(0);
		HSSFCell cellTitle=rowm.createCell(0);
		//sheet��ʽ���塾getColumnTopStyle()/getStyle()��Ϊ�Զ��巽�� - ������  - ����չ��
		HSSFCellStyle columnTopStyle=this.getColumnTopStyle(workbook);//��ȡ��ͷ��ʽ����
		HSSFCellStyle style = this.getStyle(workbook); 
		sheet.addMergedRegion(new CellRangeAddress(0, 1, 0, (rowName.length-1)));
		cellTitle.setCellStyle(columnTopStyle);
		cellTitle.setCellValue(title);
		//������������
		int columnNum=rowName.length;
		HSSFRow rowRowName=sheet.createRow(2);
		//����ͷ���õ�sheet�ĵ�Ԫ����
		for(int n=0;n<columnNum;n++){
			HSSFCell cellRowName=rowRowName.createCell(n); //������ͷ��Ӧ�����ĵ�Ԫ��
			cellRowName.setCellType(HSSFCell.CELL_TYPE_STRING);  //������ͷ��Ԫ�����������
			HSSFRichTextString text = new HSSFRichTextString(rowName[n]);
            cellRowName.setCellValue(text);                                    //������ͷ��Ԫ���ֵ
            cellRowName.setCellStyle(columnTopStyle);                        //������ͷ��Ԫ����ʽ
		}
		//���������õ�sheet��Ӧ�ĵ�Ԫ����
		for(int j=0;j<dataList.size();j++){
			Object[] obj=dataList.get(j);
			HSSFRow row=sheet.createRow(j++);
				HSSFCell cell=null;
				if(j==0){
					cell=row.createCell(j,HSSFCell.CELL_TYPE_NUMERIC);
					cell.setCellValue(j+1);
				}else{
					cell = row.createCell(j,HSSFCell.CELL_TYPE_STRING);
                    if(!"".equals(obj[j]) && obj[j] != null){
                        cell.setCellValue(obj[j].toString());                        //���õ�Ԫ���ֵ
                    }
                    cell.setCellStyle(style);//���õ�Ԫ���ʽ
				}
			}
			//���п����ŵ������г��Զ���Ӧ
			for(int colNum=0;colNum<columnNum;colNum++){
				int columnWidth=sheet.getColumnWidth(colNum)/256;
				for(int rowNum=0;rowNum<sheet.getLastRowNum();rowNum++){
					HSSFRow currentRow;
					//��ǰ��δ��ʹ�ù�
					if(sheet.getRow(rowNum)==null){
						currentRow=sheet.createRow(rowNum);
					}else{
						currentRow = sheet.getRow(rowNum);
					}
					if(currentRow.getCell(colNum)!=null){
						HSSFCell currentCell = currentRow.getCell(colNum);
                        if (currentCell.getCellType() == HSSFCell.CELL_TYPE_STRING) {
                            int length = currentCell.getStringCellValue().getBytes().length;
                            if (columnWidth < length) {
                                columnWidth = length;
                            }
                        }
					}
				}
				if(colNum==0){
					sheet.setColumnWidth(colNum, (columnWidth-2) * 256);
				}else{
                    sheet.setColumnWidth(colNum, (columnWidth+4) * 256);
                }
			}
		}
	/* 
     * ��ͷ��Ԫ����ʽ
     */    
      public HSSFCellStyle getColumnTopStyle(HSSFWorkbook workbook) {
          
            // ��������
          HSSFFont font = workbook.createFont();
          //���������С
          font.setFontHeightInPoints((short)11);
          //����Ӵ�
          font.setBoldweight(HSSFFont.BOLDWEIGHT_BOLD);
          //������������ 
          font.setFontName("Courier New");
          //������ʽ; 
          HSSFCellStyle style = workbook.createCellStyle();
          //���õױ߿�; 
          style.setBorderBottom(HSSFCellStyle.BORDER_THIN);
          //���õױ߿���ɫ;  
          style.setBottomBorderColor(HSSFColor.BLACK.index);
          //������߿�;   
          style.setBorderLeft(HSSFCellStyle.BORDER_THIN);
          //������߿���ɫ; 
          style.setLeftBorderColor(HSSFColor.BLACK.index);
          //�����ұ߿�; 
          style.setBorderRight(HSSFCellStyle.BORDER_THIN);
          //�����ұ߿���ɫ; 
          style.setRightBorderColor(HSSFColor.BLACK.index);
          //���ö��߿�; 
          style.setBorderTop(HSSFCellStyle.BORDER_THIN);
          //���ö��߿���ɫ;  
          style.setTopBorderColor(HSSFColor.BLACK.index);
          //����ʽ��Ӧ�����õ�����;  
          style.setFont(font);
          //�����Զ�����; 
          style.setWrapText(false);
          //����ˮƽ�������ʽΪ���ж���;  
          style.setAlignment(HSSFCellStyle.ALIGN_CENTER);
          //���ô�ֱ�������ʽΪ���ж���; 
          style.setVerticalAlignment(HSSFCellStyle.VERTICAL_CENTER);
          
          return style;
      }
      /*  
       * ��������Ϣ��Ԫ����ʽ
       */  
        public HSSFCellStyle getStyle(HSSFWorkbook workbook) {
              // ��������
              HSSFFont font = workbook.createFont();
              //���������С
              //font.setFontHeightInPoints((short)10);
              //����Ӵ�
              //font.setBoldweight(HSSFFont.BOLDWEIGHT_BOLD);
              //������������ 
              font.setFontName("Courier New");
              //������ʽ; 
              HSSFCellStyle style = workbook.createCellStyle();
              //���õױ߿�; 
              style.setBorderBottom(HSSFCellStyle.BORDER_THIN);
              //���õױ߿���ɫ;  
              style.setBottomBorderColor(HSSFColor.BLACK.index);
              //������߿�;   
              style.setBorderLeft(HSSFCellStyle.BORDER_THIN);
              //������߿���ɫ; 
              style.setLeftBorderColor(HSSFColor.BLACK.index);
              //�����ұ߿�; 
              style.setBorderRight(HSSFCellStyle.BORDER_THIN);
              //�����ұ߿���ɫ; 
              style.setRightBorderColor(HSSFColor.BLACK.index);
              //���ö��߿�; 
              style.setBorderTop(HSSFCellStyle.BORDER_THIN);
              //���ö��߿���ɫ;  
              style.setTopBorderColor(HSSFColor.BLACK.index);
              //����ʽ��Ӧ�����õ�����;  
              style.setFont(font);
              //�����Զ�����; 
              style.setWrapText(false);
              //����ˮƽ�������ʽΪ���ж���;  
              style.setAlignment(HSSFCellStyle.ALIGN_CENTER);
              //���ô�ֱ�������ʽΪ���ж���; 
              style.setVerticalAlignment(HSSFCellStyle.VERTICAL_CENTER);
             
              return style;
        
        }
}
