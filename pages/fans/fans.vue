<template>
	<view class="main">
		<!-- 顶部卡片，ui图标有问题 -->
		<view class="card">
			<view class="left">
				<text class="my-master">我的团长</text>
				<view class="header-box">
					<image src="../../static/fans/touxiangbiankuan@2x.png" mode="" class="touxiangbiankuang"></image>
					<image :src="params.parent.head?params.parent.head:'/static/user/mornetoux@2x.png'" mode="" class="touxiang"></image>
				</view>
				<text class="name">{{params.parent.nickName}}</text>
			</view>
			<view class="right">
				<text class="allNum">总人数</text>
				<view class="num">
					{{params.total || 0}}
				</view>
			</view>
		</view>
		<!-- 粉丝列表 -->
		<view class="content">
			<view class="item" v-for="(item,index) in list">
				<image :src="item.head?item.head:'/static/user/mornetoux@2x.png'" mode=""></image>
				<view class="info">
					<view class="name">
						{{item.nickName}}
					</view>
					<view class="time">
						注册时间：{{item.createTime | DATE}}
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import fans from '../../common/api/fans/fans.js'
	import common from '../../common/js/common.js'
	export default{
		data(){
			return{
				list:[],
				params:{
					length:20,//分页数量，
					start:0,//页码，0开始
					totalPage:0,
					pageNo: 0,
					total:0,
					parent:{}
				},
			
				img:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1605274195892&di=5f346a7da847f84732a66fc631d214ce&imgtype=0&src=http%3A%2F%2Fa4.att.hudong.com%2F27%2F67%2F01300000921826141299672233506.jpg'
			}
		},
		filters:{
			DATE(val){
				if(val){
					return common.dateFormat('YYYY.mm.dd HH:MM', new Date((val).replace(/\-/g, '/')));
				}else{
					return ''
				}
			}
		},
		onLoad() {
			fans.getFansList(this)
			this.$uma.trackEvent('myFans');
		},
		onReachBottom() {
			if(this.params.pageNo != this.params.totalPage){
				this.params.start += this.params.length
				fans.getFansList(this)
			}
		}
	}
</script>

<style scoped lang="scss">
	.main{
		.card{
			width: 718rpx;
			height: 284rpx;
			background: url(../../static/fans/card@2x.png) no-repeat;
			background-size: 100% 100%;
			margin: 41rpx auto 0;
			display: flex;
			justify-content: space-around;
			.left{
				display: flex;
				flex-direction: column;
				align-items: center;
				.my-master{
					margin-top: 44rpx;
					font-size: 32rpx;
					font-family: PingFang SC;
					font-weight: bold;
					color: #FFFFFF;
					line-height: 32rpx;
				}
				.header-box{
					margin-top: 6rpx;
					width: 104rpx;
					height: 116rpx;
					position: relative;
					.touxiangbiankuang{
						width: 104rpx;
						height: 116rpx;
						position: absolute;
						bottom: 0rpx;
						left: 0rpx;
						z-index: 10;
					}
					
					.touxiang{
						width: 94rpx;
						height: 94rpx;
						position: absolute;
						bottom: 3rpx;
						left: 5rpx;
						border-radius: 50%;
						z-index: 1;
					}
				}
				.name{
					margin-top: 22rpx;
					font-size: 30rpx;
					font-family: PingFang SC;
					font-weight: 500;
					color: #FFFFFF;
					line-height: 30rpx;
				}
				
			}
			.right{
				display: flex;
				flex-direction: column;
				align-items: center;
				.allNum{
					margin-top: 44rpx;
					font-size: 32rpx;
					font-family: PingFang SC;
					font-weight: bold;
					color: #FDFDFD;
					line-height: 32rpx;
				}
				.num{
					margin-top: 87rpx;
					width: 179rpx;
					height: 66rpx;
					background: rgba(233, 97, 129, 0.5);
					border-radius: 33rpx;
					line-height:66rpx ;
					font-size: 40rpx;
					font-family: PingFang SC;
					font-weight: bold;
					color: #FFFFFF;
					text-align: center;
				}
			}
		}
		.content{
			.item{
				display: flex;
				align-items: center;
				height: 139rpx;
				margin: 0 24rpx;
				border-bottom: solid 1rpx #e2e2e2;
				image{
					width: 80rpx;
					height: 80rpx;
					border-radius: 50%;
					margin-right: 43rpx;
				}
				.info{
					.name{
						font-size: 30rpx;
						font-family: PingFang SC;
						font-weight: bold;
						color: #323232;
						line-height: 30rpx;
					}
					.time{
						font-size: 26rpx;
						font-family: PingFang SC;
						font-weight: 500;
						color: #777777;
						line-height: 26rpx;
						margin-top: 24rpx;
					}
				}
			}
			
		}
	}
</style>
