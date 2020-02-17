<template>
	<view class="goods" @tap="goodsInfo">
		<image class="goods-img"  :src="goods.commodityImages | getImgUrl"/>
		<view class="name">
			<text v-if="goods.hasOwnProperty('bandName')"
				  class="band-name">{{goods.bandName}}</text>
			 {{goods.commodityName}}
		</view>
		<view class="price">
			<text class="new">¥{{goods.commodityInstPrice}}</text>
			<text class="old">¥{{goods.commodityOriginalPrice}}</text>
		</view>
		<view class="goods-info">
			<view class="time">
				<view class="presell">
					预售时间 ：<text class="get-time">{{goods.createTime | filterTime}}</text>
				</view>
				<view class="presell">
					提货时间 ：<text class="get-time">{{goods.endTime | filterTime}}</text>
				</view>
			</view>
			<view class="sall">
				<view class="sall-text">
					已售<text class="sall-count">{{goods.salesCount}}</text>
					<text>{{goods.unit}}</text>
				</view>
				<view class="sall-text">
					限购<text class="sall-count">{{goods.bargainStock}}</text>
					<text>{{goods.unit}}</text>
				</view>
			</view>
		</view>
		<view class="btn">
			<view class="go-category">
				<text>进入{{goods.categoryName}}</text>
				<text class="iconfont icon-ditu-shouzhi icon"></text>
			</view>
			<view class="join-car">
				加入购物车
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		props:{
			goods:{
				type:Object,
				default(){
					return {}
				}
			}
		},
		data(){
			return{
				
			}
		},
		methods:{
			goodsInfo(){
				uni.navigateTo({
					url:'/pages/details/details?id='+this.goods.bargainId
				})
			}
		},
		filters:{
			getImgUrl(val){
				return JSON.parse(val)[0].url
			},
			filterTime(val){
				let d= new Date(val)
				return (d.getMonth() + 1)+'月'+d.getDay()+'日'
			}
		}
	}
</script>

<style lang="scss">
	.goods{
		padding: 20upx 24upx;
		border-bottom: 20upx solid #f23f3b;
		.goods-img{
			width: 100%;
			height: 390upx;
		}
		.name{
			padding-bottom: 10upx;
			.band-name{
				padding-right: 10upx;
			}
		}
		.new{
			color: red;
			font-size: 36upx;
		}
		.old{
			color: #949494;
			font-size: 24upx;
			text-decoration:line-through;
			padding-left: 10upx;
		}
		.goods-info{
			display: flex;
			justify-content: space-between;
			font-size: 24upx;
			line-height: 1.5;
			.time{
				.get-time{
					color: $retail-color;
					
				}
			}
			.sall{
				.sall-count{
					color: red;
				}
			}
		}
		.btn{
			display: flex;
			justify-content: space-between;
			margin: 20upx 0 30upx 0;
			&> view{
				width: 316upx;
				height: 70upx;
				border-radius: 40upx;
				color: $uni-bg-color;
				box-sizing: border-box;
			}
			.go-category{
				display: flex;
				padding: 0 30upx;
				justify-content: space-between;
				align-items: center;
				background: linear-gradient(90deg, rgba(255, 204, 102, 1) 0%, 
					rgba(255, 204, 102, 1) 1%, 
					rgba(255, 102, 51, 1) 100%);
				.icon{
					font-size: 60upx;
				}
			}
			.join-car{
				text-align: center;
				line-height: 70upx;
				background-color: red;
			}
		}
	}
</style>
