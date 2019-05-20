const api = require('../../common/api.js')
const utils = require('../../common/utils.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    courseList: null,
    focus: true
  },
  
  onCancel: function(e){
    wx.navigateBack({
      url: "../index/index"
    })
  },
  goToCourse: function(e){
    console.log(e)
    let courseCode = e.currentTarget.dataset.code
    wx.navigateTo({
      url: "../course/course"+"?courseCode="+courseCode,
    })
    
  },
  onSearch: function(e){
    let that = this
    let keyword = e.detail
    
    //处理为空的情况
    if(keyword == null){
      utils.ErrorToast("请输入搜索内容")
    }
    
    let token = wx.getStorageSync('token')
    //处理token为空的情况
    if(token==null||token==''){
      utils.Login()
    }else{
      wx.request({
        url: api.CourseSearch,
        method: "GET",
        header: {
          "authorization": token,
          'content-type': 'application/x-www-form-urlencoded'
        },
        data: {
          keyword: keyword
        },
        success: res => {
          if (res.data.code == 200) {
            that.setData({
              courseList: res.data.data
            })
          } else {
            if (utils.IsSignExpired(res.data.message)) {
              utils.Login()
            } else {
              utils.ErrorToast(res.data.message)
            }
          }
        },
        fail: res => {
          utils.ErrorToast("网络请求失败，请稍后再试")
        }
      })
    }

   

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})