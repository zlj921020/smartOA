
var DateUtil = (function(){
	
	var formatDate = function(date,format) {
		if(!format){
			alert("DateUtil.formatDate入参【format】不能为空,请检查！");
		}
		if(!(date instanceof Date)){
			alert("DateUtil.formatDate入参【date:"+date+"】不是日期类型,请检查！");
		}
		
		if(format.indexOf("hh") > -1){
			format = format.replace("hh", "HH");
		}
		
		return date.format(format);
	};
	
	var checkDate  = function(str,formatString) {
		if(!str){
			alert("DateUtil.checkDate入参数【str】不能空或null,请检查！");
		}
		
		if(!formatString) {
			alert("DateUtil.checkDate入参【formatString】不能为空或null,请检查！");
		}
		
		if(formatString.indexOf("hh") > -1){
			formatString = formatString.replace("hh", "HH");
		}
		
		return Date.isValid(str,formatString);
	};
	
	var getMonthsBetweenTwoDate  = function(startDate, endDate) {
		if(arguments.length != 2 ||
				!(startDate instanceof Date) ||
				!(endDate instanceof Date)){
			alert("DateUtil.compareDate函数的入参必须为2个Date类型值，请检查入参个数以及入参类型是否正确！");
			return null;
		}
		
		var startYear = Number(startDate.format("yyyy"));
		var startMonth = Number(startDate.format("MM"));
		var startDay = Number(startDate.format("dd"));
		
		var endYear = Number(endDate.format("yyyy"));
		var endMonth = Number(endDate.format("MM"));
		var endDay = Number(endDate.format("dd"));
		
		var months = (endYear - startYear) * 12 + (endMonth - startMonth);
		
		months += ((endDay - startDay) / 31.00);
    	
		return Math.floor(months);
	};
	
	var compareDate  = function(date1, date2) {
		if(arguments.length != 2 ||
				!(date1 instanceof Date) ||
				!(date2 instanceof Date)){
			alert("DateUtil.compareDate函数的入参必须为2个Date类型值，请检查入参个数以及入参类型是否正确！");
			return null;
		}
		
		if(date1.isBefore(date2)){
			return 1;
		}else if(date1.isAfter(date2)) {
			return -1;
		}else {
			return 0;
		}
	};
	
	var stringToDate = function(dateStr, format) {
		if(!dateStr){
			alert("DateUtil.stringToDate输入参数【dateStr】不能为空,请检查！");
		}
		
		if(!format){
			alert("DateUtil.stringToDate输入参数【format】不能为空,请检查！");
		}
		
		if(format.indexOf("hh") > -1){
			format = format.replace("hh", "HH");
		}
		
		return Date.parseString(dateStr, format);
	};
	
	var getDBDate = function() {
		var ret = AjaxUtil.ajaxRequest("commonController.do?method=getDBDate");
		var rdate = stringToDate(ret, "yyyy-MM-dd hh:mm:ss");
		if(!rdate){
			alert("请求的数据库日期有误!");
		}
		return rdate;
	};
	
	return {
		formatDate : formatDate,
		checkDate : checkDate,
		getMonthsBetweenTwoDate : getMonthsBetweenTwoDate,
		compareDate : compareDate,
		stringToDate : stringToDate,
		getDBDate : getDBDate
	};
}());