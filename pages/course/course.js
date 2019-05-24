const api = require('../../common/api.js')
const utils = require('../../common/utils.js')

Page({

    /**
     * 页面的初始数据
     */
    data: {
        course: null,
        teacherList: null,
        activeNames: ['1'],
        averageStar: 4,
        commentList: null,

    },

    onLike(e) {
        let that = this;
        let index = e.target.dataset.index;
        let userInfo = wx.getStorageSync("userInfo");
        if (utils.IsNull(userInfo)) {
            utils.Login();
            return
        }
        let response = utils.RequestWithDataByAuth('POST', api.Like, {ownerId: e.target.dataset.id});
        let commentList = that.data.commentList;
        if (commentList[index].like === true) {
            commentList[index].like = false;
            commentList[index].comment.likeNum -= 1
        } else {
            commentList[index].like = true;
            commentList[index].comment.likeNum += 1
        }
        that.setData({
            commentList: commentList
        })
    },


    goToComment: function () {
        wx.setStorageSync("course", this.data.course);
        wx.navigateTo({
            url: '../comment/comment',
        })
    },

    goToFile() {
        wx.navigateTo({
            url: '../file/file'
        })
    },

    goToPhoto() {
        wx.navigateTo({
            url: '../photo/photo',
        })
    },

    onChangeCollapse: function (e) {
        this.setData({
            activeNames: e.detail
        });
    },

    getCourseData() {
        let that = this;
        let courseCode = wx.getStorageSync('courseCode');
        let response = utils.RequestWithoutDataNoAuth('GET', api.Course + '/' + courseCode);

        //将GMT 转换成标准格式
        for (let i = 0; i < response.commentVOList.length; i++) {
            response.commentVOList[i].comment.createTime = utils.ToDate(response.commentVOList[i].comment.createTime)
        }

        that.setData({
            course: response.course,
            teacherList: response.teacherList,
            commentList: response.commentVOList,
            averageStar: response.averageStar
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

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
        this.getCourseData()
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