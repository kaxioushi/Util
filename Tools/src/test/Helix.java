package test;
/**
 * 螺旋矩阵
 * c为层数
 * 每个环的第一个数的值是固定的  arr[c][c]=arr[c-1][c-1]+(n-(2*c)-1)*4
 * */
public class Helix {
	public static void main(String[] args){
		show(getHelix(7));
	}
	public static int[][] getHelix(int n){
		int[][] arr=init(n);
		int x=0;
		int y=0;
		for(int c=0;c<n/2;c++){
			if(c==0){
				arr[c][c]=1;
			}else{
				arr[c][c]=(n-(2*(c-1))-1)*4+arr[c-1][c-1];
			}
			for(y=c,x=c;x==c&&y<n-1-c;y++){
				arr[x][y+1]=arr[x][y]+1;
			}
			for(x=c;x<n-c-1;x++){
				arr[x+1][y]=arr[x][y]+1;
			}
			for(x=n-1-c,y=n-c-1;y>c;y--){
				arr[x][y-1]=arr[x][y]+1;
			}
			for(y=c,x=n-c-1;x>c+1;x--){
				arr[x-1][y]=arr[x][y]+1;
			}
		}
		return arr;
	}
	public static void show(int[][] arr){
		for(int i=0;i<arr.length;i++){
			for(int j=0;j<arr[i].length;j++){
				System.out.print(arr[i][j]+"\t");
			}
			System.out.println();
		}
	}
	public static int[][] init(int n){
		int[][] arr=new int[n][n];
		for(int i=0;i<arr.length;i++){
			for(int j=0;j<arr[i].length;j++){
				arr[i][j]=0;
			}
		}
		return arr;
	}
}
