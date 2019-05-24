let api = require('../../common/api');
let utils = require('../../common/utils');

Page({

    /**
     * 页面的初始数据
     */
    data: {
        courseCode: null,
        fileList: null
    },

    onChooseFile() {
        wx.chooseMessageFile({
            count: 1,
            type: 'file',
            success(res) {
                wx.setStorageSync('tempFile', res.tempFiles[0]);
                wx.navigateTo({
                    url: '/pages/upload/file',
                })
            }
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

    },

    onDownload(e) {
        let url = this.getUrl(e);
        wx.setClipboardData({
            data: url
        });
    },

    getUrl(e) {
        let that = this;
        let index = e.currentTarget.dataset.index;
        let id = that.data.fileList[index].id;
        this.addDownloadCount(id, index);
        return 'https://inwust-1251756217.cos.ap-chengdu.myqcloud.com/' + that.data.fileList[index].cosName;
    },

    onPreview(e) {
        let url = this.getUrl(e);
        wx.downloadFile({
            url: url,
            success(res) {
                const filePath = res.tempFilePath;
                wx.openDocument({
                    filePath
                })
            }
        })
    },

    addDownloadCount(id, index) {
        let that = this;
        utils.RequestWithoutDataAuth('GET', api.AddDownloadCount + '/' + id);
    },

    getFileList() {
        let that = this;
        let courseCode = wx.getStorageSync("courseCode");
        let response = utils.RequestWithoutDataNoAuth('GET', api.GetCourseFile + '/' + courseCode);
        //返回正常
        for (let i = 0; i < response.length; i++) {
            response[i].createTime = utils.ToDate(response[i].createTime)
        }
        that.setData({
            fileList: response
        })
    },


    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        this.getFileList()

    },


    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    },


    //---------以上为代码-----------


    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {
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

    }
});