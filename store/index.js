import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({
    state: {
		carCount:0,
		userInfo:{}
	},
	getters:{
		getCarCount(state){
			return state.carCount
		},
		getUserInfo(state){
			return state.userInfo
		}
	},
    mutations: {
		setCarCount(state){
			state.carCount ++
		},
		setUserInfo(state,user){
			state.userInfo = user
		}
	},
    actions: {}
})
export default store