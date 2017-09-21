$(function() {
	//$.cookie出错，用cookieHandle代替$.cookie
	var cookieHandle = $.cookie;
	//加载头部
	$("#load").load("top.html");
	//加载底部
	//加载头部
	$("#bottom").load("bottom.html");
	//获取网页上面？后面的数据用substring提取，长度为1用于去除？
	var params = location.search.substring(1);
	//传params进去函数getParamStr，用变量id调取params中id后面的值，如果传入变量没有对应的key则返回空
	var id = getParamStr(params, "id");
	//因cookie最大保存为4K，所以需要定义一个变量用于获取json内容。用于调用json
	var myObj = null;
	//get请求josn
	$.get("../json/page.json", function(data) {
		//变量josn对象
		for(var i = 0; i < data.length; i++) {
			//判断json中的id是否与网页中拆分的id值相等
			if(data[i].id == id) {
				//设置一个变量等于当前详情页的json值
				var obj = data[i];
				//因为详情只有一个商品，所以只需要获取当前商品
				myObj = obj;
				//调用函数fn,fn为商品数据，动态创建商品
				fn(obj);
				//倒计时
				(function time(obj) {
					//获取当前商品的倒计时的时间搓
					var time = obj.time;
					//设置定时器用于实时监测时间，用于倒计时
					var timer = setInterval(function() {
						//获取当前时间
						var nowDate = new Date();
						//获取活动结束时间
						var endDate = new Date(time);
						//时间差，因为时间搓为毫秒，1000毫秒等于1秒，除以1000后，单位为秒
						var interval = parseInt((endDate - nowDate) / 1000);
						//活动结束
						if(interval <= 0) {
							//弹出提示框活动结束
							alert("活动结束");
							//清除定时器
							clearInterval(timer);
							//跳出当前函数，不跳话，会继续执行本次定时器
							return;
						}
						var day = parseInt(interval / (60 * 60 * 24)); //距离活动结束的天数
						var hour = parseInt(interval / (60 * 60)) % 24; //距离活动结束的小时
						var min = parseInt(interval / 60) % 60; //距离活动结束的分
						var sec = interval % 60; //距离活动结束的秒

						day = day < 10 ? "0" + day : day; //三目运算符，天的数量为2位
						hour = hour < 10 ? "0" + hour : hour; //三目运算符，小时的数量为2位
						min = min < 10 ? "0" + min : min; //三目运算符，分的数量为2位
						sec = sec < 10 ? "0" + sec : sec; //三目运算符，秒的数量为2位

						//显示天时分秒
						$(".time").find("span").eq(0).html(day); //设置天数
						$(".time").find("span").eq(1).html(hour); //设置小时
						$(".time").find("span").eq(2).html(min); //设置分
						$(".time").find("span").eq(3).html(sec); //设置秒
					}, 100)
				})(obj);
				//遍历该商品中的小图数量
				for(var j = 0; j < obj.imgs.length; j++) {
					//创建小图
					$("<li><img src=" + obj.imgs[j] + " /></li>").appendTo(".good_list");
				}
				break;
			}
		}
	})
	/******************************************动态创建商品详情********************************************/
	//显示商品数据
	function fn(obj) {
		//创建中等图片
		$("<img  src=" + obj.img + " />").prependTo(".middleImg");
		//创建大区域
		$("<img class='bigImg' src=" + obj.img + " />").appendTo(".bigArea");
		//创建h2标签，html内容为商品中的详情
		$("<h2>" + obj.introduce + "</h2>").prependTo(".mian2");
		//创建h1，html内容为商品的名称
		$("<h1 class='title'>" + obj.name + "</h1>").prependTo(".mian2");
		//创建现在的单价，html内容为商品的现价
		$("<span class='now'>" + obj.now + "</span>").appendTo(".jiege div");
		//创建原价
		$("<span class='before'>" + obj.before + "</span>").appendTo(".jiege div");
		//创建单位
		$("<span class='shuzi'>" + obj.unit + "</span>").prependTo(".zhe");

	}
	/******************************************拆分网页上提取的params，并且返回所需要的key值********************************************/
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
	/******************************************要设置时间委托，不设置事件委托，则获取不到当前事件********************************************/
	$(".good_list").on("click", "li", function() {
		//获取当前点击li的下标
		var index = $(this).index();
		//中等图片的数组下标
		$(".middleImg").find("img").attr("src", myObj.imgs2[index]);
		//没有找到合适大图，暂时用跟中图一样
		$(".bigImg").attr("src", myObj.imgs2[index]);
	})
	//详情页商品数量减
	$(".reduce").click(function(e) {
		//清除默认时间，无意义
		e.preventDefault();
		//获取详情页商品的当前value值
		var num = $(".num").val();
		//点击一次数量减1
		num--;
		//临界值判断数量不能小于0
		if(num <= 0) {
			num = 0; //小于0则数量为0
		}
		//把当前的变量num赋值到要改变的value中去
		$(".num").val(num);
	})

	////详情页商品数量加
	$(".add").click(function(e) {
		//清除默认时间，无意义
		e.preventDefault();
		//获取详情页商品的当前value值
		var num = $(".num").val();
		//点击一次数量加1
		num++;
		//把当前的变量num赋值到要改变的value中去
		$(".num").val(num);
	})
	/*********************************************点击购物车******************************/
	$(".gouwu").click(function() {
		//获取当前value值
		var num = $(".num").val();
		//点击一次当前数量加1
		num++;
		//改变背景颜色
		$(this).css("background","paleturquoise");
		setTimeout(function(){
			$(".gouwu").css("background","#000000");
		},100);
		$(".num").val(num);
		//加入购物车
		var arr = cookieHandle("cart") ? JSON.parse(cookieHandle("cart")) : [];
		var isExist = false; //设置开关判断是否存在相同商品，默认为flase,随便给false或true
		//遍历cookie中商品的数量
		for(var i = 0; i < arr.length; i++) {
			//通过ID判断商品是否相同
			if(arr[i].id == myObj.id) {
				//如果存在相同商品则数量加1，其余不变
				arr[i].num++;
				//改变开关状态,取反
				isExist = true;
				//跳出当前循环
				break;
			}
		}

		//如果不存在相同的商品，则加入到数组arr中
		if(!isExist) {
			//因为原json中的对象太大，所以重新定义变量保存到cookie中
			var obj = {
				"id": myObj.id, //所需id
				"img": myObj.img, //所需图片
				"price": myObj.now, //所需现价
				"introduce": myObj.introduce, //所需介绍
				"name": myObj.name, //所需名字
				"num": 1 //默认为1
			}
			arr.push(obj); //把先的对象添加到当前的arr中
		}
		//保存cookie,第一个值为保存对象的名称，第二个值为编码的数组，第三个值为保存的时间，第四个值为路径(好像是)
		cookieHandle("cart", JSON.stringify(arr), {
			expires: 30,
			path: "/"
		});
		refresh(); //重新调用函数refresh, 用于创建小型购物车
	})

	setTimeout(refresh, 100); //可能提取公用样式top，直接调用获取不到top中的价格属性，所有给个延时器

	/***********************************动态创建小型购物车********************************/
	function refresh() {
		//获取当前的cookie对象
		var arr = cookieHandle("cart") ? JSON.parse(cookieHandle("cart")) : [];
		//判断arr是否为空
		if(arr) { //arr  JSON解析出错，不需要解析，没用懂为啥
			//设置总价，默认为0
			var totalPrice = 0;
			//清除#list下的所有子元素
			$("#list").empty();
			//创建节点
			$("<div id='good_price'></div>").appendTo("#list");
			$("<div id='good_box'></div>").appendTo("#good_price");
			$("<div id='xiaoji'>购物袋小计：　￥</div><div id='good_price2'></div>").appendTo("#good_box");
			$("<div id='myCart'>结算</div>").appendTo("#good_price");
			//遍历cookie的长度
			for(var i = 0; i < arr.length; i++) {
				//设置一个变化量用去提取所需属性值
				var obj = arr[i];
				//创建li
				var li = $("<li></li>").prependTo("#list");
				//创建图片
				$("<img src=" + obj.img + " >").appendTo(li);
				//创建商品名称
				$("<span class='name'>" + obj.name + "</span>").appendTo(li);
				//创建商品数量
				$("<span class='price'>" + obj.num + "*" + obj.price + "</span>").appendTo(li);
				//操作节点，删除
				$("<a id='delete' href='javascript:;'>删除</a>").appendTo(li);
				//总价格
				totalPrice += obj.price * obj.num;
				//top中的总价格
				$("#monkey").html(totalPrice);
				//小型购物车的价格
				$("#good_price2").html(totalPrice);
			}
			//创建关闭按钮
			$("<div id='close'></div>").prependTo("#list");
			//小锁显示当不同id的商品的长度
			$("#gouwu2").html(arr.length);
			/***********************************************点击删除按钮**********************/
			$("#list").on("click", "#delete", function() {
				//获取上ul中的删除属性的下标
				var index = $(this).index("#list #delete");
				//修改cookie
				var arr = JSON.parse(cookieHandle("cart"));
				//移除当前下标其长度为1
				arr.splice(index, 1);
				//重新保存cookie
				cookieHandle("cart", JSON.stringify(arr), {
					expires: 30,
					path: "/"
				});
				//调用函数刷新当前小型购物车
				refresh();
			})
		} else {
			//				 $("#list").on("click","#delete",function(){
			//	 			//删除
			//	 	
			//				var index = $(this).index("#list #delete");
			//				console.log(index);	
			//					//修改cookie
			//					var arr = JSON.parse(cookieHandle("cart"));
			//					arr.splice(index, 1);
			//					cookieHandle("cart", JSON.stringify(arr), {expires:30, path:"/"});
			//					
			//					refresh();
			//	 })
			$("#list").css("display", "none");
			//				$("#shangpin").css("display","block");

		}

	}

	setTimeout(fangda, 100); //直接调用无法使用需要添加延时器
	//放大镜
	function fangda() {

		//初始化移动区域的宽
		$(".middleArea").width($(".middleImg").width() * $(".bigArea").width() / $(".bigImg").width());
		//初始化移动区域的高
		$(".middleArea").height($(".middleImg").height() * $(".bigArea").height() / $(".bigImg").height());
		//放大系数
		var scale = $(".bigImg").width() / $(".middleImg").width();
		//在小图中移动
		$(".middleImg").mousemove(function(e) {
			$(".middleArea").show(); //显示小区域
			$(".bigArea").show(); //显示大区域

			//鼠标移动的水平位置
			var x = e.pageX - $(".middleImg").offset().left - $(".middleArea").width() / 2;
			//鼠标移动的垂直位置
			var y = e.pageY - $(".middleImg").offset().top - $(".middleArea").height() / 2;

			//控制不超出左右边界
			if(x < 0) {
				x = 0;
			}
			//判断不超出右边界
			else if(x > $(".middleImg").width() - $(".middleArea").width()) {
				x = $(".middleImg").width() - $(".middleArea").width();
			}
			//控制不超出上下边界
			if(y < 0) {
				y = 0
			}
			//判断不超出下边界
			else if(y > $(".middleImg").height() - $(".middleArea").height()) {
				y = $(".middleImg").height() - $(".middleArea").height();
			}

			//小区域移动
			$(".middleArea").css({
				left: x,
				top: y
			});

			//大图移动
			$(".bigImg").css({
				left: -scale * x,
				top: -scale * y
			});
		})

		//移除小图
		$(".middleImg").mouseleave(function() {
			$(".middleArea").hide(); //隐藏小区域
			$(".bigArea").hide(); //隐藏大区域
		})
	}

})