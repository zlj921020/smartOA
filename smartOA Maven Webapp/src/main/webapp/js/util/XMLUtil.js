var XMLUtil = (function(){
	function getAttribute(node,name){ 
		try{
		    if(!node || !name){
		        return null;
		    }else{
		    	return node.getAttribute(name);
		    } 
	    }catch(oE){
	    	throw new Error('XMLUtil.getAttribute:'+oE.message);
	    }
	}
	
	function getHashMapFromReturnValue(returnValue){
		try{
			var result = new HashMap(),
				xmlDoc = $.parseXML(returnValue),
				nodes=xmlDoc.getElementsByTagName("s");
			
			for(var i=0; i<nodes.length; i++){
				for(var j=0; j<nodes[i].attributes.length; j++){
					var key = nodes[i].attributes[j].name;
					var value = getAttribute(nodes[i], key);
				    value = value.replace(/`k/g,"");
				    value = value.replace(/&#xA;/g,"\n");
				    value = value.replace(/&amp;/g,"&");
				    value = value.replace(/&lt;/g,"<");
				    value = value.replace(/&gt;/g,">");
				    value = value.replace(/&quot;/g,"\"");
				    value = value.replace(/&apos;/g,"\'");
				    value = value.replace(/&#xD;/g,"\r");
				    value = value.replace(/&#x9;/g,"\t");
					result.put(key,value);
				}
			}
			
			return result;
		}catch(oE){
			alert("XMLUtil.getHashMapFromReturnValue:"+oE.message);
		}
	}
	
	return {
		getHashMapFromReturnValue: getHashMapFromReturnValue
	};
}());