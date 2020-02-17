<template>
	<view>
		<view class="form-item">
			<view class="form-label">手机号</view>
			<view class="form-input">
				<input type="text" v-model="tel" placeholder="请输入手机号"/>
			</view>
		</view>
		<view class="form-item">
			<view class="form-label">验证码</view>
			<view class="form-input">
				<input type="text" v-model="msg" placeholder="验证码"/>
			</view>
			<view class="form-send" @tap='send'>发送验证码</view>
		</view>
		<view class="sign" @tap='sign'>注册并登录</view>
	</view>
</template>

<script>
	import {wxlogin,send,register} from '../../network/profile.js';
	export default {
		data() {
			return {
				tel:'',
				msg:'',
				flag:'',
				unionid:''
			};
		},methods:{
			send(){
				send(this.tel).then(res=>{
					console.log(res)
					if(res.data.code == 100 ){
						this.flag = res.data.info.validateCode
					}
				})
			},
			getUser(){
				let code=''
				let encryptedData = ''
				let iv=''
				uni.login({
					success:res=> {
						 code = res.code
						 uni.getUserInfo({
							success:data=>{
								encryptedData = data.encryptedData
								iv = data.iv
								wxlogin(encryptedData,iv,code).then(res=>{
									if(res.data.msg== "解密成功"){
										register(this.tel,res.data.userInfo.unionId).then(res=>{
											console.log(res)
											if(res.data.code == 100 ){
												uni.setStorageSync('unionid',res.data.userInfo.unionId)
												uni.setStorageSync('login',true)
							
												uni.showToast({
													title:'注册成功',
													duration: 2000,
												})
												uni.navigateTo({
													url:'/pages/profile/profile'
												})
												
											}
										})
									}
									
								})
							},
							fail() {
								uni.showToast({
									title:'未知错误',
									duration: 2000
								})
							}		
						})
					}
				})	
			},
			sign(){
				if(this.flag == this.msg){
					this.getUser()
				}else{
					uni.showToast({
						title:'验证码错误'
					})
				}
			}
		}
	}
</script>

<style lang="scss">
.new-address{
		background-color: rgb(242,242,242);
		height: 100%;
	}
	.form-item{
		display: flex;
		height: 98upx;
		align-items: center;
		background-color: #fff;
		border-bottom: 1px solid rgb(242,242,242);
		.form-label{
			width: 170upx;
			padding-left: 40upx;
		}
		.form-input{
			flex: 1;
		}
		.form-send{
			width: 170upx;
			text-align: center;
			color: #f23f3b;
			}
}
.sign{
	position: fixed;
	bottom: 100rpx;
	left: 50%;
	margin-left: -300rpx;
	background-color: $retail-color;
	color: #fff;
	text-align: center;
	line-height: 100rpx;
	height: 100rpx;
	width: 600rpx;
	border-radius: 20rpx;
}
</style>
