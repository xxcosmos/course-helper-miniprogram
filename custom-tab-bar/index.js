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
            info: 0,
            dot: true,
            icon: {
                normal: 'https://inwust-1251756217.cos.ap-chengdu.myqcloud.com/like_plain.png',
                active: 'https://inwust-1251756217.cos.ap-chengdu.myqcloud.com/like_plain.png'
            },
            pagePath: "/pages/index/index",
            text: "首页"
        },
            // {
            //     info: 1,
            //     dot: true,
            //     icon: {
            //         normal: '//img.yzcdn.cn/icon-normal.png',
            //         active: '//img.yzcdn.cn/icon-active.png'
            //     },
            //     pagePath: "/pages/circle/circle",
            //     text: "圈子"
            // },
            // {
            //     info: 2,
            //     dot: true,
            //     icon: {
            //         normal: '//img.yzcdn.cn/icon-normal.png',
            //         active: '//img.yzcdn.cn/icon-active.png'
            //     },
            //     pagePath: "/pages/message/message",
            //     text: "消息"
            // },
            {
                info: 1,
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
            let index = event.detail;
            this.setData({
                active: index
            });
            wx.switchTab({
                url: this.data.tab[index].pagePath,
            })

        }

    }
});