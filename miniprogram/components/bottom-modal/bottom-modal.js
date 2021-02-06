// components/bottom-modal/bottom-modal.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    modalShow: Boolean
  },

  options: {
    // 子组件使用APP引入的iconfont样式
    styleIsolation: 'apply-shared',
    // 使用多个插槽
    multipleSlots: true,
  },

  /**
   * 组件的初始数据
   */
  data: {
    
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onClose() {
      this.setData({
        modalShow: false,
      })
    }
  }
})
