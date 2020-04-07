//引入index.js 这个代码
import { request } from "../../request/index.js";

Page({
  
  /**
   * 页面的初始数据
   */
  data: {

    /**
     * 轮播图数据
     */
    swiperList:[
      {
        image_src: "../../images/swiper/swiper1.png"
      },

      {
        image_src: "../../images/swiper/swiper2.png"
      },
      {
        image_src: "https://ichef.bbci.co.uk/news/410/cpsprodpb/BF0D/production/_106090984_2e39b218-c369-452e-b5be-d2476f9d8728.jpg"
      }
    ],

    /**
     * 分类导航
     */
    cateList: [
      {
        id: 1,
        name: "院校大全",
        image_src: "../../images/categoryList/uni.png"
      },
      {
        id: 2,
        name: "热门专业",
        image_src: "../../images/categoryList/major.png"
      },
      {
        id: 3,
        name: "留学频道",
        image_src: "../../images/categoryList/strategy.png"
      },
      {
        id: 4,
        name: "移民评估",
        image_src: "../../images/categoryList/assessment.png"
      },
      {
        id: 5,
        name:"英语考试",
        image_src: "../../images/categoryList/rank.png"
      },
      {
        id: 6,
        name: "新闻资讯",
        image_src: "../../images/categoryList/immi.png"
      },
      {
        id: 7,
        name: "互助论坛",
        image_src: "../../images/categoryList/forum.png"
      },
      {
        id: 8,
        name: "留学生活",
        image_src: "../../images/categoryList/tiktok.png"
      }
    ],

    /**
     * 热门学校数据
     */
    HotUniList: [
      {
        
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 1. 获取轮播图数据 get the swiper data from APIs
    // wx.request({
    //   url: '',
    //   success: (result) => {
    //     this.setData
    //   }
    // })
    this.getSwiperList();
    this.getCateList();

  },

  getSwiperList(){
      /**
       * 使用以下代码来获取apis数据!!
       */
    // request({url: ""})
    // .then( result => {
    //   this.setData({
    //     swiperList: result.data
    //   })
    // })
    // .then( result => {
    //   this.setData({
    //     ...
    //   })
    // })
  },
  abcd () {
    console.log('....')
  },
  getCateList() {

  }
  
})