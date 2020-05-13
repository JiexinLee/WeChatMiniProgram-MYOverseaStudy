
Page({
  data: {
    showModal: false,
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
  onLoad: function (options) {

  },
  onChange(event) {
    this.setData({
      activeName: event.detail
    });
  },
  showDialogBtn: function() {
    this.setData({
      showModal: true
    })
    console.log(this.data.showModal);
  },
  

})