import request from './request.js'
export function getCategoryData(){
	return request({
		url:'/index/loadFirstCategory'
	})
}
export function getSecondCategoryData(parentId){
	return request({
		url:'/index/loadSecondCategory',
		header:{
			'content-type':'application/x-www-form-urlencoded'
		},
		data:{
			parentId
		}
	})
}
export function getCategoryBrandData(categoryId,orderName='hot',orderPalin='DESC',queryName='',bandId='1'){
	return request({
		url:'/commodity/commodityListByFirstLelCategory',
		header:{
			'Cookie':'JSESSIONID='+uni.getStorageSync('sessionId')
		},
		data:{
			categoryId,
			pageNum:1,
			pageRow:100,
			orderName,
			orderPalin,
			queryName,
			bandId
		}
	})
}
