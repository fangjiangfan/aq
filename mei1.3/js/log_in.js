

$(function(){
	$(".user").blur(function(){
		var user=$(".user").val();
		if(user.length <= 0) {
				$(this).siblings("p").html("请输已验证手机号或邮箱");
				$(this).siblings("p").css("display", "block");
			} else {
				$(this).siblings("p").css("display", "none");
			}
	})
	$(".zhuce").click(function(){
		var xhr = new XMLHttpRequest();
			//10.36.135.139
//              xhr.open("post", "http://127.0.0.1/www/json/code/03_login.php", true);
                xhr.open("post", "http://10.36.135.139/www/json/code/03_login.php", true);
                xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                xhr.send("username="+$(".user").val() + "&password="+$(".mima").val() );
                xhr.onreadystatechange = function(){
                    if (xhr.readyState==4 && xhr.status==200) {
                    	var obj=JSON.parse(xhr.responseText);
                    	console.log(obj);
                    	if(obj.status==1){
                    		location.href="index.html?user="+$(".user").val();
                    	}
                    	else{
                    		alert("您输入的信息有误，请重新输入")
                    	}
                    }
                   }
	})
})
