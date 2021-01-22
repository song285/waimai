<template>
	<view class="main">
		<image src="../../static/eleMe/qr.png" mode="" show-menu-by-longpress></image>
		<text>遇到问题？扫一扫，添加客服微信</text>
	</view>
</template>

<script>
</script>

<style lang="scss" scoped>
	.main{
		display: flex;
		flex-direction: column;
		align-items: center;
		image{
			width: 520rpx;
			height: 520rpx;
			margin-top: 200rpx;
			margin-bottom: 30rpx;
		}
		text{
			font-size: 32rpx;
			font-family: PingFang SC;
			font-weight: 500;
			color: #666666;
		}
	}
</style>
