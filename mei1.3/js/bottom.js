$(window).scroll(function(){
		var top=$(".show").css("top");
		if($(document).scrollTop()<200){
			$(".returnTop").find("a").hide();
			$(".show").css("top",254);
		}
		
		else if($(document).scrollTop()>=200){
			a=parseInt(top);
			a-=10;
			if(a<=40){
				a=40;
			}
			$(".show").css("top",a);
			$(".returnTop").find("a").show();
		}
		

		 
		 $(".show").on("a","mouseenter",function(){
		 	$(this).css("color","red");
		 })
		 $(".show").on("a","mouseleave",function(){
		 	$(this).css("color","#000000");
		 })
	})
	
	$(".activity").find("li").on("mouseenter",function(){
		$(this).find(".theActivities").css("display","block");
		$(this).parents().find("a").off("mouseenter");
	})
	$(".activity").find("li").on("mouseleave",function(){
		$(this).find(".theActivities").css("display","none");
	})
	setTimeout(function(){
	$(".date").find(".activity").eq(0).show().siblings(".activity").hide();
	$(".week").find("li").click(function(){
		$(".week-line").css("left",$(this).offset().left-$(".week-line").width()-20);
		$(this).parents().find("a").off("mouseenter");
		var index=$(this).index(".week li");
		$(".date").find(".activity").eq(index).show().siblings(".activity").hide();
	})
	},100)