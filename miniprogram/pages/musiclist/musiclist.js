// pages/musiclist/musiclist.js
let scrollTop = 0
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //歌曲列表
    musiclist: [],
    // 歌单信息（封面图和歌单名称)
    listInfo: {},
    isFavourite: false,
    isScorll:false,
    nickname: '',
    avatar: '',
    op: '',
    opfix: '0',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('musiclist')
    console.log(options)
    wx.showLoading({
      title: '加载中',
    })
    wx.cloud.callFunction({
      name: 'music',
      data: {
        playlistId: options.playlistId,
        $url: 'musiclist'
      }
    }).then((res) => {
      console.log(res)
      const pl = res.result.playlist
      console.log(pl)
      this,this.setData({
        musiclist: pl.tracks,
        listInfo: {
          coverImgUrl: pl.coverImgUrl,
          name: pl.name,
        }
      })
      this._setMusiclist()
      wx.hideLoading()
    })
  },

  changeFav(){
    this.setData({
      isFavourite: !this.data.isFavourite
    })
  },
  
  goBack(){
    wx.navigateBack({
      delta: 1,
    })
  },

  _setMusiclist(){
    wx.setStorageSync('musiclist', this.data.musiclist)
  },

  _watchPageStatus(){
    const query = wx.createSelectorQuery()
    query.select('.nav-bar').boundingClientRect()
    query.exec((rect) => {
      console.log(rect[0].top)
      scrollTop = rect[0].top
    })
  },

  _changeScorllStatus(top){
    let opop = 1
    let opopfix = 0
    if(top >= -10){
      opop = 1
      opopfix = 0
    }
    else if(top > -50){
      console.log('0')
      opop = 0.7
      opopfix = 0.3
    }
    else if(top > -100){
      console.log('-50')
      opop = 0.5
      opopfix = 0.5
    }
    else if(top > -150){
      console.log('-100')
      opop = 0.3
      opopfix = 0.7
    }
    else if(top < -150){
      opop = 0
      opopfix = 1
    }
    this.setData({
      op:opop,
      opfix:opopfix
    })
  },

  onPageScroll: function() {
    this._watchPageStatus()
    this._changeScorllStatus(scrollTop)
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

  }
})