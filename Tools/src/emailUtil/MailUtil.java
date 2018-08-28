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
		list.add(new File("C:\\Users\\cy0093\\Desktop\\����.txt"));
		Map<String, String> tomap=new HashMap<String, String>();
		tomap.put("2513995016@qq.com", "Сλ");
		tomap.put("2084588921@qq.com", "С��");
		//sendQQEmail("smtp.qq.com", "1419317372@qq.com", "fezifqnjilgbjaef", "1419317372@qq.com", "kkak", tomap, "����", "����", list);//�ɹ�
		//sendCompanyMail("smtp.int800.com","weijuntao@int800.com", "7f1d1de48c84f7e", "����", "weijuntao@int800.com", "Сλ", tomap, "����", new Date(), list);//�ɹ�
		//sendMail("smtp.qq.com", "1419317372@qq.com", "fezifqnjilgbjaef", "1419317372@qq.com", "kakk", tomap, "biaoti ", "neirong", new Date(), list);
	}
	/**
	 * ���ʹ��������ʼ�  ��ҵ�ʼ�����ҵ�ʼ�
	 * @param userName �����������ַ"weijuntao@int800.com"
	 * @param password �������������� "7f1d1de48c84f7e"
	 * @param title �ʼ�����
	 * @param  ���÷����ʼ���ʱ��
	 * @param taddress �ռ��������ַ
	 * @param tname �ռ��˱���
	 * @param  ccUser  ��ʽ XXX@XX.com,XXX@XX.com,XXX@XX.com
	 * @param List<String[2]> tolist ָ���ʼ�����1��  ����ŵ��Ǹ���ά����  ��ά���������һ��Ԫ�طŵ��ǳ����������ַ �ڶ����ǳ����˱���
	 * @param content �ʼ����� 
	 * @param list<File> filelist Ҫ��ӵĸ���
	 * */
	public static void sendCompanyMail(String host,final String from,final String psw ,String title,String to,String  toname
			,String ccUser,String content,Date date,List<File> flist) {
		 // ʹ��JavaMail�����ʼ���5������  
		//1.���SMTP ����������
		Properties pro=new Properties();
		//������ַ    smtp.int800.com
		pro.setProperty("mail.smtp.host", host);
		//�ʼ�Э��
		pro.setProperty("mail.transport.protocol", "smtp");
		// ��֤  
	    pro.setProperty("mail.smtp.auth", "true");  
	    // �˿�  
	    pro.setProperty("mail.smtp.port", "25"); 
	    //2.����Э�� session
	    Session session=Session.getDefaultInstance(pro, new Authenticator() {
	    	public PasswordAuthentication getPasswordAuthentication() {
	    		return new PasswordAuthentication(from, psw);//�������ʼ��û���������
	    	}
		});
	    // ����Session��debugģʽ�������Ϳ��Բ鿴��������Email������״̬  
	    session.setDebug(true);
	    //�����ʼ�
	    //�����ʼ�����
	    MimeMessage message=new MimeMessage(session);
	    try {
			message.setSubject(title);//�ʼ�����
			if(date==null){//ָ���ʼ����͵�ʱ��
	    		message.setSentDate(new Date());
	    	}else{
	    		message.setSentDate(date);
	    	}
			message.setFrom(new InternetAddress(from));//ָ���ʼ�������?
			message.setRecipient(Message.RecipientType.TO, new InternetAddress(to, toname));//ָ���ռ��˵�ַ�ͱ���
//			//����ʼ�������  �����������һ��������
//			if(tomap!=null) {
//				for(String key:tomap.keySet()) {
//					message.setRecipient(Message.RecipientType.CC, new InternetAddress(key, tomap.get(key)));
//				}
//			}
			if(ccUser!=null){  //���ֿ��ԼӶ��������
				@SuppressWarnings("static-access")
				InternetAddress[] cc=new InternetAddress().parse(ccUser);
				message.setRecipients(Message.RecipientType.CC, cc);
			}
			//��multipart ����ʼ��ĸ�������  ���ݺ͸���
			Multipart part=new MimeMultipart();
			//�� part���������  �����ʼ�������
			BodyPart body=new MimeBodyPart();
			body.setContent(content, "text/html;charset=UTF-8");
			//��������ӵ�multipart��
			part.addBodyPart(body);
			
			//��Ӹ���
			for(int i=0;i<flist.size();i++) {
				File fpath=flist.get(i);
				BodyPart bf=new MimeBodyPart();
				FileDataSource fds=new FileDataSource(fpath);
				bf.setDataHandler(new DataHandler(fds));
				//MimeUtility.encodeWord���Ա����ļ�������  
				bf.setFileName(MimeUtility.encodeWord(fds.getFile().getName()));
				part.addBodyPart(bf);
			}
			message.setContent(part);
			// 4. �����ʼ�,Transportÿ�η��ͳɹ������æ�ر�  
			Transport.send(message, message.getAllRecipients());
	    } catch (MessagingException | UnsupportedEncodingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	/**
	 * QQ����
	 * @param host  smtp.qq.com smtp������
	 * @param form 1419317372@qq.com �����˵�ַ
	 * @param psw  fezifqnjilgbjaef �������ǰ��˵��16λSTMP����   ipfspkalacmxihbf
	 * @param to 2513995016@qq.com  �ռ��˵�ַ
	 * @param ccUser  ��ʽ XXX@XX.com,XXX@XX.com,XXX@XX.com
	 * @param title  �ʼ�����
	 * @param content �ʼ�����
	 * @param flist List<File>  ��������
 	 * */
	public static void sendQQEmail(String host,String from,String psw,String to,String toname,String ccUser,String title,String content,List<File> flist){
		//����Properties��¼���������
		Properties pro=new Properties();
		//����SMTP�����ʼ������������֤
		pro.put("mail.smtp.auth", "true");
		//дsmtp������
		pro.put("mail.smtp.host", host);
		//�˿ں�  QQ��������������˿ں�  587������һ��  465
		pro.put("mail.smtp.port", "465");
		pro.put("mail.smtp.ssl.enable", true);
		//��pro ����һ��session
		Session session=Session.getDefaultInstance(pro);
		//�������� �����ڷ����ʼ���������consol����ʾ������Ϣ �������߿������͹���
		session.setDebug(true);
		//��sessionΪ����������Ϣ����
		MimeMessage message=new MimeMessage(session);
		try{
			//���ط����˵�ַ
			message.setFrom(new InternetAddress(from));
			//�����ռ��˵�ַ
			message.addRecipient(Message.RecipientType.TO, new InternetAddress(to, toname));
			//���ر���
			message.setSubject(title);
			//��multipart����������ʼ��ĸ����������ݣ������ļ����ݺ͸���
			Multipart part=new MimeMultipart();
			//�����ʼ����ı�����
			BodyPart body=new MimeBodyPart();
			body.setText(content);
			part.addBodyPart(body);
			
			
			//����ʼ�������  ֻ�����Ǽ�һ��������
//			if(tomap!=null) {
//				for(String key:tomap.keySet()) {
//					message.setRecipient(Message.RecipientType.CC, new InternetAddress(key, tomap.get(key)));
//				}
//			}
			if(ccUser!=null){  //���ֿ��ԼӶ��������
				@SuppressWarnings("static-access")
				InternetAddress[] cc=new InternetAddress().parse(ccUser);
				message.setRecipients(Message.RecipientType.CC, cc);
			}
			for(int i=0;i<flist.size();i++){
				File f=flist.get(i);
				//��Ӹ���
				BodyPart fbody=new MimeBodyPart();
				DataSource source=new FileDataSource(f);
				//��Ӹ�������
				fbody.setDataHandler(new DataHandler(source));
				//��Ӹ�������   ����Ҫ  ͨ�������base64�����ת�����Ա�֤��������ĸ����������ڷ����ǲ�������
				sun.misc.BASE64Encoder enc = new sun.misc.BASE64Encoder();
				fbody.setFileName("=?GBK?B?"+ enc.encode(f.getName().getBytes()) + "?=");
				part.addBodyPart(fbody);
			}
			
			//��part����ŵ�message��
			message.setContent(part);
			//�����ʼ�
			message.saveChanges();
			//�����ʼ�
			Transport transport=session.getTransport("smtp");
			//���ӷ�����������
			transport.connect(host, from, psw);
			//���ʼ����ͳ�ȥ
			transport.sendMessage(message, message.getAllRecipients());
			transport.close();
		}catch(Exception e){
			e.printStackTrace();
		}
	}
	/**
	 * �����ʼ�  ʹ������ҵ�����QQ
	 * @param from �����˵�ַ
	 * @param psw ����������  (����QQ����  ��16λ�Ŀ���)
	 * @param ccUser  ��ʽ XXX@XX.com,XXX@XX.com,XXX@XX.com
	 * */
	public static void sendMail(String host,String from,String psw,String to,String toname,String ccUser,String title,String content,Date date,List<File> flist){
		Properties pro=new Properties();
		//����SMTP�����ʼ������������֤
		pro.put("mail.smtp.auth", "true");
		if(from.endsWith("@qq.com")){
			//����SMTP�����ʼ������������֤
			pro.put("mail.smtp.auth", "true");
			//дsmtp������
			pro.put("mail.smtp.host", host);
			//�˿ں�  QQ��������������˿ں�  587������һ��  465
			pro.put("mail.smtp.port", "465");
			pro.put("mail.smtp.ssl.enable", true);
		}else {
			//������ַ
			pro.setProperty("mail.smtp.host", "smtp.int800.com");
			//�ʼ�Э��
			pro.setProperty("mail.transport.protocol", "smtp");
			// ��֤  
		    pro.setProperty("mail.smtp.auth", "true");  
		    // �˿�  
		    pro.setProperty("mail.smtp.port", "25"); 
		}
		Session session=Session.getDefaultInstance(pro);
		// ����Session��debugģʽ�������Ϳ��Բ鿴��������Email������״̬  
	    session.setDebug(true);
	    //�����ʼ�����
	    MimeMessage message=new MimeMessage(session);
	    try{
	    	message.setSubject(title);//�ʼ�����
	    	if(date==null){//ָ���ʼ����͵�ʱ��
	    		message.setSentDate(new Date());
	    	}else{
	    		message.setSentDate(date);
	    	}
	    	message.setFrom(new InternetAddress(from));
	    	message.setRecipient(Message.RecipientType.TO, new InternetAddress(to, toname));
	    	
	    	
			//��multipart ����ʼ��ĸ�������  ���ݺ͸���
			Multipart part=new MimeMultipart();
			//�� part���������  �����ʼ�������
			BodyPart body=new MimeBodyPart();
			body.setContent(content, "text/html;charset=UTF-8");
			//��������ӵ�multipart��
			part.addBodyPart(body);
			
			if(ccUser!=null){  //���ֿ��ԼӶ��������
				@SuppressWarnings("static-access")
				InternetAddress[] cc=new InternetAddress().parse(ccUser);
				message.setRecipients(Message.RecipientType.CC, cc);
			} 
			//��Ӹ���
			for(int i=0;i<flist.size();i++) {
				File fpath=flist.get(i);
				BodyPart bf=new MimeBodyPart();
				FileDataSource fds=new FileDataSource(fpath);
				bf.setDataHandler(new DataHandler(fds));
				//MimeUtility.encodeWord���Ա����ļ�������  
				bf.setFileName(MimeUtility.encodeWord(fds.getFile().getName()));
				part.addBodyPart(bf);
			}
			message.setContent(part);
			//�����ʼ�
			message.saveChanges();
			//�����ʼ�
			Transport transport=session.getTransport("smtp");
			if(from.endsWith("@qq.com")){
				//���ӷ�����������
				transport.connect("smtp.qq.com", from, psw);
			}else{
				transport.connect("smtp.int800.com", from, psw);
			}
			//���ʼ����ͳ�ȥ
			transport.sendMessage(message, message.getAllRecipients());
			transport.close();
	    }catch(Exception e){
	    	e.printStackTrace();
	    }
	}
}
