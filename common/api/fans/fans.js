
//我的粉丝列表
function getFansList(_this) {
	_this.$reqHttp({
		url: '/api/user/get-fans?length='+_this.params.length+'&start='+_this.params.start,
	}).then(res => {
		_this.params.parent = res.data.parent
		if(res.data.page){
			_this.params.totalPage = res.data.page.totalPage
			_this.params.pageNo = res.data.page.pageNo
			_this.params.total = res.data.page.total
			
			if(res.data.page.pageNo == 1){
				_this.list = res.data.page.list
			}else{
				_this.list = [..._this.list,...res.data.page.list]
			}
		}
		
		
	}).catch(error => {
		_this.$toast(error.msg)
	})
}
export default {
	getFansList
}
