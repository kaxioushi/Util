package test;

public class son extends father {
	{
		System.out.println("static son");
	}
	public static void main(String[] args) {
		new son();

	}
	public son(){
		System.out.println("son");
	}
}
