// components/floatBtn/floatBtn.js
var startPoint;
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
    buttonTop: 70,
    buttonLeft: 270,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    
    buttonStart : function (e) {
      startPoint = e.touches[0]
    },
  
    buttonMove : function (e) {
      var endPoint = e.touches[e.touches.length - 1]
      var translateX = endPoint.clientX - startPoint.clientX
      var translateY = endPoint.clientY - startPoint.clientY
      startPoint = endPoint
      var buttonTop = this.data.buttonTop + translateY
      var buttonLeft = this.data.buttonLeft + translateX
      //判断是移动否超出屏幕
      if (buttonLeft+50 >= this.data.windowWidth){
        buttonLeft = this.data.windowWidth-50;
      }
      if (buttonLeft<=0){
        buttonLeft=0;
      }
      if (buttonTop<=0){
        buttonTop=0
      }
      if (buttonTop + 50 >= this.data.windowHeight){
        buttonTop = this.data.windowHeight-50;
      }
      this.setData({
        buttonTop: buttonTop,
        buttonLeft: buttonLeft
      })
    },
    buttonEnd: function (e) {
    }
  }
})
