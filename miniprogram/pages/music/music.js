// pages/music/music.js
const MAX_LIMIT = 15
const db = wx.cloud.database()
let scrollTop = 0
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isOnline: false,
    isScroll: false,
    nickname: '',
    imgUrls: [
      {
        url: 'http://p1.music.126.net/zUv2mRobckK7Tdn2bp9iSA==/109951165664840470.jpg?imageView&quality=89'
      },
      {
        url: 'http://p1.music.126.net/C9I9GxpvRX7nCZyXNBeqOw==/109951165664694558.jpg?imageView&quality=89'
      },
      {
        url: 'http://p1.music.126.net/q5rKcBx9Y0V37DsUSaQKXg==/109951165664695730.jpg?imageView&quality=89'
      },
      {
        url: 'http://p1.music.126.net/WOoIZuva_umxxzYOvWINLA==/109951165664707565.jpg?imageView&quality=89'
      },
      {
        url: 'http://p1.music.126.net/pOXTFta-mhTpZOGhBBWvhQ==/109951165664682857.jpg?imageView&quality=89'
      },
      {
        url: 'http://p1.music.126.net/UdSM2BmqY_h_t9HAOzb5dQ==/109951165664710664.jpg?imageView&quality=89'
      },
      {
        url: 'http://p1.music.126.net/Z90NF2dHuBYrV6x-U9jJJQ==/109951165664719544.jpg?imageView&quality=89'
      },
      {
        url: 'http://p1.music.126.net/j0gp3gBDRRoqIXxAs0v7oA==/109951165664720877.jpg?imageView&quality=89'
      },
    ],
    playlist: [],
    op: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this._getPlayList()
  },

  _getUserInfo() {
    this._searchOnlineStatus()
    if (this.data.isOnline) {
      this.setData({
        nickname: wx.getStorageSync('nickname')
      })
    }
  },

  _searchOnlineStatus() {
    let flag = wx.getStorageSync('isOnline')
    if (flag) {
      this.setData({
        isOnline: flag
      })
    }
    console.log(this.data.isOnline)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  onPageScroll: function(e) {
    scrollTop = e.scrollTop
    let _op = (scrollTop / 200 > 1) ? 1 : scrollTop / 200
    this.setData({
      op : _op
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this._searchOnlineStatus()
    this._getUserInfo()
  },

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
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.setData({
      playlist: []
    })
    this._getPlayList()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this._getPlayList()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  _getPlayList() {
    wx.showLoading({
      title: '加载中',
    })
    wx.cloud.callFunction({
      name: 'music',
      data: {
        $url: 'playlist',
        start: this.data.playlist.length,
        count: MAX_LIMIT
      }
    }).then((res) => {
      console.log(res)
      this.setData({
        playlist: this.data.playlist.concat(res.result.data)
      })
      wx.stopPullDownRefresh()
      wx.hideLoading()
    }).catch((err) => {
      console.log(err)
      console.log('请求music-playlist方法失败')
    })
  }
})