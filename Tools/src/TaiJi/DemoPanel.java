package TaiJi;

import java.awt.Color;
import java.awt.Graphics;
import java.awt.Graphics2D;
import java.awt.image.BufferedImage;

import javax.swing.JPanel;

public class DemoPanel extends JPanel implements Runnable{
	 
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	int i = 0;// 鍥剧墖鏃嬭浆鐨勫害鏁�
 
	@Override
	public void paint(Graphics g) {
		Graphics2D g2d = (Graphics2D) g;
		
		// 濉厖鑳屾櫙棰滆壊
		g2d.setColor(Color.GRAY);
		g2d.fillRect(0, 0, Global.SIZE, Global.SIZE);
		
		// 鍒涘缓涓�寮犵紦瀛樺浘鐗�
		BufferedImage image = new BufferedImage( Global.SIZE, Global.SIZE, BufferedImage.TYPE_INT_RGB);
		Graphics graphics = image.getGraphics();
		
		// 濉厖鑳屾櫙棰滆壊
		graphics.setColor(Color.GRAY);
		graphics.fillRect(0, 0, Global.SIZE, Global.SIZE);
 
		// 绗竴姝ワ細鐢讳簩涓ぇ鍗婂渾
		graphics.setColor(Color.WHITE);
		graphics.fillArc(Global.X, Global.Y, Global.R, Global.R, 0, 180);
		graphics.setColor(Color.BLACK);
		graphics.fillArc(Global.X, Global.Y, Global.R, Global.R, 0, -180);
 
		// 绗簩姝ワ細鐢讳簩涓皬鍗婂渾
		graphics.setColor(Color.WHITE);
		graphics.fillArc(Global.X + Global.R / 2, Global.Y + Global.R / 4, Global.R / 2, Global.R / 2, 0, -180);
		graphics.setColor(Color.BLACK);
		graphics.fillArc(Global.X, Global.Y + Global.R / 4, Global.R / 2, Global.R / 2, 0, 180);
	
		// 绗笁姝ワ細鐢讳簩涓皬鍦�
		graphics.setColor(Color.WHITE);
		graphics.fillArc(Global.X + 3 * Global.R / 16, Global.Y + 7 * Global.R / 16, Global.R / 8, Global.R / 8, 0, 360);
		graphics.setColor(Color.BLACK);
		graphics.fillArc(Global.X + 11 * Global.R / 16, Global.Y + 7 * Global.R / 16, Global.R / 8, Global.R / 8, 0, 360);
		
		i+=2;
		if (i >= 360) {
			i = 0;
		}
		double theta = i * Math.PI / 180;
		g2d.rotate(theta, Global.SIZE / 2 - 8, Global.SIZE / 2 - 18);
		g2d.drawImage(image, 0, 0, Global.SIZE, Global.SIZE, null);
		
	}
 
	public void run() {
		while (true) {
			repaint();
		}
	}
 
}