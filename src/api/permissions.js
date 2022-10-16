import request from '@/utils/request'
/**
 * 获取所有的权限列表
 * @returns
 */
export const getPermissions = () => {
  return request({
    url: '/sys/permission'
  })
}
