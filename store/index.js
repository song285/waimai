import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({
    state: {
		isLogin:false,
		code:'',
		token:'',
		scene:0,//场景值：上一级的id
		userInfo:''//个人信息
	},
    mutations: {
		SET_ISLOGIN(state, val) {
			state.isLogin = val
		},
		SET_CODE(state, val) {
			state.code = val
		},
		SET_TOKEN(state,val){
			state.token = val
		},
		SET_SCENE(state,val){
			state.scene = val
			console.log(state.scene)
		},
		SET_USERINFO(state,val){
			state.userInfo = val
		}



	},
    actions: {
		setIsLogin({commit},val){
			commit('SET_ISLOGIN',val)
		},
		setCode({commit},val){
			commit('SET_CODE',val)
			// commit('SET_ISLOGIN',true)
		},
		setToken({commit},val){
			commit('SET_TOKEN',val)
		},
		setScene({commit},val){
			commit('SET_SCENE',val)
		},
		setUserInfo({commit},val){
			commit('SET_USERINFO',val)
		}



	}
})
export default store