<template>
	<view class="special-goods">
		<view class="search">
			<view class="inde-search" @tap="toSerach">
				<icon class="icon-search" type="search" size="14" />
				<text>30分钟极速送达</text>
			</view>
		</view>
		<view class="key-goods">
			<scroll-view class="goods-list"  scroll-y>
				<view class="goods-box">
					<view class="goods-item"
					 v-for="goods in keywordList" 
					 :key='goods.commodityInstId'
					  @tap="toDetails(goods.commodityInstId)">
						<image :src="goods.garbainImages | getImgUrl" class="goods-img"/>
						<view class="goods-info">
							<view class="goods-title">{{goods.commodityName}}</view>
							<view class="goods-msg">
								<text class="goods-price">¥{{goods.bargainPrice}}</text>
								<text class="goods-buy">{{goods.paymentCount}}付款</text>
							</view>
						</view>
						<view class="join-car">
							加入购物车
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
import { getSpecialData } from '../../network/index.js';
export default {
	data() {
		return {
			keywordList: []
		};
	},
	onLoad(){
		this.getData()
	},
	filters:{
		getImgUrl(val){
			return JSON.parse(val)[0].url
		}
	},
	methods: {
		toSerach() {
			uni.navigateTo({
				url:'/pages/search/search'
			})
		},
		toDetails(id){
			uni.navigateTo({
				url:'/pages/details/details?id='+id
			})
		},
		getData(){
			getSpecialData().then(res=>{
				console.log(res)
				if(res.data.code == 100 ){
					this.keywordList = res.data.info
				}
			})
		}
	}
};
</script>

<style lang="scss">
	.special-goods{
		background-color: #f5f5f5;
	}
.search {
	height: 60upx;
	background-color: $retail-color;
	padding: 20upx;
}
.inde-search {
	height: 60upx;
	border-radius: 30upx;
	background-color: $uni-bg-color;
	text-align: center;
	line-height: 60upx;
	color: #cccccc;
}
.icon-search {
	padding-right: 10upx;
}
.goods-list{
		height: calc(100vh - 110upx);
	}
	.goods-box{
		display: flex;
		flex-flow: row wrap;
		justify-content: space-between;
		padding: 20upx 24upx;
		box-sizing: border-box;
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
		margin-top: 30upx;
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
