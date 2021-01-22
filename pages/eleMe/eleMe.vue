<template>
	<!-- <view> -->
	<view class="main">
		<custom-tarbar :selected="0"></custom-tarbar>
		<image src="http://zhishan-test.oss-cn-beijing.aliyuncs.com/take_away%2Fimage%2Felme%402x.png" mode="widthFix" class="bg-img"></image>
		<view class="content">
			<image src="/static/eleMe/yiniankeshjeng.png" mode="" class="head-img"></image>
			<view class="card">
				<!-- <image src="/static/eleMe/kapian@2x.png" mode="" class="card-img"></image> -->
				<view class="card-content">
					 <image src="/static/eleMe/shengqianfanxian.png" mode="" class="card-title" v-if="!yz_params.yz_openid"></image>
					 <image src="/static/eleMe/yz_tips.png" mode="" class="card-title"  v-if="yz_params.yz_openid"></image>
					<!--<view class="step-box">
						<view class="item">
							<image src="../../static/eleMe/lingquan@2x.png" mode=""></image>
							先领券
						</view>
						<image src="../../static/eleMe/jiantou@2x.png" mode="" class="jiantou"></image>
						<view class="item">
							<image src="../../static/eleMe/zaixiadna@2x.png" mode=""></image>
							再下单
						</view>
						<image src="../../static/eleMe/jiantou@2x.png" mode="" class="jiantou"></image>
						<view class="item">
							<image src="../../static/eleMe/xiangshoufanxian@2x.png" mode=""></image>
							享返现
						</view>
					</view> -->
					<!-- <view class="login-view" v-if="!yz_params.yz_openid">
						
						<image :src="img" mode="" class="qrcode" show-menu-by-longpress v-if="img"></image>
						
						<view class="get-btn" @tap="goElem">
							领红包点外卖
						</view>
					</view> -->
					
					<view class="login-view" v-if="!yz_params.yz_openid">
					
						<image src="http://img.test.zhishangsoft.com/waimai/linghongbao.gif" mode="" class="red-packets" @tap="goElem" ></image>
						
						<!-- <image :src="img" mode="" class="qrcode" show-menu-by-longpress v-if="img"></image>
						
						<view class="get-btn" @tap="goElem">
							领红包点外卖
						</view> -->
					</view>
					
					<view class="login-view" v-if="yz_params.yz_openid">
						<image src="http://img.test.zhishangsoft.com/waimai/chuzhi.gif" mode="" class="red-packets" @tap="goElem" ></image>
					</view>
					
					
					<view class="line"></view>
					<view class="yq-view">
						<image src="/static/eleMe/yaoqing.png" mode="" class="waimai"></image>
					</view>
					
					<view class="gonglv">
						每天下2单，连续5天，省更多
						<image src="/static/eleMe/24321.png" mode="" @tap="goRichText"></image>
					</view>
					<!-- <text class="what"></text> -->
					<!-- <text class="lingquan">好友领券下单，你得佣金返利</text> -->
					
					<view class="btn-box">
						<view class="btn-item share-replace"></view>
						<button class="btn-item share" open-type="share" @click="shareTo"></button>
						
						<view class="btn-item poster-replace"></view>
						<view class="btn-item poster" @tap="getPoster" v-if="isLogin"></view>
						<button class="btn-item poster" open-type="getUserInfo" @getuserinfo="onGetPhoneNumber" v-else></button>
					</view>
					<view class="ADBanner">
						<ad unit-id="adunit-85753a5148e9cb55" ad-intervals="30"  @tap="adCliked"></ad>
					</view>
					<text class="rule">规则说明</text>
					<view class="rule-box">
						<text class="rule-item" v-for="(item, index) in ruleList" :key="index">{{ index + 1 }}.{{ item }}</text>
					</view>
				</view>
			</view>
		</view>
		<view class="mask" v-if="showMask">
			<image src="../../static/user/liwu@2x.png" mode=""></image>
			<image class="ordertips" src="/static/user/DCTX@2x.png" mode="" @tap="onOrdertips"></image>
		</view>
		<canvas canvas-id="canvas" class="canvas"/>
		<poster ref="poster"></poster>
		<helper ref="yzHelper"></helper>
	</view>
	<!-- <view v-else class="deving">
		
		<custom-tarbar :selected="0"></custom-tarbar>
		<image src="/static/eleMe/dev.png" mode=""></image>
		<view class="qidai">
			敬请期待
		</view>
		<view class="dev">
			功能正在开发中...
		</view>
	</view> -->
	<!-- </view> -->
</template>

<script>
import customTarbar  from '@/pages/component/customTarbar.vue'
import poster from '../component/poster.vue'
import helper from '@/pages/component/helper/helper.vue'

import user from '../../common/api/user/user.js';
import login from '../../common/api/login/login.js';
import eleMe from '../../common/api/eleMe/eleMe.js'

import orderMsg from '../../common/api/orderMsg/orderMsg.js'

import helperInit from '../../index.js'

import Api from '../config/method.js'

// var plugin = requirePlugin("yz-plugin");
// const dcRichAlert = uni.requireNativePlugin('wx-sp-plug')
export default{
	components: {
		'custom-tarbar': customTarbar,
		'poster': poster,
		helper,
	},
	data(){
		return{
			showMask:false,
			isLogin:false,
			code:'',
			img:'',
			page_path:'',
			// ruleList:[
			// 	'饿了么领券下单均有返利，返利按照订单实际支付金额为准；',
			// 	'必须使用从本页面入口领取的红包券，下单时需用领取的红包券才能产生返利；',
			// 	'领券后在红包有效期内下单均有返利；',
			// 	'使用红包时，下单手机号码需与领取红包时登录的手机号码一致；',
			// 	'下单后5分钟内会有订单返现提醒；',
			// 	'无论饿了么新老用户，每个手机每天可领一次，红包金额随机发放。',
			// ],
			ruleList:[
				'长按二维码领取饿了么外卖大红包进行下单；',
				'使用红包时，下单手机号码需与领取红包时登录的手机号码一致。',
				'无论饿了么新老用户，红包金额随机发放。'
			],
			canvasImg:'',
			path:'pages/eleMe/eleMe',
			
			// 在页面中定义插屏广告
			interstitialAd:null,
			yz_params:{
				yz_openid:'',
				yz_key:'',
				yz_systemTime:'',
				yz_sn:''
			},
			yz_state:10
		}
	},
	onShareAppMessage(res) {
	    if (res.from === 'button') {// 来自页面内分享按钮
	      console.log(res.target)
	    }
		let scene = this.$store.state.userInfo.id || 0
	    return {
			title: '我在这里省了5000元外卖费，赶紧来抢~',
			path: this.path+'?scene=' + scene,
			imageUrl:this.$shareImg
	    }
	},
	onHide() {
		this.$refs.poster.close()
	},
	onShow() {
		if (this.$store.state.token) {
			this.isLogin = true;
		} else {
			this.isLogin = false;
		}
		eleMe.getShare(this)
		
	},
	onLoad(e) {
		if(e.scene){
			this.$store.dispatch('setScene',e.scene)
		}
		if(e.channel){
			const channel = e.channel;
			eleMe.channelLog(this,channel);
		}
		eleMe.getShare(this);
		this.yz_params.yz_openid = e && e.yz_openid ? e.yz_openid : '';
		this.yz_params.yz_key = e && e.yz_key ? e.yz_key : '';
		this.yz_params.yz_systemTime = e && e.yz_systemTime ? e.yz_systemTime : '';
		this.yz_params.yz_sn = e && e.yz_sn ? e.yz_sn : '';
		this.yz_state = 10;
		// plugin.helper.init(e);
		// helperInit.helper.init(e);
		
		// if(Object.keys(e).length > 0) return
		
		// 在页面onLoad回调事件中创建插屏广告实例
		if (uni.createInterstitialAd && this.yz_params.yz_openid) {
		  this.interstitialAd = uni.createInterstitialAd({
		    adUnitId: 'adunit-6d8d8e6fc6e18349'
		  })
		  this.interstitialAd.onLoad(() => {
			  console.log("interstitialAd onload");
		  })
		  this.interstitialAd.onError((err) => {
			  console.log("interstitialAd on error", err);
		  })
		  this.interstitialAd.onClose(() => {
			  console.log("interstitialAd on close");
		  })
		}
		// 在适合的场景显示插屏广告
		if (this.interstitialAd) {
		  this.interstitialAd.show().catch((err) => {
		    console.error("show err", err)
			this.$uma.trackEvent('eleME-AD2');
		  })
		}
		
	},
	methods:{
		adCliked(){
			this.$uma.trackEvent('eleME-AD');
		},
		shareTo(){
			this.$uma.trackEvent('share');
		},
		goRichText(){
			uni.navigateTo({
				url:'richText'
			})
			this.$uma.trackEvent('Strategy');
		},
		// 登录
		onGetPhoneNumber(e) {
			console.log(e)
			let _this = this
			uni.login({
				provider: 'weixin',
				success: res => {
					this.code = res.code;
				}
			});
			uni.login({
				provider: 'weixin',
				success: res => {
					this.code = res.code;
					console.log(e);
					uni.showLoading({
						title: '登录中',
						mask: false
					});
					const encryptedData = e.detail.encryptedData;
					const iv = e.detail.iv;
					const rawData = e.detail.rawData;
					if (e.detail.errMsg == 'getUserInfo:ok') {
						let scene = this.$store.state.scene || 0;
						var data = {
							code: this.code,
							encryptedData: encryptedData,
							iv: iv,
							pId: scene,
							rawData:rawData
						};
						login.login(this, data,()=>{
							eleMe.getShare(this)
							// 2.弹出点餐提醒  3.取纸
							// debugger
							// this.$refs.yzHelper.takeFun()
							_this.onOrdertips()
						})
					} else {
						uni.showToast({
							title: '您已取消授权登录',
							icon: 'none'
						});
					}
				}
			});
			
		},
		// 点餐提醒
		onOrdertips(){
			let tempid = ['ZZnXluVxMSFPky1q28CCt9LIU-ANmAX4i3148PGmvps']
			let _this = this
			if (!this.$store.state.token) {
				return uni.navigateTo({
					url: '../login/login'
				});
			}
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
							_this.$refs.yzHelper.takeFun()
							_this.showMask = false
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
									_this.$refs.yzHelper.takeFun()
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
		goElem(){
			console.log("go elem yz_params", this.yz_params);
			if (!this.yz_params.yz_openid){
				uni.navigateToMiniProgram({
					appId: this.app_id,
					path: this.page_path,
					success: res => {
						// 打开成功
						console.log('打开成功', res);
						this.$uma.trackEvent('goElem');
					},
					fail: err => {
						console.log(err);
					}
				});
				return ;
			}
			var _this = this;
			uni.navigateToMiniProgram({
				appId: this.app_id,
				path: this.page_path,
				success: res => {
					// 打开成功
					console.log('打开成功', res);
				},
				fail: err => {
					console.log(err);
				},
				complete: () => {
					_this.take();
				} 
			});
		},
		take(){
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
		getPoster(){
			if (!this.$store.state.token) {
				// return this.$toast('请先登录')
			}
			if(this.canvasImg){
				this.$refs.poster.getPoster(this.canvasImg)
			}else{
				uni.showLoading({
					title:'生成海报中...',
					mask:true
				})
				user.getQrcode(this,(res)=>{
					let url ='https://zhishan-test.oss-cn-beijing.aliyuncs.com/take_away%2Fimage%2Felm_bg.png'
					uni.downloadFile({
						url,
						success: (e) => {
							const p = e.tempFilePath
							let url = res
							uni.downloadFile({
								url,
								success: (val) => {
									const qr = val.tempFilePath
									const ctx = uni.createCanvasContext('canvas')
									ctx.drawImage(p, 0, 0, 375, 667)
									ctx.beginPath()
									ctx.drawImage(qr, 124, 497, 127, 127)
									ctx.draw(false,()=>{
										uni.canvasToTempFilePath({
										  x: 0,
										  y: 0,
										  canvasId: 'canvas',
										  fileType:'jpg',
										  quality:1,
										  success: (res)=> {
										    // 在H5平台下，tempFilePath 为 base64
										    this.canvasImg = res.tempFilePath
											this.$refs.poster.getPoster(this.canvasImg)
										  } 
										})
									})
									
									uni.hideLoading()
									
								},
								fail: (r) => {
									uni.hideLoading()
									this.$toast(r.errMsg)
								},
							})
							
						},
						fail: (r) => {
							uni.hideLoading()
							this.$toast(r.errMsg)
						},
					})
				})
				
			}
		}
	}
}
</script>

<style scoped lang="scss">
.mask{
	height: 100%;
	z-index: 99999;
	width: 100%;
	background: rgba(0,0,0,.85);
	position: fixed;
	left: 0;
	top: 0;
	display: flex;
	justify-content: center;
	flex-direction: column;
	align-items: center;
	image{
		width: 510rpx;
		height: 189rpx;
	}
	.ordertips{
		width: 90%;
		height: 135rpx;
	}
}
.main {
	width: 750rpx;
	// min-height: 100vh;
	// height: 1964rpx;
	// overflow-y: auto;
	// height: 100%;
	position: relative;
	padding-bottom: 150rpx;
	background: #067AEB;
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
			margin-top: 125rpx;
			width: 702rpx;
			// height: 1420rpx;
			border-radius: 24rpx;
			z-index: 10;
			display: flex;
			flex-direction: column;
			align-items: center;
			position: relative;
			background: #fff;
			// .card-img {
			// 	width: 702rpx;
			// 	min-height: 1420rpx;
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
				.login-view{
					position: relative;
					display: flex;
					flex-direction: column;
					align-items: center;
				}
				.qrcode {
					width: 340rpx;
					height: 340rpx;
					margin-top: 29rpx;
				}
				.red-packets{
					width: 500rpx;
					height: 500rpx;
					margin-top: 29rpx;
				}
				.press {
					margin-top: 26rpx;
					font-size: 44rpx;
					font-family: PingFang SC;
					font-weight: bold;
					color: #38a3f6;
				}
				.login-btn{
					background: #fff;
					border: 1rpx solid;
					opacity: 0;
				}
				.btn-cover{
					// background: blue;
					position: absolute;
					border: 1rpx solid #38a3f6;
					// top: 300rpx;
					left: 0;
					left: 50%;
					border-radius: 50rpx;
					transform: translateX(-50%);
					width: 400rpx;
					text-align: center;
					height: 88rpx;
					line-height: 88rpx;
				}
				.fangwen {
					margin-top: 32rpx;
					font-size: 26rpx;
					font-family: PingFang SC;
					font-weight: 500;
					color: #38a3f6;
					border-bottom: 2rpx solid #38a3f6;
					padding-bottom: 8rpx;
				}
				.line{
					margin-top: 48rpx;
					width: 639rpx;
					border: 3rpx dashed #067AEB;
					position: relative;
					&:before {
						content: '';
						width: 50rpx;
						height: 50rpx;
						border-radius: 50%;
						display: block;
						background: #067AEB;
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
						background: #067AEB;
						position: absolute;
						top: -25rpx;
						right: -57rpx;
					}
				}
				.yq-view{
					margin-top: 46rpx;
					width: 100%;
					.waimai{
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
						// margin-left: 25rpx;
					}
				}
					.what{
						height: 56rpx;
						width: 495rpx;
						background: url(../../static/eleMe/fnexinaghaizhuanqianziti@2x.png) no-repeat;
						background-size: 100% 100%;
						margin-top: 55rpx;
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
					margin-top: 35rpx;
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
					font-family: PingFang SC;
					font-weight: 500;
					color: #555;
					line-height: 46rpx;
					margin-top: 34rpx;
					margin-bottom: 32rpx;
					display: flex;
					flex-direction: column;
					width: 550rpx;
				}
			}
		}
	}

	.canvas{
		height: 667px;
		width: 375px;
		position: fixed;
		top: -667px;
		left: -375px;
		opacity: 0;
	}
	// 分享
	.share-btn {
		// width: 252rpx;
		// height: 65rpx;
		// border-radius: 33rpx;
		// font-size: 30rpx;
		// font-family: PingFang SC;
		// font-weight: 500;
		// display: flex;
		// justify-content: center;
		// align-items: center;
		// background-color: #FFFFFF;
		// color: #9f1411;
		// border: 2rpx solid #9f1411;
		background: url(../../static/eleMe/huoquhaibao.png) no-repeat;
		background-size: 100% 100%;
	}
}
.get-btn{
	color:#FFFFFF;
	width: 560rpx;
	height: 116rpx;
	font-size: 45rpx;
	margin-top: 50rpx;
	text-align: center;
	line-height: 116rpx;
	border-radius: 70rpx;
	background-color: #007AFF;
}
// .deving{
// 	height: 100vh;
// 	width: 100%;
// 	background: white;
// 	display: flex;
// 	align-items: center;
// 	flex-direction: column;
// 	image{
// 		width: 441rpx;
// 		height: 269rpx;
// 		margin-top: 276rpx;
// 	}
// 	.qidai{
// 		font-size: 32rpx;
// 		font-family: PingFang SC;
// 		font-weight: bold;
// 		color: #F87501;
// 		line-height: 32rpx;
// 		margin-top: 48rpx;
// 	}
// 	.dev{
// 		font-size: 28rpx;
// 		font-family: PingFang SC;
// 		font-weight: bold;
// 		color: #D2D2D2;
// 		line-height: 28rpx;
// 		margin-top: 95rpx;
// 	}
// }
</style>
