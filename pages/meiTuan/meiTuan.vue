<template>
	<view class="main">
		<custom-tarbar :selected="1"></custom-tarbar>
		<image src="http://zhishan-test.oss-cn-beijing.aliyuncs.com/take_away%2Fimage%2Fmeituan.png" mode="widthFix" class="bg-img"></image>
		<view class="content">
			<image src="/static/meiTuan/shengqian.png" mode="" class="head-img"></image>
			<view class="card">
				<!-- <image src="http://zhishan-test.oss-cn-beijing.aliyuncs.com/take_away%2Fimage%2Fkapian%402x.png" mode="" class="card-img"></image> -->
				<view class="card-content">
					<image src="/static/meiTuan/fanxian.png" mode="" class="card-title"></image>
					<view class="step-box">
						<view class="item">
							<image src="../../static/meiTuan/lingquan@2x.png" mode=""></image>
							先领券
						</view>
						<image src="../../static/eleMe/jiantou@2x.png" mode="" class="jiantou"></image>
						<view class="item">
							<image src="../../static/meiTuan/gouwuc@2x.png" mode=""></image>
							再下单
						</view>
						<image src="../../static/eleMe/jiantou@2x.png" mode="" class="jiantou"></image>
						<view class="item">
							<image src="../../static/meiTuan/xiangshoufanxian@2x.png" mode=""></image>
							享返现
						</view>
					</view>
					<image
						v-if="isLogin"
						src="http://zhishan-test.oss-cn-beijing.aliyuncs.com/take_away%2Fimage%2Flinghongbaodianwaimai%402x.png"
						mode=""
						class="waimai"
						@tap="getTmplID"
					></image>
					<button v-else open-type="getUserInfo" @getuserinfo="onGetPhoneNumber" class="login-btn"></button>
					<view class="line"></view>
					<!-- <text class="what"></text>
					<text class="lingquan">好友领券下单，你得佣金返利</text> -->
					<view class="yq-view">
						<image src="/static/eleMe/yaoqing.png" mode="" class="yqhb"></image>
					</view>
					
					<view class="gonglv">
						好友领券下单，你得佣金返利
						<image src="/static/eleMe/24321.png" mode="" @tap="goRichText"></image>
					</view>
					<view class="btn-box">
						<view class="btn-item share-replace"></view>
						<button class="btn-item share" open-type="share" @click="onShare"></button>
						
						<view class="btn-item poster-replace"></view>
						<view class="btn-item poster" @tap="getPoster" v-if="isLogin"></view>
						<button class="btn-item poster" open-type="getUserInfo" @getuserinfo="onGetPhoneNumber" v-else></button>
						
						
						
						<!-- <button class="btn-item share" open-type="share"></button>
						<view class="btn-item poster" @tap="getPoster" v-if="isLogin"></view>
						<button class="share-btn poster" open-type="getPhoneNumber" @getphonenumber="onGetPhoneNumber" v-else></button> -->
					</view>
					<view class="ADBanner" @click="onADBanner">
						<ad unit-id="adunit-171c68f66fdcd05a" ad-intervals="30"></ad>
					</view>
					<text class="rule">规则说明</text>
					<view class="rule-box">
						<text class="rule-item" v-for="(item, index) in ruleList">{{ index + 1 }}.{{ item }}</text>
					</view>
				</view>
			</view>
		</view>

		<canvas canvas-id="canvas" class="canvas" />
		<poster ref="poster"></poster>
	</view>
</template>

<script>
import customTarbar from '@/pages/component/customTarbar.vue';
import push from '../../common/api/push/push.js';
import poster from '../component/poster.vue';
import user from '../../common/api/user/user.js';
import login from '../../common/api/login/login.js';
export default {
	components: {
		'custom-tarbar': customTarbar,
		poster
	},
	data() {
		return {
			code: '', //
			isLogin: false,
			isSubscribe: false,
			url: '', //美团链接
			img:
				'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1605274195892&di=5f346a7da847f84732a66fc631d214ce&imgtype=0&src=http%3A%2F%2Fa4.att.hudong.com%2F27%2F67%2F01300000921826141299672233506.jpg',
			ruleList: [
				'美团外卖下单，必须使用带【专享】标记的优惠券才能获得返利；',
				'领券后在红包有效期内下单均有返利；',
				'使用红包时，下单手机号码需与领取红包时登录的手机号码一致；',
				'订单付款后，微信会显示返现金额的服务提醒；',
				'无论美团新老用户，每个手机号每天可领一次，红包金额随机发放。',
			],
			// 好券侠
			tmplIds: ['7deMl6v3U6-wo06sVX0RE7iHtd61r8LvIWvGn9StTmU', 'eZkNsKLEZ901P6wXPMDicAlRFvpcTzd2WbFpfdLHwOU', 'kNgkSdYM07y47fpHVbroK_LLTs4Cu_FDN0UtFL5lrHA'],
			// 好券超人
			// tmplIds: ['VJFub-OznHiEeGO4IMKJu6KUctz9NDBbRP7bDp7zVYM', 'kldGkMXLcK9jbAmZu1Igq38zo-vgCP3xc8G6Rjv3zo8', 'XqG8wSBI4AfXXdlsTP6VsQOTWrUo3elzzUFaEkOTa14'],
			// i食惠
			// tmplIds: ['jd-u-t0a8GG757crJht3bigsKmpoOlGyMENEGFSxQF0', '6LVSIM99_MOiEc-MsZWtf-d9kkEEm6GRGTEWJxEyh5c', 'mjRJn06mpmIrMFvCOAw_bF78vOy9QqiSWKlbooQkSj8'],
			canvasImg: '',
			path: 'pages/meiTuan/meiTuan'
		};
	},
	onHide() {
		this.$refs.poster.close();
	},
	onShow() {
		if (this.$store.state.token) {
			this.isLogin = true;
		} else {
			this.isLogin = false;
		}
	},
	onLoad(e) {
		if (e.scene) {
			this.$store.dispatch('setScene', e.scene);
		}
	},
	onShareAppMessage(res) {
		if (res.from === 'button') {
			// 来自页面内分享按钮
			console.log(res.target);
		}
		let scene = this.$store.state.userInfo.id || 0;
		return {
			title: '谁还充会员，免费红包在这里，最高30元~',
			path: this.path + '?scene=' + scene,
			imageUrl: this.$shareImg
		};
	},
	methods: {
		onShare(){
			this.$uma.trackEvent('meiShare');
		},
		onADBanner(){
			this.$uma.trackEvent('meiAD');
		},
		goRichText(){
			uni.navigateTo({
				url:'../eleMe/richText'
			})
			this.$uma.trackEvent('Strategy');
		},
		// 登录
		onGetPhoneNumber(e) {
			let _this = this
			uni.login({
				provider: 'weixin',
				success: res => {
					_this.code = res.code;
				}
			});
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
							if (e.detail.errMsg == 'getUserInfo:ok') {
								let scene = _this.$store.state.scene || 0;
								var data = {
									code: _this.code,
									encryptedData: encryptedData,
									iv: iv,
									pId: scene,
									rawData: rawData
								};
								login.login(_this, data);
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
		// confirm() {
		// 	var _this = this;
		// 	uni.requestSubscribeMessage({
		// 		tmplIds: _this.tmplIds,
		// 		// tmplIds: ['jd-u-t0a8GG757crJht3bigsKmpoOlGyMENEGFSxQF0', '6LVSIM99_MOiEc-MsZWtf-d9kkEEm6GRGTEWJxEyh5c', 'mjRJn06mpmIrMFvCOAw_bF78vOy9QqiSWKlbooQkSj8'], //需要授权的消息模板类型
		// 		success(res) {
		// 			for (var i = 0; i < _this.tmplIds.length; i++) {
		// 				if (res[_this.tmplIds[i]] == 'accept') {
		// 					push.getLinkling(_this, () => {
		// 						uni.navigateToMiniProgram({
		// 							appId: _this.url.app_id,
		// 							path: _this.url.page_path,
		// 							success: res => {
		// 								// 打开成功
		// 								console.log('打开成功', res);
		// 							},
		// 							fail: err => {
		// 								console.log(err);
		// 							}
		// 						});
		// 					});
		// 					break;
		// 				}
		// 			}
		// 		},
		// 		fail(err) {
		// 			console.log(err);
		// 		}
		// 	});
		// },
		getTmplID() {
			var _this = this;
			// push.getSubscribe(_this, () => {
			// 	if (_this.isSubscribe != true) {
			// 		_this.confirm();
			// 	} else {
			// 		push.getLinkling(_this, () => {
			// 			// uni.setStorage({
			// 			// 	key:'url',
			// 			// 	data: _this.url.
			// 			// })
			// 			// uni.navigateTo({
			// 			// 	url: '../webView/webView'
			// 			// })
			// 			uni.navigateToMiniProgram({
			// 				appId: _this.url.app_id,
			// 				path: _this.url.page_path,
			// 				success: res => {
			// 					// 打开成功
			// 					console.log('打开成功', res);
			// 				},
			// 				fail: err => {
			// 					console.log(err);
			// 				}
			// 			});
			// 		});
			// 	}
			// });
			push.getLinkling(_this, () => {
				uni.navigateToMiniProgram({
					appId: _this.url.app_id,
					path: _this.url.page_path,
					success: res => {
						// 打开成功
						console.log('打开成功', res);
						this.$uma.trackEvent('meiRedenv');
					},
					fail: err => {
						console.log(err);
					}
				});
			});
		},
		getPoster() {
			if (!this.$store.state.token) {
				// return this.$toast('请先登录');
			}
			if (this.canvasImg) {
				this.$refs.poster.getPoster(this.canvasImg);
			} else {
				uni.showLoading({
					title: '生成海报中...',
					mask: true
				});
				user.getQrcode(this, res => {
					let url = 'https://zhishan-test.oss-cn-beijing.aliyuncs.com/take_away%2Fimage%2FHAIBAO%402x.png';
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
									ctx.drawImage(qr, 124, 497, 127, 127);
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
	.ADBanner {
		pointer-events: none
	}
.main {
	width: 750rpx;
	// min-height: 100vh;
	// height: 1964rpx;
	overflow-y: auto;
	// height: 100%;
	position: relative;
	padding-bottom: 150rpx;
	background: #c42b20;
	.bg-img {
		width: 100%;
		height: 100%;
		position: absolute;
		top: 0;
		left: 0;
		z-index: 1;
	}
	.content {
		z-index: 10;
		width: 750rpx;
		height: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		.head-img {
			width: 621rpx;
			height: 159rpx;
			margin-top: 95rpx;
			z-index: 10;
		}
		.card {
			margin-top: 101rpx;
			width: 702rpx;
			// height: 1127rpx;
			z-index: 10;
			display: flex;
			flex-direction: column;
			align-items: center;
			position: relative;
			background: #fff;
			border-radius: 24rpx;
			// .card-img {
			// 	width: 702rpx;
			// 	min-height: 1127rpx;
			// 	position: absolute;
			// 	top: 0;
			// 	left: 0;
			// 	z-index: 10;
			// }
			.card-content {
				z-index: 100;
				width: 702rpx;
				display: flex;
				flex-direction: column;
				align-items: center;
				.card-title {
					width: 574rpx;
					height: 64rpx;
					margin-top: 37rpx;
				}
				.step-box {
					display: flex;
					align-items: center;
					justify-content: space-between;
					// margin: 0 100rpx;
					width: 504rpx;
					.item {
						display: flex;
						flex-direction: column;
						align-items: center;
						font-size: 24rpx;
						font-family: PingFang SC;
						font-weight: 500;
						color: #333333;
						line-height: 24rpx;
						padding-top: 46rpx;
						image {
							width: 95rpx;
							height: 95rpx;
							margin-bottom: 18rpx;
						}
					}
					.jiantou {
						width: 28rpx;
						height: 26rpx;
					}
				}
				.waimai {
					margin-top: 65rpx;
					width: 535rpx;
					height: 158rpx;
					z-index: 99;
				}
				.line {
					margin-top: 33rpx;
					width: 639rpx;
					border: 3rpx dashed #c42b20;
					position: relative;
					&:before {
						content: '';
						width: 50rpx;
						height: 50rpx;
						border-radius: 50%;
						display: block;
						background: #c42b20;
						position: absolute;
						top: -25rpx;
						left: -57rpx;
					}
					&:after {
						content: '';
						width: 50rpx;
						height: 50rpx;
						border-radius: 50%;
						display: block;
						background: #c42b20;
						position: absolute;
						top: -25rpx;
						right: -57rpx;
					}
				}
				
				.yq-view{
					margin-top: 46rpx;
					width: 100%;
					.yqhb{
						width: 571rpx;
						height: 54rpx;
						margin-left: 65rpx;
					}
				}
				.gonglv{
					display: flex;
					justify-content: space-between;
					align-items: center;
					width: calc(100% - 65rpx);
					padding-left: 65rpx;
					margin-top: 25rpx;
					font-size: 32rpx;
					font-family: PingFang SC;
					font-weight: 500;
					color: #666666;
					line-height: 36rpx;
					image{
						width: 193rpx;
						height: 64rpx;
						// margin-left: 32rpx;
					}
				}
				.what {
					height: 56rpx;
					width: 495rpx;
					background: url(../../static/eleMe/fnexinaghaizhuanqianziti@2x.png) no-repeat;
					background-size: 100% 100%;
					margin-top: 58rpx;
				}
				.lingquan {
					font-size: 32rpx;
					font-family: PingFang SC;
					font-weight: 500;
					color: #666666;
					line-height: 32rpx;
					margin-top: 29rpx;
				}
				.btn-box {
					display: flex;
					justify-content: space-between;
					align-items: center;
					margin-top: 30rpx;
					position: relative;
					.btn-item {
						// width: 252rpx;
						// height: 65rpx;
						
						width: 339rpx;
						height: 150rpx;
						// border-radius: 33rpx;
						// font-size: 30rpx;
						// font-family: PingFang SC;
						// font-weight: 500;
						// display: flex;
						// justify-content: center;
						// align-items: center;
					}
					.share {
						// background: #9f1411;
						background: url(../../static/eleMe/fenxiang.png) no-repeat;
						background-size: 100% 100%;
						opacity: 0;
						// color: #fffefe;
						// margin-right: 82rpx;
					}
					.share-replace{
						background: url(../../static/eleMe/fenxiang.png) no-repeat;
						background-size: 100% 100%;
						position: absolute;
						left: 0;
						top: 0;
					}
					.poster {
						background: url(../../static/eleMe/huoquhaibao.png) no-repeat;
						background-size: 100% 100%;
						opacity: 0;
						// color: #9f1411;
						// border: 2rpx solid #9f1411;
					}
					.poster-replace{
						background: url(../../static/eleMe/huoquhaibao.png) no-repeat;
						background-size: 100% 100%;
						position: absolute;
						right: 0;
						top: 0;
					}
				}
				.rule {
					font-size: 30rpx;
					font-family: PingFang SC;
					font-weight: bold;
					color: #333333;
					line-height: 30rpx;
					position: relative;
					margin-top: 65rpx;
					&::before {
						width: 109rpx;
						height: 3rpx;
						background: #333333;
						content: '';
						position: absolute;
						left: -139rpx;
						top: 15rpx;
					}
					&::after {
						width: 109rpx;
						height: 3rpx;
						background: #333333;
						content: '';
						position: absolute;
						right: -139rpx;
						top: 15rpx;
					}
				}
				.rule-box {
					font-size: 30rpx;
					line-height: 46rpx;
					font-family: PingFang SC;
					font-weight: 500;
					color: #555;
					margin-top: 34rpx;
					margin-bottom: 32rpx;
					display: flex;
					flex-direction: column;
					width: 550rpx;
				}
			}
		}
	}
	.canvas {
		height: 667px;
		width: 375px;
		position: fixed;
		top: -667px;
		left: -375px;
		opacity: 0;
	}
	// 登录按钮
	.login-btn {
		background: url('http://zhishan-test.oss-cn-beijing.aliyuncs.com/take_away%2Fimage%2Flinghongbaodianwaimai%402x.png') no-repeat;
		background-size: 100% 100%;
		margin-top: 65rpx;
		width: 535rpx;
		height: 158rpx;
		z-index: 99;
		&::after {
			border: none !important;
		}
	}
	// 分享
	.share-btn {
		width: 252rpx;
		height: 65rpx;
		border-radius: 33rpx;
		font-size: 30rpx;
		font-family: PingFang SC;
		font-weight: 500;
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: #ffffff;
		color: #9f1411;
		border: 2rpx solid #9f1411;
	}
}
</style>
