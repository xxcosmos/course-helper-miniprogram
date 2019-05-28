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
        currentFileName: null
    },

    refreshFileName(e) {
      //  console.log(e.detail.value)
        this.setData({
            currentFileName: e.detail.value
        })
    },

    onUploadFile(e) {
        let that = this;
        let fileDescription = e.detail.value.fileDescription;
        if (utils.IsNull(fileDescription)) {
            Toast.fail("请输入文件描述哦");
            return
        }
        if (utils.IsNull(that.data.currentFileName)) {
            Toast.fail("请输入文件名");
            return
        }

        let data = {
            ownerId: that.data.courseCode,
            fileDescription: fileDescription,
            // fileName: that.data.tempFile.name,
            fileName: that.data.currentFileName+that.data.extension,
            size: that.data.tempFile.size
        };
         console.log(data);
        let response = utils.RequestWithDataByAuth('POST', api.File, data, that.uploadCallback);

    },
    uploadCallback(response) {
        let that = this;
        if (!utils.IsNull(response)) {
            utils.CosDao.postObject(that.data.tempFile, response);
          Toast.success("上传成功！")
        }
        utils.GoBackWithTimeout();
    },


    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
      let that = this
        let tempFile = wx.getStorageSync("tempFile");
        let courseCode = wx.getStorageSync("courseCode");
        console.log(tempFile)
        if(!utils.IsNull(tempFile.path)){
          if(!utils.IsNull(tempFile.name)){
            //文件
            let pieces = tempFile.name.split('.')
            let extension = '.'+pieces[pieces.length - 1]
            that.setData({
              currentFileName: pieces[0],
              extension: extension
            })
          }else{
            //图片
            let pieces = tempFile.path.split('.')
            let extension = '.'+pieces[pieces.length-1]
            that.setData({
              extension: extension,
              currentFileName: ''
            })
          }
        }
        this.setData({
            courseCode: courseCode,
            tempFile: tempFile,
        })
        // console.log(tempFile.name)
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