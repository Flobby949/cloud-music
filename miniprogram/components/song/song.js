// components/song/song.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    musiclist: Array
  },

  /**
   * 组件的初始数据
   */
  data: {
    playingId : -1,
  }, 

  /**
   * 组件的方法列表
   */
  methods: {
    onSelect(event){
      console.log(event.currentTarget.dataset)
      const ds = event.currentTarget.dataset
      this.setData({
        playingId: ds.musicid
      })
      
      wx.navigateTo({
        url: `../../pages/player/player?musicId=${ds.musicid}&index=${ds.index}`,
      })
    }
  }
})
