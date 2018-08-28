package emailUtil;

import java.io.File;
import java.io.UnsupportedEncodingException;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Properties;

import javax.activation.DataHandler;
import javax.activation.DataSource;
import javax.activation.FileDataSource;
import javax.mail.Authenticator;
import javax.mail.BodyPart;
import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.Multipart;
import javax.mail.PasswordAuthentication;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeBodyPart;
import javax.mail.internet.MimeMessage;
import javax.mail.internet.MimeMultipart;
import javax.mail.internet.MimeUtility;

public class MailUtil {

	public static void main(String[] args) {
		List<File> list=new ArrayList<File>();
		list.add(new File("C:\\Users\\cy0093\\Desktop\\temp.txt"));
		list.add(new File("C:\\Users\\cy0093\\Desktop\\精华.txt"));
		Map<String, String> tomap=new HashMap<String, String>();
		tomap.put("2513995016@qq.com", "小位");
		tomap.put("2084588921@qq.com", "小苏");
		//sendQQEmail("smtp.qq.com", "1419317372@qq.com", "fezifqnjilgbjaef", "1419317372@qq.com", "kkak", tomap, "标题", "内容", list);//成功
		//sendCompanyMail("smtp.int800.com","weijuntao@int800.com", "7f1d1de48c84f7e", "标题", "weijuntao@int800.com", "小位", tomap, "内容", new Date(), list);//成功
		//sendMail("smtp.qq.com", "1419317372@qq.com", "fezifqnjilgbjaef", "1419317372@qq.com", "kakk", tomap, "biaoti ", "neirong", new Date(), list);
	}
	/**
	 * 发送带附件的邮件  企业邮件对企业邮件
	 * @param userName 发件人邮箱地址"weijuntao@int800.com"
	 * @param password 发件人邮箱密码 "7f1d1de48c84f7e"
	 * @param title 邮件标题
	 * @param  设置发送邮件的时间
	 * @param taddress 收件人邮箱地址
	 * @param tname 收件人别名
	 * @param  ccUser  格式 XXX@XX.com,XXX@XX.com,XXX@XX.com
	 * @param List<String[2]> tolist 指明邮件抄送1人  里面放的是个二维数组  二维数组里面第一个元素放的是抄送人邮箱地址 第二个是抄送人别名
	 * @param content 邮件内容 
	 * @param list<File> filelist 要添加的附件
	 * */
	public static void sendCompanyMail(String host,final String from,final String psw ,String title,String to,String  toname
			,String ccUser,String content,Date date,List<File> flist) {
		 // 使用JavaMail发送邮件的5个步骤  
		//1.添加SMTP 服务器参数
		Properties pro=new Properties();
		//主机地址    smtp.int800.com
		pro.setProperty("mail.smtp.host", host);
		//邮件协议
		pro.setProperty("mail.transport.protocol", "smtp");
		// 认证  
	    pro.setProperty("mail.smtp.auth", "true");  
	    // 端口  
	    pro.setProperty("mail.smtp.port", "25"); 
	    //2.创建协议 session
	    Session session=Session.getDefaultInstance(pro, new Authenticator() {
	    	public PasswordAuthentication getPasswordAuthentication() {
	    		return new PasswordAuthentication(from, psw);//发件人邮件用户名、密码
	    	}
		});
	    // 开启Session的debug模式，这样就可以查看到程序发送Email的运行状态  
	    session.setDebug(true);
	    //创建邮件
	    //创建邮件对象
	    MimeMessage message=new MimeMessage(session);
	    try {
			message.setSubject(title);//邮件标题
			if(date==null){//指定邮件发送的时间
	    		message.setSentDate(new Date());
	    	}else{
	    		message.setSentDate(date);
	    	}
			message.setFrom(new InternetAddress(from));//指明邮件发件人?
			message.setRecipient(Message.RecipientType.TO, new InternetAddress(to, toname));//指定收件人地址和别名
//			//添加邮件抄送人  这种智能添加一个抄送人
//			if(tomap!=null) {
//				for(String key:tomap.keySet()) {
//					message.setRecipient(Message.RecipientType.CC, new InternetAddress(key, tomap.get(key)));
//				}
//			}
			if(ccUser!=null){  //这种可以加多个抄送人
				@SuppressWarnings("static-access")
				InternetAddress[] cc=new InternetAddress().parse(ccUser);
				message.setRecipients(Message.RecipientType.CC, cc);
			}
			//向multipart 添加邮件的各个部分  内容和附件
			Multipart part=new MimeMultipart();
			//向 part里添加内容  就是邮件的内容
			BodyPart body=new MimeBodyPart();
			body.setContent(content, "text/html;charset=UTF-8");
			//将内容添加到multipart中
			part.addBodyPart(body);
			
			//添加附件
			for(int i=0;i<flist.size();i++) {
				File fpath=flist.get(i);
				BodyPart bf=new MimeBodyPart();
				FileDataSource fds=new FileDataSource(fpath);
				bf.setDataHandler(new DataHandler(fds));
				//MimeUtility.encodeWord可以避免文件名乱码  
				bf.setFileName(MimeUtility.encodeWord(fds.getFile().getName()));
				part.addBodyPart(bf);
			}
			message.setContent(part);
			// 4. 发送邮件,Transport每次发送成功程序帮忙关闭  
			Transport.send(message, message.getAllRecipients());
	    } catch (MessagingException | UnsupportedEncodingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	/**
	 * QQ邮箱
	 * @param host  smtp.qq.com smtp服务器
	 * @param form 1419317372@qq.com 发件人地址
	 * @param psw  fezifqnjilgbjaef 密码就是前面说的16位STMP口令   ipfspkalacmxihbf
	 * @param to 2513995016@qq.com  收件人地址
	 * @param ccUser  格式 XXX@XX.com,XXX@XX.com,XXX@XX.com
	 * @param title  邮件标题
	 * @param content 邮件内容
	 * @param flist List<File>  附件队列
 	 * */
	public static void sendQQEmail(String host,String from,String psw,String to,String toname,String ccUser,String title,String content,List<File> flist){
		//创建Properties记录邮箱的属性
		Properties pro=new Properties();
		//便是SMTP发送邮件，进行身份验证
		pro.put("mail.smtp.auth", "true");
		//写smtp服务器
		pro.put("mail.smtp.host", host);
		//端口号  QQ邮箱给出了两个端口号  587是其中一个  465
		pro.put("mail.smtp.port", "465");
		pro.put("mail.smtp.ssl.enable", true);
		//用pro 创建一个session
		Session session=Session.getDefaultInstance(pro);
		//有了下面 可以在发送邮件过程中在consol处显示过程信息 拱调试者看到发送过程
		session.setDebug(true);
		//用session为参数定义消息对象
		MimeMessage message=new MimeMessage(session);
		try{
			//加载发件人地址
			message.setFrom(new InternetAddress(from));
			//加载收件人地址
			message.addRecipient(Message.RecipientType.TO, new InternetAddress(to, toname));
			//加载标题
			message.setSubject(title);
			//向multipart对象中添加邮件的各个部分内容，包括文件内容和附件
			Multipart part=new MimeMultipart();
			//设置邮件的文本内容
			BodyPart body=new MimeBodyPart();
			body.setText(content);
			part.addBodyPart(body);
			
			
			//添加邮件抄送人  只能提那家一个抄送人
//			if(tomap!=null) {
//				for(String key:tomap.keySet()) {
//					message.setRecipient(Message.RecipientType.CC, new InternetAddress(key, tomap.get(key)));
//				}
//			}
			if(ccUser!=null){  //这种可以加多个抄送人
				@SuppressWarnings("static-access")
				InternetAddress[] cc=new InternetAddress().parse(ccUser);
				message.setRecipients(Message.RecipientType.CC, cc);
			}
			for(int i=0;i<flist.size();i++){
				File f=flist.get(i);
				//添加附件
				BodyPart fbody=new MimeBodyPart();
				DataSource source=new FileDataSource(f);
				//添加附件内容
				fbody.setDataHandler(new DataHandler(source));
				//添加附件标题   很重要  通过下面的base64编码的转换可以保证让你的中文附件标题名在发送是不会乱码
				sun.misc.BASE64Encoder enc = new sun.misc.BASE64Encoder();
				fbody.setFileName("=?GBK?B?"+ enc.encode(f.getName().getBytes()) + "?=");
				part.addBodyPart(fbody);
			}
			
			//将part对象放到message中
			message.setContent(part);
			//保存邮件
			message.saveChanges();
			//发送邮件
			Transport transport=session.getTransport("smtp");
			//链接服务器的邮箱
			transport.connect(host, from, psw);
			//把邮件发送出去
			transport.sendMessage(message, message.getAllRecipients());
			transport.close();
		}catch(Exception e){
			e.printStackTrace();
		}
	}
	/**
	 * 发送邮件  使用与企业邮箱和QQ
	 * @param from 发件人地址
	 * @param psw 发件人密码  (对于QQ邮箱  是16位的口令)
	 * @param ccUser  格式 XXX@XX.com,XXX@XX.com,XXX@XX.com
	 * */
	public static void sendMail(String host,String from,String psw,String to,String toname,String ccUser,String title,String content,Date date,List<File> flist){
		Properties pro=new Properties();
		//便是SMTP发送邮件，进行身份验证
		pro.put("mail.smtp.auth", "true");
		if(from.endsWith("@qq.com")){
			//便是SMTP发送邮件，进行身份验证
			pro.put("mail.smtp.auth", "true");
			//写smtp服务器
			pro.put("mail.smtp.host", host);
			//端口号  QQ邮箱给出了两个端口号  587是其中一个  465
			pro.put("mail.smtp.port", "465");
			pro.put("mail.smtp.ssl.enable", true);
		}else {
			//主机地址
			pro.setProperty("mail.smtp.host", "smtp.int800.com");
			//邮件协议
			pro.setProperty("mail.transport.protocol", "smtp");
			// 认证  
		    pro.setProperty("mail.smtp.auth", "true");  
		    // 端口  
		    pro.setProperty("mail.smtp.port", "25"); 
		}
		Session session=Session.getDefaultInstance(pro);
		// 开启Session的debug模式，这样就可以查看到程序发送Email的运行状态  
	    session.setDebug(true);
	    //创建邮件对象
	    MimeMessage message=new MimeMessage(session);
	    try{
	    	message.setSubject(title);//邮件标题
	    	if(date==null){//指定邮件发送的时间
	    		message.setSentDate(new Date());
	    	}else{
	    		message.setSentDate(date);
	    	}
	    	message.setFrom(new InternetAddress(from));
	    	message.setRecipient(Message.RecipientType.TO, new InternetAddress(to, toname));
	    	
	    	
			//向multipart 添加邮件的各个部分  内容和附件
			Multipart part=new MimeMultipart();
			//向 part里添加内容  就是邮件的内容
			BodyPart body=new MimeBodyPart();
			body.setContent(content, "text/html;charset=UTF-8");
			//将内容添加到multipart中
			part.addBodyPart(body);
			
			if(ccUser!=null){  //这种可以加多个抄送人
				@SuppressWarnings("static-access")
				InternetAddress[] cc=new InternetAddress().parse(ccUser);
				message.setRecipients(Message.RecipientType.CC, cc);
			} 
			//添加附件
			for(int i=0;i<flist.size();i++) {
				File fpath=flist.get(i);
				BodyPart bf=new MimeBodyPart();
				FileDataSource fds=new FileDataSource(fpath);
				bf.setDataHandler(new DataHandler(fds));
				//MimeUtility.encodeWord可以避免文件名乱码  
				bf.setFileName(MimeUtility.encodeWord(fds.getFile().getName()));
				part.addBodyPart(bf);
			}
			message.setContent(part);
			//保存邮件
			message.saveChanges();
			//发送邮件
			Transport transport=session.getTransport("smtp");
			if(from.endsWith("@qq.com")){
				//链接服务器的邮箱
				transport.connect("smtp.qq.com", from, psw);
			}else{
				transport.connect("smtp.int800.com", from, psw);
			}
			//把邮件发送出去
			transport.sendMessage(message, message.getAllRecipients());
			transport.close();
	    }catch(Exception e){
	    	e.printStackTrace();
	    }
	}
}
