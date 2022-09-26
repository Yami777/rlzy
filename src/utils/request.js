// 实现对axios的二次封装

import axios from 'axios'
import { Message } from 'element-ui'

import store from '@/store'
// 通过axios create创造axios的实例
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // 基准地址
  timeout: 5000
})
// 请求拦截器
service.interceptors.request.use(config => {
  // config:与请求相关的内容
  // console.log(config)

  if (store.getters.token) {
    // 如果token存在 注入token
    config.headers['Authorization'] = `Bearer ${store.getters.token}`
  }
  return config
}, error => {
  return Promise.reject(error)
})
// 配置响应拦截器
service.interceptors.response.use(response => {
  // 最外层的data其实是axios主动添加的
  // 抛出什么错误
  // 1、当接口成功，并且业务逻辑成功的时候将data返回出去
  // 2、没有成功，返回Promise.reject() 抛出错误
  const { data, message, success } = response.data
  if (success) { // 业务逻辑是成功的
    return data
  }
  // 业务逻辑没有成功，把message抛出去
  Message.error(message)
  return Promise.reject(new Error(message))
}, error => {
  Message.error(error.message)
  return Promise.reject(error)
})
// 导出
export default service
