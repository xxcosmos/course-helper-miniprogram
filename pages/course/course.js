const api = require('../../common/api.js');
const utils = require('../../common/utils.js');
import Toast from '../../component/zanui/toast/toast';

Page({

    /**
     * 页面的初始数据
     */
    data: {
        course: null,
        teacherList: null,
        averageRate: 5,
        commentList: null,
        fileNum: 0,
        collected: null
    },

    onLike(e) {
        let that = this;
        let index = e.target.dataset.index;
        that.setData({
            index: index
        });
        let userInfo = wx.getStorageSync("userInfo");
        if (utils.IsNull(userInfo)) {
            utils.Login();
            return
        }
        utils.RequestWithDataByAuth('POST', api.Like, {ownerId: e.target.dataset.id}, that.likeCallback);

    },
    likeCallback(res) {
        let that = this;
        let index = that.data.index;
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

  


    getCourseData() {
        let that = this;
        let courseCode = wx.getStorageSync('courseCode');
        let token = wx.getStorageSync('token')
        Toast.loading('加载课程ing')
        if (utils.IsNull(token)) {
            utils.RequestWithoutDataNoAuth('GET', api.Course + '/' + courseCode, that.getCourseDataCallback);

        } else {
            utils.RequestWithoutDataAuth('GET', api.Course + '/' + courseCode, that.getCourseDataCallback);

        }


    },
    getCourseDataCallback(response) {
        let that = this;
        //将GMT 转换成标准格式
        for (let i = 0; i < response.commentVOList.length; i++) {
            response.commentVOList[i].comment.createTime = utils.ToDate(response.commentVOList[i].comment.createTime)
        }

        that.setData({
            course: response.course,
            teacherList: response.teacherList,
            commentList: response.commentVOList,
            averageRate: response.averageRate,
            collected: response.collected,
            fileNum: response.fileNum
        })
        // console.log(response)
        Toast.clear()
    },

    toStar(e) {
        let that = this;
        
        let data={
            ownerId: wx.getStorageSync("courseCode"),
            type: 0,
        }
        console.log(e)
        utils.RequestWithDataByAuth('POST', api.Star, data, that.toStarCallBack)
    },
    toStarCallBack(response) {
        let that = this;
        console.log(response)
        if(response === 1){
            that.setData({
                collected: true
            })
            Toast.success('收藏成功');
        }else if(response === 0){
            Toast.success('取消收藏成功');
            that.setData({
                collected: false
            })
        }else{
            Toast.fail('收藏失败');
        }
        
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