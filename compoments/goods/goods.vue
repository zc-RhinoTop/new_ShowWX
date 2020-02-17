<template>
	<scroll-view class="goods-list"  scroll-y>
		<view class="goods-item" v-for="goods in list" :key='goods.commodityInstId'
				@tap='goDetails(goods.commodityInstId)'>
			<image :src="goods.commodityImages | getImgUrl" class="goods-img"/>
			<view class="goods-info">
				<view class="goods-title">{{goods.commodityName}}</view>
				<view class="goods-msg">
					<text class="goods-price">¥{{goods.commodityInstPrice}}</text>
					<text class="goods-buy">{{goods.maxBuy}}付款</text>
				</view>
			</view>
			<view class="join-car">
				加入购物车
			</view>
		</view>
	</scroll-view>
</template>

<script>
	import {joinCar} from '../../network/details.js'
	export default{
		props:{
			list:{
				type:Array,
				default(){
					return []
				}
			}
		},
		data(){
			return{
				
			}
		},
		methods:{
			goDetails(id){
				uni.navigateTo({
					url:'/pages/details/details?commodityInstId='+id
				})
			}
		},
		filters:{
			getImgUrl(val){
				return JSON.parse(val)[0].url
			}
		},
	}
</script>

<style>
	.goods-list{
		height: calc(100vh - 110upx);
		border-radius: 20upx 20upx 0 0;
		background-color: #fff;
		display: flex;
		flex-flow: row wrap;
		justify-content: space-between;
		padding: 20upx 24upx;
	}
	/* 商品展示 */
	.goods-item{
		height: 448upx;
		width: 46%;
		border-radius: 20upx;
		background-color: #fff;
		display: flex;
		flex-flow: column nowrap;
		overflow: hidden;
	}
	.goods-img{
		width: 100%;
		height: 248upx;
	}
	.goods-info{
		padding: 20upx;
		height: 90upx;
	}
	.goods-title{
		font-weight: 700;
		line-height: 1.5;
		text-overflow:ellipsis;
		overflow:hidden;
		white-space:nowrap;  
		}
		.goods-msg{
			display: flex;
			justify-content: space-between;
			align-items: center;
		}
	.goods-price{
		font-size: 36upx;
		color: red;
		font-weight: 700;
	}
	.goods-buy{
		color: #666666;
		font-size: 24upx;
	}
	.join-car{
		background-color: red;
		color: #fff;
		text-align: center;
		height: 70upx;
		line-height: 70upx;
		font-size: 26upx;
		}
</style>
