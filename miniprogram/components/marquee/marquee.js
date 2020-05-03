
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    text: {
      type: String,
      value: 'ILoveEwei'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    marqueePace: 1,
    marqueeDistance: 0,
    size: 24,
    orientation: 'left',
    interval: 40
  },

  /**
   * 组件的方法列表
   */
  methods: {
    _scrolling: function () {
      var timer = setInterval(() => {
        if (-this.data.marqueeDistance < this.data.length) {
          this.setData({
            marqueeDistance: this.data.marqueeDistance - this.data.marqueePace
          })
        } else {
          clearInterval(timer);
          this.setData({
            marqueeDistance: this.data.windowWidth
          });
          this._scrolling();
        }
      }, this.data.interval);
    }
  },

  created: function () {
    var length = this.data.text.length * this.data.size;
    var windowWidth = wx.getSystemInfoSync().windowWidth*0.55;
    this.setData({
      length: length,
      windowWidth: windowWidth
    });
    if(length > windowWidth) {
      console.log("l: "+ length + "  windwidth: "+ windowWidth)
      this._scrolling();
    }
  }
})
