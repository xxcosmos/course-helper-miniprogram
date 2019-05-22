const api = require('api.js')

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
  if (userInfo == null || userInfo == undefined || userInfo=="") {
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
module.exports = {
  ErrorToast: errorToast,
  IsSignExpired: isSignExpired,
  Login: goToLogin,
  IsNull: isNull,
  GetCourseList: getCourseList
}