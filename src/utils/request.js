// 实现对axios的二次封装

import axios from 'axios'
// 通过axios create创造axios的实例
const service = axios.create({
  baseURL: '/dev', // 基准地址
  timeout: 5000
})
// 导出
export default service
