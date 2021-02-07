// pages/publish/publish.js
const MAX_WARDS_NUM = 140
const MAX_IMG_NUM = 9
let content = ''
let userInfo = {}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    wordsNum: 0,
    footerBottom: 10,
    images: [],
    selectPhoto: true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    userInfo = options
  },
  onInput(e){
    console.log(e.detail.value)
    let wordsNum = e.detail.value.length
    if (wordsNum >= MAX_WARDS_NUM) {
      wordsNum = `最大的字数为${MAX_WARDS_NUM}`
    }
    this.setData({
      wordsNum
    })
  },
  onFocus(e){
    this.setData({
      footerBottom: e.detail.height,
    })
  },

  onBlur(){
    this.setData({
      footerBottom: 10
    })
  },

  onChooseImage(){
    let max = MAX_IMG_NUM - this.data.images.length
    wx.chooseImage({
      count: max,
      sizeType: ['original','compressed'],
      sourceType: ['album','camera'],
      success: (res) => {
        this.setData({
          images: this.data.images.concat(res.tempFilePaths)
        })
        max = MAX_IMG_NUM - this.data.images.length
        this.setData({
          selectPhoto: max <= 0 ? false:true
        })
      },
    })
  },

  onPreviewImage(e){
    wx.previewImage({
      urls: this.data.images,
      current: e.target.dataset.imgsrc,
    })
  },

  onDelImage(e){
    this.data.images.splice(e.target.dataset.index, 1)
    this.setData({
      images: this.data.images
    })
    if (this.data.images.length == 8){
      this.setData({
        selectPhoto: true
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  goBack(){
    wx,wx.navigateBack({
      delta: 1,
    })
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