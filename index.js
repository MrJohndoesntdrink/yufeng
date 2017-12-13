$(function(){
	// 头部导航
	$(window).scroll(function(){
		var bodyHeight = $('body').scrollTop()+$('html').scrollTop();
		if(bodyHeight>40){
			$(".header_bottom").attr({"style":"position:fixed;top:0px;left:0px;"})
		}else{
			$(".header_bottom").attr({"style":"position:absolute;top:40px;left:0px;"})
		}
	})
	//回到顶部
	var timer = null;
	$(".return").click(function(){
		var bodyHeight = $('body').scrollTop()+$('html').scrollTop();
		clearInterval(timer);
		timer = setInterval(function(){
			bodyHeight -= 35;
			if(bodyHeight<= 0){
				bodyHeight = 0;
				clearInterval(timer);
			}
			$('body').scrollTop(bodyHeight)+$('html').scrollTop(bodyHeight);
		},10)	
	})


	//头部导航 下拉
	$(".header_bottom .nav>li").each(function(i){
		$(this).hover(function(){
			$(".electric").eq(i).stop(true).slideDown();
		},function(){
			$(".electric").eq(i).stop(true).slideUp();
		})
	})
	$(".electric").hover(function(){
		$(this).stop(true).slideDown();
	},function(){
		$(this).stop(true).slideUp();
	})

	
	
	


	//轮播图	
	var $oUl = $(".banner>ul");
	var width = $(window).width();
	var long = $(".banner>ul>li").length;
	var time = null;
	var z=0;
	$oUl.width(width*long);

	for(var i=0;i<long;i++){
		$(".ba_s>span").eq(i).mouseover(function(){
			var index = $(this).index();
			show(index);
		})
	}

	$(".banner").mouseover(function(){
		clearInterval(time);
	}).mouseout(function(){
		lunbo()
	})

	function lunbo(){
		var i = 0;
		clearInterval(time)
		time = setInterval(function(){
			i++;
			if(i >= long){
				i = 0;
			}
			show(i);
		},2000)
	}
	lunbo();

	
	$(".btn1").click(function(){
		z--;
		if(z<0){
			z = 2;
		}
		show(z)
	})
	$(".btn2").click(function(){
		z++;
		if(z==3){
			z = 0;
		}
		show(z)
	})

	function show(v){
		$(".ba_s>span").eq(v).addClass("color").siblings().removeClass("color");
		$(".banner>ul").stop(true).animate({left:-(v*width) +'px'},500)
	}



	//
	$(".product_list>li").each(function(i){
		$(this).hover(function(){
			$(this).find(".yel").stop(true).animate({right:295+"px"},300)
			$(this).find(".more>a").stop(true).animate({left:80+"px"},300)
			$(this).find(".more>i").stop(true).animate({left:20+"px"},300)
		},function(){
			$(this).find(".yel").stop(true).animate({right:0+"px"},300)
			$(this).find(".more>a").stop(true).animate({left:20+"px"},300)
			$(this).find(".more>i").stop(true).animate({left:100+"px"},300)
		})
	})
	// $(".product_list>li").each(function(i){
	// 	$(this).mouseenter(function(){
	// 		$(this).find(".yel").stop(true).animate({right:295+"px"},300)
	// 		$(this).find(".more>a").stop(true).animate({left:80+"px"},300)
	// 		$(this).find(".more>i").stop(true).animate({left:20+"px"},300)
	// 	})
	// 	$(this).mouseleave(function(){
	// 		$(this).find(".yel").stop(true).animate({right:0+"px"},300)
	// 		$(this).find(".more>a").stop(true).animate({left:20+"px"},300)
	// 		$(this).find(".more>i").stop(true).animate({left:100+"px"},300)
	// 	})
	// })


	//单向滚动轮播
	var liwidth = $(".lth_2>ul>li").width();
	var x = 1;
	$(".l_span").click(function(){ 
		if(!$(".lth_2>ul").is(":animated")){
			x++;
			$(".lth_2>ul").animate({left:-x*liwidth+"px"},300,function(){
				if( x== 2){
					x=1;
				}
				$(".lth_2>ul").css({"left":-x*liwidth+'px'})
			})
		}	
	})
	$(".r_span").click(function(){
		if(!$(".lth_2>ul").is(":animated")){
			x--;
			$(".lth_2>ul").animate({left:-x*liwidth+"px"},300,function(){
				if(x == 0){
					x = 1;
				}
				$(".lth_2>ul").css({"left":-x*liwidth+'px'})
			})
		}
	})



	// // poke切换
	// $(".lth_3").click(function(){
	// 	var oneLeft = $(".lth_3>ul>li").eq(0).css("left");
	// 	var oneTop = $(".lth_3>ul>li").eq(0).css("top");
	// 	var oneWidth  = $(".lth_3>ul>li").eq(0).width();
	// 	var oneHeight = $(".lth_3>ul>li").eq(0).height();

	// 	var twoLeft  = $(".lth_3>ul>li").eq(1).css("left");
	// 	var twoTop = $(".lth_3>ul>li").eq(1).css("top");
	// 	var twoWidth  = $(".lth_3>ul>li").eq(1).width();
	// 	var twoHeight = $(".lth_3>ul>li").eq(1).height();

	// 	var threeLeft  = $(".lth_3>ul>li").eq(2).css("left");
	// 	var threeTop = $(".lth_3>ul>li").eq(2).css("top");
	// 	var threeWidth  = $(".lth_3>ul>li").eq(2).width();
	// 	var threeHeight = $(".lth_3>ul>li").eq(2).height();
		
	// 	if(!$(".lth_3>ul>li").is(":animated")){
	// 		$(".lth_3>ul>li").eq(0).animate({
	// 			left:twoLeft,
	// 			top:twoTop,
	// 			width:twoWidth,
	// 			height:twoHeight,
	// 		},300).attr({"style":"z-index:3"},500)
		
	// 		$(".lth_3>ul>li").eq(1).stop(true).animate({
	// 			left:threeLeft,
	// 			top:threeTop,
	// 			width:threeWidth,
	// 			height:threeHeight,
	// 		},300).attr({"style":"z-index:1"},500)
	
	// 		$(".lth_3>ul>li").eq(2).stop(true).animate({
	// 			left:oneLeft,
	// 			top:oneTop,
	// 			width:oneWidth,
	// 			height:oneHeight,
	// 		},300).attr({"style":"z-index:2"},500)
	// 	}
	// })

		
	



	//覆盖文字 背景图片动画
	$(".txt").mouseover(function(){
		$(this).find("b").stop(true).animate({backgroundPosition:80+"px",paddingLeft:0+"px"},300)
	}).mouseout(function(){
		$(this).find("b").stop(true).animate({backgroundPosition:0+"px",paddingLeft:40+"px"},300)
	})



	//点击侧边栏隐藏显示
	var tag = 1;
	$(".fix_r1").click(function(){
		if(tag){
			$(this).parent().stop(true).animate({right:-130+"px"})
			tag = 0;
		}else{
			$(this).parent().stop(true).animate({right:0+"px"})
			tag = 1;
		}
		
	})

	


})


window.onload = function(){
		var j = 0;
		var oPoke = document.getElementById("poke");
		var oLi = oPoke.getElementsByTagName("li");
		// var poke_dec = document.getElementsByClassName("poke_dec")[0];

		var P_l =  document.getElementById("poke_left");
		var P_r =  document.getElementById("poke_right");

		var arr = [];
		for(var i=0;i<oLi.length;i++){
			arr.push([ 
				parseInt(getStyle(oLi[i],"left")),
				parseInt(getStyle(oLi[i],"top")),
				getStyle(oLi[i],"zIndex"),
				parseInt(getStyle(oLi[i],"width")),
				parseInt(getStyle(oLi[i],"height")),
				parseFloat(getStyle(oLi[i],"opacity")*100),
			])
		}
		P_l.onclick = function(){
			arr.push(arr[0]);
			arr.shift();

			for(var i=0;i<oLi.length;i++){
				oLi[i].style.zIndex = arr[i][2];
				cmove(oLi[i],{width:arr[i][3],height:arr[i][4],left:arr[i][0],top:arr[i][1],opacity:arr[i][5]})
			}

		}

		P_r.onclick = function(){
			arr.unshift(arr[oLi.length-1]);
			arr.pop();

			for(var i=oLi.length-1;i>=0;i--){
				oLi[i].style.zIndex = arr[i][2];
				cmove(oLi[i],{width:arr[i][3],height:arr[i][4],left:arr[i][0],top:arr[i][1],opacity:arr[i][5]})
			}
		}
}