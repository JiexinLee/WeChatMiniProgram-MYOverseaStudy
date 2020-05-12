var app = getApp();
var db = app.globalData.db;
const qna_list = db.collection("qAndA");
Page({
  data: {
    activeName: [],
    questions:[],
    searchValue: '',
    questionsValue: '',
    userAvatar: ''
  },
  onChange(event) {
    this.setData({
      activeName: event.detail
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    qna_list.get({
      success: res => {
        var datas = res.data;
        this.setData({
          questions: datas
        });
      }
    })
  },

  /**
   * 点击搜索的时候查找
   */
  searchClick: function () {
    var that = this;
    wx.showLoading({
      title: '搜索中...',
    })
    qna_list.where(db.command.or([
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
        that.setData({
          questions: datas
        })
        console.log(that.data.questions)
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
      qna_list.get({
        success: res => {
          var datas = res.data;
          this.setData({
            questions: datas
          });
        }
      })
    }
  },

  sendingQuestion: function (e) {
    wx.showLoading({
      title: '发布中...',
    })
    var that = this;
    console.log(e.detail.userInfo.avatarUrl)
    this.setData({
      userAvatar: e.detail.userInfo.avatarUrl
    })
    qna_list.add({
      data: {
        title: "请问南澳大学的成绩要求多少?",
        responser: "",
        answer: "",
        icon: that.data.userAvatar
      },
      success: res => {
        qna_list.get({
          success: res => {
            wx.hideLoading();
            var datas = res.data;
            this.setData({
              questions: datas
            });
          }
        })
      }
    })
  }

})