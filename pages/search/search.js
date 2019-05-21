const api = require('../../common/api.js')
const utils = require('../../common/utils.js')

Page({

  data: {
    courseList: null,
    focus: true
  },

    onCancel: function (e) {
    wx.navigateBack({
      url: "../index/index"
    })
  },

    goToCourse: function (e) {
    let courseCode = e.currentTarget.dataset.code
    wx.navigateTo({
        url: "../course/course" + "?courseCode=" + courseCode,
    })
  },

    onSearch: function (e) {
    let that = this
    let keyword = e.detail

        //处理为空的情况
        if (utils.IsNull(keyword)) {
      utils.ErrorToast("请输入搜索内容")
            return
    }

    let token = wx.getStorageSync('token')

    //处理token为空的情况
        if (utils.IsNull(token)) {
      utils.Login()
            return
        }

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

                if (res.statusCode != 200) {
                    utils.ErrorToast("服务器出现问题")
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
                that.setData({
                    courseList: res.data.data
                })
            }
        })




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