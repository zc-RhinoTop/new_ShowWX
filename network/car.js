import request from './request.js'
export function getCarData(){
	return request({
		url:'/shopCart/load',
		header:{
			'content-type':'application/x-www-form-urlencoded',
			'Cookie':'JSESSIONID='+uni.getStorageSync('sessionId')
		},
	})
}