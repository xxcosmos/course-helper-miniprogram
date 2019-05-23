const api = require('../../common/api.js')
const utils = require('../../common/utils.js')
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
        console.log(e.detail)
        this.setData({
            star: e.detail
        })
    },
    submit: function (e) {
        let that = this
        let starstar = e.detail.value.one
        let content = e.detail.value.content
        var star = 0;
        if (starstar == "one") {
            star = 1;
        } else if (starstar == "three") {
            star = 3;
        } else if (starstar == "five") {
            star = 5;
        }
        if (utils.IsNull(content)) {
            Toast.fail("请输入评价内容")
            return
        }
        let token = wx.getStorageSync('token')
        let userInfo = wx.getStorageSync("userInfo")
        console.log(userInfo)
        //处理token为空的情况
        if (utils.IsNull(token) || utils.IsNull(userInfo)) {
            utils.Login()
            return
        }

        wx.request({
            url: api.Comment,
            method: 'POST',
            header: {
                "authorization": token,
            },
            data: {
                ownerId: that.data.course.courseCode,
                fromId: userInfo.id,
                content: content,
                star: star
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
                utils.ErrorToast(res.data.message)
                setTimeout(function () {
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
    onLoad: function (options) {
        let course = wx.getStorageSync("course")
        console.log(course)
        this.setData({
            course: course
        })
    },
    onSubmit: function (e) {
        console.log(e)
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