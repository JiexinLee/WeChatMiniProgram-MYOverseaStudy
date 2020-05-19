import Toast from "@vant/weapp/toast";
var sortRule = false;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    showModal: false,
    search_detail:'',
    show: false,
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

    universitiesList: [
      {
        uni_icon: "../../images/unis/UoM.png",
        uni_name: "墨尔本大学",
        uni_name_eng: "The University of Melbourne",
        rank: 38,
        tuition: [
          40000, 50000
        ],
        location: "Melbourne",
        requirements: [
          58, 6.5
        ],
        acception: 92.3,
        agency_icon: "",
        counter: 1,
        migratable: true,
        tag: "ANU",
        show: true
      },
      {
        uni_icon: "../../images/unis/UoM.png",
        uni_name: "阿德莱德大学",
        uni_name_eng: "The University of Adelaide",
        rank: 108,
        tuition: [
          30000, 48000
        ],
        location: "Adelaide",
        requirements: [
          58, 6.5
        ],
        acception: 91.5,
        agency_icon: "",
        counter: 12,
        migratable: true,
        tag: "ANU",
        show: true
      },
      {
        uni_icon: "../../images/unis/UoM.png",
        uni_name: "澳洲国立大学",
        uni_name_eng: "Australian National University",
        rank: 30,
        tuition: [
          37000, 48000
        ],
        location: "Canberra",
        requirements: [
          58, 6.5
        ],
        acception: 92.3,
        agency_icon: "",
        counter: 9,
        migratable: false,
        tag: "G8",
        show: true
      },
      {
        uni_icon: "../../images/unis/UoM.png",
        uni_name: "悉尼大学",
        uni_name_eng: "The University of Sydney",
        rank: 57,
        tuition: [
          42000, 48000
        ],
        location: "Sydney",
        requirements: [
          58, 6.5
        ],
        acception: 98.1,
        agency_icon: "",
        counter: 10,
        migratable: true,
        tag: "IRU",
        show: true
      }
    ],
    showed_universities: [
      {
        uni_icon: "../../images/unis/UoM.png",
        uni_name: "墨尔本大学",
        uni_name_eng: "The University of Melbourne",
        rank: 38,
        tuition: [
          40000, 50000
        ],
        location: "Melbourne",
        requirements: [
          58, 6.5
        ],
        acception: 92.3,
        agency_icon: "",
        counter: 1,
        migratable: true,
        tag: "ANU",
        is_show: true
      },
      {
        uni_icon: "../../images/unis/UoM.png",
        uni_name: "阿德莱德大学",
        uni_name_eng: "The University of Adelaide",
        rank: 108,
        tuition: [
          30000, 48000
        ],
        location: "Adelaide",
        requirements: [
          58, 6.5
        ],
        acception: 91.5,
        agency_icon: "",
        counter: 12,
        migratable: true,
        tag: "ANU",
        is_show: true
      },
      {
        uni_icon: "../../images/unis/UoM.png",
        uni_name: "澳洲国立大学",
        uni_name_eng: "Australian National University",
        rank: 30,
        tuition: [
          37000, 48000
        ],
        location: "Canberra",
        requirements: [
          58, 6.5
        ],
        acception: 92.3,
        agency_icon: "",
        counter: 9,
        migratable: false,
        tag: "G8",
        is_show: true
      },
      {
        uni_icon: "../../images/unis/UoM.png",
        uni_name: "悉尼大学",
        uni_name_eng: "The University of Sydney",
        rank: 57,
        tuition: [
          42000, 48000
        ],
        location: "Sydney",
        requirements: [
          58, 6.5
        ],
        acception: 98.1,
        agency_icon: "",
        counter: 10,
        migratable: true,
        tag: "IRU",
        is_show: true
      }
    ],
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

  // 点击 搜索
  searchChange:function(e){
    this.data.search_detail = e.detail;
  },

  searchClick:function(e){
    this.setData({
      showed_universities:[]
    })
    var search_key = this.data.search_detail;
    var result_unis = [];

    for(var i=0; i < this.data.universitiesList.length; i++){

      
      var chinese_name = this.data.universitiesList[i].uni_name;
      var tag = this.data.universitiesList[i].tag;
      var location = this.data.universitiesList[i].location;

      if ( !( (chinese_name.indexOf(search_key)) ||
            (tag == search_key) ||
            (location == search_key)))  {
              this.setData({
                showModal: false
              })
              result_unis.push(this.data.universitiesList[i]);
              console.log(result_unis);
            }
            else {
              this.setData({
                showModal: true
              })
            }

    }
    //console.log(this.data.showed_universities);
    this.setData({
      showed_universities:result_unis
    })
  },

  showDetail: function(){
    wx.navigateTo({
      url: '../uniDetail/uniDetail',
    })
  },

  // 点击 排序功能
  mySort: function (e) {
    //property 根据什么排序
    var property = e.currentTarget.dataset.property;
    var self = this;
    var universitiesList = self.data.showed_universities;
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
      showed_universities: universitiesList.sort(self.compare(property, sortRule))
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