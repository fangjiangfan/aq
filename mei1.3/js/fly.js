

$(function() {
	
	//使用jq插件
	//1, 导入jquery.js(必须)
	//2, 再导入插件的js(必须)
	//3, 如果提供了css文件, 则需要按照插件的套路去写（看情况）
	//4, 如果有图片资源, 则也需要使用插件的图片（看情况）
	//5, 使用jq插件提供的方法
	
	
	
	$(".gouwu").click(function(event){   //是$(".addcar")这个元素点击促发的 开始动画的位置就是这个元素的位置为起点
//		var offset = $("#gouwu").offset();  //结束的地方的元素
//		var addcar = $(this);
//		var img = addcar.parents(".middleImg").find('img').attr('src');
		
		var flyer = $('<img class="u-flyer" src="'+img+'">');
		console.log(flyer);
		flyer.fly({
			//开始位置
			start: {
				left: event.clientX,
				top: event.clientY
			},
			//结束位置
			end: {
				left: offset.left,
				top: offset.top,
				width: 0,
				height: 0
			},
			//结束后
			onEnd: function(){
				console.log("结束");
				$("#msg").show().animate({width: '250px'}, 200).fadeOut(1000);
				flyer.remove();
			}
		});
	});
  
});