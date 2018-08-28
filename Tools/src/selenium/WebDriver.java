package selenium;

import org.openqa.selenium.Proxy;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.phantomjs.PhantomJSDriver;
import org.openqa.selenium.remote.CapabilityType;
import org.openqa.selenium.remote.DesiredCapabilities;

public class WebDriver {
	public static void main(String[] args) {
		// TODO Auto-generated method stub

	}
	//对应chrome
	public  void getchromeDriver(DesiredCapabilities  des){
		  System.setProperty("webdriver.chrome.driver", "chromedriver.exe");
		  ChromeDriver driver = new ChromeDriver(des);
	      driver.get("http://www.baidu.com");
	      //修改代理
	      ChromeOptions options = new ChromeOptions();
	        options.addArguments("user-agent=myAgent");
		driver = new ChromeDriver(options);
	}
	//对应PhantomJS
	public  void getPhantomJSDriver(DesiredCapabilities  des){
		System.setProperty("webdriver.chrome.driver", "phantomjs.exe");
		PhantomJSDriver driver = new PhantomJSDriver(des);
		driver.get("http://www.baidu.com");
		//修改代理
		DesiredCapabilities capabilities;
        capabilities = new DesiredCapabilities();       
        capabilities.setCapability("phantomjs.page.settings.userAgent", "Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:16.0) Gecko/20121026 Firefox/16.0");
        driver = new PhantomJSDriver(capabilities);
	}
	//对应firefox
	public  void getfirefoxDriver(DesiredCapabilities des){
		System.setProperty("webdriver.chrome.driver", "firefox.exe");
		FirefoxDriver driver = new FirefoxDriver(des);
		driver.get("http://www.baidu.com");
	}
	//设置代理
	public DesiredCapabilities setproxy(){
		Proxy proxy = new Proxy();  
        proxy.setHttpProxy("127.0.0.0:8888");  
        DesiredCapabilities capabilities = DesiredCapabilities.chrome();  
        capabilities.setCapability(CapabilityType.PROXY, proxy);
        return capabilities;
	}
}
