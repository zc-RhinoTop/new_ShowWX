import request from './request.js'
export function getDetailsData(bargainId){
	return request({
		url:'/bargain/loadBargainInfo',
		header:{
			'content-type':'application/x-www-form-urlencoded',
			'Cookie':'JSESSIONID='+uni.getStorageSync('sessionId')
		},
		data:{
			bargainId
		}
	})
}
export function getCommodityDetailsData(commodityInstId){
	return request({
		url:'/commodity/commodityInfo',
		header:{
			'content-type':'application/x-www-form-urlencoded',
			'Cookie':'JSESSIONID='+uni.getStorageSync('sessionId')
		},
		data:{
			commodityInstId
		}
	})
}
export function joinCar(commodityInstId,type){
	return request({
		url:'/shopCart/add',
		header:{
			'content-type':'application/x-www-form-urlencoded',
			'Cookie':'JSESSIONID='+uni.getStorageSync('sessionId')
		},
		data:{
			commodityInstId,
			type
		}
	})
}
