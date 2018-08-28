package codeUtil;
/**
 * 二维码分为好多种，我们最常用的是qrcode类型的二维码，以下有三种生成方式以及解析方式：
 * 此处讲解qrcode 的生成与识别
 * 依赖qrcode.jar
 * */

import java.awt.Color;
import java.awt.Graphics2D;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;
import java.io.UnsupportedEncodingException;
 





import javax.imageio.ImageIO;

import jp.sourceforge.qrcode.QRCodeDecoder;
import jp.sourceforge.qrcode.data.QRCodeImage;
import jp.sourceforge.qrcode.exception.DecodingFailedException;

import com.swetake.util.Qrcode;

public class QrCodeUtil implements QRCodeImage{
	//用于二维码的生成与识别
	public static void main(String[] args) {

	}
	
	//将生成的二维码图片存放起来
	public static boolean createQrCode(String content ,String path,String type){
		BufferedImage img;
		try {
			img = createQrCode(content);
			//ImageIO.write(img, "png", new File(path));
			ImageIO.write(img, type, new File(path));
			return true;
		} catch (IOException e) {
			e.printStackTrace();
		}
		return false;
	}
	//生成二维码
	public static BufferedImage createQrCode(String qrData) throws IOException{
		//qrData  要生成二维码的数据
		//计算二维码长款
		 // API文档规定计算图片宽高的方式 ，v是本次测试的版本号
		int v =6;
        int width = 67 + 12 * (v - 1);
        int height = 67 + 12 * (v - 1);
        Qrcode x = new Qrcode();
        /**
         * 纠错等级分为
         * level L : 最大 7% 的错误能够被纠正；
         * level M : 最大 15% 的错误能够被纠正；
         * level Q : 最大 25% 的错误能够被纠正；
         * level H : 最大 30% 的错误能够被纠正；
         */
        x.setQrcodeEncodeMode('L');
        x.setQrcodeEncodeMode('B');//注意版本信息 N代表数字 、A代表 a-z,A-Z、B代表 其他)
        x.setQrcodeVersion(v);//版本号  1-40
        byte[] d = qrData.getBytes("utf-8");//汉字转格式需要抛出异常

        //缓冲区
        BufferedImage bufferedImage = new BufferedImage(width, height, BufferedImage.TYPE_INT_BGR);

        //绘图
        Graphics2D gs = bufferedImage.createGraphics();

        gs.setBackground(Color.WHITE);
        gs.setColor(Color.BLACK);
        gs.clearRect(0, 0, width, height);

        //偏移量
        int pixoff = 2;


        /**
         * 容易踩坑的地方
         * 1.注意for循环里面的i，j的顺序，
         *   s[j][i]二维数组的j，i的顺序要与这个方法中的 gs.fillRect(j*3+pixoff,i*3+pixoff, 3, 3);
         *   顺序匹配，否则会出现解析图片是一串数字
         * 2.注意此判断if (d.length > 0 && d.length < 120)
         *   是否会引起字符串长度大于120导致生成代码不执行，二维码空白
         *   根据自己的字符串大小来设置此配置
         */
        if (d.length > 0 && d.length < 120) {
            boolean[][] s = x.calQrcode(d);

            for (int i = 0; i < s.length; i++) {
                for (int j = 0; j < s.length; j++) {
                    if (s[j][i]) {
                        gs.fillRect(j * 3 + pixoff, i * 3 + pixoff, 3, 3);
                    }
                }
            }
        }
        gs.dispose();
        bufferedImage.flush();
        return bufferedImage;
//        //设置图片格式，与输出的路径
//        ImageIO.write(bufferedImage, "png", new File(path));
//        System.out.println("二维码生成完毕");
    }
	public static String  readQRcode(String path){
		File f=new File(path);
		try {
			BufferedImage img=ImageIO.read(f);
			return readQRcode(img);
		} catch (IOException e) {
			e.printStackTrace();
		}
		return null;
	}
	//解析二维码 其中需要实现QRCodeImage接口
	public static String  readQRcode(BufferedImage bufferedImage) throws DecodingFailedException, IOException{
//		 //图片路径
//        File file = new File("D:/qrcode.png");
//        //读取图片到缓冲区
//        BufferedImage bufferedImage = ImageIO.read(file);
        //QRCode解码器
        QRCodeDecoder codeDecoder = new QRCodeDecoder();
        /**
         *codeDecoder.decode(new MyQRCodeImage())
         *这里需要实现QRCodeImage接口，移步最后一段代码
         */
        //通过解析二维码获得信息
        String result = new String(codeDecoder.decode(new QrCodeUtil(bufferedImage)), "utf-8");
        System.out.println(result);
        return result;
	}
	
	
	//下面是为解析二维码做的准备
	 BufferedImage bufferedImage;

	    public QrCodeUtil(BufferedImage bufferedImage){
	        this.bufferedImage=bufferedImage;
	    }
	//解析二维码的接口
	public static void MyQRCodeImage(){}

	@Override
	public int getHeight() {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	public int getPixel(int arg0, int arg1) {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	public int getWidth() {
		// TODO Auto-generated method stub
		return 0;
	}
}
