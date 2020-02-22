<template>
	<view class="new-address">
		<view class="form-item">
			<view class="form-label">收货人</view>
			<view class="form-input">
				<input type="text" v-model="userName" placeholder="请输入收货人姓名"/>
			</view>
		</view>
		<view class="form-item">
			<view class="form-label">手机号</view>
			<view class="form-input">
				<input type="number" v-model="tel" placeholder="请输入手机号"/>
			</view>
		</view>
		<block v-if="query == 'address'">
			<view class="form-item">
				<view class="form-label">详细地址</view>
				<view class="map" @tap='getMap' >
					<text class="location">{{location}}</text><text v-if="!isChoose">></text>
				</view>
			</view>
			<view class="form-item">
				<view class="form-label"></view>
				<view class="form-input">
					<input type="text" v-model="unitAddress" placeholder="楼号/单元/门牌号"/>
				</view>
			</view>
		</block>
		<block v-else>
			<view class="form-item">
				<view class="form-label">自提地址</view>
				<view class="map" @tap='toSelf' >
					<text class="location">{{selfAddress}}</text><text v-if="!isChoose">></text>
				</view>
			</view>
		</block>
	</view>
</template>

<script>
	
	export default {
		data() {
			return {
				query:'',
				userName:'',
				tel:'',
				unitAddress:'',
				location:'请选择您的位置',
				latitude:'',
				longitude:'',
				isChoose:false,
				selfAddress:'请选择自提位置'
			};
		},
		onLoad(obj) {
			this.query = obj.name
		},
		methods:{
			getMap(){
				uni.chooseLocation({
				    success:  res=> {
						console.log(res)
				        this.location = res.address
						this.isChoose = true
						this.latitude = res.latitude
						this.longitude = res.longitude
				    }
				});
			},
			toSelf(){
				uni.navigateTo({
					url:'/pages/newAddress/selfAddress'
				})
			}
		}
	}
</script>

<style lang="scss">
	.new-address{
		background-color: rgb(242,242,242);
		height: 100%;
	}
	.form-item{
		display: flex;
		height: 98upx;
		align-items: center;
		background-color: #fff;
		border-bottom: 1px solid rgb(242,242,242);
		.form-label{
			width: 170upx;
			padding-left: 40upx;
		}
		.form-input{
			flex: 1;
		}
		.map{
			display: flex;
			flex: 1;
			justify-content: space-between;
			font-size: 30upx;
			padding-right: 40upx;
			.location{
				overflow: hidden;
				white-space: nowrap;
				text-overflow: ellipsis;
			}
		}
	}
</style>
