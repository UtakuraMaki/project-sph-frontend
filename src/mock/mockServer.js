// 引入mockjs模块
const mock = require('mockjs')
// 引入json数据
import banners from './banners.json'
import floors from './floors.json'

mock.mock('/mock/banners', {
  code: 200,
  data: banners
})
mock.mock('/mock/floors', {
  code: 200,
  data: floors
})