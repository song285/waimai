import store from 'store'

function http(opt) {
	var _this = this
	let token = _this.$store.state.token ? _this.$store.state.token : '';

	// 获取请求参数
	opt = opt || {};
	opt.url = opt.url || '';
	opt.data = opt.data || {};
	opt.method = opt.method || 'POST';
	opt.headerState = opt.headerState || 0;
	opt.headerobj = opt.headerobj || {}
	opt.header = headerDate();
	// 设置请求头
	function headerDate() {
		switch (opt.headerState) {
			case 0:
				return {
					"content-type": 'application/json',
					"token": token,
				}
			case 1:
				return {
					"content-type": 'application/x-www-form-urlencoded',
					"token": token,
				}
			case 2:
				return {
					"content-type": 'multipart/form-data',
					"token": token,
				}
		}
	}

	// 使用Promise异步请求接口
	return new Promise((resolve, reject) => {
		uni.request({
			url: this.apiUrl + opt.url,
			data: opt.data,
			method: opt.method,
			header: opt.header,
			dataType: 'json',
			success: function(res) {
				if (res.data.success) {
					// 请求接口成功且后台返回正确信息
					resolve(res.data)
				}
				if (res.data.code == '-1' || !res.data.success) {
					// uni.reLaunch({
					// 	url: '../user/user'
					// })
					// uni.hideTabBar();
				}
			},
			fail: function(res) {
				// 请求接口失败
				if (res.errMsg == 'request:fail abort statusCode:-1') {
					uni.showToast({
						title: '网络不给力，请检查网络设置',
						icon: 'none',
						mask: true
					})
				} else {
					reject(res)
				}

			},
			complete: function(res) {

			}
		})
	})

}

export default {
	http
}
