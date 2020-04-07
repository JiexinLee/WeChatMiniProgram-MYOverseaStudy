export const request=(params)=>{
  return new Promise((resolve, reject)=>{
    wx.request({
      ...params,
      success: function(res) {
        resolve(res)
      },
      fail: function(err) {
        reject(err)
      },
      complete: function(res) {
        console.log(res);
      },
    })
  })
}