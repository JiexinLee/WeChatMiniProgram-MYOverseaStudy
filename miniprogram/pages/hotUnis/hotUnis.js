const db = wx.cloud.database(); //连接数据库
const unilist = db.collection("hotUnis");
var sortRule = false;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    show: false,
    mainActiveIndex: 0,
    activeId: [],
    max: 100,
    unis: [],
    items: [
      {
        // 导航名称
        text: '学历水平',
        // 禁用选项
        disabled: false,
        // 该导航下所有的可选项
        children: [
          {
            // id，作为匹配选中状态的标识
            id: 1,
            // 名称
            text: '私立中学',
            // 禁用选项
            // disabled: true
          },
          {
            id: 2,
            text: '技能证书',

          },
          {
            id: 3,
            text: '预科课程',

          },
          {
            id: 4,
            text: '文凭课程',

          },
          {
            id: 5,
            text: '快捷课程',

          },
          {
            id: 6,
            text: '本科课程',

          }, 
          {
            id: 7,
            text: '硕士课程',

          }
        ]
      },
      {
        text: '国家地区',
        children: [
          {
            id: 8,
            text: '澳洲悉尼'

          },
          {
            id: 9,
            text: '澳洲墨尔本'
          },
          {
            id: 10,
            text: '澳洲布里斯班'
          },
          {
            id: 11,
            text: '澳洲阿德莱德'
          },
          {
            id: 12,
            text: '澳洲达尔文'
          },
          {
            id: 13,
            text: '澳洲佩斯'
          },
          {
            id: 14,
            text: '澳洲塔斯马尼亚'
          },
          {
            id: 15,
            text: '澳洲堪培拉'
          },
          {
            id: 16,
            text: '新西兰'
          }, 
          {
            id: 17,
            text: '美国'
          }

        ]
      },
      {
        text: '世界排名',
        children: [
          {
            id: 18,
            text: '1-30'

          },
          {
            id: 19,
            text: '31-60'
          },
          {
            id: 20,
            text: '60-100'
          },
          {
            id: 21,
            text: '101-150'
          },
          {
            id: 22,
            text: '150-200'
          },
          {
            id: 23,
            text: '200+'
          }
        ]
      }
    ],
  },

  /**
   * 页面初始化
   */
  onLoad: function(options){
    unilist.get({
      success: res => {
        var datas = res.data;
        
        this.setData({
          unis: datas
        });
        console.log(this.data.unis)
      }
    })
  },

  onClickNav({ detail = {} }) {
    this.setData({
      mainActiveIndex: detail.index || 0
    });
  },

  onClickItem({ detail = {} }) {
    const { activeId } = this.data;

    const index = activeId.indexOf(detail.id);
    if (index > -1) {
      activeId.splice(index, 1);
    } else {
      activeId.push(detail.id);
    }

    this.setData({ activeId });
  },

  resetAll: function () {
    this.setData({
      activeId: []
    })
  },

  popUpShow: function () {
    this.setData({
      show: true
    })
  },

  popUpClose: function () {
    this.setData({
      show: false
    })
  },

  // 点击 筛选
  filterData: function () {
    wx.showToast({
      title: '资料在路上..',
      icon: 'loading',
      duration: 1200
    })
  },
  /**
   * 转到细节
   */
  uniDetail: function (event) {
    var itemNo = event.currentTarget.id;
    console.log(itemNo)
    wx.navigateTo({
      url: './hotUniItem/hotUniItem?itemNo=' + itemNo,
    })
    
  },
  // 点击 排序功能
  mySort: function (e) {
    //property 根据什么排序
    var property = e.currentTarget.dataset.property;
    var self = this;
    var universitiesList = self.data.unis;
    sortRule = !sortRule; // 正序倒序
    if (sortRule) {
      wx.showToast({
        title: "▲",
        duration: 1000,
        icon: 'none'
      })
    } else {
      wx.showToast({
        title: "▼",
        duration: 1000,
        icon: 'none'
      })
    }
    self.setData({
      unis: universitiesList.sort(self.compare(property, sortRule))
    })
  },

  compare: function (property, bol) {
    return function (a, b) {
      var value1 = a[property];
      var value2 = b[property];
      if (property == 'uni_name') {
        if (bol) {
          return value1.localeCompare(value2);
        } else {
          return value2.localeCompare(value1);
        }
      } if (property == 'tuition') {
        if (bol) {
          return value1[0] - value2[0];
        } else {
          return value2[0] - value1[0];
        }
      } else {
        if (bol) {
          return value1 - value2;
        } else {
          return value2 - value1;
        }
      }
    }
  }
})