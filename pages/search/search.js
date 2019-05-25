const api = require('../../common/api.js');
const utils = require('../../common/utils.js');
import Toast from '../../component/zanui/toast/toast';

Page({

    data: {
        courseList: [],
        focus: true,
        searchHistory: [],
        keyword: ''
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
                courseList: [],
                keyword: ''
            })
        }
    },
    onClear() {
        this.setData({
            courseList: [],
            keyword: ''
        })
    },
    getHistory(e) {
        let that = this;
        let event = {
            detail: e.currentTarget.dataset.history
        };
        console.log(event);
        that.onSearch(event)
    },
    /**
     * 点击搜索事件
     * @param e
     */
    onSearch: function (e) {
        let that = this;
        let keyword = e.detail;
        //处理为空的情况
        if (utils.IsNull(keyword)) {
            Toast.fail("请输入搜索内容");
            return
        }

        that.setData({
            tempKeyword: keyword
        });
        Toast.loading("正在搜索");
        utils.RequestWithDataNoAuth('GET', api.CourseSearch, {keyword: keyword}, that.searchCallback);

    },
    searchCallback(response) {
        console.log(response);
        let that = this;
        let keyword = that.data.tempKeyword;

        //设置搜索历史
        let searchHistory = wx.getStorageSync("searchHistory") || [];
        //数组去重
        if (searchHistory.indexOf(keyword) === -1) { //判断在arr数组中是否存在，不存在则unshift到arr数组中
            searchHistory.push(keyword);
            wx.setStorageSync("searchHistory", searchHistory);
            that.setData({
                searchHistory: searchHistory,
                courseList: response,
                keyword: keyword
            })

        } else {
            that.setData({
                courseList: response,
                keyword: keyword
            })
        }
        Toast.clear()
    },

    /**
     * 删除缓存历史搜索记录
     * @param e
     */
    clearHistory(e) {
        this.setData({
            searchHistory: []
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
        let searchHistory = wx.getStorageSync("searchHistory") || [];
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