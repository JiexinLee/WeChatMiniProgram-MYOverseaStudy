
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showImg: "none",
    showLoadingIcon: "block",
    posterSrc: "cloud://ljxxxlee-7vbgo.6c6a-ljxxxlee-7vbgo-1300914792/images/eng_exam_poster/poster-test02.jpg"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  },

  /**
   * 图片加载完成
   */
  imageLoad: function() {
    this.setData({
      showImg: "block",
      showLoadingIcon: "none"
    })
  }
})