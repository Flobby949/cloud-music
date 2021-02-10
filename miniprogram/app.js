//app.js
App({
  onLaunch: function (options) {
    // console.log('onLaunch 执行')
    // console.log(options)
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        //   此处请填入环境 ID, 环境 ID 可打开云控制台查看
         env: 'flobby-9gntrh5195123e3d',
        traceUser: true,
      })
    }

    this.getOpenid()

    this.globalData = {
      sysInfo: this.getSysInfo(),
      openid: -1,
    }
  },

  getSysInfo:function(){
    let systemInfo = wx.getSystemInfoSync()
    let pxToRpx = 750 / systemInfo.windowWidth;
    let statusBarHeight = systemInfo.statusBarHeight
    let rect = wx.getMenuButtonBoundingClientRect()
    const sysInfo = {
      pxToRpx,
      statusBarHeight,
      rect
    }
    return sysInfo
  },

  getOpenid(){
    wx.cloud.callFunction({
      name: 'login'
    }).then((res) => {
      const openid = res.result.openid
      this.globalData.openid = openid
      if (wx.getStorageSync(openid) == '') {
        wx.setStorageSync(openid, [])
      }
    })
  },



  onShow(options) {
    console.log('onShow 执行')
    console.log(options)
  }
})
