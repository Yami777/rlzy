import request from '@/utils/request'
export const getRoleList = (params) => {
  return request({
    url: '/sys/role',
    params
  })
}

export const addRole = (data) => {
  return request({
    url: '/sys/role',
    method: 'POST',
    data
  })
}

/**
 * 修改用户角色
 * @param {用户id} data
 * @returns
 */
export function updateRole(data) {
  return request({
    url: `/sys/role/${data.id}`,
    data,
    method: 'put'
  })
}

/**
 * 删除用户角色
 * @param {String|Number} id 当前行的id
 * @returns
 */
export function deleteRole(id) {
  return request({
    url: `/sys/role/${id}`,
    method: 'DELETE'
  })
}

/**
 * 获取公司信息
 * @param {String|Number} companyId 公司id
 * @returns
 */
export function getCompanyInfo(companyId) {
  return request({
    url: `/company/${companyId}`
  })
}
