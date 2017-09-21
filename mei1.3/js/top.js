


$(function(){
	
	 //获取user值改变注册的html
	 //获取网页上面？后面的数据用substring提取，长度为1用于去除？
	var params = location.search.substring(1);
	//传params进去函数getParamStr，用变量user调取params中id后面的值，如果传入变量没有对应的key则返回空
	var user = getParamStr(params, "user");
	 //获取对应参数的值
	function getParamStr(params, key) {
		var arr = params.split("&");
		for(var j = 0; j < arr.length; j++) {
			var str = arr[j];
			var arr2 = str.split("=");
			if(arr2[0] == key) {
				return arr2[1];
			}
		}
		return "";
	}
	if(user){
		var yonghu=$("<div id='yonghu'></div>")
		yonghu.appendTo("#top");
		$("<a  href='log_in.html' id='username'>"+"欢迎您！"+user+"</div>").appendTo(yonghu);
		$("<a href='index.html' id='tuichu'>退出</a>").appendTo(yonghu);
		$("#top-left").hide();
		$("#username").show();
	}
	else{
		$(".top-left").show();
		$("#username").hide();
	}
	/****************************************top公用事件******************************/
	//吸顶效果
	$(window).scroll(function(){
		//吸顶临界值
		if($(document).scrollTop()>=100){
			//变为固定定位，并吸顶
			$("#nav").css({"position":"fixed","top":0});
		}
	 else{
	 	//还原
	 	$("#nav").css({"position":"relative"});
	 }
		
	})
	//手机移入
	$("#shouji").mouseenter(function(){
		//显示二维码
		$("#erwei").css("display","block");
	})
	//手机移出
	$("#shouji").mouseleave(function(){
		//隐藏二维码
		$("#erwei").css("display","none");
	})
	//document中a标签移入事件
	$(document).find("a").mouseenter(function(){
		//改变所有字体颜色
		$(this).css("color","red");
	});
	$(document).find("a").mouseleave(function(){
		$(this).css("color","#000");
	})
	$("#nav").find("a").mouseleave(function(){
		$(this).css("color","#fff");
	})
	$("#top-left").find("a").mouseleave(function(){
		$(this).css("color","#000000");
	})
	 
	 $("#zhuce").click(function(){
	 	location.href="../hmtl/log_in.html"
	 })
	 
	 $(document).on("click","#myCart",function(){
	 	location.href="myCart.html";
	 })
	 $("#close").click(function(){
	 	$("#list").css("display","none");
	 })
	 $("#gouwu,#list").mouseenter(function(){
	 	if($("#list").find("li")==undefined||$("#list").find("li").length<=0){
	 		$("#list").css("display","none");
	 		$("#shangpin").css("display","block");
	 	}
	 	else{
	 		$("#list").css("display","block");
	 	}
	 	 $("#list,#shangpin").mouseleave(function(){
	 	 	console.log(111);
	 	setTimeout(function(){
	 		$("#list").css("display","none");
	 		$("#shangpin").css("display","none");
	 	},1000)
	 })
	 })
	
	$("#monkey").click(function(){
		location.href="myCart.html";
	})
})

		
		 
		 
		 
		 

