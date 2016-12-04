var CookieUtil = (function(){
	//设置cookie
	function setCookie(name,value,day){
		var Days=2;
		if(day){
			Days=day;
		}
		var exp=new Date();
		exp.setTime(exp.getTime()+Days*24*60*60*1000);   
		document.cookie = name+"="+escape(value)+";expires="+exp.toGMTString();
	}
	
	//根据名字获取cookie
	function getCookie(name){
		//过滤正则表达式特殊字符元字符
		var filterReg = /\(|\[|\{|\\|\^|\$|\||\)|\?|\*|\+|\./g;
		name=name.replace(filterReg,function(sMatch){
			return sMatch
					.replace(/\\/g,"\\\\")//第一替换量必须放在前 
					.replace(/\(/g,"\\(")
					.replace(/\[/g,"\\[")
					.replace(/\{/g,"\\{")
					.replace(/\^/g,"\\^")
					.replace(/\$/g,"\\$")
					.replace(/\|/g,"\\|")
					.replace(/\)/g,"\\)")
					.replace(/\?/g,"\\?")
					.replace(/\*/g,"\\*")
					.replace(/\+/g,"\\+")
					.replace(/\./g,"\\.");
		});
		var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
		arr = document.cookie.match(reg);
		if(arr){ 
			return unescape(arr[2]);
		}else{
			return null;
		}
	}
	
	//删除cookie
	function delCookie(name){
		var exp=new Date();   
		exp.setTime(exp.getTime()   -   1);   
		var cval=this.getCookie(name);   
		if(cval!==null){
			document.cookie=name+"="+cval+";expires="+exp.toGMTString();
		}  
	}
	
	return{
		setCookie:setCookie,
		getCookie:getCookie,
		delCookie:delCookie
	};
}());