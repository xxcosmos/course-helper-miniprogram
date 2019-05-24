let api = require('api');
let COS = require('cos-wx-sdk-v5');
let util = require('util');
import Toast from 'component/zanui/toast/toast';

let TaskId;


/**
 * 统一异常处理
 * @param res 参数
 */
function errorHandle(res) {
    console.error(res);
    if (res.code === 404) {
        Toast.fail("页面不存在");
        return
    }
    if (res.code === 401) {
        Toast.fail("请先登录");
        goToLogin();
        return;
    }

    if (res.code === 500) {
        Toast.fail("服务器错误");
        return;
    }
    Toast.fail(res.message)
}

/**
 * 统一结果处理
 * @param res
 * @returns {null|*}
 */
function resultHandle(res) {
    if (res.statusCode !== 200) {
        Toast.fail("服务器出现问题，请稍后再试");
        return null;
    }
    if (res.data.code !== 200) {
        errorHandle(res.data);
        return null;
    }
    if (util.isNullOrUndefined(res.data.data)) {
        return "success";
    }
    return res.data.data


}

function requestWithDataByAuth(method, url, data) {
    //判断token是否存在
    let token = wx.getStorageSync('token');
    if (util.isNullOrUndefined(token)) {
        goToLogin();
        return
    }

    wx.request({
        url: url,
        method: method,
        header: {
            "authorization": token,
        },
        data,
        success(res) {
            return resultHandle(res)
        }
    })

}

function requestWithDataNoAuth(method, url, data) {
    wx.request(
        {
            url: url,
            method: method,
            data,
            success(res) {
                return resultHandle(res);
            }
        }
    )

}

function requestWithoutDataAuth(method, url) {
    //判断token是否存在
    let token = wx.getStorageSync('token');
    if (util.isNullOrUndefined(token)) {
        goToLogin();
        return
    }

    wx.request(
        {
            url: url,
            method: method,
            header: {
                "authorization": token,
            },
            success(res) {
                return resultHandle(res)
            }
        }
    )

}

function requestWithoutDataNoAuth(method, url) {
    wx.request(
        {
            url: url,
            method: method,
            success(res) {
                return resultHandle(res);
            }
        }
    )
}

/**
 * 得到课程列表
 * @param url
 */
function getCourseList(url) {
    return requestWithoutDataNoAuth("GET", url);
}

/**
 * 得到推荐课程 已认证
 * @returns {*}
 */
function getRecommendCourseListByAuth() {
    return requestWithoutDataAuth("GET", url);

}

/**
 * 登录
 */
function goToLogin() {
    let userInfo = wx.getStorageSync("userInfo");
    //缓存中无用户信息
    if (util.isNullOrUndefined(userInfo)) {
        wx.navigateTo({
            url: '/pages/login/login',
        });
        return
    }

    console.log(userInfo);
    wx.login({
        success: res => {
            // 发送 res.code 到后台换取 openId, sessionKey, unionId
            let data = {
                code: res.code,
                userInfo: userInfo
            };
            let response = requestWithDataNoAuth('POST', api.Login, data);
            wx.setStorageSync("token", response);
            getWxUserInfo();
        }
    })
}

/**
 * 请求用户信息
 */
function getWxUserInfo() {
    let response = requestWithoutDataAuth("GET", api.User);
    wx.setStorageSync("userInfo", response);
}

let getAuthorization = function (options, callback) {
    let response = requestWithoutDataAuth("GET", api.CosAuth);
    let credentials = response.credentials;
    callback({
        TmpSecretId: credentials.tmpSecretId,
        TmpSecretKey: credentials.tmpSecretKey,
        XCosSecurityToken: credentials.sessionToken,
        ExpiredTime: data.expiredTime, // SDK 在 ExpiredTime 时间前，不会再次调用 getAuthorization
    })


};
let cos = new COS({
    getAuthorization: getAuthorization
});

// 回调统一处理函数
let requestCallback = function (err, data) {
    console.log(err || data);
    if (err && err.error) {
        wx.showModal({
            title: '返回错误',
            content: '请求失败：' + (err.error.Message || err.error) + '；状态码：' + err.statusCode,
            showCancel: false
        });
    } else if (err) {
        wx.showModal({
            title: '请求出错',
            content: '请求出错：' + err + '；状态码：' + err.statusCode,
            showCancel: false
        });
    } else {
        wx.showToast({
            title: '上传成功',
            icon: 'success',
            duration: 3000
        });
    }
};

// 展示的所有接口
let dao = {
    // 上传文件
    postObject: function (file, fileName) {
        cos.postObject({
            Bucket: 'inwust-1251756217',
            Region: 'ap-chengdu',
            Key: fileName,
            FilePath: file.path,
            FileSize: file.size,
            TaskReady: function (taskId) {
                TaskId = taskId
            },
            onProgress: function (info) {
                console.log(JSON.stringify(info));
            }
        }, requestCallback);
    }
};

let toDate = function (date) {
    let arr = date.split('T');
    let d = arr[0];
    let darr = d.split('-');
    let t = arr[1];
    let tarr = t.split('.000');
    let marr = tarr[0].split(':');
    let dd = parseInt(darr[0]) + "/" + parseInt(darr[1]) + "/" + parseInt(darr[2]) + " " + parseInt(marr[0]) + ":" + parseInt(marr[1]) + ":" + parseInt(marr[2]);
    let time = new Date(Date.parse(dd));
    time.setTime(time.setHours(time.getHours()));
    let Y = time.getFullYear() + '-';
    let M = addZero(time.getMonth() + 1) + '-';
    let D = addZero(time.getDate()) + ' ';
    let h = addZero(time.getHours()) + ':';
    let m = addZero(time.getMinutes()) + ':';
    let s = addZero(time.getSeconds());
    return Y + M + D + h + m + s;
};

// 数字补0操作
function addZero(num) {
    return num < 10 ? '0' + num : num;
}

function goBackWithTimeout() {
    setTimeout(function () {
        wx.navigateBack({
            delta: 1
        })
    }, 1000)
}

function isNull(o) {
    return o === undefined || o == null || o === '';
}

module.exports = {
    RequestWithoutDataAuth: requestWithoutDataAuth,
    RequestWithDataByAuth: requestWithDataByAuth,
    RequestWithoutDataNoAuth: requestWithoutDataNoAuth,
    RequestWithDataNoAuth: requestWithDataNoAuth,
    Login: goToLogin,
    GetCourseList: getCourseList,
    GetRecommendCourseListByAuth: getRecommendCourseListByAuth,
    GetUserInfo: getWxUserInfo,
    CosDao: dao,
    ToDate: toDate,
    GoBackWithTimeout: goBackWithTimeout,
    IsNull: isNull
};