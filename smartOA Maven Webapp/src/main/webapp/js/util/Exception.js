
var Exception = (function(){
	
	function throwErrorMessage(method,message){
		throw new Error("\n"+method+":"+message);
	}
	
	function throwError(method,oE){
		throw new Error("\n"+method+":"+oE.message);
	}
	
	function handler(method,oE){
		alert(method+":" + oE.message);
	}
	
	function showException(errHTML){
		if(!errHTML){
			return;
		}
		
		$.layer({
			type: 1,
		    title: false,
		    border: [1, 0.3, '#000'],
		    closeBtn: [1, true],
		    shadeClose: false,
		    shade: [0.3, 'white'],
		    offset:['100px' , ''],
		    area: ['1000px', '600px'],
		    page: {
		        html: errHTML
		    },
			close: function(index){
				// 这里保证无BEACON得LANE关闭，防止只有一层遮罩层，导致用户无法操作；
				try{
					var lm = getLaneManager();
					var cl = lm.getCurrentLane();
					var ml = lm.getMainLane();
					var mlId = ml.getID();
					var clBcnList = cl.getBeaconList();
					if(!clBcnList.length){
						lm.removeActiveLane(mlId);
					}
				}catch(ex){
				}
		    	// 这里要关闭应用
			}
		});
	}
	
	return {
		throwErrorMessage : throwErrorMessage,
		throwError : throwError,
		handler : handler,
		showException : showException
	};
}());