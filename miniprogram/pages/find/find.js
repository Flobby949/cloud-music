// pages/find/find.js
let keyword = ''
Page({

  /**
   * 页面的初始数据
   */
  data: {
    modalShow: false,
    blogList: [],
  },

  onLoginSuccess(event) {
    const detail = event.detail
    console.log(detail)
    wx.navigateTo({
      url: `../publish/publish?nickName=${detail.nickName}&avatarUrl=${detail.avatarUrl}`
    })
  },

  onSearch(event){
    keyword = event.detail.keyword
    console.log(keyword)
    this.setData({
      blogList: []
    })
    this._loadBlogList(0)
  },
  onPublish(){
    wx.getSetting({
      success: (res) => {
        console.log('当前设置' + JSON.stringify(res))
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: (res) => {
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

  onLoginFail(){
    wx.showModal({
      title: '授权用户才能发布',
      content: '',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this._loadBlogList()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  _loadBlogList(start = 0){
    wx.showLoading({
      title: '数据加载中',
    })
    wx.cloud.callFunction({
      name: 'blog',
      data: {
        keyword,
        start,
        count: 10,
        $url: 'list',
      }
    }).then((res) => {
      console.log(res)
      this.setData({
        blogList: this.data.blogList.concat(res.result)
      })
      console.log(this.data.blogList)
      wx.hideLoading()
      wx.stopPullDownRefresh()
    })
  },

  gotoDetail(e){
    wx.navigateTo({
      url: '../../pages/blog-detail/blog-detail?blogId='+e.target.dataset.blogid,
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
    this.setData({
      blogList: []
    })
    this._loadBlogList()
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