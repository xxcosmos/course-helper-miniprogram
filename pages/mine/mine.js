// pages/mine/mine.js
const api = require('../../common/api.js');
const utils = require('../../common/utils.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {
      avatarUrl: 'https://inwust-1251756217.cos.ap-chengdu.myqcloud.com/654b2f4b797b4b91b5fdc6ae774f9a10.PNG',
      nickname: '',
      gender: 0,
      state: -1,
      studentId: "333333333333",

    },
    major: '工业设计'
  },
 
  goToAuth(e) {
    if(this.data.userInfo.state==-1){
      wx.navigateTo({
        url: '../login/login',
      })
      return 
    }
    if (this.data.userInfo.state === 0) {
      wx.navigateTo({
        url: '../auth/auth',
      })
    }
  },
  goToModify(e) {
    wx.navigateTo({
      url: '../modify/modify'
    })
  },
  myGetUserInfo() {
    utils.GetUserInfo();
    let userInfo = wx.getStorageSync("userInfo");
    if (!utils.IsNull(userInfo)) {

      this.setData({
        userInfo: userInfo
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.myGetUserInfo()
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
    this.myGetUserInfo()
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
});