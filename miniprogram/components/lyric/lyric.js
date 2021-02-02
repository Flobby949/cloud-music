// components/lyric/lyric.js
let lyricHeight = 0
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    isLyricShow: {
      type: Boolean,
      value: false,
    },
    lyric: String
  },

  observers: {
    lyric(lrc) {
      if (lrc === '暂无歌词') {
        let _lyrics = []
        _lyrics.push(lrc)
        this.setData({
          lyrics:[{
            lrc,
            time: 0,
          }],
          nowLyricIndex: -1
        })
      } else {
        this._parseLyric(lrc)
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    lyrics: [],
    nowLyricIndex: 0,
    scrollHeight: 0,
  },

  lifetimes: {
    ready() {
      wx.getSystemInfo({
        success(res) {
          lyricHeight = res.screenWidth / 750 * 80
        },
      })
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    update(currentTime) {
      let lrcList = this.data.lyrics
      if (lrcList.length == 0) {
        return
      }
      if (currentTime > lrcList[lrcList.length - 1].time) {
        if (this.data.nowLyricIndex != -1) {
          this.setData({
            nowLyricIndex: -1,
            scrollHeight: lrcList.length * lyricHeight
          })
        }
      }
      //计算每行歌词的滚动位置
      for (let i = 0, len = lrcList.length; i < len; i++) {
        if (currentTime <= lrcList[i].time) {
          this.setData({
            nowLyricIndex: i - 1,
            scrollHeight: (i - 1) * lyricHeight
          })
          break
        }
      }
    },
    _parseLyric(lyricSrc) {
      let lines = lyricSrc.split('\n')
      let _lyric = []
      lines.forEach(e => {
        // 正则表达式匹配时间
        let time = e.match(/\[(\d{2,}):(\d{2})(?:\.(\d{2,3}))?]/g)
        if (time != null) {
          //用时间作为分隔符
          let lrc = e.split(time)[1]
          if (lrc != '') {
            //正则匹配分，秒，毫秒
            let timeReg = time[0].match(/(\d{2,}):(\d{2})(?:\.(\d{2,3}))?/)
            let timeSec = parseInt(timeReg[1]) * 60 + parseInt(timeReg[2]) + parseInt(timeReg[3]) / 1000
            _lyric.push({
              lrc,
              time: timeSec,
            })
          }
        }
      })
      this.setData({
        lyrics: _lyric
      })
    }
  }
})
