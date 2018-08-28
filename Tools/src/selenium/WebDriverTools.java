package selenium;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.ObjectInputStream;
import java.io.ObjectOutputStream;
import java.util.Map.Entry;
import java.util.Properties;
import java.util.Set;

import org.openqa.selenium.By;
import org.openqa.selenium.Cookie;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.phantomjs.PhantomJSDriver;
import org.openqa.selenium.remote.DesiredCapabilities;
import org.openqa.selenium.support.ui.ExpectedCondition;
import org.openqa.selenium.support.ui.WebDriverWait;

/** 
 * @author jcd 
 * @version 2017年5月23日 下午7:37:58
 */
public class WebDriverTools {
	
	//private static ChromeDriverService service = null;
	private static WebDriver driver = null;
	
	/**
	 * 加载环境变量
	 */
	static{
		System.out.println("加载环境变量...");
//		System.setProperty("webdriver.chrome.bin", "/Applications/Google Chrome.app");
//		System.setProperty("webdriver.chrome.driver", "/Users/xw/Desktop/JAVANEW/Tools/chromedriver");
//		System.setProperty("phantomjs.binary.path", "/Users/xw/Downloads/phantomjs-2.1.1-macosx/bin/phantomjs");
		System.setProperty("phantomjs.binary.path", "C:/phantomjs/phantomjs.exe");
	}
	
	/**
	 * 开启WebDriver
	 * @throws IOException 
	 */
	public static void open_Driver() throws Exception{
		try {
			/*
			if(null == service){
				service = new ChromeDriverService.Builder().usingAnyFreePort().build();
				service.start();
			}
			if(null == driver) driver = new ChromeDriver();
			*/
			if(null == driver) driver = new PhantomJSDriver();  
			//最大化浏览器
			driver.manage().window().maximize();
		} catch (Exception e) {
			e.printStackTrace();
			throw new Exception("初始化浏览器异常");
		}
	}
	
	public static void open_Driver(DesiredCapabilities dep) throws Exception{
		try {
			/*
			if(null == service){
				service = new ChromeDriverService.Builder().usingAnyFreePort().build();
				service.start();
			}
			if(null == driver) driver = new ChromeDriver();
			*/
			if(null == driver) driver = new PhantomJSDriver(dep);  
			//最大化浏览器
			driver.manage().window().maximize();
		} catch (Exception e) {
			e.printStackTrace();
			throw new Exception("初始化浏览器异常");
		}
	}
	
	/**
	 * 获取WebDriver
	 * @return
	 * @throws Exception 
	 */
	public static WebDriver get_Driver(Object... options) throws Exception{
		try {
			//if(null == service || null == driver) open_Driver();
			if (null != options && options.length > 0) {
				if (null == driver) open_Driver((DesiredCapabilities)options[0]);
			} else {
				if (null == driver) open_Driver();
			}
		} catch (Exception e) {
			e.printStackTrace();
			throw new Exception("获取driver异常");
		}
		return driver;
	}
	
	/**
	 * 关闭WebDriver
	 */
	public static void close_Driver(){
		try {
			if(null != driver){
				driver.manage().deleteAllCookies();
				driver.close();
				driver.quit();
				driver = null;
			}
			/*
			if(null != service){
				service.stop();
				service = null;
			}
			*/
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	/**
	 * 打开URL
	 * @param url
	 * @throws Exception 
	 */
	public static void get_URL(String url) {
		try {
			if(null == driver) open_Driver();
			if(null == url) return;
			url = url.indexOf("https://") == -1 && url.indexOf("http://") == -1 ? "http://" + url : url;
			driver.get(url);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	/**
	 * 获取单一元素
	 * @param by 获取规则 
	 * @param seconds 等待元素加载时间(单位:秒,默认:30秒)
	 * @return
	 * @throws Exception 
	 */
	public static WebElement find_WebElement(final By by, Integer seconds) throws Exception{
		WebElement element = null;
		seconds = null == seconds ? 30 : seconds;
		try {
			if(null == driver) open_Driver();
			element = new WebDriverWait(driver, seconds).until(new ExpectedCondition<WebElement>() {
				public WebElement apply(WebDriver d) {
					return d.findElement(by);
				}
			});
		} catch (Exception e) {
			e.printStackTrace();
			throw new Exception("获取元素异常");
		}
		return element;
	}
	
	/**
	 * 获取元素并向元素中填写内容
	 * @param by 获取规则
	 * @param seconds 等待元素加载时间(单位:秒,默认:30秒)
	 * @param content 填写内容
	 * @throws Exception 
	 */
	public static void find_Element_Send_Keys(final By by, Integer seconds, String content) throws Exception{
		WebElement element = find_WebElement(by, seconds);
		if(null != element) send_Keys(element, content);
	}
	
	/**
	 * 向元素中填写内容
	 * @param element 元素
	 * @param content 填写内容
	 * @throws Exception 
	 */
	public static void send_Keys(WebElement element, String content) throws Exception{
		try {
			if(null == driver) open_Driver();
			if(null == content) return;
			element.sendKeys(content);
		} catch (Exception e) {
			e.printStackTrace();
			throw new Exception("输入内容异常");
		}
	}
	
	/**
	 * 点击元素
	 * @param by 元素
	 * @param seconds 等待元素加载时间(单位:秒,默认:30秒)
	 * @throws Exception 
	 */
	public static void find_Element_Click(final By by, Integer seconds) throws Exception{
		try {
			WebElement element = find_WebElement(by, seconds);
			element.click();
		} catch (Exception e) {
			e.printStackTrace();
			throw new Exception("点击元素异常");
		}
	}
	
	/**
	 * 获取所有Cookie
	 * @return
	 */
	public static Set<Cookie> get_Cookies(){
		try {
			if(null == driver) open_Driver();
		} catch (Exception e) {
			return null;
		}
		return driver.manage().getCookies();
	}
	
	/**
	 * 序列化Cookies至本地
	 * @param file_path 序列化路径
	 */
	public static void save_Cookies(File file_path){
		FileOutputStream fos = null;
		ObjectOutputStream oos = null;
		try {
			if(null == driver) open_Driver();
			Set<Cookie> cookies = get_Cookies();
			Properties properties = new Properties();
			System.out.println("序列化cookie:");
			for (Cookie cookie : cookies) {
				properties.setProperty(cookie.getName(), cookie.getValue());
				System.out.println("name: " + cookie.getName() + ", value: " + cookie.getValue());
			}
			fos = new FileOutputStream(file_path);
			oos = new ObjectOutputStream(fos);
			oos.writeObject(properties);
		} catch (Exception e) {
			e.printStackTrace();
		} finally{
			try {
				if(null != oos){
					oos.flush();
					oos.close();
				}
				if(null != fos){
					fos.close();
				}
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
	}
	
	/**
	 * 添加本地Cookies
	 * @param file_path 序列化路径
	 */
	public static boolean add_Local_Cookeies(File file_path){
		boolean result = false;
		FileInputStream fis = null;
		ObjectInputStream ois = null;
		try {
			if(null == driver) open_Driver();
			fis = new FileInputStream(file_path);
			ois = new ObjectInputStream(fis);
			Properties cookies = (Properties) ois.readObject();
			Set<Entry<Object, Object>> entrySet = cookies.entrySet();
			System.out.println("反序列化cookie:");
			for (Entry<Object, Object> entry : entrySet) {
				Cookie cookie = new Cookie(entry.getKey().toString(), entry.getValue().toString());
				System.out.println("name: " + cookie.getName() + ", value: " + cookie.getValue());
				//放入cookie
				driver.manage().addCookie(cookie);
			}
			result = true;
		} catch (Exception e) {
		} finally {
			try {
				if(null != ois){
					ois.close();
				}
				if(null != fis){
					fis.close();
				}
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
		return result;
	}
	
	/**
	 * 删除cookie
	 * @param file_path cookie文件路径
	 */
	public static void delete_Cookies(File file_path){
		try {
			if(null == driver) open_Driver();
			driver.manage().deleteAllCookies();
			if (file_path.isFile() && file_path.exists()) {  
				file_path.delete();  
			}
		} catch (Exception e) {
			e.printStackTrace();
		}  		
	}

	/**
	 * 执行js
	 * @param js 
	 * @throws Exception 
	 */
	public static Object execute_JS(String js) throws Exception{
		Object result = null;
		try {
			if(null == driver) open_Driver();
			JavascriptExecutor jse = (JavascriptExecutor)driver;
			result = jse.executeScript(js);
		} catch (Exception e) {
			e.printStackTrace();
			throw new Exception("执行js异常");
		}
		return result;
	}
	
	/**
	 * 点击alert弹窗中的确定
	 * @throws Exception 
	 */
	public static void alert_Click_OK() throws Exception{
		try {
			if(null == driver) open_Driver();
			driver.switchTo().alert().accept();
		} catch (Exception e) {
			e.printStackTrace();
			throw new Exception("点击弹窗异常");
		}
	}
	
}
