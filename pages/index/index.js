let api = require('../../common/api');
let util = require('../../common/util');
let utils = require('../../common/utils');
import Toast from '../../component/zanui/toast/toast';

Page({

    data: {
        autoplay: true,
        indicatorDots: true,
        imgUrls: [
            'https://images.unsplash.com/photo-1551334787-21e6bd3ab135?w=640',
            'https://images.unsplash.com/photo-1551214012-84f95e060dee?w=640',
            'https://images.unsplash.com/photo-1551446591-142875a901a1?w=640'
        ],
        courseList: null,
        pageInfo: {
            hasNextPage: true,
            nextPage: 1,
            pageSize: 10
        },
        index: 0,
        items: [{
            type: 'text',
            label: '最新评价',
            value: 'time',
            groups: ['001'],
        },
            {
                type: 'sort',
                label: '评价数',
                value: 'num',
                groups: ['002'],
            }, {
                type: 'filter',
                label: '筛选',
                value: 'filter',
                children: [{
                    type: 'radio',
                    label: '开课学院（单选）',
                    value: 'college',
                    children: [{
                        label: '资源与环境工程',
                        value: '1',
                    },
                        {
                            label: '材料与冶金',
                            value: '2',
                        },
                        {
                            label: '机械自动化',
                            value: '3',
                        },
                        {
                            label: '信息科学与工程',
                            value: '4',
                        },
                        {
                            label: '管理',
                            value: '5',
                        },
                        {
                            label: '文法与经济',
                            value: '6',
                        },
                        {
                            label: '理学院',
                            value: '7',
                        },

                    ],
                },
                    {
                        type: 'checkbox',
                        label: 'Query（复选）',
                        value: 'query',
                        children: [{
                            label: 'Angular',
                            value: 'angular',
                        },
                            {
                                label: 'Vue',
                                value: 'vue',
                            },
                            {
                                label: 'React',
                                value: 'react',
                            },
                            {
                                label: 'Avalon',
                                value: 'avalon',
                            },
                        ],
                    },
                ],
                groups: ['001', '002'],
            },
        ],
    },

    toSearch: function (e) {
        wx.navigateTo({
            url: '../search/search',
        })
    },
    onChange(e) {
        const {
            checkedItems,
            items
        } = e.detail;
        const params = {};

        checkedItems.forEach((n) => {
            if (n.checked) {
                if (n.value === 'num') {
                    params.sort = n.value;
                    params.order = n.sort === 1 ? 'asc' : 'desc'
                } else if (n.value === 'time') {
                    params.sort = n.value
                } else if (n.value === 'filter') {
                    n.children.filter((n) => n.selected).forEach((n) => {
                        if (n.value === 'college') {
                            params.college = n.children.filter((n) => n.checked).map((n) => n.value).join(' ')
                        } else if (n.value === 'query') {
                            params.query = n.children.filter((n) => n.checked).map((n) => n.value).join(' ')
                        }
                    })
                }
            }
        });

        this.getFilterCourse(params)
    },

    goToCourse: function (e) {
        wx.setStorageSync('courseCode', e.currentTarget.dataset.code);
        wx.navigateTo({
            url: "../course/course",
        })
    },

    getFilterCourse(params = {}) {
        const sort = params.sort || 'time';
        const query = params.query || '必修';
        const q = `${query}+sort=${sort}`;
        const data = Object.assign(params);
        console.log(data)

    },

    getRecommendCourse: function (e) {
        let that = this;
        let token = wx.getStorageSync('token');
        let response = null;
        if (utils.IsNull(token)) {
            response = utils.GetCourseList(api.RecommendCourse);
        } else {
            response = utils.GetRecommendCourseListByAuth();
        }
        //返回正常
        that.setData({
            courseList: response
        })
    },

    getHottestCourse: function (e) {
        let that = this;
        let response = utils.GetCourseList(api.HottestCourse);
        that.setData({
            courseList: response
        })
    },
    getAllCourse: function () {
        let that = this;
        let data = {
            page: that.data.pageInfo.nextPage,
            size: that.data.pageInfo.pageSize
        };
        let response = utils.RequestWithDataNoAuth('GET', api.Course, data);
        if (that.data.courseList == null) {
            that.setData({
                courseList: response.list,
                pageInfo: response
            })
        } else {
            that.setData({
                courseList: that.data.courseList.concat(response.list),
                pageInfo: response
            })
        }

    },

    onClick: function (e) {
        let index = e.detail.index;
        this.setData({
            index: index
        });
        if (index === 0) {
            this.getHottestCourse()
        } else if (index === 1) {
            this.getRecommendCourse()
        } else if (index === 2) {
            this.setData({
                courseList: null
            });
            this.getAllCourse()
        }
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.getHottestCourse()
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
        if (typeof this.getTabBar === 'function' &&
            this.getTabBar()) {
            this.getTabBar().setData({
                active: 0
            })
        }
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
        if (this.data.pageInfo.hasNextPage && this.data.index === 2) {
            this.getAllCourse()
        }
    }
    ,

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
});