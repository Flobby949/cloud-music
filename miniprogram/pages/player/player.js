// pages/player/player.js
let musiclist = []
// 当前播放歌曲
let playingIndex = 0
const BackgroundAudioManager = wx.getBackgroundAudioManager()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    picUrl: '',
    isPlaying: false,
    totalTime: '',
    currentTime: '',
    progressBarValue: '',
    progressBarMax: '',
    isLike: true,
    commentNumber: 132,
    singerName: '',
    album: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    playingIndex = options.index
    musiclist = wx.getStorageSync('musiclist')
    this._loadMusicDetail(options.musicId)
    this._autoPlay()
  },

  togglePlaying(){
    if(this.data.isPlaying){
      BackgroundAudioManager.pause()
    }else{
      BackgroundAudioManager.play()
    }
    this.setData({
      isPlaying: !this.data.isPlaying
    })
  },

  _loadMusicDetail(musicId){
    wx.showLoading({
      title: '加载中',
    })
    let music = musiclist[playingIndex]
    console.log(music)
    wx.setNavigationBarTitle({
      title: music.name,
    })
    this.setData({
      picUrl: music.al.picUrl
    })
    wx.cloud.callFunction({
      name: 'music',
      data: {
        musicId,
        $url: 'musicUrl',
      }
    }).then((res) => {
      console.log(res)
      const url = res.result.data[0].url
      if(url === null){
        wx.showToast({
          title: '没有权限播放',
        })
        BackgroundAudioManager.pause()
        this.setData({
          isPlaying: false
        })
        return
      }
      BackgroundAudioManager.src = url
      BackgroundAudioManager.title = music.name
      BackgroundAudioManager.coverImgUrl = music.al.picUrl
      BackgroundAudioManager.singer = music.ar[0].name
      this.setData({
        isPlaying: true
      })
      let that = this
      setTimeout(function(){
        that._showTime()
      },500)
      wx.hideLoading()
    })
  },
  onPrev(){
    playingIndex--
    if(playingIndex === -1){
      playingIndex = musiclist.length - 1
    }
    console.log(musiclist[playingIndex])
    this._loadMusicDetail(musiclist[playingIndex].id)
  },
  onNext(){
    playingIndex++
    if(playingIndex === musiclist.length){
      playingIndex = 0
    }
    console.log(musiclist[playingIndex])
    this._loadMusicDetail(musiclist[playingIndex].id)
  },
  _autoPlay(){
    BackgroundAudioManager.onEnded((res) => {
      this.onNext()
    })
  },
  seekTime(value){
    console.log(value.detail.value)
    let time = value.detail.value/1000
    BackgroundAudioManager.seek(time)
    this._currentTimeFormat(time)
  },
  seeking(value){
    let time = value.detail.value/1000
    this._currentTimeFormat(time)
  },
  _totalTimeFormat(time){
    wx.cloud.callFunction({
      name: 'dataFormat',
      data: {
        time: time
      }
    }).then((res) => {
      console.log(res)
      this.setData({
        totalTime: res.result
      })
    })
  },
  _currentTimeFormat(time){
    wx.cloud.callFunction({
      name: 'dataFormat',
      data: {
        time: time
      }
    }).then((res) => {
      this.setData({
        currentTime: res.result
      })
    })
  },
  _showTime(){
    console.log(this.data.isPlaying)
      if(this.data.isPlaying){
        this._totalTimeFormat(BackgroundAudioManager.duration)
        let that = this
        setInterval(function(){
          that._currentTimeFormat(BackgroundAudioManager.currentTime)
        },10)
        setInterval(function(){
          const total = BackgroundAudioManager.duration
          let current = BackgroundAudioManager.currentTime
          that.setData({
            progressBarValue: current*1000,
            progressBarMax: total*1000
          },1000)
        })
      }
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