// pages/index/index.js
const api = require('../../common/api.js')
const utils = require('../../common/utils.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  onClickIcon: function(e) {
    utils.ErrorToast("就是输入你的姓名啦")
  },
  auth(e) {
    let name = e.detail.value.name
    let studentId = e.detail.value.studentId

    let that = this;
    let token = wx.getStorageSync('token')
    //处理token为空的情况
    if (utils.IsNull(token)) {
      utils.Login()
      return
    }

    wx.request({
      url: api.Bind,
      method: 'POST',
      header: {
        "authorization": token,
      },
      data: {
        studentName: name,
        studentId: studentId
      },
      success: res => {
        if (res.statusCode != 200) {
          utils.ErrorToast("服务器出现问题")
          //Todo 网络故障处理
          return
        }

        if (res.data.code != 200) {
          //返回不正常
          if (utils.IsSignExpired(res.data.message)) {
            //token失效
            utils.Login()
            return
          }
          //其他错误
          utils.ErrorToast(res.data.message)
          return
        }
        //返回正常
        wx.showToast({
          title: '认证成功',
        })
        setTimeout(function() {
          wx.navigateBack({
            delta: 1
          })
        }, 1000)
      }
    })
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