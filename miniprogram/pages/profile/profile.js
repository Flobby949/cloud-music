// pages/profile/profile.js

Page({
  data: {
    isOnline: false,
    userId: '',
    nickname: '',
    avatar: '',
    playlist: [],
  },

  onLoad: function () {

  },

  // 登录
  login() {
    console.log('login')
    wx.cloud.callFunction({
      name: 'profile',
      data: {
        $url: 'loginByPwd',
        phone: '18962521753',
        password: 'JCXlqq99'
      }
    }).then((res) => {
      console.log(res)
      if (res.result.code == 200) {
        this.setData({
          userId: res.result.account.id,
          isOnline: true
        })
        this._getUserInfo(this.data.userId)
        this._getUserPlaylist(this.data.userId)
        wx.showToast({
          title: '登录成功'
        })
        wx.setStorageSync('isOnline', this.data.isOnline)
      } else{
        wx.showToast({
          icon: 'none',
          title: '登录失败'
        })
      }
    })
  },

  //获取用户歌单
  _getUserPlaylist(userId) {
    console.log('getUserPlaylist')
    wx.cloud.callFunction({
      name: 'profile',
      data: {
        userId,
        $url: 'getUserPlaylist',
      }
    }).then((res) => {
      console.log(res.result.playlist)
      this.setData({
        playlist: res.result.playlist
      })
    })
  },

  // 获取用户信息
  _getUserInfo(userId){
    console.log('getUserInfo')
    wx.cloud.callFunction({
      name: 'profile',
      data: {
        userId,
        $url: 'getUserInfo',
      }
    }).then((res) => {
      console.log(res.result)
      this.setData({
        nickname: res.result.profile.nickname,
        avatar: res.result.profile.avatarUrl
      })
      wx.setStorageSync('nickname', this.data.nickname)
      wx.setStorageSync('avatar', this.data.avatar)
    })
  },

})


  // 上传图片
  // doUpload: function () {
  //   // 选择图片
  //   wx.chooseImage({
  //     count: 1,
  //     sizeType: ['compressed'],
  //     sourceType: ['album', 'camera'],
  //     success: function (res) {
  //       wx.showLoading({
  //         title: '上传中',
  //       })

  //       const filePath = res.tempFilePaths[0]

  //       // 上传图片
  //       const cloudPath = `my-image${filePath.match(/\.[^.]+?$/)[0]}`
  //       wx.cloud.uploadFile({
  //         cloudPath,
  //         filePath,
  //         success: res => {
  //           console.log('[上传文件] 成功：', res)

  //           app.globalData.fileID = res.fileID
  //           app.globalData.cloudPath = cloudPath
  //           app.globalData.imagePath = filePath

  //           wx.navigateTo({
  //             url: '../storageConsole/storageConsole'
  //           })
  //         },
  //         fail: e => {
  //           console.error('[上传文件] 失败：', e)
  //           wx.showToast({
  //             icon: 'none',
  //             title: '上传失败',
  //           })
  //         },
  //         complete: () => {
  //           wx.hideLoading()
  //         }
  //       })
  //     },
  //     fail: e => {
  //       console.error(e)
  //     }
  //   })
  // },