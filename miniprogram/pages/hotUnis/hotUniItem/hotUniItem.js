Page({

  /**
   * 页面的初始数据
   */
  data: {
    isCollapse: true,
    textHidden: "hidden",
    hasHeight: "height:200rpx",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  collapse: function () {
    if (this.data.isCollapse) {
      this.setData({
        textHidden: "block",
        hasHeight: "",
        isCollapse: false
      })
    } else {
      this.setData({
        textHidden: "hidden",
        hasHeight: "height:200rpx",
        isCollapse: true
      })
    }
  }
  
})