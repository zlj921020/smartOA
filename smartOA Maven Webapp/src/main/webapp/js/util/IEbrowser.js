var IEbrowser = (function(){

	var isMoreThanIE8browser = function(){
		try{
			var	rMsie = /(msie\s|trident.*rv:)([\w.]+)/,
				ua = navigator.userAgent.toLowerCase(),
				match = rMsie.exec(ua),
				version = null;  

			if (match == null) {
				return false;
			}

			version = match[2] || 0;
			if (version >= 8) {
				return true;
			}
			
			return false;
		}catch(oE){
			Exception.throwError("IEbrowser.isMoreThanIE8browser", oE);
		}
	};
	
	return {
		isMoreThanIE8browser : isMoreThanIE8browser
	};
}());