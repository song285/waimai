<template>
	<view class="main">
		<view class="login-view">
			<!-- <image src="http://zhishan-test.oss-cn-beijing.aliyuncs.com/take_away%2Fimage%2Fishihui.png"></image> -->
			<!-- <view class="text">好券侠优惠平台</view> -->
			<image src="../../static/ishihui.png"></image>
			<view class="text">i食惠红包返利平台</view>
			<button type="primary" open-type="getUserInfo" @getuserinfo="onGetPhoneNumber">微信授权</button>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			code: ''
		};
	},
	onLoad() {
		uni.login({
			provider: 'weixin',
			success: res => {
				this.code = res.code;
			}
		});
	},
	methods: {
		onGetPhoneNumber(e) {
			let _this = this
			uni.getUserInfo({
				success(ret) {
					uni.login({
						provider: 'weixin',
						success: res => {
							_this.code = res.code;
							console.log(e);
							uni.showLoading({
								title: '登录中',
								mask: false
							});
							const encryptedData = e.detail.encryptedData;
							const iv = e.detail.iv;
							const rawData = e.detail.rawData;
							console.log(e,res)
							if (e.detail.errMsg == 'getUserInfo:ok') {
								_this.login(encryptedData, iv, _this.code,rawData);
							} else {
								uni.showToast({
									title: '您已取消授权登录',
									icon: 'none'
								});
							}
						}
					});
				}
			})
		},
		login(encryptedData, iv, code,rawData) {
			let scene = this.$store.state.scene || 0
			var data = {
				code: code,
				encryptedData: encryptedData,
				iv: iv,
				pId: scene,
				rawData:rawData
			};
			this.$reqHttp({
				url: '/api/user/wx-login',
				headerState: 1,
				data: data
			})
			.then(res => {
				console.log(res);
				this.$toast('授权登录成功')
				this.$store.dispatch('setToken', res.data.token);
				uni.setStorageSync('token', res.data.token);
				uni.hideLoading();
				setTimeout(() => {
					uni.redirectTo({
						url: '../user/user'
					});
					uni.hideTabBar();
					this.$uma.trackEvent('myLogin');
				}, 300);
				// setTimeout(() => {
					
				// }, 300);
			})
				.catch(error => {
					console.log(error);
					uni.hideLoading();
					// _this.$toast(error.msg)
				});
		}
	}
};
</script>
<style lang="scss" scoped>
.main {
	box-sizing: border-box;
	padding-top: 214rpx;
	height: 100vh;
	background-color: #f2f2f2;
	.login-view {
		margin: 0 auto 0;
		width: 550rpx;
		height: 550rpx;
		background: #ffffff;
		border-radius: 16rpx;
		text-align: center;
		image {
			width: 207rpx;
			height: 207rpx;
			margin: 64rpx auto 0;
		}
		.text {
			width: 100%;
			text-align: center;
			color: #f87501;
			font-size: 32rpx;
			font-weight: bold;
			line-height: 31rpx;
		}
		button {
			background-color: #1fba47;
			width: 257rpx;
			height: 70rpx;
			border-radius: 8rpx;
			color: #ffffff;
			font-size: 28rpx;
			margin-top: 90rpx;
		}
	}
}
</style>
