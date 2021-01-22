<template>
	<view class="" >
		<view class="content" v-if="show" @tap="close" @touchmove.stop.prevent="">
			<image :src="canvasImg" mode="" class="canvas" @tap.stop="" v-if="!showTip"></image>
			<view class="save" @tap.stop="saveImg"  v-if="!showTip">
				<image src="/static/user/xiazai@2x.png" mode=""></image>保存海报
			</view>
			<image src="/static/user/tixing.png" mode="" class="tip-img" v-if="showTip"></image>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				canvasImg: '',
				show:false,
				showTip:false,
			}
		},
		methods: {
			getPoster(canvasImg) {
				this.canvasImg = canvasImg
				this.show = true

			},
			close(){
				if(this.showTip){
					this.showTip = false	
				}else{
					this.show = false
				}
				
			},
			saveImg() {
				uni.showLoading({
					title: '保存中...',
					mask: true
				})
				uni.saveImageToPhotosAlbum({
					filePath: this.canvasImg,
					success: () => {
						this.$toast('保存成功')
						this.$uma.trackEvent('myPoster');
						this.close()
					},
					fail:(err)=> {
						if(err.errMsg == "saveImageToPhotosAlbum:fail auth deny"){
							this.$toast('权限未开启，请到设置中开启相册权限',3000)
							this.showTip = true
						}else{
							this.$toast('保存失败')
							this.showTip = true
						}
						
						
					}
				});
			}
		}
	}
</script>

<style scoped lang="scss">
	.content{
		z-index: 10000;
		position: fixed;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		width: 750rpx;
		height: 100vh;
		background: rgba(0,0,0,0.3);
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		.canvas {
			width: 500rpx;
			height: 890rpx;
			margin-bottom: 63rpx;
			transform: translateY(-30rpx);
		}
		.save{
			// width: 162rpx;
			height: 74rpx;
			background: linear-gradient(0deg, #FAB344, #EE7D0E);
			border-radius: 37rpx;
			font-size: 32rpx;
			font-family: PingFang SC;
			font-weight: 500;
			color: #FFFFFF;
			display: flex;
			align-items: center;
			padding: 0 44rpx 0 38rpx;
			transform: translateY(-30rpx);
			image{
				width: 34rpx;
				height: 34rpx;
				margin-right: 21rpx;
			}
		}
		.tip-img{
			width: 702rpx;
			height: 106rpx;
			position: absolute;
			top: 25rpx;
			left: 50%;
			transform: translate(-50%);
		}
	}
	
</style>
