// pages/profile/profile.js
const app = getApp()
let songNum = 0
let blogNum = 0
Page({
  data: {
    songNum: 0,
    blogNum: 0
  },

  onLoad: function () {
    this._getUserData()
  },

  onShow: function () {
    this._getUserData()
  },

  _getUserData() {
    const playHistory = wx.getStorageSync(app.globalData.openid)
    songNum = playHistory.length
    wx.cloud.database().collection('blog')
      .where({
        _openid: app.globalData.openid
      })
      .get()
      .then((res) => {
        blogNum = res.data.length
        this.setData({
          songNum,
          blogNum,
        })
      })

  },

  onTapQrCode() {
    wx.showLoading({
      title: '生成中',
    })
    // 调用云函数
    wx.cloud.callFunction({
      name: 'getQrCode',
    }).then((res) => {
      console.log(res)
      const fileId = res.result
      wx.previewImage({
        urls: [fileId],
        current: fileId
      })
      wx.hideLoading()
    })
  },

})