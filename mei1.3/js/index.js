

$(function(){
	$("#load").load("top.html");
	$("#bottom").load("bottom.html");
	$(document).find("p").off("mouseenter");
	
	$(document).find("a").mouseenter(function(){
		$(this).css("color","red");
	});
	$(".top-left").find("a").mouseleave(function(){
		$(this).css("color","#000000");
	})
	$(".nav").find("a").mouseleave(function(){
		$(this).css("color","#fff");
	})
	$(".tupian2  li").find("#DivImg").mouseenter(function(){
		$(this).find("img").stop().animate({"width":"450","height":"300"},500);
		$(this).find("img").css("opacity","0.3");
		$(this).find("img").css("filter","alpha(opacity=30)");
		$(".tupian2  li").find("p").eq(0).css("display","block");
		$("<p id='time'>6天后活动结束</p>").prependTo($(this));
		$(this).parents().find("a").off("mouseenter");
	})
	
	$(".tupian2 li").find("#DivImg").mouseleave(function(){
		$(this).find("img").stop().animate({"width":"320","height":"192"},500);
		$(this).find("img").css("opacity","1");
		$(this).find("img").css("filter","alpha(opacity=100)");
		$(this).find("p").eq(0).css("display","none");
		$(this).find("p").remove();
	})
	
	
})
