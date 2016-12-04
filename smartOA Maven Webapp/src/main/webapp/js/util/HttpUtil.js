var HttpUtil = (function(){
	/*
	 * 编码函数
	 * 
	 * <、>、"、'、&、\n、\r、\t、,、=
	 */
	function encode(str,flag){
		try{
			if(!str){
				return "";
			}
			
			var RexStr = /\<|\>|\"|\'|\&|\,|\=/g;
			str = str.replace(RexStr, function(MatchStr){
                 switch(MatchStr){
                 case "<":
                     return "&lt;"; 
                 case ">": 
                     return "&gt;";
                 case "\"":
                     return "&quot;";
                 case "'":
                     return "&apos;";
                 case "&":
                     return "&amp;";
                 case ",":
                     return "&#44;";
                 case "=":
                     return "&#61;";
                 default:
                     break;
                 }
            });
			
 	        if(!flag){
 	        	str = StringUtil.replaceAll(str, "\r","&#xD;");
 	        	str = StringUtil.replaceAll(str, "\n","&#xA;");
 	        	str = StringUtil.replaceAll(str, "\t","&#x9;");
 	            
 	        	str = StringUtil.replaceAll(str, "%",encodeURIComponent("%"));
 	        	str = StringUtil.replaceAll(str, "\\+",encodeURIComponent("+"));
 	        	str = StringUtil.replaceAll(str, "#",encodeURIComponent("#"));
 	        	str = StringUtil.replaceAll(str, "&",encodeURIComponent("&"));
 	        }
 	 		return str;
		}catch(oE){
			Exception.throwError("HttpUtil.encode", oE);
		}
	}
	
	/*
	 * 解码函数
	 * <、>、"、'、&、\n、\r、\t、,、=
	 */
	function decode(str){
		try{
			if(!str){
				return "";
			}
	        
			str = StringUtil.replaceAll(str, "&lt;", "<");
	        str = StringUtil.replaceAll(str, "&gt;", ">");
	        str = StringUtil.replaceAll(str, "&quot;", "\"");
	        str = StringUtil.replaceAll(str, "&apos;", "'");
	        str = StringUtil.replaceAll(str, "&amp;", "&");
	        str = StringUtil.replaceAll(str, "&#xA;", "\n");
	        str = StringUtil.replaceAll(str, "&#xD;", "\r");
	        str = StringUtil.replaceAll(str, "&#x9;", "\t");
	        str = StringUtil.replaceAll(str, "&#44;", ",");
	        str = StringUtil.replaceAll(str, "&#61;", "=");
	 		
	        return str;
		}catch(oE){
			Exception.throwError("HttpUtil.htmlDecode", oE);
		}
	}
	
	/*
	 * 导出
	 */
	return {
		encode:encode,
		decode:decode
	};
}());