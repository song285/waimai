
//获取订阅模板消息
function getSubscribe(_this,callback) {
	_this.$reqHttp({
		url: '/api/user/get-subscribe'
	}).then(res => {		
		console.log(res)
		_this.isSubscribe = res.data;
		if (typeof callback == 'function') {
			callback();
		}
	}).catch(error => {
		console.log(error)
	})
}
// 订阅模板消息
function setSubscribe(_this,callback){
	_this.$reqHttp({
		url: '/api/user/subscribe'
	}).then(res => {		
		if (typeof callback == 'function') {
			callback();
		}
	}).catch(error => {
		console.log(error)
	})
}
// 获取美团链接
function getLinkling(_this,callback){
	_this.$reqHttp({
		url: '/api/meituan/get',
		headerState: 0,
		data:{
			hrefType:1
		}
	}).then(res => {		
		console.log(res)
		_this.url = res.data
		if (typeof callback == 'function') {
			callback();
		}
	}).catch(error => {
		console.log(error)
	})
}
export default {
	getSubscribe,
	setSubscribe,
	getLinkling
}
