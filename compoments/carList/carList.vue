<template>
	<view class="car-list">
		<view class="check-btn">
			<check-button :ischoose="goodsitem.checked" @tap.native='choose'/>
			</view>
		<view class="goods-list-item">
			<view class="lisy-img"><image :src="imgURL"></image></view>
			<view class="goods-info">
				<view>
					<view class="goods-name">{{ goodsitem.commodityName }}</view>
					<view class="goods-unit">
						<text>{{ goodsitem.specs }}/{{ goodsitem.unit }}</text>
					</view>
				</view>
				<view class="goods-price">
					<text class="new">¥{{ goodsitem.bargainPrice }}</text>
					<text class="old">¥{{ goodsitem.commodityInstPrice }}</text>
				</view>
			</view>

			<view class="btn">
				<text class="minus iconfont icon-jianhao"></text>
				<input class="num-input" type="number" :value="goodsitem.quantity" />
				<text class="add iconfont icon-jia"></text>
			</view>
		</view>
	</view>
</template>

<script>
import checkButton from '../../compoments/checkButton/chechButton.vue';
export default {
	props: {
		goodsitem: {
			type: Object,
			default() {
				return {};
			}
		}
	},
	methods:{
		choose(){
			this.goodsitem.checked = !this.goodsitem.checked
		}
	},
	components: {
		checkButton
	},
	computed: {
		imgURL() {
			return JSON.parse(this.goodsitem.commodityImages)[0].url;
		},
	}
};
</script>

<style scoped>
.car-list {
		display: flex;
		height: 180rpx;
		padding: 40rpx 20rpx;
}
.check-btn {
	align-self: center;
}
.goods-list-item {
	flex: 1;
	display: flex;
	padding-left: 20rpx;
}
.lisy-img {
	align-self: center;
	width: 180rpx;
	height: 126rpx;
}
.lisy-img > image {
	width: 100%;
	height: 100%;
}
.goods-info {
	display: flex;
	flex: 1;
	justify-content: space-between;
	flex-flow: column nowrap;
	padding-left: 20rpx;
}
.goods-name {
	font-size: 26rpx;
	font-weight: 700;
}
.goods-unit {
	color: #949494;
	font-size: 24rpx;
}
.goods-unit > text {
	background-color: #f2f2f2;
}
.new {
	color: red;
	font-size: 40rpx;
}
.old {
	font-size: 24rpx;
	color: #949494;
	text-decoration: line-through;
	padding-left: 16rpx;
}
.btn {
	width: 240rpx;
	height: 52rpx;
	align-self: flex-end;
	display: flex;
}
.minus,
.add {
	font-size: 24rpx;
	color: #cccccc;
	width: 58rpx;
	height: 52rpx;
	text-align: center;
	line-height: 52rpx;
	border: 1px solid rgb(242, 242, 242);
}
.minus {
	border-top-left-radius: 20px;
	border-bottom-left-radius: 20px;
}
.add {
	border-top-right-radius: 20px;
	border-bottom-right-radius: 20px;
}
.num-input {
	flex: 1;
	height: 50rpx;
	border-top: 1px solid rgb(242, 242, 242);
	border-bottom: 1px solid rgb(242, 242, 242);
	text-align: center;
}
</style>
