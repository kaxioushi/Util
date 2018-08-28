package jxlExcel;

import jxl.write.WritableSheet;

public class ExcelTest {

	public static void main(String[] args) {
		ExcelUtil exc=new ExcelUtil();
		exc.getWorkBook("C:\\Users\\cy0093\\Desktop\\ËÕÄþÒ×¹º\\11.xls", false);
		exc.getWorkSheet("sheet1", null);
		exc.getWorkSheet("sheet2", null);
		for(int i=0;i<10;i++){
			if(i%2==0){
				WritableSheet sheet=exc.getWorkSheet("sheet1", null);
				int row=sheet.getRows();
				exc.write(1, row, "²¹³ä"+i);
			}else{
				WritableSheet sheet=exc.getWorkSheet("sheet2", null);
				int row=sheet.getRows();
				exc.write(1, row, "²¹³ä"+i);
			}
		}
		exc.close();
	}

}
