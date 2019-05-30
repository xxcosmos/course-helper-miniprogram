let api = require('../../common/api');
let utils = require('../../common/utils');
import Toast from '../../component/zanui/toast/toast';

Page({

  data: {
    autoplay: true,
    indicatorDots: true,
    current: 0,
    imgHeights: [],
    imgUrls: [
      api.CosURL + '/d2a54f254d87419eafde7ffd22364fbb.png',
      api.CosURL + '/banner2.png',
      api.CosURL + '/banner3.png'
    ],
    courseList: null,
    pageInfo: {
      hasNextPage: true,
      nextPage: 1,
      pageSize: 20
    },
    index: 0,
  },
  onSwip: function(e) {
    this.setData({
      current: e.detail.current
    })

  },

  onTapSwiper:function(e){
    let current = this.data.current
    if(current==2){
      wx.navigateTo({
        url: '../about/about',
      })
    }
  },
  imageLoad: function(e) {
    //获取图片真实宽度
    let imgWidth = e.detail.width
    let imgHeight = e.detail.height
    //宽高比
    let ratio = imgWidth / imgHeight
    //计算的高度值
    var viewHeight = 750 / ratio;
    imgHeight = viewHeight
    var imgHeights = this.data.imgHeights
    //把每一张图片的高度记录到数组里
    imgHeights.push(imgHeight)
    this.setData({
      imgHeights: imgHeights,
    })
  },
  toSearch: function(e) {
    wx.navigateTo({
      url: '../search/search',
    })
  },

  goToCourse: function(e) {
    wx.setStorageSync('courseCode', e.currentTarget.dataset.code);

    wx.navigateTo({
      url: "../course/course",
    })
  },

  getFilterCourse(params = {}) {
    const sort = params.sort || 'time';
    const query = params.query || '必修';
    const q = `${query}+sort=${sort}`;
    const data = Object.assign(params);
    console.log(data)

  },

  getRecommendCourse: function(e) {
    Toast.loading("正在加载");
    let that = this;
    let token = wx.getStorageSync('token');
    let response = null;
    if (utils.IsNull(token)) {
      utils.GetCourseList(api.RecommendCourse, that.getCourseListCallback);
    } else {
      utils.GetRecommendCourseListByAuth(that.getCourseListCallback);
    }

  },
  getHottestCourse: function(e) {
    Toast.loading("正在加载");
    let that = this;
    utils.GetCourseList(api.HottestCourse, that.getCourseListCallback);

  },
  getCourseListCallback(response) {
    let that = this;
    that.setData({
      courseList: response
    })
    Toast.clear();
  },
  getAllCourse: function() {
    Toast.loading("正在加载");

    let that = this;
    let data = {
      page: that.data.pageInfo.nextPage,
      size: that.data.pageInfo.pageSize
    };
    utils.RequestWithDataNoAuth('GET', api.Course, data, that.getAllCourseCallback);


  },
  getAllCourseCallback(response) {
    let that = this
    if (response == null) {
      Toast.clear();
      return
    }
    if (that.data.courseList == null) {
      that.setData({
        courseList: response.list,
        pageInfo: response
      })
    } else {
      that.setData({
        courseList: that.data.courseList.concat(response.list),
        pageInfo: response
      })
    }
    Toast.clear();
  },

  onClick: function(e) {
    let index = e.detail.index;
    this.setData({
      index: index
    });
    if (index === 0) {
      this.getHottestCourse()
    } else if (index === 1) {
      this.getRecommendCourse()
    } else if (index === 2) {
      this.setData({
        courseList: null
      });
      this.getAllCourse()
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getHottestCourse()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
    if (this.data.index == 0) {
      this.getHottestCourse()
      wx.stopPullDownRefresh();
      return
    }
    if (this.data.index == 1) {
      this.getRecommendCourse()
      wx.stopPullDownRefresh();
      return
    }
    if (this.data.pageInfo.hasNextPage && this.data.index === 2) {
      this.getAllCourse()
      wx.stopPullDownRefresh();
    }
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    console.log(this.data.pageInfo.hasNextPage, this.data.index)
    if (this.data.pageInfo.hasNextPage && this.data.index === 2) {
      this.getAllCourse()
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
});