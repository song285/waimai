<template>
	<view class="">
		<web-view :src="url" :webview-styles="webviewStyles"></web-view>
	</view>
</template>

<script>
	export default{
		data(){
			return {
				url:''
			}
		},
		onLoad() {
			uni.getStorage({
				key:'url',
				success: (res) => {
					var _this = this;
					_this.url = res.data.page_path
				}
			})
		},
	}
</script>

<style>
</style>
