var dateParser = require("../../utils/dateParser.js");
const db = wx.cloud.database(); //连接数据库
const uni_list = db.collection("studyChannel");
Page({
  /**
   * 页面的初始数据
   */
  data: {
    // text: '这是一个哈哈哈',
    // marqueePace: 1,//滚动速度
    // marqueeDistance: 1,//初始滚动距离
    // size: 14,
    // orientation: 'left',//滚动方向
    // interval: 50 // 时间间隔
    searchValue: '',
    materials:  []
  },
  /**
   * 小程序页面加载完成
   */
  onLoad: function (){
    uni_list.get({
      success: res => {
        var datas = res.data;
        for(var i=0; i<datas.length; i++){
          datas[i].date = this.date_parser('' + this.dateToMs(datas[i].date)) // 转换日期
        }
        this.setData({
          materials: datas
        });
        console.log(this.data.materials)
      }
    })
  },
  /**
   * 每次输入时改变value的值
   */
  searchChange: function(e){
    this.setData({
      searchValue: e.detail // e.detail 得到输入的值
    })
    if(e.detail == '') {
      uni_list.get({
        success: res => {
          var datas = res.data;
          for (var i = 0; i < datas.length; i++) {
            datas[i].date = this.date_parser('' + this.dateToMs(datas[i].date)) // 转换日期
          }
          this.setData({
            materials: datas
          });
          console.log(this.data.materials)
        }
      })
    }
  },
  /**
   * 点击搜索的时候查找
   */
  searchClick: function(e){
    var that = this;
    const uni_list = db.collection("studyChannel");
    wx.showLoading({
      title: '搜索中...',
    })
    uni_list.where(db.command.or([
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
          datas[i].date = this.date_parser('' + this.dateToMs(datas[i].date)) // 转换日期
        }
        that.setData({
          materials: datas
        })
        console.log(that.data.materials)
      }
    })
  },
  /**
   * 点击清空按钮的时候响应
   */
  searchClear: function(){
    const uni_list = db.collection("studyChannel");
    uni_list.get({
      success: res => {
        var datas = res.data;
        for (var i = 0; i < datas.length; i++) {
          datas[i].date = this.date_parser('' + this.dateToMs(datas[i].date)) // 转换日期
        }
        this.setData({
          materials: datas
        });
        console.log(this.data.materials)
      }
    })
  },
  onShow: function () {
    // var that = this;
    // var windowWidth = (wx.getSystemInfoSync().windowWidth)*0.6;   // 跑马灯 屏幕宽度

  //   // 页面显示
  //   var that = this;
  //   var length = that.data.text.length * that.data.size;//文字长度
  //   var windowWidth = wx.getSystemInfoSync().windowWidth;// 屏幕宽度
  //   that.setData({
  //     length: length,
  //     windowWidth: windowWidth,
  //   });
  //   that.runMarquee();// 水平一行字滚动完了再按照原来的方向滚动
  // },

  // runMarquee: function () {
  //   console.log(2);
  //   var that = this;
  //   var interval = setInterval(function () {
  //     //文字一直移动到末端
  //     if (-that.data.marqueeDistance < that.data.length) {
  //       console.log(3);
  //       that.setData({
  //         marqueeDistance: that.data.marqueeDistance - that.data.marqueePace,
  //       });
  //     } else {
  //       console.log(4);
  //       clearInterval(interval);
  //       that.setData({
  //         marqueeDistance: that.data.windowWidth
  //       });
  //       that.runMarquee();
  //     }
  //   }, that.data.interval);
  },
  /**
   * 转换时间
   */
  date_parser: function(val) {
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
  dateToMs: function(date){
    let result = new Date(date).getTime();
    return result;
  }
})