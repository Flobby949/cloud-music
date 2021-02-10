// pages/profile/profile.js

Page({
  data: {
    songNum: 0,
    blogNum: 0
  },

  onLoad: function () {

  },

  onTapQrCode(){
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