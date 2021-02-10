// pages/profile-blog/profile-blog.js
const MAX_LIMIT = 10
const db = wx.cloud.database()
import formatTime from "../../utils/formatTime.js";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bloglist: [],
    isTouchMove: false,
    // 滑动偏移量
    currentX:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this._getListByCloud()
  },

  handleMovableChange(e) {
    if(
      e.detail.source === 'touch' ||
      e.detail.source === 'touch-out-of-bounds'
    ) {
      this.setData({
        isTouchMove: true,
      })
    } else {
      this.setData({
        isTouchMove: false
      })
    }
    this.setData({
      currentX: e.detail.x
    })
  },

  handleTouchestart(e){
    console.log(e)
  },

  handleTouchend(e){
    console.log(e)
    let ds = e.currentTarget.dataset
    if (this.data.isTouchMove) {
      if(this.data.currentX < -46) {
        this.data.bloglist[ds.index].x = -92
      }else {
        this.data.bloglist[ds.index].x = 0
      }
      this.setData({
        bloglist: this.data.bloglist
      })
    }
  },

  handleDetele(e) {
    console.log(e)
    // 从界面上移除
    const index = e.currentTarget.dataset.index
    this.data.bloglist.splice(index,1)
    this.setData({
      bloglist: this.data.bloglist
    });
    // 从数据库移除
    const bid = e.currentTarget.dataset.blogid
    db.collection('blog').doc(bid).remove({
      success: (res) => {
        wx.showToast({
          title: '删除成功',
        })
      },
      fail: (res) => {
        wx.showToast({
          title: '删除失败',
          icon: 'none'
        })
      }
    })
  },

  _getListByCloud(){
    wx.showLoading({
      title: '加载中',
    })
    wx.cloud.callFunction({
      name: 'blog',
      data: {
        $url: 'getListByOpenid',
        start: this.data.bloglist.length,
        count: MAX_LIMIT
      }
    }).then((res) => {
      console.log(res)
      let arr = res.result.data
      for(let i = 0,len =arr.length; i < len; i++) {
        arr[i].createTime = formatTime(new Date(arr[i].createTime))
        arr[i].x = 0
      }
      this.setData({
        bloglist: this.data.bloglist.concat(arr)
      })
      console.log(this.data.bloglist)
      wx.hideLoading()
    })
  },

  goBack(){
    wx.navigateBack({
      delta: 1,
    })
  },

  gotoDetail(e){
    console.log(e)
    wx.navigateTo({
      url: '../../pages/blog-detail/blog-detail?blogId='+e.currentTarget.dataset.blogid,
    })
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onShareAppMessage: function (e) {
    const blog = e.target.dataset.blog
    return {
      title: blog.content,
      path: `/pages/blog-detail/blog-detail?blogId=${blog._id}`
    }
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this._getListByCloud()
  },
})