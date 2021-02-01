// components/progressBar/progressBar.js
const bg = wx.getBackgroundAudioManager()
let movableAreaWidth = 0  // 可移动区域宽度
let movableViewWidth = 0  // 移动元素宽度
let duration = 0 // 总时长
let current = -1  // 当前时间
let isMoving = false  //是否拖动
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    showTime: {
      currentTime: '00:00',
      totalTime: '00:00',
    },
    distance: 0,
    progress: 0,

  },
  lifetimes: {
    ready() {
      this._getDistance()
      this._bindBGM()
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    _getDistance() {
      const query = this.createSelectorQuery()
      query.select('.area').boundingClientRect()
      query.select('.view').boundingClientRect()
      query.exec((rect) => {
        console.log(rect)
        movableAreaWidth = rect[0].width
        movableViewWidth = rect[1].width
      })
    },

    _bindBGM() {
      bg.onPlay(() => {
        console.log('onPLay')
      })
      bg.onStop(() => {
        console.log('onStop')
      })
      bg.onPause(() => {
        console.log('onPause')
      })
      bg.onWaiting(() => {
        console.log('onWaiting')
      })
      bg.onCanplay(() => {
        console.log('onCanplay')
        duration = bg.duration
        if (typeof duration != 'undefined') {
          this._setTotalTime()
        } else {
          setTimeout(() => {
            this._setTotalTime()
          }, 1000)
        }
      })
      bg.onTimeUpdate(() => {
        if(!isMoving){
          const durationTime = bg.duration
          const currentTime = bg.currentTime
          const sec = currentTime.toString().split('.')[0]
          if (sec != current) {
            const currentFmt = this._timeFormat(currentTime)
            this.setData({
              distance: (movableAreaWidth - movableViewWidth) * currentTime / durationTime,
              progress: currentTime / durationTime * 100,
              ['showTime.currentTime']: `${currentFmt.min}:${currentFmt.sec}`
            })
            current = sec
          }
        }
      })
      bg.onEnded(() => {
        console.log('onEnded')
        this.triggerEvent('musicEnd')
      })
      bg.onError(() => {
        console.log('onError')
      })
    },

    _setTotalTime() {
      duration = bg.duration
      const durationFmt = this._timeFormat(duration)
      this.setData({
        ['showTime.totalTime']: `${durationFmt.min}:${durationFmt.sec}`
      })
    },
    _timeFormat(time) {
      let sec = Math.floor(time % 60)
      let min = Math.floor(time / 60)
      if (min < 10) {
        min = '0' + min
      }
      if (sec < 10) {
        sec = '0' + sec
      }
      return {
        'min': min,
        'sec': sec,
      }
    },
    onChange(event) {
      if (event.detail.source == 'touch') {
        this.data.progress = event.detail.x / (movableAreaWidth - movableViewWidth) * 100
        this.data.distance = event.detail.x
        isMoving = true
      }
    },
    onTouchEnd() {
      const currentTimeFmt = this._timeFormat(Math.floor(bg.currentTime))
      this.setData({
        progress: this.data.progress,
        distance: this.data.distance,
        ['showTime.currentTime']: `${currentTimeFmt.min}:${currentTimeFmt.sec}`
      })
      bg.seek(duration * this.data.progress / 100)
      isMoving = false
    }
  }
})
