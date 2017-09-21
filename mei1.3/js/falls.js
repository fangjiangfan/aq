
		
	$(function(){
		//获取json
		$.get("json/index.json",function(data){
			//遍历json对象
			for(var i=0;i<data.length;i++){
				var obj=data[i];//每个json对象
				//添加li到list1中
				var li=$("<li></li>").appendTo("#list"); 
				//添加图片到li中
				$("<img src="+obj.img+" />").appendTo(li);
				//添加商品说明
				if(obj.introduce==undefined||obj.discount==undefined){
					$("<br/>").appendTo(li);
				}
				else{
					//添加一个div包裹文字
					var div=$("<div></div>").appendTo(li);
					$("<span>"+obj.introduce+"</span>").appendTo(div);
					//添加折扣
					$("<p>"+obj.discount+"<b>折起</b></p>").appendTo(div);
				}
					
			}
			setTimeout(function(){
				
				falls()
			},100)
		})
	})	
		function falls(){
				var list=document.getElementById("list");
				var listW=list.offsetWidth;
				var item=list.getElementsByTagName("li");
				var line=parseInt(listW/item[0].offsetWidth);  
				console.log(item[2].offsetHeight);
				console.log(item[2].clientHeight);
				var allHeight=[];
				for(var i=0;i<item.length;i++){
					if(i<line){
						item[i].style.position="static";
						allHeight.push(item[i].offsetHeight);
					}
					else{
						var minIndex=0;
						var minHeight=allHeight[0];
						for(var j=0;j<allHeight.length;j++){
							if(minHeight>allHeight[j]){
								minHeight=allHeight[j];
								minIndex=j;
							}
						}
						item[i].style.position="absolute";
						item[i].style.left=item[minIndex].offsetLeft+"px";
						item[i].style.top=minHeight+"px";
						allHeight[minIndex]+=item[i].offsetHeight;
					}
				}
			}
