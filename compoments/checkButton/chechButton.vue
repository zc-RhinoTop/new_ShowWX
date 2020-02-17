<template>
	<view class="iconfont icon-dagou car-icon"
			:class="{'is-choose':ischoose}"></view>
</template>

<script>
	export default{
		props:{
			ischoose:{
				type:Boolean,
				default:false
			}
		},
		watch:{
			ischoose(newval){
				console.log(newval)
			}
		}
	}
</script>

<style scoped>
	.car-icon{
		width: 36rpx;
		height: 36rpx;
		border-radius: 50%;
		color: #fff;
		background-color: #fff;
		border: 1px solid #f5f5f5;
		text-align: center;
		line-height: 36rpx;
		font-size: 24rpx;
		font-weight: 700;
	}
	.is-choose{
		border: 1px solid red;
		background-color: red;
	}
</style>
