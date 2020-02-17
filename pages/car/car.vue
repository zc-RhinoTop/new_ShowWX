<template>
	<view class="car">
		<view class="no-goods" v-if="!haveGoods">
			<view class="no-goods-info">
				您还没有添加任何商品~
			</view>
			<view class="to-index" @tap="toIndex">
				查看平台好物
			</view>
		</view>
		<block v-else >
			<block v-for="(item,index) in goods" :key='index'>
				<car-list :goodsitem="item"/>
			</block>
		</block>
	</view>
</template>

<script>
	import {getCarData} from '../../network/car.js'
	import carList from '../../compoments/carList/carList.vue'
	export default {
		components:{
			carList
		},
		data() {
			return {
				goods:[]
			}
		},
		methods: {
			getCar(){
				getCarData().then(res=>{
					console.log(res)
					if(res.data.code == 100 ){
						this.goods = res.data.info.map(item=>{
							item.checked = true
							return item
						})
						
					}
				})
			},
			choose(){
				
			},
			toIndex(){
				uni.switchTab({
					url:'/pages/index/index'
				})
			}
		},
		computed:{
			haveGoods(){
				return this.goods.length>0?true:false
			}
		},
		onLoad() {
			this.getCar()
		}
	}
</script>

<style scoped>
	.car{
		height: 100%;
	}
	.no-goods{
		height: 100%;
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-flow: column;
	}
	.no-goods-info{
		color: #bcbcbc;
		height: 80rpx;
	}
	.to-index{
		border: 1px solid red;
		width: 240rpx;
		height: 60rpx;
		line-height: 60rpx;
		text-align: center;
		border-radius: 40rpx;
		color: red;
	}

	
	
</style>
