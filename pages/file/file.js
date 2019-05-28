let api = require('../../common/api');
let utils = require('../../common/utils');
import Dialog from '../../component/zanui/dialog/dialog';


Page({

  /**
   * 页面的初始数据
   */
  data: {
    courseCode: null,
    fileList: null,
    buttons: [{
        label: 'UploadImg',
        icon: '/statics/iconfont/img.png'
      },
      {
        label: 'UploadFile',
        icon: '/statics/iconfont/file.png'
      }
    ],
    showModal: false,
    currentFile: {
      fileName: null,
      fileDescription: null
    }
  },

  /**
   * 点击加号按钮事件
   * @param {参数} e 
   */
  onClickButton(e) {
    let that = this;
    //判断点击按钮
    if (e.detail.index === 0) {
      that.onUploadImg();
    } else {
      that.onUploadFile();
    }
  },

  /**
   * 点击从相册上传
   */
  onUploadImg() {
    wx.chooseImage({
      count: 1,
      sourceType: ['album', 'camera'],
      sizeType: ['original'],
      success(res) {
        wx.setStorageSync('tempFile', res.tempFiles[0]);
        wx.navigateTo({
          url: '/pages/upload/upload',
        })
      }
    })
  },
  /**
   * 点击从聊天文件中上传
   */
  onUploadFile() {
    //Todo 显示提示信息
    wx.chooseMessageFile({
      count: 1,
      success(res) {
        wx.setStorageSync('tempFile', res.tempFiles[0]);
        wx.navigateTo({
          url: '/pages/upload/upload',
        })
      }
    })
  },

  onCloseModal() {
    this.setData({
      close: false
    });
  },

  onShowModal(e) {
    let index = e.currentTarget.dataset.index
    let file = this.data.fileList[index]
    this.setData({
      showModal: true,
      canPreview: utils.IsValidExtension(file.cosName),
      index: index,
      currentFile: {
        fileName: this.data.fileList[index].fileName,
        fileDescription: this.data.fileList[index].fileDescription
      }
    });

  },

  onConfirmModal(e) {
    let that = this
    if (that.data.canPreview) {
      that.preview()
    }
  },
  // onTapButton(e) {
  //     wx.chooseMessageFile({
  //         count: 1,
  //         success(res) {
  //             wx.setStorageSync('tempFile', res.tempFiles[0]);
  //             wx.navigateTo({
  //                 url: '/pages/upload/upload',
  //             })
  //         }
  //     })
  // },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getFileList()

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.getFileList()

  },

  /**
   * 点击获取链接下载
   * @param {*} e 参数
   */
  onDownload(e) {
    let that = this
    let index = e.currentTarget.dataset.index
    //判断是否登录
    let token = wx.getStorageSync('token');
    if (utils.IsNull(token)) {
      //未登录
      utils.Login();
    } else {
      //已登录
      that.setData({
        index: index
      })
      let url = this.getUrl(e);
      wx.setClipboardData({
        data: url
      });
    }
  },

  /**
   * 获取下载链接
   */
  getUrl() {
    let that = this;
    let index = that.data.index
    let id = that.data.fileList[index].id;
    this.addDownloadCount(id);
    return api.CosURL + '/' + that.data.fileList[index].cosName;
  },

  /**
   * 预览函数
   */
  preview() {
    let that = this
    //预览需判断是否登录
    let token = wx.getStorageSync('token')
    if (utils.IsNull(token)) {
      //未登录
      utils.Login()
    } else {
      //已登录
      let url = this.getUrl();
      //下载文件到本地
      wx.downloadFile({
        url: url,
        success(res) {
          const filePath = res.tempFilePath;
          //判断文件类型
          if (utils.IsFile(that.data.currentFile.fileName)) {
            //是文件
            wx.openDocument({
              filePath,
            })
          } else {
            //为图片
            wx.previewImage({
              urls: [url],
            })
          }
        }
      })
    }
  },

  // cannotPreview() {
  //   Dialog.alert({
  //     message: '仅支持以下类型的文件预览：pdf ppt pptx doc docx xls jpg png',
  //     // closeOnClickOverlay: true
  //   }).then(() => {
  //     // on close
  //   });
  // },

  /**
   * 添加下载量
   * @param {文件id} id 
   */
  addDownloadCount(id) {
    utils.RequestWithoutDataAuth('GET', api.AddDownloadCount + '/' + id, this.defaultCallback);
  },
  defaultCallback(res) {},

  getFileList() {
    let courseCode = wx.getStorageSync("courseCode");
    utils.RequestWithoutDataNoAuth('GET', api.GetCourseFile + '/' + courseCode, this.getFileListCallback);

  },
  getFileListCallback(response) {
    if(response==null){
      //返回错误
      that.setData({
        fileList: null
      })
    }

    let that = this;
    //返回正常
    //时间显示格式转换
    for (let i = 0; i < response.length; i++) {
      response[i].createTime = utils.ToDate(response[i].createTime)
    }
    that.setData({
      fileList: response
    })
  },





  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },



  //---------以上为代码-----------


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},
  /**
   * 生命周期函数--监听页面隐藏
   */


  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },



  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  }
});