<template>
	<view class="add-address">
		<view class="info">
			<image class="map" src="../../static/profile/u1348.png" mode=""></image>
			<view>{{info}}</view>
		</view>
		<view class="btn" @tap='addAddress'>{{btn}}</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				flag:''
			};
		},
		onLoad(obj) {
			if(obj.name =='self' ){
				this.flag = 'self'
				uni.setNavigationBarTitle({
					title:'我的自提地址'
				})
			}else{
				this.flag = 'address'
				uni.setNavigationBarTitle({
					title:'我的配送地址'
				})
			}
		},
		computed:{
			info(){
				return this.flag == 'self'? '没有自提地址，快去添加':'没有配送地址，快去添加'
			},
			btn(){
				return this.flag == 'self'? '新增自提地址':'新增配送地址'
			}
		},
		methods:{
			addAddress(){
					uni.navigateTo({
						url:'/pages/newAddress/newAddress?name='+this.flag
					})
			}
		}
	}
</script>

<style lang="scss">
	.add-address{
		background-color: #fff;
		display: flex;
		flex-flow: column nowrap;
		height: 100%;
		.info{
			flex: 1;
			display: flex;
			flex-flow: column nowrap;
			justify-content: center;
			align-items: center;
			color: #bcbcbc;
			.map{
				width: 200upx;
				height: 200upx;
				margin-bottom: 20upx;
			}
		}
		.btn{
			background-color: #f23f3b;
			height: 80upx;
			line-height: 80upx;
			text-align: center;
			color: #fff;
		}
	}
</style>
