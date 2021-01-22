//获取优惠券信息
function getCouponsInfo(_this,callback) {
	_this.$reqHttp({
		url: '/api/coupons/list',
	}).then(res => {
		uni.hideLoading();
		console.log(res)
		if(!res.success){
			_this.$toast(res.info)
			return;
		}
		_this.tabs = res.data.title
		_this.coupons = res.data.content
		_this.current = 0
		_this.changeTab(_this.current)
		
		if(uni.getStorageSync('yz_openid')){
			if(_this.ishuazhu){
				_this.tabs.unshift({
					id:0,
					icon:'../../../static/huazhu.png',
					text:'花小猪'
				})
			}else {
				_this.tabs.unshift({
					id:0,
					icon:'../../../static/QZLQ@2x.png',
					text:'取纸领券'
				})
			}
			
		}
	}).catch(error => {
		uni.hideLoading();
		_this.$toast(error.msg)
	})
}

export default {
	getCouponsInfo
}