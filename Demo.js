//重写toFixed()方法，修复(1.005).toFixed(2) != 1.01的问题
//具体实现思路
//先转换成字符串，判断是否有多余的数位被舍弃，如果有则从数字的最后一位开始判断是否需要进1，最后重新组装返回前台

Number.prototype.toFixed = function (d) {
	//s表示被处理的数，d表示要保留的位数
	var s = this + "";
	if (!d)d = 0;
	if (s.indexOf(".") == -1)s += ".";//如果s是整数就在最后面添加一个小数点
	s += new Array(d + 1).join("0");//并且在s的后面加上d个0
	if (new RegExp("^(-|\\+)?(\\d+(\\.\\d{0," + (d + 1) + "})?)\\d*$").test(s)) {//该正则判断s是否符合数字格式
		var s = "0" + RegExp.$2,//返回正则表达式第二个子表达式匹配的结果，此处把s从小数点后第d+1位截成两段，返回第一段
		pm = RegExp.$1,//返回第一个子表达式的匹配结果，此处^(-|\\+)匹配是否含有-号，保留符号
		a = RegExp.$3.length,//返回第三个子表达式返回的结果，此处返回为s小数点后的部分
		b = true;
		if (a == d + 2) {//若被处理数在小数点后的位数大于要保留的位数则进入判断，此时被处理数在小数点后离保留的位数为2位
			a = s.match(/\d/g);//把s中所有数字填充到数组a里
			if (parseInt(a[a.length - 1]) > 4) {//获取数组最后一位判断是否大于4
				for (var i = a.length - 2; i >= 0; i--) {//判断是否进1
					a[i] = parseInt(a[i]) + 1;
					if (a[i] == 10) {
						a[i] = 0;
						b = i != 1;
					} else
						break;
				}
			}
			s = a.join("").replace(new RegExp("(\\d+)(\\d{" + d + "})\\d$"), "$1.$2");//重新组装被处理的数字
		}
		if (b)s = s.substr(1);//若被处理数在小数点后的位数小于要保留的位数，则从字符串的第二个字符开始截取返回后面的字符串
		return (pm + s).replace(/\.$/, "");//拼接符号和字符串返回
	}
	return this + "";
};
