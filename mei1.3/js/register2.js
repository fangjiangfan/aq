$(function() {
	//加载底部
	$("#bottom").load("bottom.html")
	var flag1 = false; //账号
	var flag2 = false; //密码
	var flag3 = false; //重复密码
	var flag4=false;//验证码
	//账号验证
	$("ul").find("input").eq(0).keyup(function() {
		var user = $(this).val();
		var reg = /^[a-zA-Z_]\w{7,}$/;
		if(reg.test(user)) {
			$(this).siblings("p").css("display", "none");
			flag1 = true;
		} else {
			flag1 = false;
			$(this).siblings("p").css("display", "block");
			if(user.length <= 0) {
				$(this).siblings("p").html("请输手机号或邮箱");
			} else {
				$(this).siblings("p").html("请输入正确的手机号或邮箱");
			}
		}
	})
	//密码验证
//	$("ul").find("input").eq(1).keyup(function() {
//		var pwd = $(this).val();
//		var reg = /^.{6,20}$/;
//		var reg1 = /\d+/;
//		var reg2 = /[a-z]+/;
//		var reg3 = /[A-Z]+/;
//		var reg4 = /[_]+/;
//		var s = 0; //记录次数通过次数判断密码强度
//		if(reg.test(pwd)) {
//			if(reg1.test(pwd)) {
//				s++;
//			}
//			if(reg2.test(pwd)) {
//				s++;
//			}
//			if(reg3.test(pwd)) {
//				s++;
//			}
//			if(reg.test(pwd) && reg4.test(pwd)) {
//				s++;
//			}
//			if(s == 4 && pwd.length > 16 && pwd.length < 20) {
//				flag2 = true;
//				$(this).siblings(".pwd").find("span").css("background", "#000");
//				$(this).siblings("p").css("display", "none");
//			}
//			if(s == 3 && pwd.length > 11 && pwd.length < 15 || s == 2) {
//				flag2 = true;
//				$(this).siblings(".pwd").find("span").css("background", "#000");
//				$(this).siblings(".pwd").find("span").eq(2).css("background", "#4c4c4c");
//				$(this).siblings("p").css("display", "none");
//			}
//			if(s == 1 && pwd.length > 6 && pwd.length < 10) {
//				$(this).siblings("p").css("display", "none");
//				flag2 = true;
//			}
//		} else {
//			flag2 = false;
//			$(this).siblings().find(".pwd").css("display", "block");
//			if(pwd.length <= 0) {
//				$(this).siblings("p").css("display", "block");
//				$(this).siblings("p").html("请输入密码");
//			} else if(pwd.length <= 5 && pwd.length > 0) {
//				$(this).siblings("p").css("display", "block");
//				$(this).siblings("p").html("密码不能少于6位");
//			} else if(pwd.length > 6 && pwd.length < 21) {
//				$(this).siblings("p").css("display", "block");
//				$(this).siblings("p").html("密码不能含有特殊符号");
//			}
//
//		}
//	})

		$("ul").find("input").eq(1).keyup(function() {
		var pwd = $(this).val();
		var reg = /^.{6,20}$/;
		var reg1 = /\d+/;
//		var reg2 = /[a-z]+/;
//		var reg3 = /[A-Z]+/;
//		var reg4 = /[_]+/;
//		var s = 0; //记录次数通过次数判断密码强度
	if(reg.test(pwd)) {
//			if(reg1.test(pwd)) {
//				s++;
//			}
//			if(reg2.test(pwd)) {
//				s++;
//			}
//			if(reg3.test(pwd)) {
//				s++;
//			}
//			if(reg.test(pwd) && reg4.test(pwd)) {
//				s++;
//			}
			if( pwd.length > 16 && pwd.length < 20) {
				flag2 = true;
				$(this).siblings(".pwd").find("span").css("background", "#000");
				$(this).siblings("p").css("display", "none");
			}
			if(pwd.length > 11 && pwd.length < 15 ) {
				flag2 = true;
				$(this).siblings(".pwd").find("span").css("background", "#000");
				$(this).siblings(".pwd").find("span").eq(2).css("background", "#4c4c4c");
				$(this).siblings("p").css("display", "none");
			}
			if(pwd.length > 6 && pwd.length < 10) {
				$(this).siblings("p").css("display", "none");
				flag2 = true;
			}
		} else {
			flag2 = false;
			$(this).siblings().find(".pwd").css("display", "block");
			if(pwd.length <= 0) {
				$(this).siblings("p").css("display", "block");
				$(this).siblings("p").html("请输入密码");
			} else if(pwd.length <= 5 && pwd.length > 0) {
				$(this).siblings("p").css("display", "block");
				$(this).siblings("p").html("密码不能少于6位");
			} else if(pwd.length > 6 && pwd.length < 21) {
				$(this).siblings("p").css("display", "block");
				$(this).siblings("p").html("密码不能含有特殊符号");
			}

		}
	})

	//重复密码
	$("ul").find("input").eq(2).keyup(function() {
		if($(this).val() == $("ul").find("input").eq(1).val()) {
			$(this).siblings("p").css("display", "none");
			flag3 = true;
		} else {
			flag3 = false;
			$(this).siblings("p").css("display", "block");
			$(this).siblings("p").html("密码和确认密码不一致请重新输入")
		}
	})
	
	//点击验证码
			var num=4;//验证码长度
		$("ul").find("input").eq(3).click(function() {		
					var str="";
					for(var i=0;i<num;i++){
						var a=Math.random()>0.5?true:false;
						if(a){
							str +=parseInt(Math.random()*10);
						}
						else{
							str+=String.fromCharCode(parseInt(Math.random()*26+65));
						}
					}
					$(this).val(str);
			})
		//输入验证码
		$("ul").find("input").eq(4).keyup(function() {	
			if($(this).val()==$("ul").find("input").eq(3).val()){
				$(this).siblings("p").css("display", "none");
				flag4=true
			}
			else{
				flag4=false;
				$(this).siblings("p").html("验证码输出有误");
				$(this).siblings("p").css("display", "block");
			}
		})
		
		//订阅魅力惠
		var isClick=true;
		$(".box").click(function(){
			isClick=!isClick;
			if(isClick){
				$(this).css("background","#000000");
			}
			else{
				$(this).css("background","#fff");
			}
		})
		
		
		//跳转页面
		$(".zhuce").click(function(){
			if(flag1 && flag2 && flag3 && flag4){
                var xhr = new XMLHttpRequest();
                //10.36.135.139
//              xhr.open("post", "http://127.0.0.1/www/json/code/02_register.php", true);
                xhr.open("post", "http://10.36.135.139/www/json/code/02_register.php", true);
                xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                xhr.send("username="+$(".user").val() + "&password="+$(".password").val() );
                xhr.onreadystatechange = function(){
                    if (xhr.readyState==4 && xhr.status==200) {
                    	var obj=JSON.parse(xhr.responseText);
                    	if(obj.status==1){
                    		location.href="log_in.html";
                    	}else{
                    		alert("该用户已存在！")
                    	}
                    }
                }
			}
			else{
				alert("您输入的信息有误，请核对后重新输入")
			}
		})
})
 