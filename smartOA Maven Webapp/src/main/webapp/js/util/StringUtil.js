String.prototype.replaceAll = function(aFindText,aRepText,mode){
  if(typeof(mode)=="undefined"){
      mode="gmi";
  }
  return this.replace(new RegExp(aFindText,mode),aRepText);
};

var StringUtil = (function(){
	
	/*
	 * 生成UUID
	 */
	function getUUID() {
		try{
			return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
				var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
				return v.toString(16);
			});
		}catch(oE){
			Exception.throwError("StringUtil.getUUID", oE);
		}
	}
	
	/*
	 * 消除前导空格
	 */
	function lTrim(str){
		try{
			if ( !str ) {
				return "";
			}
		    return String(str).replace(/(^[\s]*)/g, "");
		}catch(oE){
			Exception.throwError("StringUtil.lTrim", oE);
		}
	}
	
	/*
	 * 消除尾部空格
	 */
	function rTrim(str){
		try{
			if ( !str ) {
				return "";
			}
		    return str.replace(/([\s]*$)/g, "");
		}catch(oE){
			Exception.throwError("StringUtil.rTrim", oE);
		}
	}
	
	/*
	 * 消除前后空格
	 */	
	function trim(str){  
		try{
			if ( !str ) {
				return "";
			}
			return str.replace(/(^[\s]*)|([\s]*$)/g, "");
		}catch(oE){
			Exception.throwError("StringUtil.trim", oE);
		}
	}
	
	/*
	 * 获取中文字符个数
	 */
	function getChnNumber(str){
		try{
			if(!str){
				return null;
			}
			
			var chnNumber = 0, 
				charCode = -1;
			
			for (var i = 0; i < str.length; i++) {
				
				charCode = str.charCodeAt(i);
				
				if ( !(charCode >= 0 && charCode <= 128) ){ 
					chnNumber ++;
				}
			}
			return chnNumber;
		}catch(oE){
			Exception.throwError("StringUtil.getChnNumber", oE);
		}
	}
	
	/*
	 * 获取英文字符个数
	 */
	function getEngNumber(str){
		try{
			if(!str){
				return null;
			}
			
			var chnNumber = 0, 
				charCode = -1;
			
			for (var i = 0; i < str.length; i++) {
				
				charCode = str.charCodeAt(i);
				
				if ( charCode >= 0 && charCode <= 128 ){ 
					chnNumber ++;
				}
			}
			return chnNumber;
		}catch(oE){
			Exception.throwError("StringUtil.getEngNumber", oE);
		}
	}
	
	/*
	 * 获取字符串的字节长度
	 * 一个中文：2个字节
	 * 一个西文：1个字节
	 */
	function getBinaryLength(str){
		try{
			if(!str){
				return null;
			}
			
			var binaryLength = 0,
				charCode = -1;
			
			for (var i = 0; i < str.length; i++) {
				charCode = str.charCodeAt(i);
			  	if (charCode >= 0 && charCode <= 128){
			  		binaryLength += 1;
			  	}else{ 
			  		binaryLength += 2;
			  	}
			}
			
			return binaryLength;
		}catch(oE){
			Exception.throwError("StringUtil.getBinaryLength", oE);
		}
	}
	
	function replaceAll(str, aFindText, aRepText){
		var char = null,
			charArr = [],
			specialCharMap = {
				"(" : "\\(",
				"[" : "\\[",
				"{" : "\\{",
				"^" : "\\^",
				"$" : "\\$",
				"|" : "\\|",
				")" : "\\)",
				"?" : "\\?",
				"*" : "\\*",
				"." : "\\."
			};
		
		str = str || "";
		
		for(var i=0; i<aFindText.length; i++) {
			char = aFindText.substr(i, 1);
			
			if(char in specialCharMap) {
				charArr.push(specialCharMap[char]);
			}else {
				charArr.push(char);
			}
		}
		
		return str.replace( new RegExp(charArr.join(""),"gmi"), aRepText );
	}
	
	/*
	 * 导出
	 */
	return {
		trim : trim,
		lTrim : lTrim,
		rTrim : rTrim,
		getUUID : getUUID,
		getChnNumber : getChnNumber,
		getEngNumber : getEngNumber,
		getBinaryLength : getBinaryLength,
		replaceAll : replaceAll
	};
}());