<template>
	<view class="main">
		<view class="head-nav">
			<view class="nav-bar" v-for="(item, index) in navList" :key="index" :class="{ active: status == item.status }" @tap="active(item.status)">{{ item.name }}</view>
		</view>
		<view class="wrap">
			<view class="items" v-for="(item, index) in list" :key="index">
				<view class="top-view">
					<view class="order-num">
						<image :src="item.type == 20 ? '../../static/tabbar/elme@2x.png' : '../../static/tabbar/meituan@2x.png'" mode=""></image>
						订单号：{{ item.code }}
					</view>
					<view
						class="status"
						:class="{
							green: item.status == 10,
							yellow: item.status == 20
						}"
					>
						{{ item.status | getStatus }}
					</view>
				</view>
				<view class="content">
					<image src="../../static/moren@2x.png" mode=""></image>
					<view class="right">
						<view class="title">
							{{item.shopName}}
						</view>
						<view class="money eli">
							￥{{item.payPrice}} 
							<view class="commission">
								赚{{item.profit}}
							</view>
						</view>
					</view>
				</view>
				<view class="bottom">
					<view class="user-info">
						<image :src="item.userHead ? item.userHead : '../../static/user/mornetoux@2x.png' " mode="aspectFit"></image>
						<view class="name">
							{{item.nickName}}
						</view>
					</view>
					<view class="date-view" :class="{dataMargin : item.status==20}">
						<view >
							下单时间：{{item.payTime}}
						</view>
						<view v-if="item.status==20" class="order-date">
							结算时间：{{item.settleTime}}
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import order from '../../common/api/order/order.js'
export default {
	data() {
		return {
			status: 0,
			navList: [{ name: '全部', status: 0 }, { name: '已付费', status: 10 }, { name: '已结算', status: 20 }, { name: '已失效', status: 40 }],
			length:10,
			start:1,
			totalPage:'',
			pageNo:'',
			list: []
		};
	},
	filters: {
		// 装修类型
		getStatus(status) {
			return {
				10: '已付费',
				20: '已结算',
				40: '已失效'
			}[status];
		}
	},
	onLoad() {
		order.getOrderList(this);
		this.$uma.trackEvent('myOrder');
	},
	onReachBottom() {
		if(this.pageNo != this.totalPage){
			this.start += this.length
			order.getOrderList(this);
		}
	},
	methods: {
		// 切换状态
		active(status) {
			this.start = 1;
			this.length = 10;
			this.status = status;
			this.list = [];
			order.getOrderList(this);
		}
	}
};
</script>

<style lang="scss" scoped>
.eli {
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}
.main {
	min-height: 100vh;
	background-color: #f3f3f3;
	.head-nav {
		position: sticky;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		width: 100%;
		top: 0;
		// padding: 0 53rpx 0 63rpx;
		height: 84rpx;
		line-height: 84rpx;
		background-color: #ffffff;
		justify-content: space-between;
		z-index: 99;
		.nav-bar {
			position: relative;
			width: 25%;
			text-align: center;
			color: #333333;
			font-size: 28rpx;
			font-weight: 400;
			font-family: PingFang SC;
			&.active {
				font-size: 32rpx;
				font-weight: bold;
				&::after {
					content: '';
					position: absolute;
					bottom: 0;
					width: 61rpx;
					height: 7rpx;
					border-radius: 4rpx;
					left: 50%;
					transform: translate(-50%, -50%);
					// left: 0;
					background-color: #f87501;
				}
			}
		}
	}
	.wrap {
		padding: 0 24rpx 20rpx;
		.items {
			width: 100%;
			background-color: #FFFFFF;
			border-radius: 16rpx;
			margin-top: 20rpx;
			.top-view {
				display: flex;
				align-items: center;
				justify-content: space-between;
				height: 86rpx;
				border-bottom: 1rpx solid #E4E4E4;
				margin: 0 29rpx 0 25rpx;
				.order-num {
					display: flex;
					align-items: center;
					color: #555555;
					font-weight: 500;
					font-size: 28rpx;
					image {
						width: 50rpx;
						height: 50rpx;
						border-radius: 50%;
						margin-right: 16rpx;
						margin-left: 9rpx;		
					}
				}
				.status {
					font-size: 28rpx;
					font-weight: 400;
					color: #666666;
					&.green {
						color: #029942;
					}
					&.yellow {
						color: #F87501;
					}
				}
			}
			.content {
				display: flex;
				align-items: center;
				padding: 30rpx 32rpx 35rpx 47rpx;
				image {
					width: 111rpx;
					height: 89rpx;
					border-radius: 10rpx;
					margin-right: 29rpx;
				}
				.right {
					position: relative;
					width: calc(100% - 140rpx);
					height: 89rpx;
					display: flex;
					flex-wrap: wrap;
					// align-items:;
					.title {
						width: 100%;
						font-size: 30rpx;
						font-weight: 500;
						color: #444444;
						line-height: 28rpx;
					}
					.money {
						position: absolute;
						bottom: 0;
						width: 100%;
						display: flex;
						align-items: center;
						justify-content: space-between;
						color: #333333;
						font-size: 30rpx;
						line-height: 29rpx;
						font-weight: bold;
						.commission {
							color: #F87501;
						}
						
					}
				}
			}
			.bottom {
				padding: 0  32rpx 24rpx 49rpx;
				display: flex;
				justify-content: space-between;
				align-items: center;
				.user-info {
					display: flex;
					flex-wrap: wrap;
					image {
						width: 54rpx;
						height: 54rpx;
						border-radius: 50%;
						margin-bottom: 16rpx;
						
					}
					.name {
						width: 100%;
						color: #666666;
						font-size: 26rpx;
						line-height: 25rpx;
						font-weight: 500;
					}
				}
				.date-view {
					display: flex;
					align-items: center;
					flex-wrap: wrap;
					justify-content: flex-end;
					color: #666666;
					font-size: 26rpx;
					font-weight: 500;
					&.dataMargin {
						margin-top: 19rpx;
					}
					&view {
						line-height: 25rpx;
						width: 100%;
					}
					.order-date {
						margin-top: 11rpx;
					}
				}
			}
		}
	}
}
</style>
