var app = getApp();
var db = app.globalData.db;
const qna_list = db.collection("qAndA");
Page({
  
  data: {
    activeName: [],
    questions:[{"_id":"05f2c36f5eb93a0a0090f48d715be51e","title":"请问悉尼大学雅思成绩要求多少？","icon":"../../../../images/testimg.jpeg","answer":"大学的雅思要求总分6.5分哦大学的雅思要求总分6.5分哦大学的雅思要求总分6.5分哦大学的雅思要求总分6.5分哦大学的雅思要求总分6.5分哦","responser":"留学科代表"},
    {"_id":"05f2c36f5eb93a510090fd07171d51df","title":"请问阿德莱德大学雅思成绩要求多少啦啦啦啦啦啦啦啦啦啦？","answer":"大学的雅思要求总分6.5分哦","icon":"../../../../images/testimg.jpeg","responser":"留学科代表"},
    {"_id":"5e847ab25ebc14a700da157b077ec049","responser":"","answer":"","icon":"https://wx.qlogo.cn/mmopen/vi_32/PiajxSqBRaEKv8phdBk9cpEia8raQ2MBibpFIuCKvfFcbU0ujHzG8SrnY49ciankVp1szOx2PaEAJic4Ql8SicOlkJ6A/132","_openid":"ojT_d4iMS2v88-weqFFlvbQjX8ZQ","title":"读南澳大学需要什么条件吗？"},
    {"_id":"37e26adb5ec26e9400f5a9103de67245","_openid":"ojT_d4iMS2v88-weqFFlvbQjX8ZQ","title":"请问我还需要问什么问题？","responser":"","answer":"","icon":"https://wx.qlogo.cn/mmopen/vi_32/PiajxSqBRaEKv8phdBk9cpEia8raQ2MBibpFIuCKvfFcbU0ujHzG8SrnY49ciankVp1szOx2PaEAJic4Ql8SicOlkJ6A/132"},
    {"_id":"1b64dd7b5f67f626002cee1c103923c7","_openid":"ojT_d4id_bp6gCgDUg_7kxJzNTOI","answer":"","icon":"https://thirdwx.qlogo.cn/mmopen/vi_32/Ct8bt215tuqia5bMib0AgeuVYGTQwKGCTt79oLUq2SLgV49fEFGdIKexPqJI5Q2LoLmpH5am0kBqg4fAWMFdgJtA/132","responser":"","title":"测试问题"},
    {"_id":"d52d5a735fa77b2f0056ea1173a0ba35","title":"这是一个测试问题？","_openid":"ojT_d4iMS2v88-weqFFlvbQjX8ZQ","answer":"","icon":"https://thirdwx.qlogo.cn/mmopen/vi_32/PiajxSqBRaEKv8phdBk9cpEia8raQ2MBibpFIuCKvfFcbU0ujHzG8SrnY49ciankVp1szOx2PaEAJic4Ql8SicOlkJ6A/132","responser":""},
    {"_id":"38597c165fa8c776008421a655bff946","icon":"https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTKic4ttq8hHdgx2IbgCdQDXApa85EHbMvNF9YmHT1aLGIaZ0bUlSkhn3nGylicmy9oEgfLcibUaUibhhw/132","responser":"","title":"测试","_openid":"ojT_d4ksCirdulqDWI9aWe2_9KGc","answer":""}],
    searchValue: '',
    questionsValue: '',
    userAvatar: '',
    typingValue: ''
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

  typingValueChanging: function(e) {
    this.setData({
      typingValue: e.detail
    })
  },

  sendingQuestion: function (e) {
    wx.showLoading({
      title: '发布中...',
    })
    var that = this;
    this.setData({
      userAvatar: e.detail.userInfo.avatarUrl
    })
    qna_list.add({
      data: {
        title: that.data.typingValue,
        responser: "",
        answer: "",
        icon: that.data.userAvatar
      },
      success: res => {
        qna_list.get({
          success: res => {
            wx.showToast({
              title: '发布成功!',
            });
            var datas = res.data;
            this.setData({
              questions: datas,
              typingValue: ''
            });
          },
          fail: res => {
            wx.showToast({
              title: '发布失败!',
              image: "../../../../images/error.png"
            });
          }
        })
      }
    })
  }

})