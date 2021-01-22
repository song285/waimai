
//我的粉丝列表
function getOrderList(_this) {
	_this.$reqHttp({
		url: '/api/order-info/page?length='+_this.length+'&start='+_this.start + '&status=' + _this.status,
	}).then(res => {
		_this.totalPage = res.data.totalPage
		_this.pageNo = res.data.pageNo
		// _this.list = res.data
		if(res.data.pageNo == 1){
			_this.list = res.data.list
		}else{
			_this.list = [..._this.list,...res.data.list]
		}
		
	}).catch(error => {
		_this.$toast(error.msg)
	})
}
export default {
	getOrderList
}
