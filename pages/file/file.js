const api = require('../../common/api.js')
const utils = require('../../common/utils.js')
Page({

    /**
     * 页面的初始数据
     */
    data: {
        tempFile: null,
        courseCode: null,
    },
    onUploadFile(e) {
        let that = this
        let fileDescription = e.detail.value.fileDescription
        if (utils.IsNull(fileDescription)) {
            utils.ErrorMessage("请输入文件描述哦")
            return
        }

        let token = wx.getStorageSync('token')
        if (utils.IsNull(token)) {
            utils.Login()
            return
        }

        wx.request({
            url: api.FileInfo,
            method: 'POST',
            header: {
                "authorization": token,
            },
            data: {
                ownerId: that.data.courseCode,
                type: that.data.tempFile.type,
                fileDescription: fileDescription,
                fileName: that.data.tempFile.name,
                size: that.data.tempFile.size
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
                console.log(res.data)
                let fileName = res.data.data
                utils.CosDao.postObject(that.data.tempFile, fileName)
                setTimeout(function () {
                    wx.navigateBack({
                        delta: 1
                    })
                }, 1000)
            }
        })
    },
    onChooseFile() {
        let that = this
        wx.chooseMessageFile({
            count: 1,
            type: 'file',
            success(res) {
                that.setData({
                    tempFile: res.tempFiles[0]
                })
            }
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        console.log(options)
        this.setData({
            courseCode: options.courseCode
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
})