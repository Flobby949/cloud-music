// pages/publish/publish.js
const MAX_WARDS_NUM = 140
const MAX_IMG_NUM = 9
let content = ''
let userInfo = {}
const db = wx.cloud.database()
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
    content = e.detail.value
  },
  send(){
    //流程
    //图片 -> 云存储 -> 返回云文件id
    // 数据 -> 云数据库(内容，图片fileID，openid，昵称，头像，时间)

    // 对textarea判空
    console.log(content)
    if(content.trim() === '') {
      wx.showModal({
        title: '请输入内容',
        content: ''
      })
      return
    }

    //加载动画
    wx.showLoading({
      title: '发布中',
      mask: 'true'
    })

    //上传文件
    let promiseArr = []
    let fileIds = []
    //循环遍历图片数组，上传云存储
    for(let i = 0, len = this.data.images.length; i < len; i++){
      //每次上传都创建一个异步对象，resolve成功，reject失败
      let p = new Promise((resolve,reject) => {
        let item = this.data.images[i]
        // 取出文件拓展名
        let suffix = /\.\w+$/.exec(item)[0]
        console.log(suffix)
        // 调用文件上传api，传递参数（云端存储路径，本地存储路径）
        // 避免重复文件名覆盖之前的文件，文件名拼接时间戳，随机数
        wx.cloud.uploadFile({
          cloudPath: 'blog/' + Date.now() + '-' +Math.random() * 100000 + suffix,
          filePath: item,
          success: (res) => {
            // 上传成功后获取文件id，追加到id数组
            fileIds = fileIds.concat(res.fileID)
            // 继续下一个异步任务
            resolve()
          },
          // 失败处理
          fail: (err) => {
            console.log(err)
            reject()
          }
        })
      })
      // 将异步任务推入异步任务数组
      promiseArr.push(p)
    }

    // 数组存入云数据库
    // Promise.all的resolve回调执行是在所有的promise都回调结束
    Promise.all(promiseArr).then((res) => {
      // 操作数据库blog集合，执行新增
      console.log(userInfo)
      db.collection('blog').add({
        data: {
          ...userInfo,  //使用延展操作符... 取得userinfo对象的所有属性（昵称，头像）
          content,
          imgs: fileIds,
          createTime: db.serverDate(), // 服务器时间
        }
      }).then((res) => {
        console.log(res)
        wx.hideLoading()
        wx.showToast({
          title: '发布成功',
        })
        wx.navigateBack()
        const pages = getCurrentPages()
        const prevPage = pages[pages.length - 2]
        prevPage.onPullDownRefresh()
      })
    }).catch((err) => {
      wx.hideLoading()
      wx.showToast({
        icon: 'none',
        title: '发布失败',
      })
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