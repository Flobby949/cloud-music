// 云函数入口文件
// 引入微信服务端开发sdk
const cloud = require('wx-server-sdk')

//初始化云环境
cloud.init({
  env: 'flobby-9gntrh5195123e3d'
})

// 引入云数据库，并定义一个常量方便调用
const db = cloud.database()

// 引入云数据库的playlist集合，定义常量
const playlistCollection = db.collection('playlist')

//引入axios，定义常量
const axios = require('axios')

//定义接口地址，复制内网穿透后通过测试的接口地址
const URL = 'http://jcx-cloud.cn1.utools.club/top/playlist/highquality?before=1503639064232&limit=20'

// 云函数入口函数
exports.main = async (event, context) => {
  const {
    data
  } = await axios.get(URL)
  console.log('######' + JSON.stringify(data))

  if(data.code >= 1000) {
    console.log(data.msg)
    return 0
  }

  //解析data的result属性，获得请求的歌单结果
  const playlist = data.playlists

  //定义一个新数组，存放处理后的歌单
  const newData = []

  //遍历歌单数组
  for (let i = 0, len = playlist.length; i < len; i++) {
    //给歌单信息增加createTime属性
    let pl = playlist[i]
    //用数据库服务器时间作为歌单创建时间
    pl.createTime = db.serverDate()
    //处理后的歌单记录加入新数组
    newData.push(pl)
  }
  console.log(newData)

  //一次性批量插入数据
  if(newData.length > 0) {
    //异步调用云数据库的新增操作
    await playlistCollection.add({
      data: [...newData]
    }).then((res) => {
      console.log('插入成功')
    }).catch((err) => {
      console.log(err)
      console.log('插入失败')
    })
  }
  return newData.length
}