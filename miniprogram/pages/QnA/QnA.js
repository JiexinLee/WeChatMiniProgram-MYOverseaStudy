
Page({
  data: {
    activeName: [],
    qalist: [
      {
        title: "请问悉尼大学雅思多少要求？",
        answer: "留学课代表: balabalablablablablbalablbalbalbalbalbalbalbalbalbalba",
        icon: "../../../../images/testimg.jpeg"
      },
      {

      },
      {

      },
      {

      }
    ]
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

  }
})