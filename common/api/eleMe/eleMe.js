function channelLog(_this, data) {
	_this.$reqHttp({
		url: '/api/sys-channel-log/new',
		headerState: 1,
		data:{
			'paramter':data,
			}
	}).then(res => {
		
	}).catch(error => {
		// _this.$toast(error.msg)
	})
}
//获取饿了吗分享链接
function getShare(_this) {
	_this.$reqHttp({
		url: '/api/ele/get',
	}).then(res => {
		_this.img = res.data.image_url
		_this.page_path = res.data.wx_miniprogram_path
		_this.app_id = res.data.app_id
	}).catch(error => {
		_this.$toast(error.msg)
	})
}
//赚钱攻略
function getMethod(_this) {
	_this.$reqHttp({
		url: '/api/sys-param/profit-method',
	}).then(res => {
		_this.node = res.data
	}).catch(error => {
		_this.$toast(error.msg)
	})
}
function compareVersion(v1, v2) {
  v1 = v1.split('.')
  v2 = v2.split('.')
  const len = Math.max(v1.length, v2.length)

  while (v1.length < len) {
    v1.push('0')
  }
  while (v2.length < len) {
    v2.push('0')
  }

  for (let i = 0; i < len; i++) {
    const num1 = parseInt(v1[i])
    const num2 = parseInt(v2[i])
    if (num1 > num2) {
      return 1;
    } 	if (num1 < num2) {
      return -1;
    }
  }

  return 0;
}
export default {
	getShare,
	getMethod,	
	compareVersion,
	channelLog
}
