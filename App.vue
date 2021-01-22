<script>
export default {
	onLaunch: function() {
		uni.hideTabBar({})
		console.log('App Launch');
		var token = uni.getStorageSync('token');
		if(token){
			this.$store.dispatch('setToken', token);
		}
	},
	onShow: function() {
		uni.hideTabBar({})
		console.log('App Show');
		// uni.hideTabBar();
	},
	onHide: function() {
		console.log('App Hide');
	}
};
</script>

<style>
/*每个页面公共css */
</style>
