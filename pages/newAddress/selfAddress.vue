<template>
	<view>
		<view class="head">
			<view class="address">
				<text class="iconfont icon-ditu-shouzhi"></text> <text>{{location}}</text>
			</view>
			<view @tap='getMap'>修改详细地址</view>
		</view>
		<view class="info">请选择一个最方便的自提门店（建议距离最近）</view>
		<block v-for='(item,index) in list' :key='index'>
			<view class="store-info">
				
			</view>
		</block>
	</view>
</template>

<script>
	import amap from '../../common/amap-wx.js'; 
	export default {
		data() {
			return {
				location:'',
				  amapPlugin: null,  
				  key: '4e1f4efe68009e524b688ee841b3a256',  
			};
		},
		methods:{
			 getRegeo() {  
			            uni.showLoading({  
			                title: '获取信息中'  
			            });  
			            this.amapPlugin.getRegeo({  
			                success: (data) => {  
			                    console.log(data)  
			                    this.location = data[0].name;  
			                    uni.hideLoading();  
			                }  
			            });
			},
			getMap(){
				uni.chooseLocation({
				    success:  res=> {
				        this.location = res.address
				    }
				});
			},
		},
		onLoad(){
			 this.amapPlugin = new amap.AMapWX({  
			      key: this.key  
			 });  
			 this.getRegeo()
		}
	}
</script>

<style lang="scss">
	.head{
		display: flex;
		background-color: rgba(251, 134, 41, 1);
		height: 70rpx;
		color: #fff;
		padding: 0 40rpx;
		justify-content: space-between;
		font-size: 24rpx;
		line-height: 70rpx;
		.address{
			width: 360rpx;
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
		}
	}
	.info{
		height: 70rpx;
		color: red;
		background-color: #fff;
		padding-left: 40rpx;
		line-height: 70rpx;
		}
		.store-info{
			border-top: 1px solid rgb(242,242,242);
			height: 160rpx;
			padding: 40rpx;
			
		}
</style>
