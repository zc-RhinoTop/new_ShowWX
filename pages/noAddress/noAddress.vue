<template>
	<view class="address">
		<view class="list">
			<text>我的自提地址</text>
			<text class="choose" @tap='selfBring'>切换自提点 > </text>
		</view>
		<view class="list">
			<text>我的配送地址</text>
			<text class="choose" @tap='chooseAddress'>选择地址 > </text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		methods:{
			selfBring(){
				uni.navigateTo({
					url:'/pages/addAddress/addAddress?name=self'
				})
			},
			chooseAddress(){
				uni.navigateTo({
					url:'/pages/addAddress/addAddress?name=address'
				})
			}
		}
	}
</script>

<style lang="scss">
	.address{
		background-color: rgb(242,242,242);
		height: 100%;
		.list{
			height: 100upx;
			border-bottom: 1px solid rgb(242,242,242);
			background-color: #fff;
			display: flex;
			padding: 0 40upx;
			justify-content: space-between;
			align-items: center;
			font-size: 30upx;
			.choose{
				font-size: 26upx;
				color: #ff6600;
			}
			}
	}
	
</style>
