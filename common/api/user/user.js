
//得到当前用户信息
function getUserInfo(_this) {
	_this.$reqHttp({
		url: '/api/user/get',
	}).then(res => {
		_this.user = res.data
		_this.$store.dispatch('setUserInfo', res.data);
	}).catch(error => {
		_this.$toast(error.msg)
	})
}
//获取我的收益
function getProfit(_this) {
	_this.$reqHttp({
		url: '/api/profit/get',
	}).then(res => {
		_this.profit = res.data
	}).catch(error => {
		_this.$toast(error.msg)
	})
}
//获取推广二维码
function getQrcode(_this,succ) {
	_this.$reqHttp({
		url: '/api/user/get-qrcode?path='+_this.path,
	}).then(res => {
		if(typeof(succ)=="function"){
			succ(res.data)
		}
	}).catch(error => {
		_this.$toast(error.msg)
	})
}
export default {
	getUserInfo,
	getProfit,
	getQrcode
}
