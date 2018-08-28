package page;

import java.util.List;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;

public class seleniumUtil {

	public static void main(String[] args) {
		handleDriver("https://www.baidu.com/");
	}
	//获得响应的driver
	public static WebDriver getwebDriver(String url){
		System.setProperty("webdriver.chrome.driver", "src/selenium/chromedriver.exe");
		WebDriver driver = new ChromeDriver();
        driver.get(url);
        return driver;
	}
	/**
	 操作浏览器
  以抓取百度为例，用户浏览器打开后。Selenium根据关键字找到输入框，并点击搜索，并将最终结果输入
	 * */
	public static void handleDriver(String url){
		WebDriver driver=getwebDriver(url);
		WebElement keyword = driver.findElement(By.id("kw"));
        //enter keyword
        keyword.sendKeys("selenium");
        //get search button and click it
        WebElement searchBtn = driver.findElement(By.id("su"));
        searchBtn.click();
        try {
			Thread.sleep(2000);
		} catch (InterruptedException e) {
			e.printStackTrace();
		}//waiting for the result
        //get result and print out cyclical--搜索结果是h3标签class=“t”，故以此为条件
        List<WebElement> titles = driver.findElements(By.cssSelector("h3.t"));
        for(WebElement title:titles){
            WebElement webTitle=title.findElement(By.tagName("a"));
            System.err.println("webTitle:"+webTitle+":"+webTitle.getText());
        }
	}
}
