package Js;

import java.io.File;
import java.io.FileReader;

import javax.script.Invocable;
import javax.script.ScriptEngine;
import javax.script.ScriptEngineManager;


public class actest {

	public static void main(String[] args) {
		File f=new File("src/Js/BY.js");
	System.out.println(f.getAbsolutePath());
	if(f.exists()){
		System.out.println("存在");
	}
		String txt=executeJavaScript("86519255991");
		System.out.println(txt);
	}

	public static String executeJavaScript(String username) {
		ScriptEngineManager sem = new ScriptEngineManager();
		ScriptEngine se = sem.getEngineByName("javascript");
		try {
			FileReader reader = new FileReader("src/Js/mdole.js");
			se.eval(reader);
		} catch (Exception e) {
			e.printStackTrace();
		}
		String p = null;
		if (se instanceof Invocable) {
			Invocable invoke = (Invocable) se;
			try {
				//p = (String) invoke.invokeFunction("generateSignature", username).toString();
				p = (String) invoke.invokeFunction("getinfo", "86519255991").toString();
				
				System.out.println(p);
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
		return p;
	}
}
