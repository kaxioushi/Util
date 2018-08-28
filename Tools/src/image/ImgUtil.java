package image;

import java.awt.Graphics2D;
import java.awt.RenderingHints;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;

import javax.imageio.ImageIO;

public class ImgUtil {

	public static void main(String[] args) {

	}
	/**
	 旋转图片为指定位置
	  @param img
                目标图像
      @param degree
                 旋转角度
      @return
      bufferedimage.getColorModel().getTransparency()以获得原始图片透明度用于生成缓存图，在缓存图进行相应操作即可
	 * */
	public static BufferedImage roatteImage(BufferedImage img,int degree){
		int w=img.getWidth();
		int h=img.getHeight();
		int type=img.getColorModel().getTransferType();
		BufferedImage tempimg;
		Graphics2D grap;
		tempimg=new BufferedImage(w, h, type);
		grap=tempimg.createGraphics();
		grap.setRenderingHint(RenderingHints.KEY_ALPHA_INTERPOLATION, RenderingHints.VALUE_INTERPOLATION_BILINEAR);
		grap.rotate(Math.toRadians(degree), w/2, h/2);
		grap.drawImage(img,0,0,null);
		grap.dispose();
		return tempimg;
	}
	/**
     * 变更图像为指定大小
     * 
     * @param bufferedimage
     *            目标图像
     * @param w
     *            宽
     * @param h
     *            高
     * @return
     */
    public static BufferedImage resizeImage(final BufferedImage bufferedimage,
            final int w, final int h) {
        int type = bufferedimage.getColorModel().getTransparency();
        BufferedImage img;
        Graphics2D graphics2d;
        img=new BufferedImage(w, h, type);
        graphics2d=img.createGraphics();
        graphics2d.setRenderingHint(RenderingHints.KEY_INTERPOLATION, RenderingHints.VALUE_INTERPOLATION_BILINEAR);
//        (graphics2d = (img = createImage(w, h, type))
//                .createGraphics()).setRenderingHint(
//                RenderingHints.KEY_INTERPOLATION,
//                RenderingHints.VALUE_INTERPOLATION_BILINEAR);
        graphics2d.drawImage(bufferedimage, 0, 0, w, h, 0, 0, bufferedimage.getWidth(), bufferedimage.getHeight(), null);
        graphics2d.dispose();
        return img;
    }
    /**
     * 水平翻转图像
     * 
     * @param bufferedimage 目标图像
     * @return
     */
    public static BufferedImage flipImage(final BufferedImage bufferedimage) {
        int w = bufferedimage.getWidth();
        int h = bufferedimage.getHeight();
        BufferedImage img;
        Graphics2D graphics2d;
        img=new BufferedImage(w, h, bufferedimage.getColorModel().getTransparency());
        graphics2d=img.createGraphics();
        graphics2d.drawImage(bufferedimage, 0, 0, w, h, w, 0, 0, h, null);
//        (graphics2d = (img = createImage(w, h, bufferedimage
//                .getColorModel().getTransparency())).createGraphics())
//                .drawImage(bufferedimage, 0, 0, w, h, w, 0, 0, h, null);
        graphics2d.dispose();
        return img;
    }
    //根据地址  读取图片
    public static BufferedImage readImg(String path){
    	File f=new File(path);
    	try {
			return readImg(f);
		} catch (Exception e) {
			e.printStackTrace();
		}
    	return null;
    }
    public static BufferedImage readImg(File f){
    	try {
			return ImageIO.read(f);
		} catch (IOException e) {
			e.printStackTrace();
		}
    	return null;
    }
    //写入图片
    public static boolean writeImg(BufferedImage img,File f,String type){
    	try {
			ImageIO.write(img, type, f);
			return true;
		} catch (IOException e) {
			e.printStackTrace();
		}
    	return false;
    }
    //写入图片
    public static boolean writeImg(BufferedImage img,String path,String type){
    	try {
    		File f=new File(path);
    		ImageIO.write(img, type, f);
    		return true;
    	} catch (IOException e) {
    		e.printStackTrace();
    	}
    	return false;
    }
}
