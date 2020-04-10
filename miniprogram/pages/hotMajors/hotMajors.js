var sortRule = false;
const db = wx.cloud.database(); //连接数据库
const major_list = db.collection("hotMajors");
Page({
  /**
   * 页面的初始数据
   */
  data: {
    show: false, // 第一层弹出
    showMore: false, // 第二层弹出
    mainActiveIndex: 0,
    activeId: [],
    max: 100,
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
            text: '会计',
            // 禁用选项
            // disabled: true
          },
          {
            id: 2,
            text: '金融/保险/银行',
            
          },
          {
            id: 3,
            text: '人力资源',

          },
          {
            id: 4,
            text: '市场营销/广告',

          }
        ]
      },
      {
        text: '国家地址',
        children: [
          {
            id: 1,
            text: '计算机科学'

          },
          {
            id: 2,
            text: '信息技术'
          }
        ]
      },
      {
        text: '学科领域',
        children: [
          {
            id: 20,
            text: '商科/经济'

          },
          {
            id: 21,
            text: '人文学科'
          },
          {
            id: 22,
            text: '工程'
          },
          {
            id: 23,
            text: '计算机'
          },
          {
            id: 24,
            text: '教育学'
          },
          {
            id: 25,
            text: '艺术设计'
          },
          {
            id: 26,
            text: '建筑'
          },
          {
            id: 27,
            text: '医学'
          },
          {
            id: 28,
            text: '法律'
          },
          {
            id: 29,
            text: '生命科学'
          },
          {
            id: 30,
            text: '社会科学'
          },
          {
            id: 31,
            text: '自然科学'
          },
          {
            id: 32,
            text: '音乐'
          }

        ]
      }
    ],
    hotMajorsList:[],
    majorsList: [
      {
        uni_icon: "../../images/unis/UoM.png",
        major_name: "计算机科学",
        uni_name_eng: "The University of Melbourne",
        rank: 38,
        tuition: [
          40000, 50000
        ],
        length: 2,
        requirements: [
          58, 6.5
        ],
        acception: 92.3,
        agency_icon: "",
        counter:1,
        migratable: true,
        tag: "ANU"
      },
      {
        uni_icon: "../../images/unis/UoM.png",
        major_name: "海事工程",
        uni_name_eng: "The University of Adelaide",
        rank: 108,
        tuition: [
          30000, 48000
        ],
        length: 2,
        requirements: [
           58, 6.5
        ],
        acception: 91.5,
        agency_icon: "",
        counter: 12,
        migratable: true,
        tag: "ANU"
      },
      {
        uni_icon: "../../images/unis/UoM.png",
        major_name: "电子和电气工程",
        uni_name_eng: "Australian National University",
        rank: 30,
        tuition: [
          37000, 48000
        ],
        length: 2,
        requirements: [
          58, 6.5
        ],
        acception: 92.3,
        agency_icon: "",
        counter: 9,
        migratable: false,
        tag: "G8"
      },
      {
        uni_icon: "../../images/unis/UoM.png",
        major_name: "化学工程",
        uni_name_eng: "The University of Sydney",
        rank: 57,
        tuition: [
          42000, 48000
        ],
        length: 2,
        requirements: [
          58, 6.5
        ],
        acception: 98.1,
        agency_icon: "",
        counter: 10,
        migratable: true,
        tag: "IRU"
      }
    ]
  },
  /**
   * 小程序页面加载完成
   */
  onLoad: function(options){
    major_list.get({
      success: res => {
        this.setData({
          hotMajorsList: res.data
        })
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

    if(activeId >= 20){
      this.setData({ showMore: true })
    }
  },
  
  resetAll: function() {
    this.setData({
      activeId: []
    })
  },

  popUpShow: function() {
    this.setData({
      show: true
    })
  },
  /**
   * 第二层弹出框关闭
   */
  back: function(){
    this.setData({ showMore: false });
  },
  popUpClose: function() {
    this.setData({
      show: false
    })
  },

  /**
   * 排序功能
   */
  mySort: function (e) {
    //property 根据什么排序
    var property = e.currentTarget.dataset.property;
    var self = this;
    var majorsList = self.data.hotMajorsList;
    sortRule = !sortRule; // 正序倒序
    if(sortRule) { 
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
      hotMajorsList: majorsList.sort(self.compare(property, sortRule))
    })
  },

  compare: function (property, bol) {
    return function (a, b) {
      var value1 = a[property];
      var value2 = b[property];
      if (property == 'major_name') {
        if(bol){
          return value1.localeCompare(value2);
        } else {
          return value2.localeCompare(value1);
        }
      } if(property == 'tuition') {
        if (bol) {
          return value1["min"] - value2["min"];
        } else {
          return value2["min"] - value1["min"];
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