import Vue from 'vue'
import App from './App'
import store from './store'


import luPopupWrapper from '@/components/lu-popup-wrapper/lu-popup-wrapper.vue'
import request from '@/common/js/request.js' //请求JS
import common from '@/common/js/common.js' //通用JS

Vue.component('luPopupWrapper', luPopupWrapper)

Vue.config.productionTip = false

Vue.prototype.$store = store //把vuex定义成全局组件
Vue.prototype.$reqHttp = request.http //挂载全局http请求方法
Vue.prototype.$toast = common.toast //挂载全局toast方法
Vue.prototype.$shareImg = 'http://zhishan-test.oss-cn-beijing.aliyuncs.com/take_away%2Fimage%2Fwxfx.png' //分享图片

App.mpType = 'app'

const debug = false //false : 测试服务器  true : 正式服务器
if (!debug) {
	// Vue.prototype.apiUrl = 'http://127.0.0.1:8082'
	Vue.prototype.apiUrl = 'https://waimai.api.zhishangsoft.com' // 测试接口域名
	// Vue.prototype.apiUrl = 'https://haojuan.api.zhishangsoft.com' // 测试接口域名
	// Vue.prototype.apiUrl = 'https://haojuanxia.api.zhishangsoft.com'
} else {
	Vue.prototype.apiUrl = '47.111.0.119:8080' // 正式接口域名
}

// #ifdef MP-WEIXIN
import uma from 'umtrack-wx';
uma.init({
	appKey: '5fe06dec345b8b53f5756342', //由友盟分配的APP_KEY
	// 使用Openid进行统计，此项为false时将使用友盟+uuid进行用户统计。
	// 使用Openid来统计微信小程序的用户，会使统计的指标更为准确，对系统准确性要求高的应用推荐使用Openid。
	useOpenid: false,
	// 使用openid进行统计时，是否授权友盟自动获取Openid，
	// 如若需要，请到友盟后台"设置管理-应用信息"(https://mp.umeng.com/setting/appset)中设置appId及secret
	autoGetOpenid: false,
	debug: true, //是否打开调试模式
	uploadUserInfo: false // 自动上传用户信息，设为false取消上传，默认为false
})
// #endif

// 此处用来挂载入uma到组件实例上，方便组件内使用this.$uma
uma.install = function (Vue) {
	Vue.prototype.$uma = uma;
}

Vue.use(uma);

const app = new Vue({
    ...App,
})
app.$mount()
