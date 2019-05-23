const api = require('api.js')
var COS = require('../common/cos-wx-sdk-v5.js')
var TaskId;
function errorToast(message) {
  wx.showToast({
    title: message,
    icon: "none"
  })
}

function isSignExpired(message) {
  return message == "签名认证失败"
}

function isNull(str) {
    return str == null || str == "" || str == " " || str == undefined
}

function getCourseList(url) {
  let token = wx.getStorageSync('token')
  //处理token为空的情况
  if (isNull(token)) {
    goToLogin()
    return null
  }

  wx.request({
    url: url,
    method: 'GET',
    header: {
      "authorization": token,
    },
    success: res => {
      if (res.statusCode != 200) {
        errorToast("服务器出现问题")
        //Todo 网络故障处理
        return null
      }

      if (res.data.code != 200) {
        //返回不正常
        if (isSignExpired(res.data.message)) {
          //token失效
          goToLogin()
          return null
        }
        //其他错误
        errorToast(res.data.message)
        return null
      }
      //返回正常
      console.log(res.data.data)
      return res.data.data
    }
  })
}

function goToLogin() {
  let userInfo = wx.getStorageSync("userInfo")
  //缓存中无用户信息
    if (userInfo == null || userInfo == undefined || userInfo == "") {
    wx.navigateTo({
      url: '/pages/login/login',
    })
  } else {
    console.log(userInfo)
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        console.log(res.code)
        wx.request({
          url: api.Login,
          method: 'POST',
          data: {
            code: res.code,
            userInfo: userInfo,
          },
          success: res => {
            if (res.data.code == 200) {
              let token = res.data.data
              console.log(token)
              wx.setStorageSync('token', token)
                getUserInfo()
              wx.navigateBack({
                delta: 1
              })
            } else {
              console.log(res.data.message)
            }
          }
        })
      }
    })
  }
}

function getUserInfo() {
    let token = wx.getStorageSync('token')
    //处理token为空的情况
    if (isNull(token)) {
        this.goToLogin()
        return
    }
    wx.request({
        url: api.User,
        method: "GET",
        header: {
            "authorization": token,
        },
        success: res => {

            if (res.statusCode != 200) {
                errorToast("服务器出现问题")
                return
            }
            if (res.data.code != 200) {
                //返回不正常
                if (isSignExpired(res.data.message)) {
                    //token失效
                    goToLogin()
                    return
                }
                //其他错误
                errorToast(res.data.message)
                return
            }
            //返回正常
            console.log(res.data.data)
            wx.setStorageSync("userInfo", res.data.data);
        }
    })
}

var getAuthorization = function (options, callback) {
    let token = wx.getStorageSync('token')
    //处理token为空的情况
    if (isNull(token)) {
        this.goToLogin()
        return
    }

    wx.request({
        url: api.CosAuth,
        method: "GET",
        header: {
            "authorization": token,
        },
        success: function (result) {
            var data = result.data.data;
            console.log(data)
            var credentials = data.credentials;
            callback({
                TmpSecretId: credentials.tmpSecretId,
                TmpSecretKey: credentials.tmpSecretKey,
                XCosSecurityToken: credentials.sessionToken,
                ExpiredTime: data.expiredTime, // SDK 在 ExpiredTime 时间前，不会再次调用 getAuthorization
            })
        }
    })
};
var cos = new COS({
    getAuthorization: getAuthorization
})
// 回调统一处理函数
var requestCallback = function (err, data) {
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
            title: '请求成功',
            icon: 'success',
            duration: 3000
        });
    }
};
// 展示的所有接口
var dao = {
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
module.exports = {
  ErrorToast: errorToast,
  IsSignExpired: isSignExpired,
  Login: goToLogin,
  IsNull: isNull,
    GetCourseList: getCourseList,
    CosDao: dao
}