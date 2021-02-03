// 云函数入口文件
const cloud = require('wx-server-sdk')

const TcbRouter = require('tcb-router')
const axios = require('axios')

cloud.init({
  env: 'flobby-9gntrh5195123e3d'
})

const BASE_URL = 'http://jcx-cloud.cn1.utools.club'

// 云函数入口函数
exports.main = async (event, context) => {
  const app = new TcbRouter({
    event
  })

  console.log(event)

  app.router('loginByPwd',async(ctx, next) => {
    const res = await axios.get(`${BASE_URL}/login/cellphone?phone=${event.phone}&password=${event.password}`)
    console.log('login'+res)
    ctx.body = res.data
  })

  app.router('getSubcount',async(ctx, next) => {
    const res = await axios.get(`${BASE_URL}/user/subcount`)
    console.log('subcount'+res)
    ctx.body = res.data
  })

  app.router('getUserInfo',async(ctx, next) => {
    const res = await axios.get(`${BASE_URL}/user/detail?uid=${event.userId}`)
    console.log('info'+res)
    ctx.body = res.data
  })

  app.router('getUserPlaylist',async(ctx, next) => {
    const res = await axios.get(`${BASE_URL}/user/playlist?uid=${event.userId}`)
    console.log('info'+res)
    ctx.body = res.data
  })

  return app.serve()
}