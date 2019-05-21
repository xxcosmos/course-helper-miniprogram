// pages/custom-tab-bar/index.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {},

    /**
     * 组件的初始数据
     */
    data: {
        active: 0,
        activeColor: "#07c160",
        tab: [{
            info: 1,
            dot: true,
            icon: {
                normal: 'https://www.easyicon.net/download/png/1199082/1553/',
                active: 'https://www.easyicon.net/download/png/1199082/1553/'
            },
            pagePath: "/pages/index/index",
            text: "首页"
        },
            {
                info: 2,
                dot: true,
                icon: {
                    normal: '//img.yzcdn.cn/icon-normal.png',
                    active: '//img.yzcdn.cn/icon-active.png'
                },
                pagePath: "/pages/circle/circle",
                text: "圈子"
            },
            {
                info: 3,
                dot: true,
                icon: {
                    normal: '//img.yzcdn.cn/icon-normal.png',
                    active: '//img.yzcdn.cn/icon-active.png'
                },
                pagePath: "/pages/message/message",
                text: "消息"
            },
            {
                info: 4,
                dot: true,
                icon: {
                    normal: '//img.yzcdn.cn/icon-normal.png',
                    active: '//img.yzcdn.cn/icon-active.png'
                },
                pagePath: "/pages/mine/mine",
                text: "我的"
            }
        ]


    },

    /**
     * 组件的方法列表
     */
    methods: {

        onChange(event) {
            let index = event.detail
            wx.switchTab({
                url: this.data.tab[index].pagePath,
            })
            this.setData({
                active: index
            })
        }

    }
})