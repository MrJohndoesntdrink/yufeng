
/*
 ************************************************
 * 作者        :John                            *
 * E-mail      :                                *
 * 建立时间	   :2017年09月24日 星期日 12时58分  *
 * 文件名      :myLib.js                        *
 * 描述        :原生js封装 $ 选择器             *
 ************************************************
*/

function myQ(vArg)
{
	this.elements=[];//用来保存选中的元素

	switch(typeof vArg)//判断数据类型
	{
		case 'function':
			//window.onload=vArg;
			myAddEvent(window, 'load', vArg);
			break;
		case 'string':
			switch(vArg.charAt(0))
			{
				case '#':	//ID
					var obj=document.getElementById(vArg.substring(1));
					
					this.elements.push(obj);
					break;
				case '.':	//class
					this.elements=getByClass(document, vArg.substring(1));
					break;
				default:	//tagName
					this.elements=document.getElementsByTagName(vArg);
			}
			break;
		case 'object':
			this.elements.push(vArg);
	}
}

//简化写法，$ 符号简单，其他特殊符号，基本用不了跟js冲突 如#，@，^等
//网页调用$(v)，每次使用均自动实例化，类比于将class -》obj
function $(vArg)
{
	return new myQ(vArg);
}



/*
 ************************************************
 * 作者      :John                              *
 * 建立时间	 :2017年09月24日 星期日 12时58分    *
 * 描述      :通过prototype 绑定常用的方法(事件)*
 ************************************************
*/

//通过prototype 绑定常用 方法（事件、函数）
myQ.prototype.click=function (fn) //事件  调用 如下 $('#shw').click( function(){	myq('#idtest').show();})
{
	var i=0;
	
	for(i=0;i<this.elements.length;i++) //查询结果（this对象）是以数组返回的，可能有多个对象，循环添加
	{
		myAddEvent(this.elements[i], 'click', fn);
		
	}
	//alert(this);
	return this;
};

myQ.prototype.mouseover=function (fn) //事件  
{
	var i=0;
	
	for(i=0;i<this.elements.length;i++) //查询结果（this对象）是以数组返回的，可能有多个对象，循环添加
	{
		myAddEvent(this.elements[i], 'mouseover', fn);
		
	}
	return this;
};

myQ.prototype.mouseout=function (fn) //事件  
{
	var i=0;
	
	for(i=0;i<this.elements.length;i++) //查询结果（this对象）是以数组返回的，可能有多个对象，循环添加
	{
		myAddEvent(this.elements[i], 'mouseout', fn);
		
	}
	return this;
};

myQ.prototype.mouseover=function (fn) //事件 
{
	var i=0;
	
	for(i=0;i<this.elements.length;i++) //查询结果（this对象）是以数组返回的，可能有多个对象，循环添加
	{
		myAddEvent(this.elements[i], 'mouseover', fn);
		
	}
	return this;
};

myQ.prototype.show=function ()
{
	var i=0;
	
	for(i=0;i<this.elements.length;i++)
	{
		this.elements[i].style.display='block';
	}
	return this;
};

myQ.prototype.hide=function ()
{
	var i=0;
	
	for(i=0;i<this.elements.length;i++)
	{
		this.elements[i].style.display='none';
	}
	
	return this;
};




/*
 ************************************************
 * 作者      :John                              *
 * 建立时间	 :2017年09月24日 星期日 20时50分    *
 * 描述      :原事件绑定 获取样式               *
 ************************************************
*/


//事件绑定
function myAddEvent(obj, sEv, fn)
{
	if(obj.attachEvent)
	{
		obj.attachEvent('on'+sEv, function (){
			if(false==fn.call(obj))
			{
				event.cancelBubble=true;
				return false;
			}
		});
	}
	else
	{
		obj.addEventListener(sEv, function (ev){
			if(false==fn.call(obj))
			{
				ev.cancelBubble=true;
				ev.preventDefault();
			}
		}, false);
	}
}


//在父元素下，获取指定的类（可选）
function getByClass(oParent, sClass)
{
	var aEle=oParent.getElementsByTagName('*');
	var aResult=[];
	var i=0;
	
	for(i=0;i<aEle.length;i++)
	{
		if(aEle[i].className==sClass)
		{
			aResult.push(aEle[i]);
		}
	}
	return aResult;
}


//  获取指定css样式
function getStyle(obj, attr)
{
	// if(obj.currentStyle){
	// 	return obj.currentStyle[attr];
	// }
	// else{
	// 	//当属性指代不明时 用 [attr] 代替 .attr
	// 	return getComputedStyle(obj, false)[attr];
	// }
	return obj.currentStyle ? obj.currentStyle[attr] : getComputedStyle(obj)[attr];
}





/*
 ************************************************
 * 作者      :John                              *
 * 建立时间	 :2017年09月24日 星期日 22时40分    *
 * 描述      :原生js封装运动函数(速度 时间 通用)*
 ************************************************
*/

//-------速度版-运动函数
	function smove(obj,attr,target,speed,fn){
		speed = (parseInt(getStyle(obj,attr)) < target) ? speed:-speed;
		clearInterval(obj.timer);
		obj.timer = setInterval(function(){
			var nowpis = parseInt(getStyle(obj,attr));
			if(Math.abs(target-nowpis) <= Math.abs(speed)){
				obj.style[attr] = target + 'px';
				clearInterval(obj.timer);
				fn && fn();
			}else{
				obj.style[attr] = nowpis + speed +'px';
			}
		},50)
	}
//-------时间版-运动函数
	function tmove(obj,attr,target,time,fn){
		var nowTime = new Date();
		clearInterval(obj.timer);
		obj.timer = setInterval(function(){
			var nowpis = parseInt(getStyle(obj,attr));
			var n = (new Date() - nowTime) / time;
			if((new Date() - nowTime) >= time){
				n = 1;
				clearInterval(timer);
				obj.style[attr] = target + 'px';
				fn && fn();
			}else{
				obj.style[attr] = nowpis + (target - nowpis)*n + 'px';
			}
		},50)
	}
		
//-------通用版(缓冲版)-运动函数
	function cmove(obj,json){
		clearInterval(obj.timer)
		obj.timer = setInterval(function(){
			var tag = 1;
			for( var attr in json){
				if(attr == 'opacity'){
					nowpis = Math.round(parseFloat(getStyle(obj,attr)*100));
				}else{
					nowpis = parseInt(getStyle(obj,attr));
				}
				var speed = (json[attr] - nowpis) / 6;
				speed = speed>0? Math.ceil(speed):Math.floor(speed);
				if(speed != 0) tag = 0;
				if(attr == 'opacity'){
					obj.style.opacity = (nowpis + speed)/100 ;
				}else{
					obj.style[attr] = nowpis + speed + "px";
				}	
			}
			if(tag) clearInterval(obj.timer);
		},40)	
	}


//------------面向对象-运动函数			
function objMove(obj,attr,target,speed){
	var _this = this;
	this.obj = obj;
	this.attr = attr;
	this.target =target;
	this.speed = speed;

	this.speed = (parseInt(getStyle(this.obj,this.attr))<this.target)?this.speed:-this.speed;
	clearInterval(this.obj.timer);
	this.obj.timer = setInterval(function(){
		_this.tab(_this);
	},100)
}
objMove.prototype.tab = function(_v){
	var nowpis = parseInt(getStyle(_v.obj,_v.attr)) + _v.speed;
	if( Math.abs( _v.target-nowpis ) <= Math.abs(_v.speed)){
		_v.obj.style[_v.attr] = _v.target + "px";
		clearInterval(_v.obj.timer);
	}else{
		_v.obj.style[_v.attr] =   nowpis + "px";
	}
}



			