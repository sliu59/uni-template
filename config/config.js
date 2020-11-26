
let secondUrl = 'wxapplet/'

/// *****************************测试环境*****************************
// export const appHost = "https://test/"//// 一级域名

/// *****************************正式环境*****************************
// export const appHost = "https://www.91hilife.com/"// 一级域名
export const appHost = "https://test.91hiwork.com/"//// 一级域名
export let appMainHost = `${appHost}${secondUrl}`


// *****************************添加头信息*****************************
// 不同的头的设置示例
const heArgs = 'test';
// 智慧小镇
const xzArgs = 'test2';
export const genHeaders = (type = 2) => {
	return {
		'App-args': (type === 1 ? heArgs : xzArgs),
	}
}
