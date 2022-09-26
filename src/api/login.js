// 所有登录页面相关的接口
// 引入axios
import request from '@/utils/request'
export function login(data) {
  return request({
    url: '/sys/login',
    method: 'POST',
    data
  })
}
