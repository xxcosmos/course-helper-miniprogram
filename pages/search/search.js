const api = require('../../common/api.js')
const utils = require('../../common/utils.js')
import Toast from '../../component/zanui/toast/toast';
Page({

  data: {
    courseList: null,
    focus: true,
      searchHistory: null,
      searchValue: null
  },

    //点击搜索框取消按钮事件
  onCancel: function(e) {
    wx.navigateBack({
        delta: 1
    })
  },
    //点击课程事件
  goToCourse: function(e) {
    let courseCode = e.currentTarget.dataset.code
    wx.navigateTo({
      url: "../course/course" + "?courseCode=" + courseCode,
    })
  },
    onClear() {
        this.setData({
            courseList: null
        })
    },
    getHistory(e) {
        this.setData({
            searchValue: e.currentTarget.dataset.history
        })
        let event = {
            detail: e.currentTarget.dataset.history
        };
        this.onSearch(event)
    },
  onSearch: function(e) {
    let that = this
    let keyword = e.detail

    //处理为空的情况
    if (utils.IsNull(keyword)) {
        Toast.fail("请输入搜索内容")
      return
    }

      let token = wx.getStorageSync('token') || null

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
            Toast.fail("服务器出现问题")
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
            Toast.fail(res.data.message)
          return
        }
        //返回正常
        that.setData({
          courseList: res.data.data
        })
          //设置搜索历史
          var searchHistory = wx.getStorageSync("searchHistory") || []
          //数组去重
          if (searchHistory.indexOf(keyword) == -1) { //判断在arr数组中是否存在，不存在则unshift到arr数组中
              searchHistory.push(keyword)
              wx.setStorageSync("searchHistory", searchHistory)
              this.setData({
                  searchHistory: searchHistory
              })

          }
      }
    })
  },
    clearHistory(e) {
        this.setData({
            searchHistory: null
        }),
            wx.removeStorageSync("searchHistory")
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
      var searchHistory = wx.getStorageSync("searchHistory") || null
      this.setData({
          searchHistory: searchHistory
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