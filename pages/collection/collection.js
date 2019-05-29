let api = require('../../common/api');
let utils = require('../../common/utils');
import Toast from '../../component/zanui/toast/toast';

Page({

    data: {
        courseList: null,
        // pageInfo: {
        //     hasNextPage: true,
        //     nextPage: 1,
        //     pageSize: 10
        // },
        // collected: false
    },

    getCollectedCourse: function () {
      let token = wx.getStorageSync(token)
      if(!utils.IsNull(token)){
        Toast.loading("正在加载");
        let that = this;
        utils.RequestWithoutDataAuth('GET', api.Collection, that.getCollectedCourseCallback);
      }
       
    },
    getCollectedCourseCallback(response) {
        let that = this;
        console.log(response);
        that.setData({
            courseList: response,
            // pageInfo: response
        })
        Toast.clear();
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
        // this.getCollectedCourse()
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
      this.getCollectedCourse()
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