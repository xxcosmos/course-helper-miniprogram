const api = require('../../common/api.js')
const utils = require('../../common/utils.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    course: null,
    teacherList: null,
    activeNames: ['1']
  },

  onChange:function(e){
    this.setData({
      activeNames: e.detail
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let that = this
    let courseCode = options.courseCode
    let token = wx.getStorageSync("token")
    wx.request({
      url: api.Course + "/" + courseCode,
      method: "GET",
      header: {
        "authorization": token,
      },
      success: res => {
        if(res.data.code==200){
          console.log(res.data.data)
          that.setData({
            course: res.data.data.course,
            teacherList: res.data.data.teacherList
          })
        }else{
          if (utils.IsSignExpired(res.data.message)) {
            utils.Login()
          } else {
            utils.ErrorToast(res.data.message)
          }
        }
      }
    })
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

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})