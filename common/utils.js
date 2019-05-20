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

function goToLogin() {
  let userInfo = wx.getStorageSync("userInfo")
  //缓存中无用户信息
  if (userInfo == null|| userInfo=='') {
    console.log("hey h")
    wx.redirectTo({
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
              wx.setStorageSync('token', token)
            } else {
              console.log(res.data.message)
            }
          },
          fail: res => {
            errorToast("网络错误")
          }

        })
      }
    })
  }


}

module.exports = {
  ErrorToast: errorToast,
  IsSignExpired: isSignExpired,
  Login: goToLogin,
}