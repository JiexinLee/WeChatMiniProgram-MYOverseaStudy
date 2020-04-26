
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  },
  onReady: function(options) {
    
  },

  /**
   * 视频播放
   */
  videoPlay() {
    //执行全屏方法  
    var videoContext = wx.createVideoContext('video_study_1', this);
    videoContext.requestFullScreen();
  },


  /**
   * 视频关闭
   */
  closeVideo() {
    //执行退出全屏方法
    var videoContext = wx.createVideoContext('video_study_1', this);
    videoContext.exitFullScreen();
    videoContext.pause();
  }

  
})