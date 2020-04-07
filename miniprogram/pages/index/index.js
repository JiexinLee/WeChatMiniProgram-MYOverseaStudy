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
        image_src: "../../images/swiper/swiper3.png"
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
        url: "/pages/hotUnis/hotUnis",
        image_src: "../../images/categoryList/version1/uni.png",
        image_icon: "../../images/categoryList/version2/xuexiao.png"
      },
      {
        id: 2,
        name: "热门专业",
        url: "/pages/hotMajors/hotMajors",
        image_src: "../../images/categoryList/version1/major.png",
        image_icon: "../../images/categoryList/version2/zhuanye.png"
      },
      {
        id: 3,
        name: "留学频道",
        url: "/pages/studyingChannel/studyingChannel",
        image_src: "../../images/categoryList/version1/strategy.png",
        image_icon: "../../images/categoryList/version2/pinggu.png"
      },
      {
        id: 4,
        name: "移民评估",
        url: "/pages/majors/majors",
        image_src: "../../images/categoryList/version1/assessment.png",
        image_icon: "../../images/categoryList/version2/gonglve.png"
      },
      {
        id: 5,
        name:"英语考试",
        url: "/pages/engExam/engExam",
        image_src: "../../images/categoryList/version1/rank.png",
        image_icon: "../../images/categoryList/version2/jijing.png"
      },
      {
        id: 6,
        name: "新闻资讯",
        url: "/pages/news/news",
        image_src: "../../images/categoryList/version1/immi.png",
        image_icon: "cloud://ljxxxlee-7vbgo.6c6a-ljxxxlee-7vbgo-1300914792/images/categoryList/version2/zixun.png"
      },
      {
        id: 7,
        name: "留学Q&A",
        url: "/pages/QnA/QnA",
        image_src: "../../images/categoryList/version1/forum.png"
      },
      {
        id: 8,
        name: "视频留学",
        url: "/pages/videoStudy/videoStudy",
        image_src: "../../images/categoryList/version1/tiktok.png"
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
  }
  
})