// pages/mine/mine.js
const api = require('../../common/api.js');
const utils = require('../../common/utils.js');
Page({

    /**
     * 页面的初始数据
     */
    data: {
        userInfo: {
            avatar_url: 'https://images.unsplash.com/photo-1551334787-21e6bd3ab135?w=640',
            nickname: '小红',
            gender: 1,
            state: 0,
            studentId: "201713137042"
        }
    },
    goToAuth(e) {
        if (this.data.userInfo.state === 0) {
            wx.navigateTo({
                url: '../auth/auth',
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
        if (typeof this.getTabBar === 'function' &&
            this.getTabBar()) {
            this.getTabBar().setData({
                active: 1
            })
        }

        utils.GetUserInfo();
        let userInfo = wx.getStorageSync("userInfo");
        this.setData({
            userInfo: userInfo
        })

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
});