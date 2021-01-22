//我的粉丝列表
function login(_this,data,succ) {
	_this.$reqHttp({
			url: '/api/user/wx-login',
			headerState: 1,
			data: data
		})
		.then(res => {
			console.log(res);
			_this.$toast('授权登录成功')
			_this.$store.dispatch('setToken', res.data.token);
			uni.setStorageSync('token', res.data.token);
			_this.isLogin = true;
			uni.hideLoading();
			_this.getTmplID()
			if(typeof succ == "function"){
				succ()
			}
			_this.$uma.trackEvent('myLogin');
		})
		.catch(error => {
			console.log(error);
			uni.hideLoading();
			// _this.$toast(error.msg)
		});
}
export default {
	login
}
