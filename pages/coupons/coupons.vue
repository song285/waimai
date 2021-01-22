<template>
	<movable-area class="main">
		<custom-tarbar :selected="2"></custom-tarbar>
		<view class="content">
			<view class="container">
				<v-tabs v-model="current" :tabs="tabs" @change="changeTab" class="tab"></v-tabs>
				<view class="coupon" ref="coupon">
					<view class="items">
						<view class="item" v-if="!showpaper" v-for="(v, i) in couponList" @click="toCoupon(i)" :key="i">
							<view class="top">
								<view class="left">
									<view class="item-content">
										<image :src="v.icon" class="icon" mode="widthFix" />
										<view class="name">{{ v.name }}</view>
									</view>
									<view class="text" v-if="v.shortName">{{ v.shortName }}</view>
								</view>
								<view class="right">免费领取</view>
							</view>
							<view class="bottom">
								<image style="border-radius: 15rpx;" :src="v.bannerPic" mode="widthFix" />
							</view>
						</view>
					</view>
					<!-- 平多多 -->
					<view class="getpaper" v-if="showpaper && !ishuazhu">
						<image :style="{'height':!ishuazhu ? '1189rpx' : 'none'}" 
							class="paper-bg" src="http://zhishan-test.oss-cn-beijing.aliyuncs.com/take_away%2Fimage%2FBGpdd.png" mode="aspectFit"></image>
						<image class="paper-btn" :style="{ top: ishuazhu ? '200rpx' : '160rpx' }" 
							src="http://zhishan-test.oss-cn-beijing.aliyuncs.com/take_away%2Fimage%2Fchuzhi_icon.gif" mode="" 
							@click="getPaper"></image>
					</view>
					<!-- 花小猪 -->
					<view class="getpaper" v-if="showpaper && ishuazhu">
						<image 
							class="paper-bg" src="http://zhishan-test.oss-cn-beijing.aliyuncs.com/take_away%2Fimage%2FBGhuazhu2.png" mode="aspectFit"></image>
						<image class="paper-btn" :style="{ top: ishuazhu ? '200rpx' : '160rpx' }" 
							src="http://zhishan-test.oss-cn-beijing.aliyuncs.com/take_away%2Fimage%2Fchuzhi_icon.gif" mode="" 
							@click="getPaper"></image>
					</view>
				</view>
			</view>
		</view>
	</movable-area>
	
</template>

<script>
	import customTarbar from '@/pages/component/customTarbar.vue';
	import vtabs from '@/pages/component/v-tabs/v-tabs.vue';
	
	import coupons from '../../common/api/coupons/coupons.js';
	import eleMe from '../../common/api/eleMe/eleMe.js'
	import Api from '../config/method.js'
	
	export default {
		components: {
			'custom-tarbar': customTarbar,
			'v-tabs': vtabs,
		},
		data() {
			return {
				current: 0,
				tabs: [
				],
				couponList: [],
				coupons: [
				],
				yz_openid:'',
				showpaper:false,
				
				// 云纸
				yz_params:{
					yz_openid:'',
					yz_key:'',
					yz_systemTime:'',
					yz_sn:''
				},
				yz_state:10,
				
				// 控制花小猪还是取纸  1 显示花小猪 0 -> 平多多
				ishuazhu:false,
			}
		},
		onLoad(e) {
			if (e.scene) {
				this.$store.dispatch('setScene', e.scene);
			}
			if(e.yz_openid){
				this.yz_openid = e.yz_openid
				uni.setStorageSync('yz_openid',e.yz_openid)
				this.showpaper = true
				
				this.yz_params.yz_openid = e && e.yz_openid ? e.yz_openid : '';
				this.yz_params.yz_key = e && e.yz_key ? e.yz_key : '';
				this.yz_params.yz_systemTime = e && e.yz_systemTime ? e.yz_systemTime : '';
				this.yz_params.yz_sn = e && e.yz_sn ? e.yz_sn : '';
				this.yz_state = 10;
				
				// // 在页面中定义插屏广告
				// let interstitialAd = null
				
				// // 在页面onLoad回调事件中创建插屏广告实例
				// if (uni.createInterstitialAd && this.yz_params.yz_openid) {
				//   this.interstitialAd = uni.createInterstitialAd({
				//     adUnitId: 'adunit-cdb681b2f4a5d5e8'
				//   })
				//   this.interstitialAd.onLoad(() => {
				// 	  console.log("interstitialAd onload");
				//   })
				//   this.interstitialAd.onError((err) => {
				// 	  console.log("interstitialAd on error", err);
				//   })
				//   this.interstitialAd.onClose(() => {
				// 	  console.log("interstitialAd on close");
				//   })
				// }
				// // 在适合的场景显示插屏广告
				// if (this.interstitialAd) {
				//   this.interstitialAd.show().catch((err) => {
				//     console.error("show err", err)
				// 	this.$uma.trackEvent('eleME-AD2');
				//   })
				// }
			}
		},
		onShow(){
			uni.showLoading({
				title: '获取优惠中'
			});
			coupons.getCouponsInfo(this);
		},
		methods: {
			changeTab(index) {
				let yz_openid = uni.getStorageSync('yz_openid')
				console.log('当前选中的项：' + index);
				this.couponList = []
				uni.showLoading({
					title: '获取优惠中'
				});
				if(this.yz_openid && index == 0){
					this.showpaper = true
					this.couponList = this.coupons
				}else if(this.yz_openid && index == 1){
					this.couponList = this.coupons
					this.showpaper = false
				} else {
					if(index == 0) this.couponList = this.coupons
					else {
						for (let i in this.coupons) {
							if (this.coupons[i].tabId == this.tabs[index].tabId) {
								this.couponList.push(this.coupons[i])
							} 
						}
					}
					this.showpaper = false
				}
				//#ifdef H5
				this.$nextTick(() => {
					this.$refs.coupon.scrollTop = 0;
				})
				//#endif
				setTimeout(() => {
					uni.hideLoading()
				}, 500)
			},
			toCoupon(i) {
				console.log(this.couponList[i])
				let _this = this
				//h5
				//#ifdef H5
				window.location.href = this.couponList[i].url
				//#endif
				//微信小程序
				//#ifdef MP-WEIXIN
				if (this.couponList[i].appid) {
					wx.navigateToMiniProgram({
						appId: this.couponList[i].appid,
						path: this.couponList[i].path,
						success(res) {
							// 打开成功
							_this.$uma.trackEvent('C-pdd',{'name':i.name});
							_this.take()
						}
					})
				}
				//#endif
			},
			// 出纸领券
			getPaper(){
				let i = 1;
				this.toCoupon(i)
			},
			take(func){
				if (!this.yz_params.yz_openid){
					return ;
				}
				if (this.yz_params.yz_sn){
					console.log("订阅号出纸");
					this.takeV2();
					return ;
				}
				console.log('服务号出纸');
				this.takeV1();
				
				if(typeof func == 'function') func()
			},
			takeV1(){
				var appId = this.getAppId();
				var _this = this;
				if (_this.yz_state != 10){
					return ;
				}
				_this.yz_state = 20;
				Api.outPaper({
					openid:_this.yz_params.yz_openid,
					key:_this.yz_params.yz_key,
					systemTime:_this.yz_params.yz_systemTime,
					appId:appId
				}).then(res => {
					_this.yz_state = 30;
					console.log(res);
				    if(res.code == 2){
						_this.dialogMsg('请扫描设备二维码');
						return ;
					}
					_this.dialogMsg('操作成功');
				}).catch((err) => {
					_this.dialogMsg('网络异常');
				});
			},
			takeV2(){
				var appId = this.getAppId();
				var _this = this;
				if (_this.yz_state != 10){
					return ;
				}
				_this.yz_state = 20;
				Api.outPaperV2({
				  openid    :_this.yz_params.yz_openid,
				  systemTime:_this.yz_params.yz_systemTime,
				  key       :_this.yz_params.yz_key,
				  appId     :appId,
				  sn        :_this.yz_params.yz_sn
				}).then(res => {
				  _this.isSubmit = false;
				  console.log("result", res);
				  if (res.code == 2 && res.msg == 'USE_COUNT_NULL') {
					_this.dialogMsg('没有使用次数了~~');
					_this.yz_state = 30;
					return ;
				  }
				  if (res.code == 2 && res.msg == 'FW_LOCKED') {
					_this.dialogMsg('设备使用中，请稍后~');
					_this.yz_state = 10;
					return ;
				  }
				  if (res.code == 2) {
					_this.dialogMsg('请重新扫描设备二维码~');
					_this.yz_state = 30;
					return ;
				  }
				  _this.yz_state = 30;
				  if (res.code != 1) {
					_this.dialogMsg(res.info);
					return ;
				  }
				  _this.dialogMsg('操作成功');
				}).catch(err => {
					_this.dialogMsg('网络异常');
				});
			},
			dialogMsg(msg){
				uni.showToast({
				  title: msg,
				  icon: 'none',
				  duration: 859
				})
			},
			getAppId(){
				const version = uni.getSystemInfoSync().SDKVersion;
				console.log("system info:", uni.getSystemInfoSync());
				if (eleMe.compareVersion(version, '2.2.2') >= 0) {
				  return uni.getAccountInfoSync().miniProgram.appId;
				}
				return "";
				
			},
		},
	}
</script>

<style lang="scss">
	page {
		background-color: #f8f8f8;
	}
	.content {
		z-index: 10;
		width: 100vw;
		height: 100%;
		display: flex;
		flex-direction: column;
	}
	.container {
		font-size: 14px;
		line-height: 24px;
		position: relative;
		.tab {
			position: fixed;
			top: var(--window-top);
			left: 0;
			z-index: 9999;
		}

		.coupon {
			padding-top: 196rpx;
			padding-bottom: 87rpx;
			.item {
				background-color: #ffffff;
				margin: 30rpx;
				border-radius: 10rpx;
				padding: 0 30rpx 30rpx 30rpx;
				.top {
					height: 116rpx;
					display: flex;
					align-items: center;
					justify-content: space-between;
					.left {
						height: 116rpx;
						width: 400rpx;
						display: flex;
						align-items: center;
						justify-content: space-between;
						.item-content {
							width: 100%;
						}
						.icon {
							display: inline-block;
							vertical-align: bottom;
							width: 52rpx;
							height: auto;
						}
						.name {
							text-align: left;
							display: inline-block;
							vertical-align: bottom;
							font-size: 34rpx;
							color: #000;
							line-height: 50rpx;
							font-weight: bold;
							margin-left: 15rpx;
						}
						.text {
							width: 150rpx;
							height: 38rpx;
							line-height: 38rpx;
							text-align: center;
							font-size: 24rpx;
							color: #61300e;
							background: linear-gradient(90deg, #f9db8d, #f8d98a);
							border-radius: 6rpx;
						}
					}
	
					.right {
						width: 170rpx;
						height: 60rpx;
						border-radius: 30rpx;
						background: linear-gradient(90deg, #ec6f43, #ea4a36);
						color: #fff;
						font-size: 28rpx;
						line-height: 60rpx;
						text-align: center;
					}
				}
	
				.bottom {
					height: auto;
					width: 100%;
					image {
						display: block;
						width: 100%;
						height: auto;
					}
				}
			}
			
			.getpaper {
				position: relative;
				.paper-bg {
					height: 1254rpx;
					width: 750rpx;
				}
				.paper-btn {
					width: 288rpx;
					height: 288rpx;
					position: absolute;
					top: 160rpx;
					left: 0;
					right: 0;
					margin: 50%;
					transform: translate(-50%,-50%);
				}
			}
		}
	}
	
</style>
