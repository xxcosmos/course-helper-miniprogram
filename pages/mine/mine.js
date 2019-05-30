// pages/mine/mine.js
const api = require('../../common/api.js');
const utils = require('../../common/utils.js');
import Toast from '../../component/zanui/toast/toast';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {
      avatarUrl: null,
      nickname: '',
      gender: 0,
      state: -1,
      studentId: null,

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
  
  myGetUserInfo() {
    Toast.loading("正在加载");
    utils.GetUserInfo();
    let userInfo = wx.getStorageSync("userInfo");
    if (!utils.IsNull(userInfo)) {

      this.setData({
        userInfo: userInfo
      })
      Toast.clear()
    }
    console.log(userInfo)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
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

    this.myGetUserInfo()


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
    wx.stopPullDownRefresh();
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