package DBUtil;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

public class DataBaseUtil {
	{
		try {
			Class.forName("com.microsoft.sqlserver.jdbc.SQLServerDriver");
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		}
	}
	public static Connection con;
	
	public static void main(String[] args){
		DataBaseUtil dbutil=new DataBaseUtil();
		//jdbc:sqlserver://db66.oaqi.com:9266;databaseName=filmdb;user=dev;password=Wy@2012!
		dbutil.getConn("jdbc:sqlserver://db66.oaqi.com:9266;databaseName=filmdb", "dev", "Wy@2012!");
		Statement stat;
		try {
			stat = con.createStatement();
			ResultSet rs = stat.executeQuery("SELECT TOP 10* FROM t_filmdb_topic order BY crdate DESC ");
			while(rs.next()){
				String url=rs.getString("url");
				//String url=rs.getString(1);
				String title=rs.getString("title");
				System.out.println(url+"\t"+title);
			}
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}  
	}
	//鍗曡繛鎺�
	public Connection getConn(String url,String user,String password) {
		try {
			con=DriverManager.getConnection(url, user, password);
			return con;
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return null;
	}
	public void close(){
		try {
			con.close();
		} catch (SQLException e) {
			e.printStackTrace();
		}
	}
}
