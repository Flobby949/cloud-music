// pages/find/find.js
let keyword = ''
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cards:[
      {},{},{},{},{},{}
    ]
  },

  onSearch(event){
    keyword = event.detail.keyword
    console.log(keyword)
  },
  onPublish(){
    wx.getSetting({
      success: (res) => {
        console.log('当前设置' + JSON.stringify(res))
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: function(res){
              console.log(res)
              this.onLoginSuccess({
                detail: res.userInfo
              })
            }
          })
        } else {
          console.log('else')
          this.setData({
            modalShow: true,
          })
        }
      }
    })
  },

  onLoginSuccess(event) {
    const detail = event.detail
    console.log(detail.nickName)
    wx.navigateTo({
      url: '../publish/publish'
    })
  },
  onLoginFail(){
    wx.wx.showModal({
      title: '授权用户才能发布',
      content: '',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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