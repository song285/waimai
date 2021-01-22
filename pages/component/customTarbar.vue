<template>
	<view class="tarbar">
		<view
			class="tarbar-list"
			:style="{
				background: tabBar.backgroundColor,
				color: tabBar.color,
				'border-top': tabBar.position == 'bottom' ? '1rpx solid ' + tabBar.borderStyle : 0,
				'border-bottom': tabBar.position == 'top' ? '1rpx solid ' + tabBar.borderStyle : 0
			}"
		>
			<view class="tarbar-list-ul">
				<view class="tarbar-list-li" v-for="(item, index) in tabBar.list" :key="index" @tap.top="setSelected(index)">
					<block>
						<view class="tarbar-list-li-icon"><image :src="selected == index ? item.selectedIconPath : item.iconPath" mode=""></image></view>
						<view
							class="tarbar-list-li-name"
							:class="{
								blue: item.id == 1 && selected == index,
								yellow: item.id == 2 && selected == index,
								pddColor: item.id == 3 && selected == index,
								red: item.id == 4 && selected == index
							}"
						>
							{{ item.text }}
						</view>
					</block>
					<!-- 					<block v-else>
						<view class="tarbar-list-li-icon"><image :src="item.selectedIconPath" mode=""></image></view>
					</block> -->
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	props: ['selected'],
	data() {
		return {
			tabBar: {
				color: '#999999',
				selectedColor: '#E84351',
				borderStyle: '#e4e4e4',
				backgroundColor: '#fff',
				position: 'bottom',
				list: [
					{
						pagePath: '../eleMe/eleMe',
						iconPath: '../../static/tabbar/UN-ELM@2x.png',
						selectedIconPath: '../../static/tabbar/elme@2x.png',
						text: '饿了么',
						id: 1
					},
					{
						pagePath: '../meiTuan/meiTuan',
						iconPath: '../../static/tabbar/UN-MEITUAN@2x.png',
						selectedIconPath: '../../static/tabbar/meituan@2x.png',
						text: '美团',
						id: 2
					},
					{
						pagePath: '../coupons/coupons',
						iconPath: '../../static/tabbar/un-pdd@2x.png',
						selectedIconPath: '../../static/tabbar/PDD@2x.png',
						text: '购物券',
						id: 3
					},
					{
						pagePath: '../user/user',
						iconPath: '../../static/tabbar/UN-WOD@2x.png',
						selectedIconPath: '../../static/tabbar/wo@2x.png',
						text: '我的',
						id: 4
					}
				]
			},
			oldSelected: 0, // 记录之前访问的索引; 值为2的时候显示遮罩
			isShowMask: false
		};
	},
	methods: {
		setSelected(index) {
			var _this = this;
			uni.redirectTo({
				url: _this.tabBar.list[index].pagePath
			});
			_this.$forceUpdate();
			
			switch(index) {
				case 0:this.$uma.trackEvent('eleME');break;
				case 1:this.$uma.trackEvent('mTuan');break;
				case 2:this.$uma.trackEvent('coupons');break;
				case 3:this.$uma.trackEvent('my');break;
			}
			
			uni.removeStorageSync('yz_openid')
		},
		closeMask() {
			this.isShowMask = false;
		}
	}
};
</script>

<style lang="scss" scoped>
.tarbar {
	width: 100%;
	z-index: 99;
	position: fixed;

	.tarbar-list {
		display: flex;
		justify-content: space-between;
		width: 100%;
		height: 98rpx;
		background: #ffffff;
		font-size: 22rpx;
		font-weight: 500;
		position: fixed;
		align-items: center;
		left: 0;
		bottom: 0;
		padding-bottom: 0;
		// padding-bottom: constant(safe-area-inset-bottom);
		padding-bottom: calc(env(safe-area-inset-bottom) - 30rpx);
		.tarbar-list-ul {
			width: 100%;
			height: 100%;
			display: flex;
			align-items: center;
			justify-content: space-between;
			box-sizing: border-box;
		}
		.tarbar-list-li {
			width: 100%;
			display: flex;
			height: 100%;
			justify-content: center;
			flex-wrap: wrap;
			align-items: center;
		}
		.tarbar-list-li-icon {
			width: 44rpx;
			height: 44rpx;
			margin: 0rpx auto;
		}
		.tarbar-list-li-icon image {
			width: 44rpx;
			height: 44rpx;
		}
		.tarbar-list-li-name {
			width: 100%;
			text-align: center;
			line-height: 21rpx;
			font-size: 22rpx;
			margin-top: -10rpx;
			font-family: PingFang SC;
			font-weight: 500;
			&.blue {
				color: #3da6f6;
			}
			&.yellow {
				color: #fec200;
			}
			&.red {
				color: #9f1411;
			}
			&.pddColor {
				color: #F40009;
			}
		}
	}
}
</style>

custom-tarbar.vue
