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
/**
 * 保存用户信息
 * @param {*} data
 * @returns
 */
export const saveUserDetailById = (data) => {
  return request({
    url: `/sys/user/${data.id}`,
    method: 'PUT',
    data
  })
}
/**
 * 给员工分配角色
 * @param {Object} data 员工id和角色id
 * @returns
 */
export const setEmployeesRoles = (data) => {
  return request({
    url: '/sys/user/assignRoles',
    method: 'PUT',
    data
  })
}
