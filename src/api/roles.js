import request from '@/utils/request'
/**
 * 获取角色列表
 * @returns
 */
export const getRoles = () => {
  return request({
    url: '/sys/role'
  })
}

/**
 * 根据角色id获取拥有的权限
 * @param {String} id 角色id
 * @returns
 */
export const getRolesInfo = (id) => {
  return request({
    url: `/sys/role/${id}`
  })
}
/**
 * 给角色分配id
 * @param {Object} data 角色id和权限数组
 * @returns
 */
export const setRolePermission = (data) => {
  return request({
    url: '/sys/role/assignPrem',
    method: 'PUT',
    data
  })
}
