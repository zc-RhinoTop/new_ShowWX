import request from './request.js'
export function getHotKey(pageNum,pageRow){
	return request({
		url:'/index/hotKeyword',
		data:{
			pageNum,
			pageRow
		}
	})
}
export function getKeyWordGoods(queryName,pageNum=1,pageRow=100,orderName='hot',orderPalin='ASC'){
	return request({
		url:'/commodity/search',
		data:{
			queryName,
			pageNum,
			pageRow,
			orderName,
			orderPalin
			
		}
	})
}