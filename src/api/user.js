import request from '@/utils/request'
export function login(data) {

}

export function getUserInfoAPI() {
  return request({
    url: '/sys/profile',
    method: 'POST'
  })
}
// resetful接口：同一个模块 接口地址基本都是一样的、请求方式不同
/**
 * 获取用户基本信息
 * @param {String} id 用户id
 * @returns
 */
export const getUserDetailById = (id) => {
  return request({
    url: `/sys/user/${id}`
  })
}
export const saveUserDetailById = (data) => {
  return request({
    url: `/sys/user/${data.id}`,
    method: 'PUT',
    data
  })
}
