// pages/index/index.js
import Toast from '../../component/zanui/toast/toast';
const api = require('../../common/api.js')
const utils = require('../../common/utils.js')
Page({

  data: {
    autoplay: true,
    indicatorDots: true,
    imgUrls: [
      'https://images.unsplash.com/photo-1551334787-21e6bd3ab135?w=640',
      'https://images.unsplash.com/photo-1551214012-84f95e060dee?w=640',
      'https://images.unsplash.com/photo-1551446591-142875a901a1?w=640'
    ],
    courseList: null,
    pageInfo: {
      hasNextPage: true,
      nextPage: 1,
      pageSize: 10
    },
    index: 0,
    items: [{
        type: 'text',
        label: '最新评价',
        value: 'time',
        groups: ['001'],
      },
      {
        type: 'sort',
        label: '评价数',
        value: 'num',
        groups: ['002'],
      }, {
        type: 'filter',
        label: '筛选',
        value: 'filter',
        children: [{
            type: 'radio',
            label: '开课学院（单选）',
            value: 'college',
            children: [{
                label: '资源与环境工程',
                value: '1',
              },
              {
                label: '材料与冶金',
                value: '2',
              },
              {
                label: '机械自动化',
                value: '3',
              },
              {
                label: '信息科学与工程',
                value: '4',
              },
              {
                label: '管理',
                value: '5',
              },
              {
                label: '文法与经济',
                value: '6',
              },
              {
                label: '理学院',
                value: '7',
              },

            ],
          },
          {
            type: 'checkbox',
            label: 'Query（复选）',
            value: 'query',
            children: [{
                label: 'Angular',
                value: 'angular',
              },
              {
                label: 'Vue',
                value: 'vue',
              },
              {
                label: 'React',
                value: 'react',
              },
              {
                label: 'Avalon',
                value: 'avalon',
              },
            ],
          },
        ],
        groups: ['001', '002'],
      },
    ],
  },

  toSearch: function(e) {
    wx.navigateTo({
      url: '../search/search',
    })
  },
  onChange(e) {
    const {
      checkedItems,
      items
    } = e.detail
    const params = {}

    checkedItems.forEach((n) => {
      if (n.checked) {
        if (n.value === 'num') {
          params.sort = n.value
          params.order = n.sort === 1 ? 'asc' : 'desc'
        } else if (n.value === 'time') {
          params.sort = n.value
        } else if (n.value === 'filter') {
          n.children.filter((n) => n.selected).forEach((n) => {
            if (n.value === 'college') {
              const selected = n.children.filter((n) => n.checked).map((n) => n.value).join(' ')
              params.college = selected
            } else if (n.value === 'query') {
              const selected = n.children.filter((n) => n.checked).map((n) => n.value).join(' ')
              params.query = selected
            }
          })
        }
      }
    })

    this.getFilterCourse(params)
  },
  goToCourse: function(e) {
    let courseCode = e.currentTarget.dataset.code
    wx.navigateTo({
      url: "../course/course" + "?courseCode=" + courseCode,
    })
  },
  getFilterCourse(params = {}) {
    const sort = params.sort || 'time'
    const query = params.query || '必修'
    const q = `${query}+sort=${sort}`
    const data = Object.assign( params)
    console.log(data)

  },
  getRecommendCourse: function(e) {
    let that = this;
    let token = wx.getStorageSync('token')
    //处理token为空的情况
    if (utils.IsNull(token)) {
      utils.Login()
      return
    }

    wx.request({
      url: api.RecommendCourse,
      method: 'GET',
      header: {
        "authorization": token,
      },
      success: res => {
        if (res.statusCode != 200) {
          Toast.fail("服务器出现问题")
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
        that.setData({
          courseList: res.data.data
        })
      }
    })
  },
  getHottestCourse: function(e) {
    let that = this;
    let token = wx.getStorageSync('token')
    //处理token为空的情况
    if (utils.IsNull(token)) {
      utils.Login()
      return
    }

    wx.request({
      url: api.HottestCourse,
      method: 'GET',
      header: {
        "authorization": token,
      },
      success: res => {
        if (res.statusCode != 200) {
         Toast.fail("服务器出现问题")
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
         Toast.fail(res.data.message)
          return
        }
        //返回正常
        that.setData({
          courseList: res.data.data
        })
      }
    })
  },
  getAllCourse: function(e) {
    let that = this;
    let token = wx.getStorageSync('token')
    //处理token为空的情况
    if (utils.IsNull(token)) {
      utils.Login()
      return
    }

    wx.request({
      url: api.Course,
      method: 'GET',
      header: {
        "authorization": token,
      },
      data: {
        page: that.data.pageInfo.nextPage,
        size: that.data.pageInfo.pageSize
      },
      success: res => {
        if (res.statusCode != 200) {
       Toast.fail("服务器出现问题")
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
          Toast.fail(res.data.message)
          return
        }
        console.log(res.data.data)
        //返回正常
        if (that.data.courseList == null) {
          that.setData({
            courseList: res.data.data.list,
            pageInfo: res.data.data
          })
        } else {
          that.setData({
            courseList: that.data.courseList.concat(res.data.data.list),
            pageInfo: res.data.data
          })
        }

      }
    })
  },
  onClick: function(e) {
    console.log(e.detail)
    let index = e.detail.index
    this.setData({
      index: index
    })
    if (index == 0) {
      this.getHottestCourse()
    } else if (index == 1) {
      this.getRecommendCourse()
    } else if (index == 2) {
      this.setData({
        courseList: null
      })
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
    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      this.getTabBar().setData({
        active: 0
      })
    }
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
    if (this.data.pageInfo.hasNextPage && this.data.index == 2) {
      this.getAllCourse()
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})