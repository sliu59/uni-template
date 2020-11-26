/**
 * Created by zhang·tengfei on 2018-1-22.
 *
 * 公共的方法
 *
 */
export const PathUtil = {
  getQueryString: function (name) {
    let reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    let r = window.location.search.substr(1).match(reg);
    if(r!=null)return  decodeURI(r[2]); return null;
  }
}


/*
 * 日期格式化
 * @param {string} time - 传入的时间
 * @param {string} format - 需要的格式
 * exampler dateFormat('Tue Mar 06 2012 00:00:00 GMT+0800', 'yyyy-MM-dd')
 */
export function dateFormat (time, format) {
  var t = new Date(time)
  var tf = function (i) {
    return (i < 10 ? '0' : '') + i
  }
  return format.replace(/yyyy|MM|dd|HH|mm|ss/g, function (a) {
    switch (a) {
      case 'yyyy':
        return tf(t.getFullYear())
      // break
      case 'MM':
        return tf(t.getMonth() + 1)
      // break
      case 'mm':
        return tf(t.getMinutes())
      // break
      case 'dd':
        return tf(t.getDate())
      // break
      case 'HH':
        return tf(t.getHours())
      // break
      case 'ss':
        return tf(t.getSeconds())
      // break
    }
  })
}

//字符串转base64
export function encode(str){
	// 对字符串进行编码
	var encode = encodeURI(str);
	// 对编码的字符串转化base64
	var base64 = btoa(encode);
	return base64;
}

  // base64转字符串
export function decode(base64){
	// 对base64转编码
	var decode = atob(base64);
	// 编码转字符串
	var str = decodeURI(decode);
	return str;
}
 /* 
 *获取手机型号
 */
export function judgeBrand(sUserAgent) {
   // let  sUserAgent= navigator.userAgent.toLowerCase()
   var isIphone = sUserAgent.match(/iphone/i) == "iphone";
   var isHuawei = sUserAgent.match(/huawei/i) == "huawei";
   var isHonor = sUserAgent.match(/honor/i) == "honor";
   var isOppo = sUserAgent.match(/oppo/i) == "oppo";
   var isOppoR15 = sUserAgent.match(/pacm00/i) == "pacm00";
   var isVivo = sUserAgent.match(/vivo/i) == "vivo";
   var isXiaomi = sUserAgent.match(/mi\s/i) == "mi ";
   var isXiaomi2s = sUserAgent.match(/mix\s/i) == "mix ";
   var isRedmi = sUserAgent.match(/redmi/i) == "redmi";
   var isSamsung = sUserAgent.match(/sm-/i) == "sm-";

   if (isIphone) {
	   return 'iphone';
   } else if (isHuawei || isHonor) {
	   return 'huawei';
   } else if (isOppo || isOppoR15) {
	   return 'oppo';
   } else if (isVivo) {
	   return 'vivo';
   } else if (isXiaomi || isRedmi || isXiaomi2s) {
	   return 'xiaomi';
   } else if (isSamsung) {
	   return 'samsung';
   } else {
	   return 'default';
   }
}
