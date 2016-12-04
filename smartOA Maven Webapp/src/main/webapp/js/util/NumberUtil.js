var NumberUtil = (function(){
	/**
	 * 四舍五入
	 */
	function round(value, how){
		var num = Number( value );
		var	num1 = Number( num.toFixed(10) );
		return parseFloat( num1.toFixed(how) );
    }
	
	/**
	 * 检查参数是否代表一个数值
	 * 
	 * 测试用例：
	 * 		$.isNumeric("-10");  // true
	 * 		$.isNumeric(16);     // true
	 * 		$.isNumeric(0xFF);   // true
	 * 		$.isNumeric("0xFF"); // true
	 * 		$.isNumeric("8e5");  // true (exponential notation string)
	 * 		$.isNumeric(3.1415); // true
	 * 		$.isNumeric(+10);    // true
	 * 		$.isNumeric(0144);   // true (octal integer literal)
	 * 		$.isNumeric("");     // false
	 * 		$.isNumeric({});     // false (empty object)
	 * 		$.isNumeric(NaN);    // false
	 * 		$.isNumeric(null);   // false
	 * 		$.isNumeric(true);   // false
	 * 		$.isNumeric(Infinity); // false
	 * 		$.isNumeric(undefined); // false
	 */
	function isNumeric(val){
		return $.isNumeric(val);
	}
	
	//根据obj，对初始值进行加工：例如由1111.11222 ->11,111.222%
	function getShowValueByMask(mask,value) {
		try{
			value = String(value);
			if (value === null|| typeof(value) === "undefined"||value==="") {
				value = "";
			}
			
			//校验Mask合法性
			var maskLen = mask.length,
				charValue = null,
				_mask = null,
				lastDotIndex = null,
				_maskLen = null;
			for(var i=0; i<maskLen; i++) {
				charValue = mask.substr(i, 1);
				if(charValue !== "#" && charValue !== "0" && charValue !== "," && charValue !== "." && charValue !== "%") {
					alert("输入的Mask值【"+mask+"】含有非法字符【"+charValue+"】,请检查！");
					return "";
				}
			}
			
			if(mask.indexOf(".") != -1) {
				_mask = mask.split(".")[0];
			}else {
				_mask = mask;
			}
			
			while(_mask.indexOf(",")!=-1) {
				_maskLen = _mask.length;
				lastDotIndex = _mask.lastIndexOf(",");
				if(((_maskLen - lastDotIndex - 1)%3) !== 0) {
					alert("输入的Mask值【"+mask+"】中【,】的位置非法,请检查！");
					return "";
				}
				_mask = _mask.substr(0, lastDotIndex);
			}
			
			
			if(value.indexOf("%")>0){//20100805:给批设置使用
				var vnumber=value.substr(0,value.length-1);
				if(!isNaN(vnumber)){
					value=parseFloat(vnumber)/100;
					value=NumberUtil.getShowValueByMask(mask,value.toString());
				}
	            return value;
			}
			if(value.indexOf(",")>0){//20110105:给批设置使用
	            return value;		    
			}
			
			// value里面有非数字，直接返回""
			var nLen = value.length,
				i = null,
				temp = null;
			for ( i = 0; i < nLen ; i ++ ) {
				temp = value.substr(i, 1);
				if ( ( temp < "0" || temp > "9" ) && temp != "." && temp != "-") {
					return "";
				}
			}

			if(mask.indexOf("%")>0){
				if(value!==""){
					if(value.indexOf(".") != -1) {
						if(Number(value) == 0) {
							value = "0"
						}else {
							var tempNumStrArr = value.split(".");
							
							if(tempNumStrArr[1].length == 2) {
								value = tempNumStrArr[0] + tempNumStrArr[1];
							}else if(tempNumStrArr[1].length > 2) {
								value = tempNumStrArr[0] 
											+ tempNumStrArr[1].substr(0, 2) 
											+ "."
											+ tempNumStrArr[1].substr(2);
							}else if(tempNumStrArr[1].length < 2) {
								value = tempNumStrArr[0] + (Number(tempNumStrArr[1])*10).toString();
							}
						}
					}else {
						value = value + "00";
					}
				}
			}
			
			//处理正负号.
			var sign = "";
			if (value.substr(0, 1 ) == "-" ) {
				sign = "-";
				value = value.substr(1);
			}

			if(isNaN(value)){
				return "";
			}
			var integerNumbers = "";
			var floatNumbers = "";
			if (value.indexOf(".") < 0 ) {
				integerNumbers = value;
			} else {
				var number = value.split(".");
				if ( number.length == 1) {
					integerNumbers = number[0];
				} else if ( number.length == 2 ) {
					integerNumbers = number[0];
					floatNumbers = number[1];
				} else {
					return value;
				}
			}
			while(integerNumbers.length>1&&integerNumbers.substr(0,1)=="0"){
				integerNumbers=integerNumbers.substr(1);
			}
			
			
			var MAX_FORMAT_LENGTH=0;
			var FORMAT_LENGTH=0;
			var FLOAT_LENGTH=0;
			var SEPERATE_CHAR="";
			var suffix="";
			
			//formatString=mask;
			if(mask.substring(0,1)=="+"){
				mask=mask.substring(1,mask.length);
			}
			if(mask.substring(mask.length-1,mask.length)=="%"){
				suffix="%";
				mask=mask.substring(0,mask.length-1);
			}
			var integerMaskString = "";
			var floatMaskString = "";
			if ( mask.indexOf(".") < 0 ) {
				integerMaskString = mask;
			} else {
				integerMaskString = mask.substr(0, mask.indexOf("."));
				floatMaskString = mask.substr(mask.indexOf(".") + 1);
			}
			if ( integerMaskString === null || typeof(integerMaskString) === "undefined") {
				integerMaskString = "";
			}
			if ( floatMaskString === null || typeof(floatMaskString) === "undefined") {
				floatMaskString = "";
			}
		
			var countOfZero = 0;
			var countOfExtra = 0;
			
			var imsLen = integerMaskString.length;
			for ( i = 0; i < imsLen ; i ++ ) {
				temp = integerMaskString.substr(i, 1);
				if ( temp == "#" ) {
					countOfExtra ++;
					continue;
				} else if ( temp == "0" ) {
					countOfZero ++;
					continue;
				} else {
					SEPERATE_CHAR = temp || "";// 数字间的分割符号.
				}
			}
			// 整数部分的格式长度.
			FORMAT_LENGTH = countOfZero;
			// 整数部分的最大长度.
			MAX_FORMAT_LENGTH = countOfZero + countOfExtra;
		
			if (SEPERATE_CHAR === null  || typeof(SEPERATE_CHAR) === "undefined") {
				SEPERATE_CHAR = "";
			}
			countOfZero = 0;
			countOfExtra = 0;
			var fmsLen = floatMaskString.length;
			for ( i = 0; i < fmsLen ; i ++ ) {
				temp = floatMaskString.substr(i, 1);
				if ( temp == "#" ) {
					countOfExtra ++;
					continue;
				} else if ( temp == "0" ) {
					countOfZero ++;
					continue;
				}
			}
			// 小数的长度.
			FLOAT_LENGTH =countOfExtra+countOfZero;
			
			
			var count = 0,
				carryFlag = false;
			if (floatNumbers.length > FLOAT_LENGTH ) {
				floatNumbers = round(parseFloat("0." + floatNumbers), FLOAT_LENGTH);
				if(floatNumbers>=1){
					carryFlag = true;
					floatNumbers = (floatNumbers - 1);
				}
				floatNumbers = floatNumbers.toString().substring(floatNumbers.toString().indexOf(".") + 1);
				if (floatNumbers.length <= FLOAT_LENGTH ) {
					count = FLOAT_LENGTH  - floatNumbers.length;
					for ( i = 0 ; i < count ; i ++ ) {
						floatNumbers += "0";
					}
				}
			} else {
				count = FLOAT_LENGTH  - floatNumbers.length;
				for ( i = 0 ; i < count ; i ++ ) {
					floatNumbers += "0";
				}
			}
			
			if(carryFlag){
				integerNumbers = ( Number(integerNumbers) + 1 ).toString();
			}
			
			//计算分隔符的个数.
			var seperateCount = Math.round(integerNumbers.length / 3);
			var result = "";
			for (i = 0 ; i < seperateCount ; i ++ ) {
				result = SEPERATE_CHAR + 
				integerNumbers.substring( integerNumbers.length - 3, integerNumbers.length ) + result;
				integerNumbers = integerNumbers.substring(0, integerNumbers.length - 3);
			}
			if ((integerNumbers === null|| typeof(integerNumbers) === "undefined" || integerNumbers.length === 0) && SEPERATE_CHAR !== "" ) {
				result = result.substring(1, result.length);
			} else {
				result = integerNumbers + result;
			}
			
			if (FLOAT_LENGTH  > 0 ) {
				return sign + (result==""?"0":result) + "." + floatNumbers+suffix;
			} else {
				return sign + (result==""?"0":result)+suffix;
			}
		}catch(oE){
			Exception.throwError("DateUtil.getShowValueByMask", oE);
		}
	}
	
	function formatNumber(value, format){
		return getShowValueByMask(format, value);
	}
	
	function stringToNumber(eleValue){
		if(!eleValue) {
			return 0;
		}
		
		eleValue = String(eleValue);
		
		if(eleValue.indexOf("%") != -1) {
			tempNumStr = eleValue.substr(0, (eleValue.length-1));
			if(tempNumStr.indexOf(".") != -1) {
				tempNumArr = tempNumStr.split(".");
				
				if(Number(tempNumArr[0]) == 0 && Number(tempNumArr[1]) == 0) {
					realValue = "0";
				}else {
					if(tempNumArr[0].length > 2) {
						realValue = tempNumArr[0].substr(0, (tempNumArr[0].length - 2)) + "." 
										+ tempNumArr[0].substr((tempNumArr[0].length - 2)) 
										+ tempNumArr[1];
					}else if(tempNumArr[0].length == 2) {
						realValue = "0" + "." + tempNumArr[0] + tempNumArr[1];
					}else if(tempNumArr[0].length < 2) {
						realValue = "0.0" + tempNumArr[0] + tempNumArr[1];
					}
				}
			}else {
				if(Number(tempNumStr) == 0) {
					realValue = "0";
				}else {
					if(tempNumStr.length > 2) {
						realValue = tempNumStr.substr(0, (tempNumStr.length - 2)) + "." 
						+ tempNumStr.substr((tempNumStr.length - 2));
					}else if(tempNumStr.length == 2) {
						realValue = "0" + "." + tempNumStr;
					}else if(tempNumArr[0].length < 2) {
						realValue = "0.0" + tempNumStr;
					}
				}
			}
		}else if(eleValue.indexOf(",") != -1){
			realValue = StringUtil.replaceAll(eleValue, ",", "");
		}else {
			if(Number(eleValue) == 0) {
				realValue = "0";
			}else {
				realValue = eleValue;
			}
		}
		return isNaN(parseFloat(realValue)) ? 0 : parseFloat(realValue);
	}
	
	return {
		round: round,
		isNumeric: isNumeric,
		getShowValueByMask: getShowValueByMask,
		formatNumber: formatNumber,
		stringToNumber: stringToNumber
	};
}());