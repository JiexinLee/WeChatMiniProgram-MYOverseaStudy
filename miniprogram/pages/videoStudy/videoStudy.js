var app = getApp();
var db = app.globalData.db;
const video_list = db.collection("videos");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchValue: '',
    videos: [],
    videoIndex: '',
  },

  /**
   * 点击播放视频
   */
  videoPlay: function (e) {
    var id = e.currentTarget.dataset.pid,
      videoindex = e.currentTarget.dataset.index; 
    var videoCtx = wx.createVideoContext(id);    //获取点击的视频

    if (!this.data.videoindex) {    //没有其他视频播放时
      this.setData({
        videoindex: videoindex
      })
      videoCtx.play();
    } else {    // 有其他视频正在播放
      var videoCtxPrev = wx.createVideoContext('myVideo' + this.data.videoindex); //找到当前正在播放的视频
      videoCtxPrev.pause();    //暂停
      this.setData({
        videoindex: videoindex
      })
      videoCtx.play();    //播放点击的视频
    }
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    video_list.get({
      success: res => {
        var datas = res.data;
        for (var i = 0; i < datas.length; i++) {
          datas[i].upload_date = this.date_parser('' + this.dateToMs(datas[i].upload_date)) // 转换日期
        }
        this.setData({
          videos: datas
        });
        console.log(this.data.videos)
        
      }
    })

  },

  /**
  * 每次输入时改变value的值
  */
  searchChange: function (e) {
    this.setData({
      searchValue: e.detail // e.detail 得到输入的值
    })
    if (e.detail == '') {
      video_list.get({
        success: res => {
          var datas = res.data;
          for (var i = 0; i < datas.length; i++) {
            datas[i].upload_date = this.date_parser('' + this.dateToMs(datas[i].upload_date)) // 转换日期
          }
          this.setData({
            videos: datas
          });
          console.log(this.data.videos)
        }
      })
    }
  },

  /**
   * 点击搜索的时候查找
   */
  searchClick: function () {
    var that = this;
    wx.showLoading({
      title: '搜索中...',
    })
    video_list.where(db.command.or([
      {
        //使用正则查询，实现对搜索的模糊查询
        title: db.RegExp({
          regexp: '.*' + that.data.searchValue + '.*',
          //从搜索栏中获取的value作为规则进行匹配。
          options: 'i',
          //大小写不区分
        })
      }
    ])).get({
      success: res => {
        wx.hideLoading();
        var datas = res.data;
        for (var i = 0; i < datas.length; i++) {
          datas[i].upload_date = this.date_parser('' + this.dateToMs(datas[i].upload_date)) // 转换日期
        }
        that.setData({
          videos: datas
        })
        console.log(that.data.videos)
      }
    })

  },

  /**
   * 转换时间
   */
  date_parser: function (val) {
    var date = new Date(parseInt(val.replace("/Date(", "").replace(")/", ""), 10));
    //月份为0-11，所以+1，月份小于10时补个0
    var month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
    var currentDate = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
    var hour = date.getHours();
    var minute = date.getMinutes();
    var second = date.getSeconds();
    var theTime = date.getFullYear() + "." + month + "." + currentDate;
    return theTime;
  },
  dateToMs: function (date) {
    let result = new Date(date).getTime();
    return result;
  }
})