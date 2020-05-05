
const db = wx.cloud.database(); //连接数据库
const materials_list = db.collection("studyChannel_materials");
const activities_list = db.collection("studyChannel_activities");
const strategies_list = db.collection("studyChannel_strategies");
Page({
  /**
   * 页面的初始数据
   */
  data: {
    searchValue: '',
    materials:  [],
    strategies: [],
    activities: [],
  },
  /**
   * 小程序页面加载完成
   */
  onLoad: function (){
    materials_list.get({ 
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

    activities_list.get({
      success: res => {
        var datas = res.data;
        for (var i = 0; i < datas.length; i++) {
          datas[i].date = this.date_parser('' + this.dateToMs(datas[i].date)) // 转换日期
        }
        this.setData({
          activities: datas
        });
        console.log(this.data.activities)
      }
    })

    strategies_list.get({
      success: res => {
        var datas = res.data;
        for (var i = 0; i < datas.length; i++) {
          datas[i].date = this.date_parser('' + this.dateToMs(datas[i].date)) // 转换日期
        }
        this.setData({
          strategies: datas
        });
        console.log(this.data.strategies)
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
      materials_list.get({
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
      strategies_list.get({
        success: res => {
          var datas = res.data;
          for (var i = 0; i < datas.length; i++) {
            datas[i].date = this.date_parser('' + this.dateToMs(datas[i].date)) // 转换日期
          }
          this.setData({
            strategies: datas
          });
          console.log(this.data.materials)
        }
      })
      activities_list.get({
        success: res => {
          var datas = res.data;
          for (var i = 0; i < datas.length; i++) {
            datas[i].date = this.date_parser('' + this.dateToMs(datas[i].date)) // 转换日期
          }
          this.setData({
            activities: datas
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
    wx.showLoading({
      title: '搜索中...',
    })
    materials_list.where(db.command.or([
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

    activities_list.where(db.command.or([
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
          activities: datas
        })
        console.log(that.data.materials)
      }
    })

    strategies_list.where(db.command.or([
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
          strategies: datas
        })
        console.log(that.data.materials)
      }
    })
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