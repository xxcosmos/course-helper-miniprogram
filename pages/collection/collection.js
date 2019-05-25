let api = require('../../common/api');
let utils = require('../../common/utils');
import Toast from '../../component/zanui/toast/toast';

Page({

    data: {
        courseList: null,

    },

    toSearch: function (e) {
        wx.navigateTo({
            url: '../search/search',
        })
    },

    goToCourse: function (e) {
        wx.setStorageSync('courseCode', e.currentTarget.dataset.code);
        wx.navigateTo({
            url: "../course/course",
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.getHottestCourse()
    }
    ,

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    }
    ,

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
    }
    ,

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    }
    ,

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    }
    ,

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    }
    ,

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {
    }
    ,

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
});