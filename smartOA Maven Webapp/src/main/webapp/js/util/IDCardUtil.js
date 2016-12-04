/*
 * 〖中华人民共和国国家标准 GB 11643-1999〗
 * 
 * 1. 15位身份证编码规则  - dddddd yymmdd xx p    
 *    dddddd：地区码   
 *    yymmdd: 出生年月日    
 *    xx: 顺序码，无法确定    
 *    p: 性别，奇数为男，偶数为女； 
 * 
 * 2. 身份证18位编码规则：dddddd yyyymmdd xxx y
 *    dddddd: 地区码    
 *    yyyymmdd: 出生年月日     
 *    xxx: 顺序码，奇数为男，偶数为女    
 *    y: 校验码，该位数值可通过前17位根据【ISO 7064:1983.MOD 11-2】计算获得，
 * 
 * 注：
 * 1. 地区码：表示编码对象常住户口所在县(市、旗、区)的行政区划代码。
 * 2. 顺序码：表示同一地址码所标识的区域范围内，对同年、月、日出生的人员编定的顺序号；
 * 3. 校验码：校验码是根据前面十七位数字码，按照校验码计算出来的检验码。
 * 
 * 校验规则：
 * 		15位校验规则 6位地址编码+6位出生日期+3位顺序号
 * 		18位校验规则 6位地址编码+8位出生日期+3位顺序号+1位校验位
 * 		
 * 		 公式:∑(ai×Wi)(mod 11)
 * 				i-------表示号码字符从由至左包括校验码在内的位置序号； 
 * 				ai------表示第i位置上的号码字符值； 
 * 				Wi------示第i位置上的加权因子，其数值依据公式Wi=2^(n-1）(mod 11)计算得出。
 * 				i 18 17 16 15 14 13 12 11 10 9 8 7 6 5 4 3 2 1
 * 				Wi 7 9 10 5 8 4 2 1 6 3 7 9 10 5 8 4 2 1
 * 
 */
var IDCardUtil = (function(){
	/*
	 *  加权因子
	 */
	var Wi = [ 7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2, 1 ];

	/*
	 * 身份证验证位值.10代表X	
	 */
	var ValideCode = [ 1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2 ];
	
	/*  
	 * 验证15位数身份证号码中的生日是否是有效生日  
	 * @param idCard15 15位数身份证字符串  
	 */  
	var isValidityBrithBy15IdCard = function(idCard15){   
		var year =  idCard15.substring(6,8);   
		var month = idCard15.substring(8,10);   
		var day = idCard15.substring(10,12);   
		var temp_date = new Date(year,parseFloat(month)-1,parseFloat(day)); 
		// 对于老身份证中的你年龄则不需考虑千年虫问题而使用getYear()方法
		if ( temp_date.getYear() != parseFloat(year) || 
				temp_date.getMonth()!=parseFloat(month)-1 || 
				temp_date.getDate()!=parseFloat(day)) {   
			return false;   
        }else{   
            return true;   
        }   
	};
	
	/* 
	  * 验证18位数身份证号码中的生日是否是有效生日  
	  * @param idCard 18位数身份证字符串  
	  */  
	var isValidityBrithBy18IdCard = function(idCard18){   
	    var year =  idCard18.substring(6,10);   
	    var month = idCard18.substring(10,12);   
	    var day = idCard18.substring(12,14);   
	    var temp_date = new Date(year,parseFloat(month)-1,parseFloat(day));   
	    // 这里用getFullYear()获取年份，避免千年虫问题   
	    if(temp_date.getFullYear()!=parseFloat(year) ||
	    		temp_date.getMonth()!=parseFloat(month)-1 ||
	    		temp_date.getDate()!=parseFloat(day)){   
	            return false;   
	    }else{   
	        return true;   
	    }   
	};
	
	/*
	 * 判断身份证号码为18位时最后的验证位是否正确  
	 * @param a_idCard 身份证号码数组  
	 */  
	var isTrueValidateCodeBy18IdCard = function(a_idCard) {   
	    var sum = 0;                             // 声明加权求和变量   
	    if (a_idCard[17].toLowerCase() == 'x') {   
	        a_idCard[17] = 10;                   // 将最后位为x的验证码替换为10方便后续操作   
	    }   
	    for ( var i = 0; i < 17; i++) {   
	        sum += Wi[i] * a_idCard[i];          // 加权求和   
	    }   
	    valCodePosition = sum % 11;              // 得到验证码所位置   
	    if (a_idCard[17] == ValideCode[valCodePosition]) {   
	        return true;   
	    } else {   
	        return false;   
	    }   
	};
	
	
	/*
	 * 校验身份证号码
	 * 
	 * 入参：身份证号码
	 * 
	 * 返回值：Boolean
	 */
	function checkSfzhm(idCard){
		try{
			if(!idCard){
				return false;
			}
			idCard = StringUtil.trim(idCard.replace(/ /g, "")); // 去掉首、尾、字符间空格。   
		    if (idCard.length == 15) {   
		        return isValidityBrithBy15IdCard(idCard);       //进行15位身份证的验证    
		    } else if (idCard.length == 18) {   
		        var a_idCard = idCard.split("");                // 得到身份证数组   
		        if(isValidityBrithBy18IdCard(idCard)&&isTrueValidateCodeBy18IdCard(a_idCard)){   //进行18位身份证的基本验证和第18位的验证
		            return true;   
		        }else {   
		            return false;   
		        }   
		    } else {   
		        return false;   
		    }
		}catch(oE){
			window.alert(515151);
		}
	}
	
	/*
	 * 从身份证中获取性别信息
	 * 
	 * 入参：合法的15、18位身份证号码
	 * 
	 * 返回值：String( "1":男； "2":女； ) 
	 */
	function getXbFromSfzhm(idCard){
		try{
			if ( !idCard ) {
				alert("身份证号码为空，请检查!");
				return null;
			}
			
			if ( !checkSfzhm(idCard) ) {
				alert("身份证号码不正确，请检查!");
				return null;
			}
			
		    idCard = StringUtil.trim(idCard.replace(/ /g, "")); // 去掉首、尾、字符间空格。   
		    if(idCard.length==15){   
		        if(idCard.substring(14,15)%2===0){   
		            return "2";   
		        }else{   
		            return "1";   
		        }   
		    }else if(idCard.length ==18){   
		        if(idCard.substring(14,17)%2===0){   
		            return "2";   
		        }else{   
		            return "1";   
		        }   
		    }else{   
		        return null;   
		    }  
		}catch(oE){
			window.alert(515151);
		}
	}
	
	/*
	 * 从身份证号码中获取出生日期
	 * 
	 * 入参：身份证号码
	 * 
	 * 返回值：JS.Date
	 */
	function getCsrqFromSfzhm(idCard){
		try{
			if ( !idCard ) {
				alert("身份证号码为空，请检查!");
				return null;
			}
			
			if ( !checkSfzhm(idCard) ) {
				alert("身份证号码不正确，请检查!");
				return null;
			}
			
			var year,
				month,
				day,
				date;
			
			if ( idCard.length == 15 ) {
				year =  idCard.substring(6,8);   
				month = idCard.substring(8,10);   
				day = idCard.substring(10,12);   
				date =  new Date(year, parseFloat(month)-1, parseFloat(day));
			} else if ( idCard.length ==18 ) { 
			    year =  idCard.substring(6,10);   
			    month = idCard.substring(10,12);   
			    day = idCard.substring(12,14);   
			    date = new Date(year, parseFloat(month)-1, parseFloat(day));  
			}
			
			return date;
		}catch(oE){
			window.alert(515151);
		}
	}
	
	/*
	 *  导出函数
	 */
	return {
		getXbFromSfzhm : getXbFromSfzhm,
		checkSfzhm : checkSfzhm,
		getCsrqFromSfzhm : getCsrqFromSfzhm
	};
}());