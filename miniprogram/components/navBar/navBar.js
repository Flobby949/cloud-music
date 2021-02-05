// components/navBar/navBar.js
const app = getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },
  options: {
    multipleSlots: true,
  },
  /**
   * 组件的初始数据
   */
  data: {
    statusBarHeight: '',
  },

  lifetimes: {
    ready(){
      this.setData({
        statusBarHeight: app.globalData.sysInfo.statusBarHeight,
      })
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
