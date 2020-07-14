
const db = wx.cloud.database(); //连接数据库
const materials_list = db.collection("studyChannel_materials");
const activities_list = db.collection("studyChannel_activities");
const strategies_list = db.collection("studyChannel_strategies");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isCollapse: true,
    textHidden: "hidden",
    hasHeight: "height:500rpx",
    materials: null,
    strategies: null,
    activities: null,
    loading: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var itemNo = options.itemNo;

    materials_list.doc(itemNo)
    .get({
      success: res => {
        var datas = res.data;
        datas.date = this.date_parser('' + this.dateToMs(datas.date))
        this.setData({
          materials: datas
        });
        console.log(this.data.materials)
      }
    })

    activities_list.doc(itemNo)
    .get({
      success: res => {
        var datas = res.data;
        datas.date = this.date_parser('' + this.dateToMs(datas.date))
        this.setData({
          activities: datas
        });
        console.log(this.data.activities)
      }
    })

    strategies_list.doc(itemNo)
    .get({
      success: res => {
        var datas = res.data;
        datas.date = this.date_parser('' + this.dateToMs(datas.date))
        this.setData({
          strategies: datas
        });
        console.log(this.data.strategies)
      }
    })
    this.setData({
      loading: false
    })
  },
  collapse: function() {
    if(this.data.isCollapse) {
      this.setData({
        textHidden: "block",
        hasHeight: "",
        isCollapse: false
      })
    } else {
      this.setData({
        textHidden: "hidden",
        hasHeight: "height:500rpx",
        isCollapse: true
      })
    }
  },
  /**
   * 小程序页面加载完成后
   */
  onReady() {
    
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
  },
 
})