package TaiJi;

import javax.swing.JFrame;

public class DemoMain extends JFrame {
	 
	/**
	 * 做一个旋转的太极
	 */
	private static final long serialVersionUID = 1L;



	public DemoMain() {
		DemoPanel demoPanel = new DemoPanel();
		new Thread(demoPanel).start();
		this.setVisible(true);
		this.setResizable(false);
		this.setTitle("旋转太极");
		this.add(demoPanel);
		this.setSize(Global.SIZE, Global.SIZE);
		this.setLocationRelativeTo(null);
		this.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
	}
 
 
 
	public static void main(String[] args) throws Exception {
		new DemoMain();		
	}
 
}