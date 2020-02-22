<template>
	<view class="detaile">
		<scroll-view scroll-y class="detail-scroll">
			<swiper class="details-banner"
					indicator-dots 
					indicator-active-color='#ffffff'
					interval="3000"
					circular
					autoplay>
				<swiper-item v-for="(item,index) in banner" :key='index'>
					<image :src="item.url" class="info-img"></image>
				</swiper-item>
			</swiper>
			<view class="info-mes">
				<view class="info-price">
					<text class="new-price">¥{{info.commodityInstPrice}}</text>
					<text class="old-price">¥{{info.commodityOriginalPrice}}</text>
				</view>
				<view class="share">分享给好友<text class="iconfont .icon-fenxiang"></text></view>
			</view>
			<view class="title">{{info.commodityName}}</view>
			<view class="sale">销量：{{info.salesCount}}
			 &nbsp;&nbsp;&nbsp;&nbsp;
			 库存：{{info.commodityStock}}
			 </view>
			 <view class="detail-info">详情介绍</view>
			 <view class="detaile-img">
				 	<image v-for="(item,index) in detailImg"
							:key='index'
					 :src="item.url" mode="widthFix"/>
			 </view>
		</scroll-view>
		 <view class="join-car">
			 <text class="car-text" @tap='joinCar'>加入购物车</text>
			<view class="car-num" @tap='toCar'>
				<uni-badge :text="count"
				 type='error'
				 
				 class="num"></uni-badge>
				<text  class="iconfont icon-icon-test car"></text>
			</view>
		 </view>
	</view>
</template>

<script>
	import {getDetailsData,getCommodityDetailsData,joinCar} from '../../network/details.js'
	import uniBadge from "@/components/uni-badge/uni-badge.vue"
	export default {
		data() {
			return {
				id:'',
				info:{}
			};
		},
		 components: {uniBadge},
		methods:{
			getBandData(){
				getDetailsData(this.id).then(res=>{
					if(res.data){
						this.info = res.data
					}
				})
			},
			getCommodityData(){
				getCommodityDetailsData(this.id).then(res=>{
					if(res.data){
						this.info = res.data
					}
				})
			},
			joinCar(){
				this.$store.commit('setCarCount')
				joinCar(this.info.commodityInstId,'commom').then(res=>{
					console.log(res)
					if(res.data.code == 100 ){
						uni.showToast({
							title: res.data.info,
							icon:"none"
						});
					}
					
				})
			},
			toCar(){
				uni.switchTab({
				    url: '/pages/car/car'
				});
			}
		},
		computed:{
			banner(){
				if(this.info.garbainImages){
					return JSON.parse(this.info.garbainImages)
				}else{
					return JSON.parse(this.info.commodityImages)
				}
				
			},
			detailImg(){
				if(this.info.commodityDescription){
					return JSON.parse(this.info.commodityDescription)
				}
				
			},
			count(){
				return this.$store.getters.getCarCount? this.$store.getters.getCarCount :''
			}
		},
		onLoad(obj) {
			if(obj.id){
				this.id = obj.id
				this.getBandData()
			}else{
				this.id = obj.commodityInstId
				this.getCommodityData()
			}
			
		}
	}
</script>

<style lang="scss">
	.detaile{
		height: 100%;
	}
	.detail-scroll{
		height: calc(100% - 100upx);
	}
	.details-banner{
		height: 550upx;
		.info-img{
			width: 100%;
		}
	}
	.info-mes{
		padding: 20upx 20upx 0 60upx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		.new-price{
			font-size: 48upx;
			color: red;
			font-size: 700;
		}
		.old-price{
			text-decoration: line-through;
			color: #949494;
			padding-left: 10upx;
		}
		.share{
			height: 50upx;
			line-height: 50upx;
			padding: 0 40upx;
			color: red;
			background-color: rgba(255,0,0,0.15);
			border-radius: 40upx;
		}
	}
	.title{
		padding-left: 60upx;
		height: 80upx;
		line-height: 80upx;
		font-size: 32upx;
		font-weight: 700;
	}
	.sale{
		font-size: 24upx;
		color: #949494;
		padding-left: 60upx;
	}
	.detail-info{
		height: 80upx;
		line-height: 80upx;
		font-size: 30upx;
		font-weight: 700;
		padding-left: 60upx;
		border-top: 20upx solid #f5f5f5;
	}
	.detaile-img{
		image{
			width: 100%;
			display: block;
		}
		
	}
	.join-car{
		height: 100upx;
		background-color: $retail-color;
		display: flex;
		color: #fff;
		line-height: 100upx;
		.car-text{
			flex: 1;
			text-align: center;
			font-size: 32upx;
		}
		.car-num{
			position: relative;
			width: 190upx;
			text-align: center;
			border-left: 1px solid #fff;
			.num{
				position: absolute;
				top: 0;
				right: 0;
			}
			.car{
				font-size: 50upx;
				
			}
		}
		
	}
	
</style>
