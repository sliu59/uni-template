
import {appMainHost,appHost, genHeaders} from './config.js'
const request = {}
const headers = genHeaders()

let access_token = "";
 

    
request.globalRequest = (url, method, data, power) => {
/*     权限判断 因为有的接口请求头可能需要添加的参数不一样，所以这里做了区分
    1 == 不通过access_token校验的接口
    2 == 文件下载接口列表
    3 == 验证码登录 */
// console.log(url,'url',power)
	access_token = uni.getStorageSync('access_token')
    switch (power){
        case 1:
            headers['Authorization'] = 'Basic ZXNuTW9iaWxlQ2xpZW50OmVzbk1vYmlsZQ=='
            break;
        default:
            headers['access_token'] = access_token
			headers['content-type'] = 'application/json'
			// headers['User-Agent'] = 'dajia/heyouFamily'
            break;
    }
    let host = appMainHost
    if(power === 2){ // 广告二级路径

        host = `${appHost}advert/`
        // todo  记得改
        host = `https://test.91hiwork.com/advert/`
        // console.log(host,'host')
    }
	if(power === 13){ // 报修二级路径

	    host = `${appHost}tickets/`
	    // todo  记得改
	    //host = `http://172.16.12.86:8080/hilife_tickets_consumer_war_exploded/`
	    // console.log(host,'host')
	}
	if(power === 14){ // 缴费二级路径

	    host = `${appHost}estatepayment/`
	    // todo  记得改
	    // console.log(host,'host')
	}
	if(power === 15){ // 楼户二级路径
	
	    host = `${appHost}householdv2/`
	    // todo  记得改
	    // console.log(host,'host')
	}

	if(power === 4){ //电商支付页面  支付老接口
	    host = 'https://pay.91hiwork.com/'
	    // host = 'https://payment.91hilife.com/'
		headers['content-type'] = 'application/x-www-form-urlencoded'
	}
	if(power === 5){ //电商支付页面 支付新接口
		host = 'https://www.91hilife.com/'
		headers['Content-Type'] = 'application/x-www-form-urlencoded'
	}
	if(power === 7){ // 设置密码二级路径
		headers['content-type'] = 'application/json'
	    host = `${appHost}deposit`
	}

	if(power === 8){ //缴费 大礼包
		host = `${appHost}estatepayment`
	}
	if(power === 9){ //修改header
		headers['Content-Type'] = 'application/json'
	}
	// if(power === 10){ //本地ip
	// 	host = `http://172.16.12.22:8083/`
	// }
	if (url=="app/coupon/advanceCoupon"){
		host = `${appHost}decoration/`
	}
    return uni.request({
        url: host + url +'?access_token='+access_token,
        method,
        data: data,
        dataType: 'json',
        header: headers
    }).then(res => {
		// console.log(res,'resurlurlurlurl')
		//success 为了兼容获取文件上传token
        if ((res[1].data.code && res[1].statusCode == 200) || (res[1].data.success && res[1].statusCode == 200)) {
			return Promise.resolve(res[1].data)
        }else if(res[1].statusCode == 404){ // 404状态下  说明已经解绑需要跳回登陆授权页面
			uni.showToast({
　　　　　　　　　title: '请重新授权',
　　　　　　　　　icon: 'none'
　　　　　　　})
			let personID = ''
			let companyID = ''
			if(uni.getStorageSync('personIdInfo')){
				personID = uni.getStorageSync('personIdInfo').personID
				companyID = uni.getStorageSync('personIdInfo').companyID
			}
			uni.reLaunch({
				url:`../phone/phoneIndex?personID=${personID}&companyID=${companyID}`
			})
		}else{ // 其他状态下  失败的情况
			return Promise.reject()
		}
    }).catch(parmas => {
		// console.log(parmas,url,'未登录状态')
　　　　　　switch (parmas.code) {
　　　　　　　　case 401:
　　　　　　　　　　uni.clearStorageSync()
　　　　　　　　　　break
　　　　　　　　default:
　　　　　　　　　　uni.showToast({
　　　　　　　　　　　　title: '网络异常',
　　　　　　　　　　　　icon: 'none'
　　　　　　　　　　})
　　　　　　　　　　return Promise.reject()
　　　　　　　　　　break
　　　　　　}
　　})
 } 

export default request