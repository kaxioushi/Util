package xmlUtil;


public class XMLUtil {
	public static void main(String[] args){ 
		String txt="var ={lfjsdkf};";
		txt=txt.substring(txt.indexOf("=")+1,txt.length()-1);
		System.out.println(txt);
	}
	

}
//package xmlUtil;
//import java.io.IOException;
//import java.util.ArrayList;  
//import java.util.List;  
//  
//
//import javax.xml.parsers.DocumentBuilder;  
//import javax.xml.parsers.DocumentBuilderFactory;  
//import javax.xml.parsers.ParserConfigurationException;  
//  
//
//import org.w3c.dom.Document;  
//import org.w3c.dom.NamedNodeMap;  
//import org.w3c.dom.NodeList; 
//import org.xml.sax.SAXException;
//
//
///**
// headle the XMl file or String
// * */
//public class XMLUtil {
//	private static DocumentBuilderFactory dbFactory = null;  
//    private static DocumentBuilder db = null;  
//    private static Document document = null; 
//    
//    static{  
//        try {  
//            dbFactory = DocumentBuilderFactory.newInstance();  
//            db = dbFactory.newDocumentBuilder();  
//        } catch (ParserConfigurationException e) {  
//            e.printStackTrace();  
//        }  
//    }  
//    
//    //sax瑙ｆ瀽
//    public static void saxXml(){
//    	
//    }
//    //dom 瑙ｆ瀽
//    public static void domXml(String fileName) throws SAXException, IOException{
//    	 //灏嗙粰瀹� URI 鐨勫唴瀹硅В鏋愪负涓�涓� XML 鏂囨。,骞惰繑鍥濪ocument瀵硅薄  
//        document = db.parse(fileName);  
//        //鎸夋枃妗ｉ『搴忚繑鍥炲寘鍚湪鏂囨。涓笖鍏锋湁缁欏畾鏍囪鍚嶇О鐨勬墍鏈� Element 鐨� NodeList  
//        NodeList bookList = document.getElementsByTagName("");
//        //閬嶅巻books  
//        for(int i=0;i<bookList.getLength();i++){  
//            //鑾峰彇绗琲涓猙ook缁撶偣  
//            org.w3c.dom.Node node = bookList.item(i);  
//            //鑾峰彇绗琲涓猙ook鐨勬墍鏈夊睘鎬�  
//            NamedNodeMap namedNodeMap = node.getAttributes();  
//            //鑾峰彇宸茬煡鍚嶄负id鐨勫睘鎬у��  
//            String id = namedNodeMap.getNamedItem("").getTextContent();//System.out.println(id);  
//              
//            //鑾峰彇book缁撶偣鐨勫瓙鑺傜偣,鍖呭惈浜員est绫诲瀷鐨勬崲琛�  
//            NodeList cList = node.getChildNodes();//System.out.println(cList.getLength());9  
//              
//            //灏嗕竴涓猙ook閲岄潰鐨勫睘鎬у姞鍏ユ暟缁�  
//            ArrayList<String> contents = new ArrayList<>();  
//            for(int j=1;j<cList.getLength();j+=2){  
//                  
//                org.w3c.dom.Node cNode = cList.item(j);  
//                String content = cNode.getFirstChild().getTextContent();  
//                contents.add(content);  
//                //System.out.println(contents);  
//            }  
//        }
//    }
//}
//import java.util.ArrayList;  
//import java.util.List;  
//  
//import org.xml.sax.Attributes;  
//import org.xml.sax.SAXException;  
//import org.xml.sax.helpers.DefaultHandler;  
//  
//  
///** 
// * 鐢⊿AX瑙ｆ瀽xml鏂囦欢鏃堕渶瑕佺殑handler 
// * @author lune 
// */  
//public class SAXParseHandler extends DefaultHandler {  
//    private List<Book> list;         //瀛樻斁瑙ｆ瀽鍒扮殑book鏁扮粍  
//    private Book book;               //瀛樻斁褰撳墠瑙ｆ瀽鐨刡ook  
//      
//    private String content = null;   //瀛樻斁褰撳墠鑺傜偣鍊�  
//      
//    /** 
//     * 寮�濮嬭В鏋恱ml鏂囨。鏃惰皟鐢ㄦ鏂规硶 
//     */  
//    @Override  
//    public void startDocument() throws SAXException {  
//          
//        super.startDocument();  
//        System.out.println(鈥濆紑濮嬭В鏋恱ml鏂囦欢鈥�);  
//        list = new ArrayList<Book>();  
//    }  
//  
//  
//  
//    /**  
//     * 鏂囨。瑙ｆ瀽瀹屾垚鍚庤皟鐢ㄦ鏂规硶 
//     */  
//    @Override  
//    public void endDocument() throws SAXException {  
//          
//        super.endDocument();  
//        System.out.println(鈥漻ml鏂囦欢瑙ｆ瀽瀹屾瘯鈥�);  
//    }  
//  
//  
//  
//    /** 
//     * 寮�濮嬭В鏋愯妭鐐规椂璋冪敤姝ゆ柟娉� 
//     */  
//    @Override  
//    public void startElement(String uri, String localName, String qName, Attributes attributes) throws SAXException {  
//          
//        super.startElement(uri, localName, qName, attributes);  
//          
//        //褰撹妭鐐瑰悕涓篵ook鏃�,鑾峰彇book鐨勫睘鎬d  
//        if(qName.equals(鈥渂ook鈥�)){  
//            book = new Book();  
//            String id = attributes.getValue(鈥漣d鈥�);//System.out.println(鈥渋d鍊间负鈥�+id);  
//            book.setId(Integer.parseInt(id));  
//        }  
//          
//    }  
//  
//  
//    /** 
//     *鑺傜偣瑙ｆ瀽瀹屾瘯鏃惰皟鐢ㄦ鏂规硶 
//     * 
//     *@param qName 鑺傜偣鍚� 
//     */  
//    @Override  
//    public void endElement(String uri, String localName, String qName) throws SAXException {  
//          
//        super.endElement(uri, localName, qName);  
//        if(qName.equals(鈥渘ame鈥�)){  
//            book.setName(content);  
//            //System.out.println(鈥滀功鍚嶁��+content);  
//        }else if(qName.equals(鈥渁uthor鈥�)){  
//            book.setAuthor(content);  
//        //  System.out.println(鈥滀綔鑰呪��+content);  
//        }else if(qName.equals(鈥測ear鈥�)){  
//            book.setYear(Integer.parseInt(content));  
//        //  System.out.println(鈥滃勾浠解��+content);  
//        }else if(qName.equals(鈥減rice鈥�)){  
//            book.setPrice(Double.parseDouble(content));  
//        //  System.out.println(鈥滀环鏍尖��+content);  
//        }else if(qName.equals(鈥渂ook鈥�)){         //褰撶粨鏉熷綋鍓峛ook瑙ｆ瀽鏃�,灏嗚book娣诲姞鍒版暟缁勫悗缃负绌猴紝鏂逛究涓嬩竴娆ook璧嬪��  
//            list.add(book);  
//            book = null;  
//        }     
//          
//    }  
//  
//  
//  
//    /**  
//     * 姝ゆ柟娉曠敤鏉ヨ幏鍙栬妭鐐圭殑鍊� 
//     */  
//    @Override  
//    public void characters(char[] ch, int start, int length) throws SAXException {  
//          
//        super.characters(ch, start, length);  
//          
//        content = new String(ch, start, length);  
//        //鏀堕泦涓嶄负绌虹櫧鐨勮妭鐐瑰��  
////      if(!content.trim().equals(鈥溾��)){  
////          System.out.println(鈥滆妭鐐瑰�间负锛氣��+content);  
////      }  
//          
//    }  
//  
//    public List<Book> getBooks(){  
//        return list;  
//    }  
//      
//}  
