const api = require('../../common/api.js');
const utils = require('../../common/utils.js');
import Toast from '../../component/zanui/toast/toast';

Page({

    data: {
        courseList: null,
        focus: true,
        searchHistory: null,
        searchValue: ''
    },

    //点击搜索框取消按钮事件
    onCancel: function (e) {
        wx.navigateBack({
            delta: 1
        })
    },
    //点击课程事件
    goToCourse: function (e) {
        wx.setStorageSync('courseCode', e.currentTarget.dataset.code);
        wx.navigateTo({
            url: "../course/course",
        })
    },

    onChange(e) {
        if (utils.IsNull(e.detail)) {
            this.setData({
                courseList: null
            })
        }
    },
    onClear() {
        this.setData({
            courseList: null
        })
    },
    getHistory(e) {
        let that = this;
        that.setData({
            searchValue: e.currentTarget.dataset.history
        });
        let event = {
            detail: e.currentTarget.dataset.history
        };
        console.log(event)
        that.onSearch(event)
    },
    /**
     * 点击搜索事件
     * @param e
     */
    onSearch: function (e) {
        let that = this;
        let searchValue = e.detail;
        //处理为空的情况
        if (utils.IsNull(searchValue)) {
            Toast.fail("请输入搜索内容");
            return
        }
        that.setData({
            searchValue: searchValue
        });


        Toast.loading("正在搜索")
        utils.RequestWithDataNoAuth('GET', api.CourseSearch, {keyword: searchValue}, that.searchCallback);

    },
    searchCallback(response) {
        let that = this;
        let searchValue = that.data.searchValue;
        //设置搜索历史
        let searchHistory = wx.getStorageSync("searchHistory") || [];
        //数组去重
        if (searchHistory.indexOf(searchValue) === -1) { //判断在arr数组中是否存在，不存在则unshift到arr数组中
            searchHistory.push(searchValue);
            wx.setStorageSync("searchHistory", searchHistory);
            that.setData({
                searchHistory: searchHistory,
                courseList: response
            })

        } else {
            that.setData({
                courseList: response
            })
        }
        Toast.clear()
    },

    clearHistory(e) {
        this.setData({
            searchHistory: null
        });
        wx.removeStorageSync("searchHistory")
    }
    ,
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
        let searchHistory = wx.getStorageSync("searchHistory") || null;
        this.setData({
            searchHistory: searchHistory
        })
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
})