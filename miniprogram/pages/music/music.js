// pages/music/music.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls:[
      {
        url:'http://p1.music.126.net/zUv2mRobckK7Tdn2bp9iSA==/109951165664840470.jpg?imageView&quality=89'
      },
      {
        url:'http://p1.music.126.net/C9I9GxpvRX7nCZyXNBeqOw==/109951165664694558.jpg?imageView&quality=89'
      },
      {
        url:'http://p1.music.126.net/q5rKcBx9Y0V37DsUSaQKXg==/109951165664695730.jpg?imageView&quality=89'
      },
      {
        url:'http://p1.music.126.net/WOoIZuva_umxxzYOvWINLA==/109951165664707565.jpg?imageView&quality=89'
      },
      {
        url:'http://p1.music.126.net/pOXTFta-mhTpZOGhBBWvhQ==/109951165664682857.jpg?imageView&quality=89'
      },
      {
        url:'http://p1.music.126.net/UdSM2BmqY_h_t9HAOzb5dQ==/109951165664710664.jpg?imageView&quality=89'
      },
      {
        url:'http://p1.music.126.net/Z90NF2dHuBYrV6x-U9jJJQ==/109951165664719544.jpg?imageView&quality=89'
      },
      {
        url:'http://p1.music.126.net/j0gp3gBDRRoqIXxAs0v7oA==/109951165664720877.jpg?imageView&quality=89'
      },
    ],
    playlist:[],
    // playlist:[
    //   {
    //     "id":"1001",
    //     "playCount":"416161",
    //     "name":"【翻唱】温柔不是我说",
    //     "picUrl":"http://p2.music.126.net/PJylNWy_2-jI7LRgQ2Cm6w==/109951165649129522.jpg?param=140y140"
    //   },
    //   {
    //     "id":"1002",
    //     "playCount":"184141",
    //     "name":"所有好运都会与你撞个满怀",
    //     "picUrl":"http://p3.music.126.net/l_c3SARUoRRhNOLkhZJByA==/109951165077363897.jpg?param=140y140"
    //   },
    //   {
    //     "id":"1003",
    //     "playCount":"52215",
    //     "name":"温柔说唱|全都是想悄悄捎给你的冬日心事",
    //     "picUrl":"http://p3.music.126.net/JgcUgFBBEYc7JT6zLsDh3A==/109951165545300073.jpg?param=140y140"
    //   },
    //   {
    //     "id":"1004",
    //     "playCount":"41543",
    //     "name":"难平的不是山海 是你的心",
    //     "picUrl":"http://p4.music.126.net/NIVUVYyhkEWyLzMUOqxITg==/109951165414672298.jpg?param=140y140"
    //   },
    //   {
    //     "id":"1005",
    //     "playCount":"53135",
    //     "name":"民谣|故事易写，岁月难唱",
    //     "picUrl":"http://p3.music.126.net/u62ELJtw61CNPwO9Wapleg==/109951165432573790.jpg?param=140y140"
    //   },
    //   {
    //     "id":"1006",
    //     "playCount":"11515",
    //     "name":"我以为长大会很快乐",
    //     "picUrl":"http://p3.music.126.net/P0ZvFHL0Qw8aaiECpzCK2w==/109951165320851584.jpg?param=140y140"
    //   },
    // ],
    song:[
      {
        "id":"1",
        "title":"天外来物",
        "attribution":"薛之谦 - 天外来物",
      },
      {
        "id":"2",
        "title":"像风一样",
        "attribution":"薛之谦 - 渡",
      },
      {
        "id":"3",
        "title":"演员",
        "attribution":"薛之谦 - 绅士",
      },
      {
        "id":"4",
        "title":"动物世界",
        "attribution":"薛之谦 - 渡",
      },
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this._getPlayList()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

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

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  _getPlayList(){
    wx.showLoading({
      title: '加载中',
    })
    wx.cloud.callFunction({
      name: 'playlist'
    }).then((res) => {
      console.log(res)
      this.setData({
        playlist: res.result
      })
      wx.hideLoading()
    })
  }
})