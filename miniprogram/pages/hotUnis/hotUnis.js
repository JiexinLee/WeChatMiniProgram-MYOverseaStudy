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
    unis: [{"_id":"7REK0dekv0maaU8oWVC8tAk0V9gAm8ZTrp6sWpdvGfDunwQ2","uni_name":"阿德莱德大学","uni_name_eng":"The University of Adelaide","tuition":{"min":40000,"max":50000},"eng_requirement":{"bachelor":{"pte":58,"ielts":6.5},"master":{"pte":65,"ielts":7}},"location":"Adelaide","counter":0,"acception":90.2,"tag":["ANU","G8"],"migratable":true,"uni_icon":"../../images/unis/UoM.png","uni_rank":108.0,"agency_icon":"","introduction":{}},
    {"_id":"uFHcNASWDDCUXjeKWh4OheINxuj3AO55TjlHwc8RlMGBzHrj","uni_name":"墨尔本大学","uni_name_eng":"The University of Melbourne","tuition":{"min":40000,"max":50000},"eng_requirement":{"bachelor":{"pte":58,"ielts":6.5},"master":{"pte":65,"ielts":7}},"location":"Melbourne","counter":0,"acception":90.2,"tag":["ANU","G8"],"migratable":true,"uni_icon":"../../images/unis/UoM.png","uni_rank":38,"agency_icon":"","introduction":{}},
    {"_id":"s4zfJgoyRhZftgnqON8mLUiFB8KhTSi6asW4V5ZEDSCJZX6C","uni_name":"悉尼大学","uni_name_eng":"The University of Sydney","tuition":{"min":42000,"max":50000},"eng_requirement":{"bachelor":{"pte":58,"ielts":6.5},"master":{"pte":65,"ielts":7}},"location":"Sydney","counter":0,"acception":97.2,"tag":["ANU","G8"],"migratable":true,"uni_icon":"../../images/unis/UoM.png","uni_rank":57,"agency_icon":"","introduction":{}},
    {"_id":"DnuMLmvSf20UFDzr1CAFDzncIWmePia8bSprdGAzcLRqCrti","uni_name":"澳洲国立大学","uni_name_eng":"Australian National University","tuition":{"min":37000,"max":40000},"eng_requirement":{"bachelor":{"pte":58,"ielts":6.5},"master":{"pte":65,"ielts":7}},"location":"Melbourne","counter":10,"acception":90.2,"tag":["ANU","G8"],"migratable":true,"uni_icon":"../../images/unis/UoM.png","uni_rank":18,"agency_icon":"","introduction":{}}
    ],
    originalUnis: [{"_id":"7REK0dekv0maaU8oWVC8tAk0V9gAm8ZTrp6sWpdvGfDunwQ2","uni_name":"阿德莱德大学","uni_name_eng":"The University of Adelaide","tuition":{"min":40000,"max":50000},"eng_requirement":{"bachelor":{"pte":58,"ielts":6.5},"master":{"pte":65,"ielts":7}},"location":"Adelaide","counter":0,"acception":90.2,"tag":["ANU","G8"],"migratable":true,"uni_icon":"../../images/unis/UoM.png","uni_rank":108.0,"agency_icon":"","introduction":{}},
    {"_id":"uFHcNASWDDCUXjeKWh4OheINxuj3AO55TjlHwc8RlMGBzHrj","uni_name":"墨尔本大学","uni_name_eng":"The University of Melbourne","tuition":{"min":40000,"max":50000},"eng_requirement":{"bachelor":{"pte":58,"ielts":6.5},"master":{"pte":65,"ielts":7}},"location":"Melbourne","counter":0,"acception":90.2,"tag":["ANU","G8"],"migratable":true,"uni_icon":"../../images/unis/UoM.png","uni_rank":38,"agency_icon":"","introduction":{}},
    {"_id":"s4zfJgoyRhZftgnqON8mLUiFB8KhTSi6asW4V5ZEDSCJZX6C","uni_name":"悉尼大学","uni_name_eng":"The University of Sydney","tuition":{"min":42000,"max":50000},"eng_requirement":{"bachelor":{"pte":58,"ielts":6.5},"master":{"pte":65,"ielts":7}},"location":"Sydney","counter":0,"acception":97.2,"tag":["ANU","G8"],"migratable":true,"uni_icon":"../../images/unis/UoM.png","uni_rank":57,"agency_icon":"","introduction":{}},
    {"_id":"DnuMLmvSf20UFDzr1CAFDzncIWmePia8bSprdGAzcLRqCrti","uni_name":"澳洲国立大学","uni_name_eng":"Australian National University","tuition":{"min":37000,"max":40000},"eng_requirement":{"bachelor":{"pte":58,"ielts":6.5},"master":{"pte":65,"ielts":7}},"location":"Melbourne","counter":10,"acception":90.2,"tag":["ANU","G8"],"migratable":true,"uni_icon":"../../images/unis/UoM.png","uni_rank":18,"agency_icon":"","introduction":{}}
    ],
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
            text: '61-100'
          },
          {
            id: 21,
            text: '101-150'
          },
          {
            id: 22,
            text: '151-200'
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
          unis: datas,
          originalUnis: datas
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
  //点击 重置
  resetAll: function () {
    wx.showToast({
      title: '资料在路上..',
      icon: 'loading',
      duration: 1200
    })
    console.log(this.data.originalUnis)
    this.setData({
      unis: this.data.originalUnis,
      activeId: []
    })
  },
  // 点击 筛选
  filterData: function () {
    wx.showToast({
      title: '资料在路上..',
      icon: 'loading',
      duration: 1200
    })
    console.log(this.data.activeId)
    if (this.data.activeId.length == 0) {
      this.setData({
        unis: originalUnis
      })
    } else {
      this.setData({
        unis: []
      })
      let tempList = this.data.activeId
      let backup = this.data.originalUnis
      for (let val in this.data.activeId) {
        if (tempList[val] >= 1 && tempList[val] <= 7) {
          // gao bu liao
        } 
        else if (tempList[val] >= 8 && tempList[val] <= 17) {
          switch (tempList[val]) {
            case 8:
              for (let item in backup) {
                if (backup[item].location == "Sydney") {
                  this.data.unis.push(backup[item])
                }
              }
              break
            case 9:
              for (let item in backup) {
                if (backup[item].location == "Melbourne") {
                  this.data.unis.push(backup[item])
                }
              }
              break
            case 10:
              for (let item in backup) {
                if (backup[item].location == "Brisbane") {
                  this.data.unis.push(backup[item])
                }
              }
              break
            case 11:
              for (let item in backup) {
                if (backup[item].location == "Adelaide") {
                  this.data.unis.push(backup[item])
                }
              }
              break
            case 12:
              for (let item in backup) {
                if (backup[item].location == "Darwin") {
                  this.data.unis.push(backup[item])
                }
              }
              break
            case 13:
              for (let item in backup) {
                if (backup[item].location == "Perth") {
                  this.data.unis.push(backup[item])
                }
              }
              break
            case 14:
              for (let item in backup) {
                if (backup[item].location == "Tasmania") {
                  this.data.unis.push(backup[item])
                }
              }
              break
            case 15:
              for (let item in backup) {
                if (backup[item].location == "Canberra") {
                  this.data.unis.push(backup[item])
                }
              }
              break
            case 16:
              for (let item in backup) {
                if (backup[item].location == "New Zealand") {
                  this.data.unis.push(backup[item])
                }
              }
              break
            case 17:
              for (let item in backup) {
                if (backup[item].location == "America") {
                  this.data.unis.push(backup[item])
                }
              }
              break
          }
        } 
        else { 
          switch (tempList[val]) {
            case 18:
              for (let item in backup) {
                if (backup[item].uni_rank >= 1 && backup[item].uni_rank <= 30) {
                  this.data.unis.push(backup[item])
                }
              }
              break
            case 19:
              for (let item in this.data.originalUnis) {
                if (backup[item].uni_rank >= 31 && backup[item].uni_rank <= 60) {
                  this.data.unis.push(backup[item])
                }
              }
              break
            case 20:
              for (let item in this.data.originalUnis) {
                if (backup[item].uni_rank >= 61 && backup[item].uni_rank <= 100) {
                  this.data.unis.push(backup[item])
                }
              }
              break
            case 21:
              for (let item in this.data.originalUnis) {
                if (backup[item].uni_rank >= 101 && backup[item].uni_rank <= 150) {
                  this.data.unis.push(backup[item])
                }
              }
              break
            case 22:
              for (let item in this.data.originalUnis) {
                if (backup[item].uni_rank >= 151 && backup[item].uni_rank <= 200) {
                  this.data.unis.push(backup[item])
                }
              }
              break
            case 23:
              for (let item in this.data.originalUnis) {
                if (backup[item].uni_rank > 200) {
                  this.data.unis.push(backup[item])
                }
              }
              break
          }
        }
        this.setData({
          unis: this.data.unis
        })
      }
    }
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