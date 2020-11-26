<template>
    <view>
        <web-view :webview-styles="webviewStyles" :src="outUrl" @message="getMessage"></web-view>
    </view>
</template>

<script>
	import {decode} from '../../config/DateUtil.js'
    import {appHost} from '../../config/config.js'
    export default {
        data() {
            return {
                webviewStyles: {
                    progress: {
                        color: '#FF3333'
                    }
                },
				outUrl:'',
                shareUrl:{
                    url:'',// 分享链接  不包含域名 和access_token
                    title:'',// 页面标题
                    image:'',// 分享图片地址
                },// 分享参数
            }
        },
		onLoad:function(options) {
			this.outUrl=decodeURIComponent(options.outUrl)
			if(options.NavigationTitle){
				uni.setNavigationBarTitle({
				　　title:options.NavigationTitle
				})
			}
		},
        // onShareAppMessage: function (options) {
        //     let that =this;
        //     console.log(that.shareUrl)
        //     return {
        //         title: that.shareUrl.title,
        //         path: `/pages/index/index?type=3&outUrl=${appHost}${encodeURIComponent(that.shareUrl.url)}`,
        //         imageUrl: that.shareUrl.image
        //     }
        //
        // },
		methods:{
			getMessage(e) {//接收web-view传递的参数
                console.log(e,'webview 参数')
                let that =this;
                let shareUrl = e.detail.data[e.detail.data.length-1];
                that.shareUrl = JSON.parse(shareUrl);

                if(!that.shareUrl.url){ // 如果没有返回地址说明没有
                    uni.hideShareMenu()
                }

			}
		}
    }
</script>

<style>

</style>
