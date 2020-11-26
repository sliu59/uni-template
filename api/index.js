import request from '../config/request.js'

const api = {}

/*
* 获取personid  companyid
* 以下为示例，请根据实际需求做更改
* */
api.uploadUserInfo = params => request.globalRequest('/login/uploadUserInfo', 'POST', params)

/*
* 登陆
* */
api.loginCompany = params => request.globalRequest('/login/loginCompany', 'GET', params)


export default api