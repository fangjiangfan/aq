

$(function(){
				$("#load").load("top.html")
				var cookieHandle = $.cookie;
			//	var ischecked=false;
				refresh();
				function refresh() {
					
					//获取cookie的数据
					var arr = cookieHandle("cart");
					if (arr) {
						
						arr = JSON.parse(arr);
						
						//console.log(arr);
						//清空所有子节点
						$(".good_list").empty();
						
						//总价
						var totalPrice = 0;
						
						if (arr.length > 0) {
							
							//添加新节点
							//遍历数组arr， 显示购物车商品
							var shuliang=0;
							for (var i=0; i<arr.length; i++) {
								var obj = arr[i];
								
								//li
								var li = $("<li></li>").appendTo(".good_list");
								
								//勾选状态
								if (obj.ischecked == true) {
									$("<input class='good_checkbox' type='checkbox' checked='checked' />").appendTo(li);
								}
								else  {
									$("<input class='good_checkbox' type='checkbox' />").appendTo(li);
								}
							//	$("<input type='checkbox' class='good_checkbox' checked='checked'  />").appendTo(li);
								$("<img class='good_img' src="+obj.img+" >").appendTo(li);
								var goodname = $("<div class='good_name'></div>");
								goodname.appendTo(li);
								
								$("<h3>"+obj.name+"</h3>").appendTo(goodname);
								$("<p>"+obj.introduce+"</p>").appendTo(goodname);
								var danjia = $("<div class='danjia'>￥</div>");
								danjia.appendTo(li);
								$("<span class='price'>"+obj.price +"</span>").appendTo(danjia);
								$("<div class='reduce'>-</div>").appendTo(li);
								$("<input class='num' type='text' value="+ obj.num +" >").appendTo(li);
								$("<div class='add'>+</div>").appendTo(li);
								$("<div class='youhui'>￥0.00</div>").appendTo(li);
								var totalprice1=$("<div class='totalprice1'>￥</div>");
								totalprice1.appendTo(li);
								$("<span class='totalPricenum'>"+obj.num*obj.price+"</span>").appendTo(totalprice1);
								$("<a class='delete1' href='javascript:;'>删除</a>").appendTo(li);
								//计算每个商品的总价并添加到totalPrice
								
								if (obj.ischecked == true) {
									totalPrice += obj.price * obj.num;
									shuliang++;
									$("#gouwu2").html(shuliang);
									$(".jiesuan_num").html(shuliang);
								}
								
							}
							//显示总价
						//	console.log(totalPrice)
							$(".count").html(totalPrice);
							$("#monkey").html(totalPrice);
						}
						else  {
							//显示总价
							$(".count").html(0);
							$("#monkey").html(totalPrice);
							alert("您的购物车没有商品");
						}
						
						
					}
					else {
						alert("您的购物车空空如也");
					}
				}
				
				
				//+
				$(".good_list").on("click", ".add", function(){
					var index = $(this).index(".good_list .add");
					//console.log(index);
					
					//修改cookie
					var arr = JSON.parse(cookieHandle("cart"));
					arr[index].num++;
					cookieHandle("cart", JSON.stringify(arr), {expires:30, path:"/"});
					refresh();
				})
				
				//-
				$(".good_list").on("click", ".reduce", function(){
					var index = $(this).index(".good_list .reduce");
					
					//修改cookie
					var arr = JSON.parse(cookieHandle("cart"));
					arr[index].num--;
					if (arr[index].num < 1) {
						arr[index].num = 1;
					}
					cookieHandle("cart", JSON.stringify(arr), {expires:30, path:"/"});
					
					refresh();
				})
				
				//删除
				$(".good_list").on("click", ".delete1", function(){
					var index = $(this).index(".good_list .delete1");
					
					//修改cookie
					var arr = JSON.parse(cookieHandle("cart"));
					arr.splice(index, 1);
					cookieHandle("cart", JSON.stringify(arr), {expires:30, path:"/"});
					
					isCheckAll();
					refresh();
				})
				
				//勾选
				$(".good_list").on("click", ".good_checkbox", function(){
					var index = $(this).index(".good_list .good_checkbox");
					//修改cookie
					var arr = JSON.parse(cookieHandle("cart"));
					arr[index].ischecked = !arr[index].ischecked;
//					for(var i=0; i<$(".good_list").find(".good_checkbox").length;i++){
//						var shuliang=0;
//						if(arr[i].ischecked){
//							shuliang++;
//							console.log(shuliang);
//					}
//						$("#gouwu2").html(shuliang);
//					}
					cookieHandle("cart", JSON.stringify(arr), {expires:30, path:"/"});
					
					isCheckAll();
					refresh();
				})
				
				
				//全选
				$(".jiesuan_checkbox").click(function(){
					
					var arr = JSON.parse(cookieHandle("cart"));
					
					for (var i=0; i<arr.length; i++) {
						if ($(this).prop("checked")) { //全选
							arr[i].ischecked = true;
						}
						else  { //全不选
							arr[i].ischecked = false;
						}
					}
					cookieHandle("cart", JSON.stringify(arr), {expires:30, path:"/"});
					
					refresh();
				})
				
				
				//判断是否全部选中
				isCheckAll();
				function isCheckAll(){
					//防止cookie中的'cart'值为undefined
					if (!cookieHandle("cart")) {
						return;
					}
					
					var arr = JSON.parse(cookieHandle("cart"));
					
					var sum = 0;
					for (var i=0; i<arr.length; i++) {
						sum += arr[i].ischecked;
					}
					
					if (sum != 0 && sum == arr.length) { //全选
						$(".jiesuan_checkbox").prop("checked", true);
					}
					else  { //不全选
						$(".jiesuan_checkbox").prop("checked", false);
					}
				}
				
				
				//删除选中
				$(".delete").click(function(){
					
					var arr = JSON.parse(cookieHandle("cart"));
					
					var arr2 = [];
					for (var i=0; i<arr.length; i++) {
						if (!arr[i].ischecked) {
							arr2.push(arr[i]);
						}
					}
					
					cookieHandle("cart", JSON.stringify(arr2), {expires:30, path:"/"});
					
					isCheckAll();
					refresh();
				})
		})