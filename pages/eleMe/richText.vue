<template>
	<view class="main">
		<jyf-parser :html="node"></jyf-parser>
	</view>
</template>

<script>
	import index from '../../common/api/eleMe/eleMe.js'
	import jyfParser from "@/components/jyf-parser/jyf-parser";
	export default{
		data(){
			return{
				node:''
			}
		},
		components:{jyfParser},
		onLoad() {
			index.getMethod(this)
		}
	}
</script>

<style lang="scss" scoped>
	.main{
		// padding: 0 24rpx;
	}
</style>
