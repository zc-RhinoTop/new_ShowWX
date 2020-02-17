<template>
	<view class="index">
		<view class="index-top">
			<view class="map" >
				<text class="iconfont icon-icon-test1"></text><text>当前自取点：{{stores}}</text>
			</view>
			<view class="inde-search" @tap="toSerach">
				 <icon class="icon-search" type="search" size="14"/><text>统一品牌满9减2</text>
			</view>
		</view>
		<scroll-view class="index-main" scroll-y enable-back-to-top>
			<swiper indicator-dots 
					autoplay
					interval='3000'
					circular
					class="index-banner"
					indicator-active-color='#ffffff'
					style="height: 336upx;padding: 30upx 24upx;">
				<swiper-item class="swiper-item" v-for="item in banner" :key=item.id>
					<image class="swiper-img" :src="item.AdvertImgUrl"/>
				</swiper-item>
			</swiper>
			<view class="category">
				<swiper indicator-dots
						indicator-active-color='#FB8629'
						style="height: 410upx;padding: 0 24upx;">
					<swiper-item v-for="(item,index) in newDemo" :key='index'
								class="category-box">
							<view v-for="(list,i) in item" :key='i'
							 class="category-item" @tap="goCategory(i,list.categoryId)">
								<image class="category-img" 
								:src="list.imgUrl" 
								mode="widthFix"/>
								<view class="category-text">{{list.categoryName}}</view>
							</view>
					</swiper-item>
				</swiper>
			</view>
			<image class="index-bgi" src="../../static/index/u63.png" mode="widthFix"/>
			<view class="special-offer">
				<image class="big-img" src="../../static/index/u82.png" mode="widthFix"></image>
				<text class="special-text">特价商品</text>
				<image class="small-img" src="../../static/index/u82.png" mode="widthFix"></image>
			</view>
			<view class="" v-for="item in goods" :key='item.commodityInstId'>
				<special :goods='item'/>
			</view>
			<view class="more-special" @tap="moreSpecial">更多特价商品</view>
		</scroll-view>
		<uni-popup type="top" ref="popup">
				<view class="uni-list">
				    <radio-group @change="radioChange">
				         <label class="uni-list-cell uni-list-cell-pd"
								v-for="(item, index) in address" :key="item.index">
				            <view>
				                 <radio :value="item.memberByString.storeName" :checked="index === current" >
									  <view>{{item.memberByString.storeName}}</view>
								 </radio>
				            </view>
							<view>距您{{item.distance.toFixed(2)}}公里</view>
				        </label>
				    </radio-group>
				 </view>
		</uni-popup>
	</view>
</template>

<script>
	import {getIndexData,getstores} from '../../network/index.js'
	import Special from '../../compoments/special/special.vue'
	import uniPopup from "@/components/uni-popup/uni-popup.vue"
	export default {
		components:{
			Special,
			uniPopup
		},
		data() {
			return {
				banner:[],
				category:[],
				goods:[],
				address:[],
				stores:''
			}
		},
		methods:{
			toSerach(){
				uni.navigateTo({
				    url: '/pages/search/search'
				});
			},
			moreSpecial(){
				uni.navigateTo({
				    url: '/pages/moreSpecial/moreSpecial'
				});
			},
			goCategory(index,id){
				uni.switchTab({
					url:'/pages/category/category'
				})
				uni.$emit('onceKinds',{index:index,id:id})
			},
			radioChange(e){
				this.stores = e.detail.value
				this.$refs.popup.close()
			}
		},
		computed:{
			newDemo(){
				if(this.category.length>10){
					let arr= []
					for(let i = 0;i<this.category.length;i+=10){
						arr.push(this.category.slice(i,i+10))
					}
					return arr
				}else{
					return this.category
				}
			}
		},
		onLoad() {
			getIndexData().then(res=>{
				if(res.data.code == 100 ){
					let data = res.data.info
					this.banner = data.advertList
					this.category = data.categoryList
					this.goods = data.bargainCommodityList
				}
			})
			uni.authorize({
				 scope: 'scope.userLocation',
				 success: ()=>{
					 uni.getLocation({
					 	success: res=>{
					 		getstores('24.6112244800','118.0471944800').then(res=>{
					 			console.log(res)
					 			this.address = res.data.map(item =>{
										item.memberByString = JSON.parse(item.memberByString)
										return item
									})
								   this.$refs.popup.open()
					 		})
					 	}
					 })
				 }
			})
		},
		onShow(){
			
		}
	}
</script>

<style scoped lang="scss">
	.index{
		height: 100%;
		.index-top{
			height: 170upx;
			background-color: $retail-color;
			color: $uni-text-color-inverse;
			padding: 0 20upx;
			.map{
				height: 90upx;
				line-height: 90upx;
				
			}
			.inde-search{
				height: 60upx;
				border-radius: 30upx;
				background-color: $uni-bg-color;
				text-align: center;
				line-height: 60upx;
				color: #CCCCCC;
			}
			.icon-search{
				padding-right:10upx;
			}
		}
		.index-main{
			height: calc(100% - 170upx);
			.index-banner{
				background-color: #F23F3B;
				.swiper-item{
					border-radius: 20upx;
					.swiper-img{
						width: 100%;
						height: 100%;
					}
				}
			}
			.category{
				background-color: #F23F3B;
				padding: 20upx 0;
				.category-box{
					display: flex;
					flex-flow: row wrap;
					background-color: $uni-bg-color;
					border-radius: 20upx;
					.category-item{
						width: 20%;
						text-align: center;
						.category-img{
							width: 92upx;
							margin: 20upx auto;
						}
					}
				}
			}
			.index-bgi{
				width: 100%;
			}
			.special-offer{
				height: 120upx;
				display: flex;
				justify-content: center;
				align-items: center;
				.big-img{
					width: 60upx;
					align-self: flex-start;
					margin-top: 20upx;
				}
				.small-img{
					width: 40upx;
				}
				.special-text{
					font-size: 36upx;
					font-weight: 700;
					padding: 0 20upx;
				}
			}
			.more-special{
				height: 70upx;
				line-height: 70upx;
				text-align: center;
				font-size: 26upx;
				color: #666666;
				border-top: 1px solid rgb(242,242,242);
			}
		}
	}
	
	
	
	
	
	
	
	
	
</style>
