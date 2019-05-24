let api = require('../../common/api');
let util = require('../../common/util');
let utils = require('../../common/utils');
import Toast from 'component/zanui/toast/toast';

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  onClickIcon: function(e) {
      Toast("就是输入你的姓名啦")
  },

  auth(e) {
      let name = e.detail.value.name;
      let studentId = e.detail.value.studentId;

    let that = this;
      let data = {
          studentName: name,
          studentId: studentId
      };
      let response = utils.RequestWithDataByAuth('POST', api.Bind, data);
        //返回正常
      if (response === "success") {
          Toast.success();
          utils.GoBackWithTimeout();
      }
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
});