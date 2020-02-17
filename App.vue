<script>
	import {login} from './network/profile.js'
	export default {
		onLaunch: function() {
			this.getUser()
			this.refresh()
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		},
		methods:{
			getUser(){
				if(uni.getStorageSync('login')){
					login(uni.getStorageSync('unionid')).then(res=>{
						console.log(res)
						if(res.data.code == 100 ){
							this.$store.commit('setUserInfo', res.data.info.user)
							uni.setStorageSync('sessionId',res.data.info.sessionId)
						}
					})
				}
			},
			refresh(){
				let that = this
				setInterval(that.getUser,20*60*1000)
			}
		}
	}
</script>

<style>
	/*每个页面公共css */
	@import url("./common/uni.css");
	@import url("./common/iconfont.css");
	page{
		height: 100%;
	}
</style>
