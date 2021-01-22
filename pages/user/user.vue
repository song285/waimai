<template>
	<movable-area class="main">
		<custom-tarbar :selected="3"></custom-tarbar>
		<image src="http://zhishan-test.oss-cn-beijing.aliyuncs.com/take_away%2Fimage%2FBG%402x.png" mode="" class="main-bg"></image>
		<view class="content">
			<view class="header">
				<image :src="user.head ? user.head : '/static/user/mornetoux@2x.png'" mode=""></image>
				<view class="info" v-if="user.openId">
					<text class="name">{{ user.nickName }}</text>
					<!-- <text class="label">{{user.nickName}}(没有字段)</text> -->
					<image src="../../static/user/tuichudnegl@2x.png" mode="" @tap="outLogin"></image>
				</view>
				<view class="login-btn" @tap="goLogin" v-else>登录/注册</view>
			</view>
			<view class="card">
				<image src="http://zhishan-test.oss-cn-beijing.aliyuncs.com/take_away%2Fimage%2Fkapian2%402x.png" mode="" class="card-bg"></image>
				<view class="card-content">
					<view class="card-top">
						<view class="item left">
							<view class="top">累计收益</view>
							<view class="bottom">{{ profit.totalProfit || 0 }}</view>
						</view>
						<view class="item right">
							<view class="right-item">
								<text>今日预估</text>
								<text class="money">{{ profit.todayProfit || 0 }}</text>
							</view>
							<view class="right-item">
								<text>本月预估</text>
								<text class="money">{{ profit.currentMonthProfit || 0 }}</text>
							</view>
						</view>
					</view>
					<view class="card-bottom">
						<view class="item">
							<text>待结算</text>
							<text class="money">{{ profit.toBePay || 0 }}</text>
						</view>
						<view class="item">
							<text>余额</text>
							<text class="money">{{ profit.canCashOut || 0 }}</text>
						</view>
					</view>
					<view class="withdraw" @tap="withdraw">
						提现
						<image src="/static/user/fanhui@2x.png" mode=""></image>
					</view>
				</view>
			</view>
			<!-- 点餐提醒 -->
			<view class="order-tips" @tap="onOrdertips">
				<image src="../../static/user/DCTX@2x.png" mode=""></image>
			</view>
			<view class="menu-title">我的服务</view>
			<view class="menu">
				<view class="left" @tap="go('../order/order')">
					<image src="/static/user/dingadna@2x.png" mode="" class="left-bg"></image>
					<view class="left-content">
						<text>订单</text>
						<text class="detail">查看订单收益明细</text>
						<image src="/static/user/dayou@2x.png" mode=""></image>
					</view>
				</view>
				<view class="right">
					<view class="item" @tap="go('../fans/fans')">
						<image src="/static/user/fensi@2x.png" mode="" class="item-bg"></image>
						<view class="item-content">
							<text>粉丝</text>
							<text class="detail">粉丝越多越赚钱</text>
							<image src="/static/user/dayou@2x.png" mode=""></image>
						</view>
					</view>
					<view class="item" @tap="share">
						<image src="/static/user/fenxiang@2x.png" mode="" class="item-bg"></image>
						<view class="item-content">
							<text>邀请</text>
							<text class="detail">邀请好友下单，即可返现</text>
							<image src="/static/user/dayou@2x.png" mode=""></image>
						</view>
					</view>
				</view>
			</view>
		</view>
		
		
		<movable-view class="customer" direction="all" :x="x" :y="y" inertia="true" friction="5" @change="onChange" @tap="openCustomer">
			客服
		</movable-view>
		
		
		<view class="dialog" v-if="showWithdraw">
			<view class="content">
				<image src="/static/user/shanchu@2x.png" mode="" class="close" @tap="showWithdraw = false"></image>
				<image src="/static/user/jiayou@2x.png" mode="" class="err-img"></image>
				<text class="remark">很抱歉</text>
				<text class="tip">余额满50元才能提现</text>
			</view>
		</view>

		<canvas canvas-id="canvas" class="canvas" />
		<poster ref="poster"></poster>
		
		<!-- 点餐提醒遮罩层 -->
		<view class="mask" v-show="showMask">
			<image src="../../static/user/liwu@2x.png" mode=""></image>
		</view>
	</movable-area>
</template>

<script>
import customTarbar from '@/pages/component/customTarbar.vue';
import user from '../../common/api/user/user.js';
import poster from '../component/poster.vue';
export default {
	components: {
		'custom-tarbar': customTarbar,
		poster: poster
	},
	data() {
		return {
			x:0,
			y:0,
			img:
				'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1605274195892&di=5f346a7da847f84732a66fc631d214ce&imgtype=0&src=http%3A%2F%2Fa4.att.hudong.com%2F27%2F67%2F01300000921826141299672233506.jpg',
			showWithdraw: false,
			user: {},
			profit: {},
			canvasImg: '',
			path: 'pages/user/user',
			showMask:false
		};
	},
	onShow() {
		if (this.$store.state.token) {
			user.getUserInfo(this);
			user.getProfit(this);
		}
	},
	onHide() {
		this.$refs.poster.close();
	},
	onLoad(e) {
		if (e.scene) {
			this.$store.dispatch('setScene', e.scene);
		}
	},
	methods: {
		onChange(e){
			// console.log(e)
		},
		openCustomer(){
			uni.navigateTo({
				url:'./customer'
			})
			this.$uma.trackEvent('customer-service');
		},
		// 点餐提醒
		onOrdertips(){
			let tempid = ['ZZnXluVxMSFPky1q28CCt9LIU-ANmAX4i3148PGmvps'];//i食惠
			// let tempid = ['7QBiGwLMlCVgNzlxeOFcf3vJxpgySrIyhFedwVyWgUs'];// 好券超人
			// let tempid = ['o6p4zI0h5zKxFtg81gt7Qh0dKDcn3wA4aIt5hPxPoMs'];// 好券侠
			let _this = this
			if (!this.$store.state.token) {
				return uni.navigateTo({
					url: '../login/login'
				});
			}
			this.$uma.trackEvent('orderTips');
			uni.getSetting({
				withSubscriptions: true,
				success (res) {
					let obj = Object.keys(res.subscriptionsSetting)
					
					if(!res.subscriptionsSetting.mainSwitch){
						uni.showToast({
							icon:'none',
						    title: '请去 "设置-消息订阅" 开启消息通知',
						    duration: 2000
						});
					} else {
						if(obj.includes(tempid[0])){
							uni.showToast({
								icon:'none',
							    title: '您已经设置了总是提醒了哟',
							    duration: 2000
							});
							return
						}
						
						_this.showMask = true
						uni.requestSubscribeMessage({
							tmplIds: tempid,
							success(res) { 
								if(res[tempid[0]] == 'accept'){
									uni.showToast({
										icon:'none',
									    title: '提醒设置成功',
									    duration: 2000
									});
									_this.showMask = false
								}else{
									_this.showMask = false
								}
							},
						})
					}
				}
			})
		},
		// 前往登录注册
		goLogin() {
			uni.clearStorageSync();
			this.$store.dispatch('setToken', '');
			// this.$store.dispatch('setIsLogin',false)
			uni.navigateTo({
				url: '../login/login'
			});
		},
		// 退出登录
		outLogin() {
			uni.showModal({
				title: '退出登录',
				content: '是否确定退出登录',
				cancelText: '取消',
				confirmText: '确定',
				success: res => {
					if (res.confirm) {
						uni.clearStorageSync();
						this.$store.dispatch('setToken', '');
						// this.$store.dispatch('setIsLogin',false)
						uni.navigateTo({
							url: '../login/login'
						});
						setTimeout(() => {
							this.user = {};
							this.profit = {};
						}, 300);
						
						this.$uma.trackEvent('exitLogin');
					}
				}
			});
		},
		withdraw() {
			this.showWithdraw = true;
			
		},
		go(url) {
			if (!this.$store.state.token) {
				// return this.$toast('请先登录')
				uni.navigateTo({
					url: '../login/login'
				});
			}
			uni.navigateTo({
				url: url
			});
		},
		// 邀请生成海报
		share() {
			if (!this.$store.state.token) {
				return uni.navigateTo({
					url: '../login/login'
				});
			}
			if (this.canvasImg) {
				this.$refs.poster.getPoster(this.canvasImg);
			} else {
				uni.showLoading({
					title: '生成海报中...',
					mask: true
				});
				user.getQrcode(this, res => {
					let url = 'https://zhishan-test.oss-cn-beijing.aliyuncs.com/take_away%2Fimage%2Fbg.png';
					uni.downloadFile({
						url,
						success: e => {
							const p = e.tempFilePath;
							let url = res;
							uni.downloadFile({
								url,
								success: val => {
									const qr = val.tempFilePath;
									const ctx = uni.createCanvasContext('canvas');
									ctx.drawImage(p, 0, 0, 375, 667);
									ctx.beginPath();
									ctx.drawImage(qr, 139, 525, 97, 97);
									ctx.draw(false, () => {
										uni.canvasToTempFilePath({
											x: 0,
											y: 0,
											canvasId: 'canvas',
											fileType: 'jpg',
											quality: 1,
											success: res => {
												// 在H5平台下，tempFilePath 为 base64
												this.canvasImg = res.tempFilePath;
												this.$refs.poster.getPoster(this.canvasImg);
											}
										});
									});

									uni.hideLoading();
								},
								fail: r => {
									uni.hideLoading();
									this.$toast(r.errMsg);
								}
							});
						},
						fail: r => {
							uni.hideLoading();
							this.$toast(r.errMsg);
						}
					});
				});
			}
		}
	}
};
</script>

<style scoped lang="scss">
.main {
	background: #fff;
	width: 100%;
	min-height: 115vh;
	position: relative;
	overflow-x: hidden;
	// padding-bottom: 200rpx;
	.main-bg {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 408rpx;
		z-index: 1;
	}
	.order-tips{
		margin: 0 auto;
		width: 702rpx;
		height: 135rpx;
		margin-bottom: 43rpx;
		image{
			width: 702rpx;
			height: 135rpx;
		}
	}
	.content {
		position: absolute;
		top: 0;
		left: 0;
		z-index: 10;

		.header {
			box-sizing: border-box;
			display: flex;
			align-items: center;
			margin-top: 66rpx;
			padding-left: 51rpx;

			image {
				width: 113rpx;
				height: 113rpx;
				border-radius: 50%;
				margin-right: 33rpx;
			}
			.info {
				display: flex;
				justify-content: space-between;
				width: calc(100% - 150rpx);
				// flex-direction: column;
				// justify-content: center;

				.name {
					font-size: 32rpx;
					font-family: PingFang SC;
					font-weight: bold;
					color: #ffffff;
				}
				.label {
					font-size: 24rpx;
					font-family: PingFang SC;
					font-weight: 400;
					color: #eaeaea;
					margin-top: 24rpx;
				}
				image {
					width: 38rpx;
					height: 37rpx;
				}
			}
			.login-btn {
				width: 214rpx;
				height: 74rpx;
				line-height: 74rpx;
				background-color: #ffffff;
				box-shadow: 0px 2rpx 7rpx 0px rgba(209, 131, 0, 0.4);
				border-radius: 37rpx;
				text-align: center;
				color: #f87501;
				font-size: 30rpx;
				font-weight: bold;
			}
		}

		.card {
			position: relative;
			height: 448rpx;
			width: 750rpx;
			margin-top: 43rpx;

			.card-bg {
				position: absolute;
				top: 0;
				left: 0;
				width: 750rpx;
				height: 448rpx;
				z-index: 10;
			}

			.card-content {
				position: absolute;
				top: 0;
				left: 0;
				width: 750rpx;
				height: 448rpx;
				z-index: 100;

				.card-top {
					display: flex;
					justify-content: space-between;
					align-items: center;
					height: 170rpx;
					margin-top: 43rpx;

					.item {
						height: 170rpx;
						text-align: center;
						width: 50%;

						&:first-child {
							border-right: 2rpx solid #e9e9e9;
						}
					}

					.left {
						font-size: 32rpx;
						line-height: 32rpx;
						font-family: PingFang SC;
						font-weight: 500;
						color: #666666;

						.top {
							margin-top: 18rpx;
						}

						.bottom {
							margin-top: 53rpx;
							font-size: 40rpx;
							line-height: 40rpx;
							font-family: PingFang SC;
							font-weight: bold;
							color: #323232;
						}
					}

					.right {
						font-size: 26rpx;
						line-height: 26rpx;
						font-family: PingFang SC;
						font-weight: 500;
						color: #777777;

						.right-item {
							display: flex;
							flex-direction: column;
							align-items: center;

							&:first-child {
								margin-bottom: 31rpx;
							}

							.money {
								font-size: 30rpx;
								line-height: 30rpx;
								font-family: PingFang SC;
								font-weight: bold;
								color: #323232;
								margin-top: 20rpx;
							}
						}
					}
				}

				.card-bottom {
					margin-top: 46rpx;
					font-size: 32rpx;
					font-family: PingFang SC;
					font-weight: 500;
					color: #624f18;
					line-height: 32rpx;
					display: flex;
					justify-content: flex-start;

					.item {
						display: flex;
						flex-direction: column;
						align-items: center;
						width: 252rpx;
						position: relative;

						&:first-child::after {
							content: '';
							background: url(../../static/user/xiegan@2x.png) no-repeat;
							background-size: 100% 100%;
							position: absolute;
							height: 65rpx;
							line-height: 65rpx;
							width: 19rpx;
							font-size: 65rpx;
							color: #e9e9e9;
							bottom: 0;
							right: 0;
						}

						.money {
							font-size: 30rpx;
							font-family: PingFang SC;
							font-weight: bold;
							color: #dd5240;
							line-height: 30rpx;
							margin-top: 44rpx;
						}
					}
				}

				.withdraw {
					font-size: 26rpx;
					font-family: PingFang SC;
					font-weight: 500;
					color: #4f83eb;
					line-height: 26rpx;
					position: absolute;
					bottom: 152rpx;
					right: 42rpx;
					display: flex;
					align-items: center;
					image {
						width: 13rpx;
						height: 22rpx;
						margin-left: 18rpx;
					}
				}
			}
		}

		.menu-title {
			font-size: 32rpx;
			font-family: PingFang SC;
			font-weight: bold;
			color: #323232;
			line-height: 32rpx;
			margin-left: 23rpx;
		}

		.menu {
			display: flex;
			padding: 22rpx 24rpx;
			padding-bottom: 120rpx;
			.left {
				width: 288rpx;
				height: 387rpx;
				position: relative;
				.left-bg {
					position: absolute;
					top: 0;
					left: 0;
					width: 288rpx;
					height: 387rpx;
					z-index: 10;
				}
				.left-content {
					position: absolute;
					top: 0;
					left: 0;
					width: 288rpx;
					height: 387rpx;
					z-index: 100;
					display: flex;
					flex-direction: column;
					padding-left: 24rpx;
					padding-top: 20rpx;
					text {
						font-size: 32rpx;
						font-family: PingFang SC;
						font-weight: bold;
						color: #323232;
						line-height: 32rpx;
						margin-top: 14rpx;
					}
					.detail {
						font-size: 26rpx;
						font-family: PingFang SC;
						font-weight: 500;
						color: #c89e5c;
						line-height: 26rpx;
					}
					image {
						width: 44rpx;
						height: 44rpx;
						margin-top: 27rpx;
					}
				}
			}
			.right {
				height: 387rpx;
				width: 288rpx;
				margin-left: 26rpx;
				position: relative;
				display: flex;
				flex-direction: column;
				.item {
					position: relative;
					width: 388rpx;
					height: 166rpx;
					&:first-child {
						margin-bottom: 30rpx;
					}
					.item-bg {
						position: absolute;
						top: 0;
						left: 0;
						width: 388rpx;
						height: 166rpx;
						z-index: 10;
					}
					.item-content {
						position: absolute;
						top: 0;
						left: 0;
						width: 388rpx;
						height: 166rpx;
						z-index: 100;
						display: flex;
						flex-direction: column;
						padding-left: 32rpx;
						padding-top: 17rpx;
						text {
							font-size: 32rpx;
							font-family: PingFang SC;
							font-weight: bold;
							color: #323232;
							line-height: 32rpx;
							margin-top: 15rpx;
						}
						.detail {
							font-size: 26rpx;
							font-family: PingFang SC;
							font-weight: 500;
							color: #c89e5c;
							line-height: 26rpx;
						}
						image {
							width: 34rpx;
							height: 34rpx;
							margin-top: 14rpx;
						}
					}
				}
			}
		}
	}
	.movable-area{
		position: fixed;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
		width: 750rpx;
		height: 100vh;
		z-index: 100;
	}
	.customer{
		// position: absolute;
		left: calc(100% - 124rpx);
		top: 820rpx;
		z-index: 100;
		border-radius: 50%;
		background: #EEA031;
		width: 100rpx;
		height: 100rpx;
		text-align: center;
		line-height: 100rpx;
		box-shadow: 0 0 10rpx 0 rgba(0, 0, 0, 0.1);
		font-size: 32rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #fff;
	}
	.canvas {
		height: 667px;
		width: 375px;
		position: fixed;
		top: -667px;
		left: -375px;
		opacity: 0;
	}
	.mask{
		height: 100%;
		z-index: 9999;
		width: 100%;
		position: relative;
		background-color: #000000;
		image{
			width: 510rpx;
			height: 189rpx;
			position: absolute;
			top: 262rpx;
			left: 120rpx;
			right: 120rpx;
		}
	}
}
.dialog {
	position: fixed;
	top: 0;
	left: 0;
	bottom: 0;
	right: 0;
	background: rgba(0, 0, 0, 0.3);
	width: 750rpx;
	height: 100vh;
	z-index: 10000;
	.content {
		width: 600rpx;
		height: 432rpx;
		background: #ffffff;
		border-radius: 24rpx;
		margin-top: 50vh;
		margin-left: 50%;
		transform: translate(-50%, -50%);
		display: flex;
		flex-direction: column;
		align-items: center;
		position: relative;
		.close {
			position: absolute;
			width: 47rpx;
			height: 47rpx;
			top: 25rpx;
			right: 25rpx;
		}
		.err-img {
			width: 215rpx;
			height: 204rpx;
			margin-top: 22rpx;
		}
		.remark {
			font-size: 40rpx;
			font-family: PingFang SC;
			font-weight: bold;
			color: #333333;
			line-height: 40rpx;
			margin-top: 49rpx;
		}
		.tip {
			font-size: 32rpx;
			font-family: PingFang SC;
			font-weight: 400;
			color: #666666;
			line-height: 32rpx;
			margin-top: 47rpx;
		}
	}
}
</style>
