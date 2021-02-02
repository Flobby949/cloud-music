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
    isLike: false,
    commentNumber: 132,
    songName: '',
    singerName: '',
    album: '',
    isLyricShow: false,
    lyric: '传给歌词组件的歌词',
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

  onLyricShow(){
    this.setData({
      isLyricShow: !this.data.isLyricShow
    })
  },

  _setMusicInfo(musicId){
    wx.cloud.callFunction({
      name: 'music',
      data: {
        musicId,
        $url: 'musicInfo'
      }
    }).then((res) => {
      console.log(res.result.songs[0])
      const info = res.result.songs[0]
      this.setData({
        songName: info.name,
        singerName: info.ar[0].name,
        album: info.al.name
      })
    })
  },

  goBack(){
    console.log('back')
    wx.navigateBack({
      delta: 1,
    })
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
      this.setData({
        isPlaying: true
      })
      this._setMusicInfo(musicId)
      BackgroundAudioManager.src = url
      BackgroundAudioManager.title = music.name
      BackgroundAudioManager.coverImgUrl = music.al.picUrl
      BackgroundAudioManager.singer = music.ar[0].name
      // let that = this
      // setTimeout(function(){
      //   that._showTime()
      // },500)
      wx.hideLoading()
      wx.cloud.callFunction({
        name: 'music',
        data: {
          musicId,
          $url: 'lyric',
        }
      }).then((res) => {
        let lyric = '暂无歌词'
        const lrc = res.result.lrc
        if(lrc){
          lyric = lrc.lyric
        }
        this.setData({
          lyric
        })
      })

    })
  },

  onPrev(){
    this.setData({
      isPlaying: false
    })
    playingIndex--
    if(playingIndex === -1){
      playingIndex = musiclist.length - 1
    }
    console.log(musiclist[playingIndex])
    this._loadMusicDetail(musiclist[playingIndex].id)
  },
  onNext(){
    this.setData({
      isPlaying: false
    })
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
  // seekTime(value){
  //   console.log(value.detail.value)
  //   let time = value.detail.value
  //   this._currentTimeFormat(time)
  //   BackgroundAudioManager.seek(time)
  // },
  // seeking(value){
  //   let time = value.detail.value
  //   this._currentTimeFormat(time)
  // },
  // _totalTimeFormat(time){
  //   let total = this._timeFormat(time)
  //   this.setData({
  //     totalTime: total
  //   })
  // },
  // _currentTimeFormat(time){
  //   let current = this._timeFormat(time)
  //   this.setData({
  //     currentTime: current
  //   })
  // },
  // _timeFormat(time){
  //   let sec = time%60
  //   let min = (time-sec)/60
  //   if(min < 10){
  //     min = '0'+min
  //   }
  //   sec = parseInt(sec)
  //   if(sec < 10){
  //     sec = '0'+sec
  //   }
  //   return `${min}:${sec}`
  // },
  // _showTime(){
  //     if(this.data.isPlaying){
  //       this._totalTimeFormat(BackgroundAudioManager.duration)
  //       let that = this
  //       setInterval(function(){
  //         that._currentTimeFormat(BackgroundAudioManager.currentTime)
  //       },500)
  //       setInterval(function(){
  //         const total = BackgroundAudioManager.duration
  //         let current = BackgroundAudioManager.currentTime
  //         that.setData({
  //           progressBarValue: current,
  //           progressBarMax: total
  //         },500)
  //       })
  //     }
  // },
  changeFavorite(){
    this.setData({
      isLike: !this.data.isLike
    })
    console.log(this.data.isLike)
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