<template>
	<view class="profile">
		<view v-if="!isLogin" class="header">
			<view class="unlogin"/>
			<view class="">
				<button class="login-text"
				open-type="getUserInfo" @tap="sign">登录/注册</button>
			</view>
		</view>
		<view v-else  class="header">	
			<view class="login">
				<image :src="user.avatarUrl" mode=""></image>
			</view>
			<view class="info">
				<view class="name">{{user.nickName}}</view>
				<view class="tel">{{user.userName}}</view>
			</view>
		</view>
		<view class="logistics">
			<view class="payment">
				<image src="../../static/profile/u1159.png" mode=""></image>
				<text>待付款</text>
			</view>
			<view class="payment">
				<image src="../../static/profile/u1150.png" mode=""></image>
				<text>待发货</text>
			</view>
			<view class="payment">
				<image src="../../static/profile/u1153.png" mode=""></image>
				<text>待收货</text>
			</view>
			<view class="payment">
				<image src="../../static/profile/u1156.png" mode=""></image>
				<text>已收货</text>
			</view>
		</view>
		<view class="">
			<view class="profile-list" @tap='address'>
				<image src="../../static/profile/u1164.png" mode=""></image>
				<text>收货地址</text>
			</view>
			<view class="profile-list">
				<image src="../../static/profile/u1168.png" mode=""></image>
				<text>全部订单</text>
			</view>
			<view class="profile-list">
				<image src="../../static/profile/u1176.png" mode=""></image>
				<text>退款申请</text>
			</view>
			<view class="profile-list">
				<image src="../../static/profile/u1172.png" mode=""></image>
				<text>关于我们</text>
			</view>
		</view>
		<view class="sign-out" @tap='signOut'>退出登录</view>
	</view>
</template>

<script>
	import {wxlogin,login} from '../../network/profile.js'
	export default {
		data() {
			return {
				user:{},
				unionid:'',
				isLogin:uni.getStorageSync('login')
			}
		},
		onLoad(){
			if(this.isLogin){
				this.user = this.$store.getters.getUserInfo
			}
			this.unionid = uni.getStorageSync('unionid')
		},
		methods: {
			sign(){
				if(this.unionid){
					this.user = this.$store.getters.getUserInfo()
				}else{
					uni.navigateTo({
						url:'/pages/profile/login'
					})
				}
				
			},
			address(){
				uni.navigateTo({
					url:'/pages/noAddress/noAddress'
				})
			},
			signOut(){
				uni.removeStorageSync('login')
				this.isLogin = false
				uni.showToast({
					title:'退出成功'
				})
			}
		}

	}
</script>

<style lang="scss">
	button::after{ border: none;}
	.profile{
		height: 100%;
		background-color: #f5f5f5;
		.header{
			width: 100%;
			height: 260upx;
			display: flex;
			justify-content: flex-start;
			align-items: center;
			background: url(../../static/profile/u6.png) no-repeat center/100%;
			.unlogin{
				margin: 0 40upx;
				width: 156upx;
				height: 156upx;
				border-radius: 50%;
				background: #F7F7F7 url(../../static/profile/u1146.png) no-repeat center;
				background-size: 140upx 140upx;
			}
			.login{
				margin: 0 40upx;
				width: 156upx;
				height: 156upx;
				border-radius: 50%;
				overflow: hidden;
				&>image{
					width: 100%;
					height: 100%;
				}
			}
			.info{
				color: #fff;
				.name{
					padding-bottom: 20rpx;
				}
			}
			.login-text{
				width: 172upx;
				height: 60upx;
				font-size: 26upx;
				border-radius: 40upx;
				border: 1px solid #fff;
				text-align: center;
				line-height: 60upx;
				padding: 0;
				background-color: #FB8629;
				color: #fff;
			}
			
		}
		.logistics{
			display: flex;
			width: 100%;
			height: 152upx;
			border-bottom: 40upx solid #F5F5F5;
			background-color: #fff;
			&>view{
				width: 25%;
				text-align: center;
			}
			image{
				width: 60upx;
				height: 60upx;
				display: block;
				margin: 10upx auto;
			}
			text{
				font-size: 26upx;
			}
		}
		.profile-list{
			height: 98upx;
			border-top: 1px solid #f5f5f5;
			background-color: #fff;
			padding-left: 40upx;
			display: flex;
			align-items: center;
			image{
				width: 60upx;
				height: 60upx;
			}
			text{
				padding-left: 20upx;
			}
		}
		.sign-out{
			background-color: #fff;
			height: 100rpx;
			line-height: 100rpx;
			text-align: center;
			border-top: 20rpx solid #F5F5F5;
		}
	}
</style>
