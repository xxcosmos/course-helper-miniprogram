const api = require('../../common/api.js');
const utils = require('../../common/utils.js');
import Toast from '../../component/zanui/toast/toast';

Page({

    /**
     * 页面的初始数据
     */
    data: {
        tempFile: null,
        courseCode: null,
    },

    onUploadFile(e) {
        let that = this;
        let fileDescription = e.detail.value.fileDescription;
        if (utils.IsNull(fileDescription)) {
            Toast.fail("请输入文件描述哦");
            return
        }

        let data = {
            ownerId: that.data.courseCode,
            type: that.data.tempFile.type,
            fileDescription: fileDescription,
            fileName: that.data.tempFile.name,
            size: that.data.tempFile.size
        };
        let response = utils.RequestWithDataByAuth('POST', api.File, data);
        utils.CosDao.postObject(that.data.tempFile, response);
        utils.GoBackWithTimeout();
    },


    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let tempFile = wx.getStorageSync("tempFile");
        let courseCode = wx.getStorageSync("courseCode");
        this.setData({
            courseCode: courseCode,
            tempFile: tempFile
        })
    },


//---------以上为代码-----------
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