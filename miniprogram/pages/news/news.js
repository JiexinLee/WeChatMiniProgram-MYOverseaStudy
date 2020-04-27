const db = wx.cloud.database(); //连接数据库
const newsList = db.collection("news");

Page({
  data: {
    searchValue: '',
    news: [], // news列表
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    newsList.get({
      success: res => {
        var datas = res.data;
        // 转换日期
        for (var i = 0; i < datas.length; i++) {
          datas[i].date = this.date_parser('' + this.dateToMs(datas[i].date))
        }
        
        this.setData({
          news: datas
        });
        console.log(this.data.news)
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
      newsList.get({
        success: res => {
          var datas = res.data;
          for (var i = 0; i < datas.length; i++) {
            datas[i].date = this.date_parser('' + this.dateToMs(datas[i].date)) // 转换日期
          }
          this.setData({
            news: datas
          });
          console.log(this.data.news)
        }
      })
    }
  },
  /**
   * 点击搜索的时候查找
   */
  searchClick: function (e) {
    var that = this;
    wx.showLoading({
      title: '搜索中...',
    })
    newsList.where(db.command.or([
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
          news: datas
        })
        console.log(that.data.news)
      }
    })
  },
  /**
   * 点击清空按钮的时候响应
   */
  searchClear: function () {
    newsList.get({
      success: res => {
        var datas = res.data;
        for (var i = 0; i < datas.length; i++) {
          datas[i].date = this.date_parser('' + this.dateToMs(datas[i].date)) // 转换日期
        }
        this.setData({
          news: datas
        });
        console.log(this.data.news)
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