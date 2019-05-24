let api = require('../../common/api');
let util = require('../../common/util');
let utils = require('../../common/utils');
import Toast from '../../component/zanui/toast/toast';

Page({

    /**
     * 页面的初始数据
     */
    data: {
        course: {},
        star: "five"
    },
    onChange1: function (e) {
        this.setData({
            star: e.detail
        })
    },
    submit: function (e) {
        let that = this;
        let star = e.detail.value.one;
        let content = e.detail.value.content;
        if (star === "one") {
            star = 1;
        } else if (star === "three") {
            star = 3;
        } else if (star === "five") {
            star = 5;
        }
        if (utils.IsNull(content)) {
            Toast.fail("请输入评价内容")
            return
        }

        let userInfo = wx.getStorageSync("userInfo");
        if (utils.IsNull(userInfo)) {
            utils.Login();
            return
        }
        let data = {
            ownerId: that.data.course.courseCode,
            fromId: userInfo.id,
            content: content,
            star: star
        };
        utils.RequestWithDataByAuth('POST', api.Comment, data, that.commentCallback);

    },
    commentCallback(response) {
        if (response === "success") {
            Toast.success();
            utils.GoBackWithTimeout()
        }
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let course = wx.getStorageSync("course");
        this.setData({
            course: course
        })
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
});