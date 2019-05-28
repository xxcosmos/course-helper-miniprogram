let api = require('api');
let COS = require('cos-wx-sdk-v5');
import Toast from '../component/zanui/toast/toast';

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
    console.log(res.message)
}

/**
 * 统一结果处理
 * @param res
 * @returns {null|*}
 */
function resultHandle(res) {
    if (res.statusCode !== 200) {
        Toast("服务器出现问题");
        return null;
    }
    if (res.data.code !== 200) {
        errorHandle(res.data);
        return null;
    }
    if (isNull(res.data.data)) {
        return "success";
    }
    return res.data.data


}

function requestWithDataByAuth(method, url, data, callback) {
    //判断token是否存在
    let token = wx.getStorageSync('token');
    if (isNull(token)) {
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
            callback(resultHandle(res));
        }
    })

}

function requestWithDataNoAuth(method, url, data, callback) {
    wx.request(
        {
            url: url,
            method: method,
            data,
            success(res) {
                callback(resultHandle(res));
            }
        }
    )

}

function requestWithoutDataAuth(method, url, callback) {
    //判断token是否存在
    let token = wx.getStorageSync('token');
    if (isNull(token)) {
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
                callback(resultHandle(res));
            }
        }
    )

}

function requestWithoutDataNoAuth(method, url, funcCallback) {
    wx.request(
        {
            url: url,
            method: method,
            success(res) {
                funcCallback(resultHandle(res));
            }
        }
    )
}

/**
 *
 * @param url
 * @param getCourseListCallback
 */
function getCourseList(url, getCourseListCallback) {
    requestWithoutDataNoAuth("GET", url, getCourseListCallback);
}

/**
 * 得到推荐课程 已认证
 * @returns {*}
 */
function getRecommendCourseListByAuth(callback) {
    requestWithoutDataAuth("GET", api.RecommendCourse, callback);

}

/**
 * 登录
 */
function goToLogin() {
    let userInfo = wx.getStorageSync("userInfo");
    //缓存中无用户信息
    if (isNull(userInfo)) {
        console.log("hey i  i")
        wx.showModal({
          title: '提示',
          content: '请登录后再操作',
          confirmText: '登录',
          success(res){
            if(res.confirm){
              wx.navigateTo({
                url: '/pages/login/login',
              });
            }
          }
        })
        
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
            requestWithDataNoAuth('POST', api.Login, data, loginCallback);

        }
    })
}

function loginCallback(res) {
  if(res!=null){
    wx.setStorageSync("token", res);
    goBackWithTimeout()
    getWxUserInfo()
  }
}

/**
 * 请求用户信息
 */
function getWxUserInfo() {
    requestWithoutDataAuth("GET", api.User, userInfoCallback);
}

function userInfoCallback(res) {
  if(res!=null){
    wx.setStorageSync("userInfo", res);

  }
}

let getAuthorization = function (options, callback) {
    let token = wx.getStorageSync('token');
    //处理token为空的情况
    if (isNull(token)) {
        goToLogin();
        return
    }

    wx.request({
        url: api.CosAuth,
        method: "GET",
        header: {
            "authorization": token,
        },
        success: function (result) {
            let data = result.data.data;
            console.log(data);
            let credentials = data.credentials;
            callback({
                TmpSecretId: credentials.tmpSecretId,
                TmpSecretKey: credentials.tmpSecretKey,
                XCosSecurityToken: credentials.sessionToken,
                ExpiredTime: data.expiredTime, // SDK 在 ExpiredTime 时间前，不会再次调用 getAuthorization
            })
        }
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
    return o === undefined || o == null || o === '' || o === [];
}
function isValidExtension(fileName) {
  return isFile(fileName)||isImage(fileName)
}
function isFile(fileName){
  var fileExtension = fileName.split('.').pop().toLowerCase();
  return ['doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx', 'pdf'].indexOf(fileExtension) !== -1
}

function isImage(fileName){
  var fileExtension = fileName.split('.').pop().toLowerCase();
  return [ 'png', 'jpg', 'jpeg'].indexOf(fileExtension) !== -1
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
    IsNull: isNull,
    IsValidExtension: isValidExtension,
    IsFile: isFile,
    IsImage: isImage,
};