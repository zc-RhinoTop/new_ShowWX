import request from './request.js'
export function wxlogin(encryptedData,iv,code){
	return request({
		url:'/wxLogin/decodeUserInfo',
		method:'get',
		data:{
			encryptedData,
			iv,
			code
		}
	})
}
export function login(unionId,loginType='wxLogin'){
	return request({
		url:'/wxLogin/login',
		header:{
			'content-type':'application/x-www-form-urlencoded'
		},
		data:{
			unionId,
			loginType
		}
	})
}
export function send(telephone){
	return request({
		url:'/aliMsg/send',
		header:{
			'content-type':'application/x-www-form-urlencoded'
		},
		data:{
			telephone
		}
	})
}
export function register(telephone,unionId){
	return request({
		url:'/wxLogin/register',
		header:{
			'content-type':'application/x-www-form-urlencoded'
		},
		data:{
			telephone,
			unionId
		}
	})
}