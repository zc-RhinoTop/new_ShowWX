<template>
	<view class="category">
		<scroll-view class="left-nav" scroll-y>
			<view class="left-list" :class="{'is-active':currIndex == index}"
				  v-for="(name,index) in leaveOneList" :key='index'
				  @tap="chooseCategory(index,name.categoryId)">
				{{name.categoryName}}
			</view>
		</scroll-view>
		<scroll-view class="right-nav" scroll-y>
			<view class="right-box">
				<view class="right-list"
					  v-for="(item,index) in leaveTwoList" :key='index'
					  @tap="choosePage(item.categoryId)">
					<image :src="item.imgUrl" mode="" />
					<text>{{item.categoryName}}</text>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	import {getCategoryData,getSecondCategoryData} from '../../network/category.js'
	export default {
		data() {
			return {
				leaveOneList:[],
				leaveTwoList:[],
				currIndex:0
			}
		},
		onLoad(){
			this.getData()
			uni.$on('onceKinds',res=>{
				this.currIndex = res.index
				this.getTwoData(res.id)
			})
		},
		methods: {
			getTwoData(id){
				getSecondCategoryData(id).then(res=>{
					if(res.data.code == 100 ){
						this.leaveTwoList = res.data.info
					}
				})
			},
			getData(){
				getCategoryData().then(res=>{
					if(res.data.code == 100 ){
						this.leaveOneList = res.data.info
						this.getTwoData(this.leaveOneList[0].categoryId)
					}
				})
			},
			chooseCategory(index,id){
				this.currIndex = index
				this.getTwoData(id)
			},
			choosePage(id){
				uni.navigateTo({
					url:'/pages/categoryBrand/categoryBrand?categoryId='+id
				})
			}
		}
	}
</script>

<style lang="scss">
	.category{
		height: 100%;
		display: flex;
		.left-nav{
			height: 100%;
			width: 160upx;
			background-color: #F2F2F2;
			.left-list{
				height: 80upx;
				line-height: 80upx;
				text-align: center;
				font-size: 26upx;
				box-sizing: border-box;
			}
			.is-active{
				border-left: 8upx solid rgb(242,63,59);
				background-color: #fff;
				color: #f23f3b;
			}
		}
		.right-nav{
			flex: 1;
			background-color: #fff;
			.right-box{
				display: flex;
				flex-flow: row wrap;
				align-content: flex-start;
				height: 100%;
				width: 100%;
				.right-list{
					width: 33%;
					height: 200upx;
					display: flex;
					flex-flow: column nowrap;
					justify-content: center;
					align-items: center;
					&>image{
						width: 80upx;
						height: 60upx;
					}
					&>text{
						font-size: 24upx;
						color: #666666;
						padding-top: 10upx;
					}
				}
			}
			
		}
	}

</style>
