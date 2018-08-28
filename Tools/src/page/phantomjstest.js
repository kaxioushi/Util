sys=require('system')
add=sys.args[1]; //��������еڶ�������  ������Ҫ�õ�
phantom.outputEncoding="utf-8";
var page=require('webpage').create();
page.open(add,function(status){
	if(status!=='success'){
		console.log('Unable to post!')
	}else{
		console.log(title);
		var title=page.evaluate(function(){
			
			//return document.title;
		});
		console.log(page.title);
		console.log(page.content);
	}
	phantom.exit();
});
