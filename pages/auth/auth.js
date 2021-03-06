let api = require('../../common/api');
let utils = require('../../common/utils');
import Toast from '../../component/zanui/toast/toast';

Page({

    /**
     * 页面的初始数据
     */
    data: {
        userInfo: {
            avatarUrl: null,
            nickname: null,
            gender: 0,
            state: -1,
            studentId: null,
      
        },
    },

    onClickIcon: function (e) {
        Toast("就是输入你的姓名啦")
    },
    myGetUserInfo() {
        utils.GetUserInfo();
        let userInfo = wx.getStorageSync("userInfo");
        if (!utils.IsNull(userInfo)) {

            this.setData({
            userInfo: userInfo
            })
        }
    },

    auth(e) {
        let name = e.detail.value.name;
        let studentId = e.detail.value.studentId;
        if (utils.IsNull(name)) {
            Toast.fail("姓名不能为空")
            return
        }
        if (utils.IsNull(studentId)) {
            Toast.fail("学号不能为空")
        }
        let that = this;
        let data = {
            studentName: name,
            studentId: studentId
        };
        utils.RequestWithDataByAuth('POST', api.Bind, data, that.authCallback);

    },
    authCallback(response) {
        //返回正常
        if (response === "success") {
            Toast.success("绑定成功");
            utils.GoBackWithTimeout()
        }
    },


    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.myGetUserInfo()
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