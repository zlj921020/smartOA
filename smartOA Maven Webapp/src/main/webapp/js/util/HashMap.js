/**
*用来存储hashMap对象
*/
//创建一个Map
function HashMap() {
    this.values = {};
    this.isValidating = false;
    this.keyArray = [];
}

//清空一个map
HashMap.prototype.clear = function () {
    this.values = {};
    this.keyArray = [];
};

//判断是否存在关键字
HashMap.prototype.containsKey = function (key) {
    return typeof(this.values[key]) != "undefined";
};

//判断是否存在值
HashMap.prototype.containsValue = function (value) {
    for (var key in this.values) {
        var val = this.values[key];
        if (val == value) {
            return true;
        }
    }
    return false;
};
//Returns value for the key.
HashMap.prototype.get = function (key) {
    if (this.containsKey(key)) {
        return this.values[key];
    }else {
        if (this.isValidating) {
            throw new Error("HashMap.get方法：找不到关键字'" + key + "'");
        }
        return null;
    }
};

//Tests if this map has no elements.
HashMap.prototype.isEmpty = function () {
    return !this.size();
};

//Returns an array of the keys contained in this map.
HashMap.prototype.keySet = function () {
    return this.keyArray;
};

//放入一个值
HashMap.prototype.put = function (key, value) {
	if(this.containsKey(key)){
		 alert("已存在名称为【"+key+"】的对象");
		 return this.get(key);
	}
    this.values[key] = value;
    this.keyArray.push(key);
    return value;
};

//移除一个值
HashMap.prototype.remove = function (key) {
    var value = this.containsKey(key) ? this.get(key) : undefined;
    if (value||(typeof(value)=="number"&&value===0)) {
        delete this.values[key];
        for(var i=0; i<this.keyArray.length; i++) {
        	if(this.keyArray[i] == key) {
        		this.keyArray.splice(i, 1);
        	}
        }
    }
    return value;
};

//获取hashMap的值
HashMap.prototype.size = function () {
    var count = 0;
    for (var key in this.values) {
        count=count+1;
    }
   return count;
};
