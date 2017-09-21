$(function() {
	//调入头部样式
	$("#load").load("top.html");
	//调入底部样式
	$("#bottom").load("bottom.html");
	//设置全部变量获取json数据，用于网页ID传参
	var myArr = [];
	//get请求获取json
	$.get("../json/page.json", function(data) {
		myArr = data; //获取json数据
		//遍历json
		for(var i = 0; i < data.length; i++) {
			//获取每一个对象
			var obj = data[i];
			//添加li到ul,class名为product
			var li = $("<li></li>");
			li.appendTo(".product");
			//li的动态添加左边线，左边线走宽
			$("<div class='left-line'></div>").appendTo(li);
			//li的动态添加左边线，上边线走高
			$("<div class='top-line'></div>").appendTo(li);
			//li的动态添加左边线，右边线走高
			$("<div class='right-line'></div>").appendTo(li);
			//li的动态添加左边线，下边线走宽
			$("<div class='bottom-line'></div>").appendTo(li);
			//创建div包裹图片，div添加到li中
			var box_img = $("<div class='box-img'></div>").appendTo(li);
			//创建图片到div中，div的class名为box-img
			$("<img src=" + obj.img + " class='tupian'/>").appendTo(box_img);
			//创建div,用于包裹商品说明和商品小图片，class名为box
			var box = $("<div class='box'></div>").appendTo(li);
			//创建div，用于商品名称、价格、介绍、原价等
			var div = $("<div></div>").appendTo(box);
			//给div添加class名称
			$(div).addClass("product_content");
			//创建P标签，html内容为商品名称
			$("<p><a href='#'>" + obj.name + "</a></p>").appendTo(div);
			//创建P标签，html内容为商品介绍
			$("<p><a href='#'>" + obj.introduce + "</a></p>").appendTo(div);
			//创建P标签，html内容为商品现价和原价
			$("<p><a href='#'><span>" + obj.now + "</span><span>" + obj.before + "</span></a></p>").appendTo(div);
			//现价添加class名称
			$(".product_content").eq(i).find("span").eq(0).addClass("now");
			//原价添加class名称
			$(".product_content").eq(i).find("span").eq(1).addClass("before");
			//创建ul,用于添加小图li
			var al = $("<ul class='list'></ul>").appendTo(box);
			//遍历json里面小图数量，动态添加li
			for(var j = 0; j < obj.imgs2.length; j++) {
				//创建li
				var li = $("<li></li>").appendTo(al);
				//创建img
				$("<img src=" + obj.imgs[j] + " />").appendTo(li);
			}

		}

		/***********************************中图移入****************************************************/
		$(".product").on("mouseenter", "li", function() {
			//移入li，给左、下边线添加宽度(变长)
			$(this).find(".left-line,.bottom-line").animate({
				"width": $(".product li").width()
			}, 200, "linear");
			//移入li，给右、上边线添加宽度(变高)
			$(this).find(".top-line,.right-line").animate({
				"height": $(".product li").height()
			}, 200, "linear");
			//商品说明隐藏
			$(this).find(".product_content").hide();
			//商品小图显示
			$(this).find(".list").show();
			//小图添加边框
			$(this).find("li").css("border", "2px solid #ccc");
			//小图移入
			$(".list").find("li").mouseenter(function() {
				//获取小图下标，用于提取json的第N个对象中图的下标(小图li的下标)
				var i = $(this).index();
				//找到父节点中li的下标，json最外面对象的下标(移入的商品的下标)
				var index = $(this).parents("li").index()
				//获取移入当前商品的对象
				var obj = myArr[index];
				//改变li中大图的src
				$(this).parents("li").find("img").eq(0).attr("src", obj.imgs2[i]);
			});
			//商品点击，用于跳转页面	
			$(".product").on("click", "li", function() {
				//获取当前点击的商品的下标，用于提取对象的ID
				var index = $(this).index();
				//获取当前点击的对象
				var obj = myArr[index];
				//跳转页面，并传ID到详情页，用于区分商品
				location.href = "particulars.html?id=" + obj.id;
			})

		})

	})
/***************************************商品移出***************************/	
	//商品li移出事件
	$(".product").on("mouseleave", "li", function() {
		//左、下边线复原
		$(this).find(".left-line,.bottom-line").animate({
			"width": 0
		}, 200, "linear");
		//右、上边线复原
		$(this).find(".top-line,.right-line").animate({
			"height": 0
		},200, "linear");
		//商品介绍显示
		$(this).find(".product_content").show();
		//商品小图隐藏
		$(this).find(".list").hide();
		//小图边框消失(可以不用消失)
		$(this).find(".list li").css("border", "none");
	})

})