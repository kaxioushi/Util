package fileChooser;

import java.awt.Component;
import java.io.File;
import java.io.IOException;

import javax.swing.JFileChooser;

/**
 * 用于文件选择的界�?
 * */
public class Chooser {

	public static void main(String[] args) {
		String pat=getPath()+"\\ll.txt";
		File f=new File(pat);
		if(!f.exists())
			try {
				f.createNewFile();
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
	}
	//选择�?个目�?
	public static String getDirectories() {
		JFileChooser chooser=new JFileChooser();
		chooser.setFileSelectionMode(JFileChooser.DIRECTORIES_ONLY);
		Component parent=null;
		int re=chooser.showOpenDialog(parent);
		if(re==JFileChooser.APPROVE_OPTION) {
			System.out.println(chooser.getSelectedFile().getAbsolutePath());
			return chooser.getSelectedFile().getAbsolutePath();
		}
		return null;
	}
	//选择�?个文件或者目�?
	public static String getPath() {
		JFileChooser chooser=new JFileChooser();
		chooser.setFileSelectionMode(JFileChooser.FILES_AND_DIRECTORIES);
		Component parent=null;
		int re=chooser.showOpenDialog(parent);
		if(re==JFileChooser.APPROVE_OPTION) {
			System.out.println(chooser.getSelectedFile().getAbsolutePath());
			return chooser.getSelectedFile().getAbsolutePath();
		}
		return null;
	}
	//选择�?个文�?
	public static String getFile() {
		JFileChooser chooser=new JFileChooser();
		chooser.setFileSelectionMode(JFileChooser.FILES_ONLY);
		Component parent=null;
		int re=chooser.showOpenDialog(parent);
		if(re==JFileChooser.APPROVE_OPTION) {
			System.out.println(chooser.getSelectedFile().getAbsolutePath());
			return chooser.getSelectedFile().getAbsolutePath();
		}
		return null;
	}
}
