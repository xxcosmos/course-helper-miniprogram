const api = require('../../common/api.js')
const utils = require('../../common/utils.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    course: null,
    teacherList: null,
      activeNames: ['1'],
      courseGrade: 4,
      commentList: null
  },
    toDate: function (date) {
        console.log(date)
        var arr = date.split('T');
        var d = arr[0];
        var darr = d.split('-');

        var t = arr[1];
        var tarr = t.split('.000');
        var marr = tarr[0].split(':');

        var dd = parseInt(darr[0]) + "/" + parseInt(darr[1]) + "/" + parseInt(darr[2]) + " " + parseInt(marr[0]) + ":" + parseInt(marr[1]) + ":" + parseInt(marr[2]);
        return this.formatDateTime(dd);

    },
    formatDateTime(date) {
        var time = new Date(Date.parse(date));
        time.setTime(time.setHours(time.getHours()));


        let Y = time.getFullYear() + '-';
        let M = this.addZero(time.getMonth() + 1) + '-';
        let D = this.addZero(time.getDate()) + ' ';
        let h = this.addZero(time.getHours()) + ':';
        let m = this.addZero(time.getMinutes()) + ':';
        let s = this.addZero(time.getSeconds());
        return Y + M + D + h + m + s;
        // }
    },
    // 数字补0操作
    addZero(num) {
        return num < 10 ? '0' + num : num;
  },

    goToComment: function () {
        wx.setStorageSync("course", this.data.course)
        wx.navigateTo({
            url: '../comment/comment',
        })
  },

    onChangeCollapse: function (e) {
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
          if (res.data.code == 200) {
          console.log(res.data.data)
              for (let i = 0; i < res.data.data.commentVOList.length; i++) {
                  res.data.data.commentVOList[i].comment.createTime = that.toDate(res.data.data.commentVOList[i].comment.createTime)
                  console.log(res.data.data.commentVOList[i].comment.createTime)
              }

          that.setData({
            course: res.data.data.course,
              teacherList: res.data.data.teacherList,
              commentList: res.data.data.commentVOList
          })
          } else {
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