function URL(requestUrl){
	this.requestUrl=requestUrl;
	this.havePara=false;
	this.XMLPara="";
	this.successFlag=true;
	this.haveFinish=false;
	this.gridDataSubmitTokens = [];
}
URL.prototype.init=function(){
	try{
		this.XMLPara="<?xml version=\"1.0\" encoding=\"UTF-8\"?><p>";
		this.havePara=true;
	}catch (oE) {
		Exception.handler("URL.init",oE);
	}
};

URL.prototype.addPara=function(key,value){
	try{
		if(!this.havePara){
			this.init();
		}
		if(key==""){
		    alert("关键字【"+key+"】不能为空");
		    this.successFlag=false;
		}
		if(!isNaN(key.substring(0,1))){
		    alert("关键字【"+key+"】不合法，不能以数字开头");
		    this.successFlag=false;
		}
		
		//addpara负责去转换数据类型 预防value的值是数值和时间时，会报错 
		if(value instanceof Date){
			value = DateUtil.formatDate(value, FrameConstants.STANDARD_DATETIME_TRANSFORM_FORMAT);
		}
		
		value = String(value);
		
		var para="<s "+key+"=\""+HttpUtil.encode(value)+"\"/>";
		this.XMLPara += para;
	}catch (oE) {
		Exception.handler("URL.addPara",oE);
	}
};

URL.prototype.addForm=function(formObj){
	try{
		if(!this.havePara){
			this.init();
		}
	 	var rawJSONData = null,
	 		xml = null,
	 		key = null,
	 		value = null;
	 	
	 	if(formObj instanceof SForm){
	 		// 新SFORM
	 		rawJSONData = formObj.getData();

	 		xml = "<s ";
	 		for(key in rawJSONData){
	 			value = rawJSONData[key];
	 			
				if(value instanceof Date){
					value = DateUtil.formatDate(value, FrameConstants.STANDARD_DATETIME_TRANSFORM_FORMAT);
				}else if(typeof value == "number"){
					value = String(value);
				}
	 			
	 			xml += key+"=\""+HttpUtil.encode(value)+"\" ";
	 		}
	 		xml +="/>";
	 	}
		
		this.addXMLParas(xml);
	}catch (oE) {
		Exception.handler("URL.addForm",oE);
	}
};


URL.prototype.addGrid=function(gridObj){
	try{
		if(!this.havePara){
			this.init();
		}
		
	 	if(gridObj instanceof Grid){
			this.gridDataSubmitTokens.push( gridObj.getTokenForSubmitAllData() );
	 	}else{
	 		alert("当前操作的对象【"+gridObj+"】不是一个GRID!");
	 	}
	}catch (oE) {
		Exception.handler("URL.addGrid",oE);
	}
};

URL.prototype.addSelectedGrid =function(gridObj){
	try{
		if(!this.havePara){
			this.init();
		}

	 	if(gridObj instanceof Grid){
			this.gridDataSubmitTokens.push( gridObj.getTokenForSubmitSelectedData() );
	 	}else{
	 		alert("当前操作的对象【"+gridName+"】为【"+gridObj+"】不是一个GRID!");
	 	}
	}catch (oE) {
		Exception.handler("URL.addSelectedGrid",oE);
	}
}

URL.prototype.addRowGrid =function(gridObj, rowNum){
	if(!this.havePara){
		this.init();
	}
 	var rawJSONData = null,
 		colObj = null,
 		colType = null,
 		dateColName = null,
 		xml = null,
 		key = null,
 		value = null;
 	
 	if(gridObj instanceof Grid){
 		var xmlString="<d k=\""+gridObj.getProperty("name")+"\"";
	 	
	 	rawJSONData = gridObj.getRowData(rowNum);

	 	//拼接日期类型标识
	 	if(rawJSONData) {
	 		for(var columnName in rawJSONData){
 				colObj = gridObj.getColumn(columnName);
 				
 				if(colObj) {
 					colType = colObj.getProperty("dataType");
 	 				if(colType == "date") {
 	 					if(dateColName) {
 	 						dateColName = dateColName + "," + columnName;
 	 					}else {
 	 						dateColName = columnName;
 	 					}
 	 					
 	 				}
 				}
 			}
	 	}
	 	
	 	if(dateColName) {
	 		xmlString += " dateColNames=\""+dateColName+"\">";
	 	}else {
	 		xmlString += ">";
	 	}
	 	
	 	if(rawJSONData) {
	 		xmlString+="<r ";
 			
 			for(var columnName in rawJSONData){
 				key = columnName;
 				value = rawJSONData[key] ? rawJSONData[key] : "";
 				if(value instanceof Date){
 					value = DateUtil.formatDate(value, FrameConstants.STANDARD_DATETIME_TRANSFORM_FORMAT);
 				}
				xmlString += key+"=\""+HttpUtil.encode(value.toString(),"true")+"\" ";
 			}
 			
 			xmlString+="/>";
	 	}
	 	
		xmlString=xmlString.replaceAll("\r","&#xD;");
        xmlString=xmlString.replaceAll("\n","&#xA;");
        xmlString=xmlString.replaceAll("\t","&#x9;");
        
        xmlString=xmlString.replaceAll("%",encodeURIComponent("%"));
        xmlString=xmlString.replaceAll("\\+",encodeURIComponent("+"));
        xmlString=xmlString.replaceAll("#",encodeURIComponent("#"));
        xmlString=xmlString.replaceAll("&",encodeURIComponent("&"));
	    xmlString+="</d>";
	}else{
 		alert("当前操作的对象【"+gridName+"】不是<dw:grid>!");
 	}
	this.addXMLParas(xmlString);
}

URL.prototype.addTree=function(treeObj){
	try{
		if(!this.havePara){
			this.init();
		}
		var treedata=treeObj.getAllNode();
		if(treedata){
			this.addXMLParas(treedata);  
		}
		else{
			return false;
		}
	}catch (oE) {
		Exception.handler("URL.addTree",oE);
	}
};

URL.prototype.addXMLParas=function(paras){
	try{
		if(!this.havePara){
			this.init();
		}
		this.XMLPara += paras;
	}catch (oE) {
		Exception.handler("URL.addXMLParas",oE);
	}
};

URL.prototype.complete=function(){
	try{
		var token = null;
		
		if(this.havePara){
			
			if(this.gridDataSubmitTokens.length){ 
				this.XMLPara+="<d k=\"__dw_gridDataSubmitTokens\" >";
				for(var i = 0;i< this.gridDataSubmitTokens.length;i++){
					token = this.gridDataSubmitTokens[i];
					this.XMLPara+="<r gridSessionID=\""+token["gridSessionID"]+"\" dataScope=\""+token["dataScope"]+"\"/>";
				}
				this.XMLPara+="</d>";
			} 
			
			this.XMLPara+="</p>";
		}
		this.haveFinish=true;
	}catch (oE) {
		Exception.handler("URL.complete",oE);
	}
};
//以后扩充
URL.prototype.check=function(){
	return this.successFlag;
};

URL.prototype.getURLString=function(){
	try{
		if(!this.haveFinish){
			this.complete();
			if(!this.check()){
			    return "";
			}
		}
		return this.requestUrl+"&_xmlString="+this.XMLPara;
	}catch (oE) {
		Exception.handler("URL.getURLString",oE);
	}
};


