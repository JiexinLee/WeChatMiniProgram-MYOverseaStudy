// components/searchBar/searchBar.js

Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    hotSearchWordsList: [
      {
        name: "澳洲八大"
      },
      {
        name: "新西兰留学"
      },
      {
        name: "悉尼大学"
      }
    ]
  },

  /**
   * 组件的方法列表
   */
  methods: {
    /**
     * 绑定点击事件
     */

    chooseFromAlbum() {
      //系统apis， 用户选择图片
      wx.chooseImage({
        success: (res) => {
          console.log(res)
        },
      })
    },
  

    scan: function(){
    wx.scanCode({ 
      success (res) {
        console.log(res)
      },
    })
   },


  typingValueChanging: function(e) {
    this.setData({
      typingValue: e.detail
    })
  },
  },
  
})
