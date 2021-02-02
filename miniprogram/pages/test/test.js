// pages/test/test.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      animationObj: {},
      animation: {},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // wx.cloud.callFunction({
    //   name: 'getPlayList'
    // }).then((res) => {
    //   console.log(res)
    // })
    this.$nextTick(()=>{
      this.loadAnimation()
  })
  },

  loadAnimation() { //初始化动画函数
    let that = this;
    let query = wx.createSelectorQuery();   //创建选择器
    query.select('.info').boundingClientRect(); //获取盒子大小位置等信息的请求（未发送的请求）
    query.select('.songName').boundingClientRect(); //同上
    query.exec(function(res){   //发送以上请求，返回的是所有请求的结果数组
        console.log('请求结果',res);
        let boxWidth = res[0].width;  //获取外盒子的宽度
        let textWidth = res[1].width;  //获取文字长度
        if(boxWidth<textWidth) {  //如果文字超出盒子，就滚动播放
            that.data.animationObj = wx.createAnimation(); //创建一个动画实例 animation
            that.data.startAnimation(boxWidth,textWidth);
        }
    })
},
startAnimation(boxWidth,textWidth,step) { //执行动画函数
    let that = this;
    console.log('执行动画开始');
    step == undefined && (step = 0); //第一次进入的时候判断step为0,step只有两种状态，播放滚到最左边(step为0或者2的倍数)和滚到最后边
    let speed = 12; //滚动速度
    let duration = (textWidth-boxWidth)*1000/speed; //滚动的持续时间
    this.data.animationObj.translateX((!step || step%2==0)?(boxWidth-textWidth):0).step({duration}); //.step执行动画,duration参数为持续时间
    this.data.animation = this.data.animationObj.export(); //export 方法导出动画数据传递给组件的 animation 属性,执行完export会清除上一次动画
    this.$nextTick(()=>{ //等dom更新完成后再执行，dom渲染的过程是异步的
        setTimeout(()=>{ //等动画执行完再进行下一次动画
            that.startAnimation(boxWidth,textWidth,++step);
        },duration)
    })
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