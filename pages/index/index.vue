<template>
	<view class="accredit-page">
		<image class="indexBg" src="" mode="widthFix"></image>
		<view class="btnTip"></view>
		<button class="accredit-btn" open-type="getUserInfo" withCredentials="true" lang="zh_CN" @getuserinfo="wxGetUserInfo">
			立即体验
		</button>
	</view>
</template>

<script>
	import {
		appMainHost
	} from '../../config/config.js'
	import api from '../../api/index.js'
	import { genHeaders } from '../../config/config.js'
	export default {
		data() {
			return {

			}
		},
		onLoad(options) {

		},
		onHide(){

		},
		methods: {
			// 获取授权状态
			getSettingType(){
				let _this=this
				wx.getSetting({
					success (res) {
						if(res.authSetting['scope.userInfo']){
							_this.wxGetUserInfo()
						}
					    console.log(res.authSetting,'res.authSetting')
					    // res.authSetting = {
					    //   "scope.userInfo": true,
					    //   "scope.userLocation": true
					    // }
					}
				})
			},

			
			//第一授权获取用户信息===》按钮触发
			wxGetUserInfo() {
				let _this = this;
				uni.getUserInfo({
					provider: 'weixin',
					success: function(infoRes) {
						// console.log(infoRes, 'infoRes')
						uni.showLoading({
							mask:true,
						    title: '授权中'
						});
						// let nickName = infoRes.userInfo.nickName; //昵称
						_this.nickName = infoRes.userInfo.nickName; //昵称
						let avatarUrl = infoRes.userInfo.avatarUrl; //头像
						_this.encryptedData = infoRes.encryptedData
						_this.iv = infoRes.iv
						try {
							uni.setStorageSync('isCanUse', false); //记录是否第一次授权  false:表示不是第一次授权
							wx.login({
								success(res) {
									// console.log(res, 'sfdsafa')
									if (res.code) {
										//发起网络请求
										wx.request({
											url: `${appMainHost}/login/login`,
											data: {
												code: res.code
											},
											header: {
												...genHeaders()
											},
											method: 'GET',
											success(res) {
												console.log(res, 'login')
												_this.openId = res.data.data.openID
												uni.setStorageSync('openId',_this.openId);
												_this.sessionID = res.data.data.sessionID
												// console.log(_this.sessionID, 'sdsakjhdkjsa')
												_this.sessionKey = res.data.data.sessionKey
												_this.uploadUserInfo()
											}
										})
									} else {
										uni.hideLoading();
										console.log('登录失败！' + res.errMsg)
									}
								}
							})

							// uni.reLaunch({ //信息更新成功后跳转到小程序首页
							// 	url: '/pages/second/second'
							// });
						} catch (e) {
							uni.hideLoading();
						}
					},
					fail(res) {}
				});
			},

		}
	}
</script>

<style lang="scss">
	.accredit-page {
		position: absolute;
		width: 100%;
		height: 100%;
		left: 0px;
		top: 0px;
		box-sizing: border-box;
		// padding: 0px 30px;
		// background: url("../../static/img/page_bg.png") no-repeat;
		background-size: 100% auto;
		background-position: center bottom;
		background-color: #fff;
		
		.indexBg {
			width: 100%;
		}
		
		.btnTip {
			margin:  24px 0 30px;
			text-align: center;
			font-size: 14px;
			color: #666;
		}

		.accredit-btn {
			margin: 0 30px 20px;
			background: #F5A623;
			color: #fff;
			border-radius: 4px;
		}
	}
</style>
