<template>
	<view class="content">
		<view class="search-box">
			<!-- mSearch组件 如果使用原样式，删除组件元素-->
			<mSearch
				class="mSearch-input-box"
				:mode="2"
				button="inside"
				:placeholder="defaultKeyword"
				@search="doSearch(false)"
				@input="inputChange"
				@confirm="doSearch(false)"
				v-model="keyword"
			></mSearch>
		</view>
		<view class="key-goods" v-show="isShowKeywordList">
			<goods :list='keywordList' />
		</view>
		<view class="search-keyword" @touchstart="blur">
			<scroll-view class="keyword-box" v-show="!isShowKeywordList" scroll-y>
				<view class="keyword-block" v-if="oldKeywordList.length > 0">
					<view class="keyword-list-header">
						<view>历史搜索</view>
						<view><image @tap="oldDelete" src="/static/HM-search/delete.png"></image></view>
					</view>
					<view class="keyword">
						<view v-for="(keyword, index) in oldKeywordList" @tap="doSearch(keyword)" :key="index">{{ keyword }}</view>
					</view>
				</view>
				<view class="keyword-block">
					<view class="keyword-list-header">
						<view>热门搜索</view>
						<view><image @tap="hotToggle" :src="'/static/HM-search/attention' + forbid + '.png'"></image></view>
					</view>
					<view class="keyword" v-if="forbid == ''">
						<view v-for="(item, index) in hotKeywordList" @tap="doSearch(item.keyword)" :key="index">{{ item.keyword }}</view>
					</view>
					<view class="hide-hot-tis" v-else><view>当前搜热门搜索已隐藏</view></view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
//引用mSearch组件，如不需要删除即可
import mSearch from '@/compoments/mehaotian-search-revision/mehaotian-search-revision.vue';
import goods from '../../compoments/goods/goods.vue'
import { getHotKey, getKeyWordGoods } from '../../network/search.js';
export default {
	data() {
		return {
			defaultKeyword: '',
			keyword: '',
			oldKeywordList: [],
			hotKeywordList: [],
			keywordList: [],
			isShowKeywordList: false,
			forbid: ''
		};
	},
	onLoad() {
		this.init();
	},
	components: {
		//引用mSearch组件，如不需要删除即可
		mSearch,
		goods
	},
	methods: {
		init() {
			this.loadDefaultKeyword();
			this.loadOldKeyword();
			this.loadHotKeyword();
		},
		blur() {
			uni.hideKeyboard();
		},
		//加载默认搜索关键字
		loadDefaultKeyword() {
			//定义默认搜索关键字，可以自己实现ajax请求数据再赋值,用户未输入时，以水印方式显示在输入框，直接不输入内容搜索会搜索默认关键字
			this.defaultKeyword = '30分钟极速送达';
		},
		//加载历史搜索,自动读取本地Storage
		loadOldKeyword() {
			uni.getStorage({
				key: 'OldKeys',
				success: res => {
					var OldKeys = JSON.parse(res.data);
					this.oldKeywordList = OldKeys;
				}
			});
		},
		//加载热门搜索
		loadHotKeyword() {
			//定义热门搜索关键字，可以自己实现ajax请求数据再赋值
			getHotKey(1, 10).then(res => {
				if (res.data.code == 100) {
					this.hotKeywordList = res.data.info;
				}
			});
		},
		//监听输入
		inputChange(event) {
			//兼容引入组件时传入参数情况
			var keyword = event.detail ? event.detail.value : event;
			if (!keyword) {
				this.keywordList = [];
				this.isShowKeywordList = false;
				return;
			}
			//以下示例截取淘宝的关键字，请替换成你的接口
			this.keyword = keyword;
			getKeyWordGoods(keyword).then(res => {
				if (res.data.code == 100) {
					this.isShowKeywordList = true;
					this.keywordList = res.data.info;
					this.keyword = keyword;
				}
			});
		},
		//清除历史搜索
		oldDelete() {
			uni.showModal({
				content: '确定清除历史搜索记录？',
				success: res => {
					if (res.confirm) {
						console.log('用户点击确定');
						this.oldKeywordList = [];
						uni.removeStorage({
							key: 'OldKeys'
						});
					} else if (res.cancel) {
						console.log('用户点击取消');
					}
				}
			});
		},
		//热门搜索开关
		hotToggle() {
			this.forbid = this.forbid ? '' : '_forbid';
		},
		//执行搜索
		doSearch(key) {
			key = key ? key : this.keyword ? this.keyword : this.defaultKeyword;
			this.keyword = key;
			this.saveKeyword(key); //保存为历史
			uni.showToast({
				title: key,
				icon: 'none',
				duration: 2000
			});
			//以下是示例跳转淘宝搜索，可自己实现搜索逻辑
			getKeyWordGoods(key).then(res => {
				if (res.data.code == 100) {
					this.isShowKeywordList = true;
					this.keywordList = res.data.info;
					this.keyword = key;
				}
			});
		},
		//保存关键字到历史记录
		saveKeyword(keyword) {
			uni.getStorage({
				key: 'OldKeys',
				success: res => {
					var OldKeys = JSON.parse(res.data);
					var findIndex = OldKeys.indexOf(keyword);
					if (findIndex == -1) {
						OldKeys.unshift(keyword);
					} else {
						OldKeys.splice(findIndex, 1);
						OldKeys.unshift(keyword);
					}
					//最多10个纪录
					OldKeys.length > 10 && OldKeys.pop();
					uni.setStorage({
						key: 'OldKeys',
						data: JSON.stringify(OldKeys)
					});
					this.oldKeywordList = OldKeys; //更新历史搜索
				},
				fail: e => {
					var OldKeys = [keyword];
					uni.setStorage({
						key: 'OldKeys',
						data: JSON.stringify(OldKeys)
					});
					this.oldKeywordList = OldKeys; //更新历史搜索
				}
			});
		}
	}
};
</script>
<style>
view {
	display: block;
}
.search-box {
	width: 95%;
	background-color: rgb(242, 242, 242);
	padding: 15upx 2.5%;
	display: flex;
	justify-content: space-between;
}
.search-box .mSearch-input-box {
	width: 100%;
}
.search-box .input-box {
	width: 85%;
	flex-shrink: 1;
	display: flex;
	justify-content: center;
	align-items: center;
}
.search-box .search-btn {
	width: 15%;
	margin: 0 0 0 2%;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-shrink: 0;
	font-size: 28upx;
	color: #fff;
	background: linear-gradient(to right, #ff9801, #ff570a);
	border-radius: 60upx;
}
.search-box .input-box > input {
	width: 100%;
	height: 60upx;
	font-size: 32upx;
	border: 0;
	border-radius: 60upx;
	-webkit-appearance: none;
	-moz-appearance: none;
	appearance: none;
	padding: 0 3%;
	margin: 0;
	background-color: #ffffff;
}
.placeholder-class {
	color: #9e9e9e;
}
.search-keyword ,
.key-goods{
	width: 100%;
	background-color: rgb(242, 242, 242);
}
.keyword-box{
	height: calc(100vh - 110upx);
	border-radius: 20upx 20upx 0 0;
	background-color: #fff;
}
/* 关键字 */
.keyword-box .keyword-block {
	padding: 10upx 0;
}
.keyword-box .keyword-block .keyword-list-header {
	width: 94%;
	padding: 10upx 3%;
	font-size: 27upx;
	color: #333;
	display: flex;
	justify-content: space-between;
}
.keyword-box .keyword-block .keyword-list-header image {
	width: 40upx;
	height: 40upx;
}
.keyword-box .keyword-block .keyword {
	width: 94%;
	padding: 3px 3%;
	display: flex;
	flex-flow: wrap;
	justify-content: flex-start;
}
.keyword-box .keyword-block .hide-hot-tis {
	display: flex;
	justify-content: center;
	font-size: 28upx;
	color: #6b6b6b;
}
.keyword-box .keyword-block .keyword > view {
	display: flex;
	justify-content: center;
	align-items: center;
	border-radius: 60upx;
	padding: 0 20upx;
	margin: 10upx 20upx 10upx 0;
	height: 60upx;
	font-size: 28upx;
	background-color: rgb(242, 242, 242);
	color: #6b6b6b;
}
</style>
