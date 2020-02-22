<template>
	<view>
		
	</view>
</template>

<script>
	import {getCategoryBrandData} from '../../network/category.js'
	export default {
		data() {
			return {
				
			};
		},
		methods:{
			getData(id){
				getCategoryBrandData(id).then(res=>{
					console.log(res)
				})
			}
		},
		onLoad(query){
			this.getData(query.categoryId)
		}
	}
</script>

<style lang="scss">

</style>
