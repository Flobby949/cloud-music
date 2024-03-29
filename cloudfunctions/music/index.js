// 云函数入口文件
const cloud = require('wx-server-sdk')

//引入路由
const TcbRouter = require('tcb-router')
const axios = require('axios')

cloud.init({
  env: 'flobby-9gntrh5195123e3d'
})

//定义基础URL
const BASE_URL = 'http://jcx-cloud.cn1.utools.club'

// 云函数入口函数
exports.main = async (event, context) => {
  const app = new TcbRouter({
    event
  })

  //歌单列表请求，需要传入url，起始记录索引，请求的记录数，按照创建时间降序排列
  app.router('playlist', async(ctx, next) => {
    console.log('进入music--playlist方法')
    ctx.body = await cloud.database().collection('playlist')
       .skip(event.start)
       .limit(event.count)
       .orderBy('createTime', 'desc')
       .get()
       .then((res) => {
         console.log('结束music--playlist方法')
         return res
       })
  }),

  //歌单详情请求，传入歌单id，注意转成int类型
  app.router('musiclist', async(ctx, next) => {
    const res = await axios.get(`${BASE_URL}/playlist/detail?id=${parseInt(event.playlistId)}`)
    ctx.body = res.data
  }),

  // 根据歌曲id获取歌曲播放url
  app.router('musicUrl', async(ctx, next) => {
    const res = await axios.get(`${BASE_URL}/song/url?id=${event.musicId}`)
    ctx.body = res.data
  })

  // 根据歌曲id获取歌曲详细信息
  app.router('musicInfo', async(ctx, next) => {
    const res = await axios.get(`${BASE_URL}/song/detail?ids=${event.musicId}`)
    ctx.body = res.data
  })

  // 获取歌曲歌词
  app.router('lyric', async(ctx, next) =>{
    const res = await axios.get(`${BASE_URL}/lyric?id=${event.musicId}`)
    ctx.body = res.data
  })

  // 查询轮播图
  app.router('swiper', async(ctx, next) => {
    ctx.body = await cloud
      .database()
      .collection('swiper')
      .get()
      .then((res) => {
        return res
      })
  })
  return app.serve()
}