const BESTURL = 'http://121.36.172.234:8085'
export default function (config) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: BESTURL + config.url,
      method: config.method || 'post' ,
      data: config.data || {},
	  header:config.header || {},
      success: resolve,
      fail: reject
    })
  })
}
