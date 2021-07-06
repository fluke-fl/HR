import request from '@/utils/request'

// 获取全部权限点
export function getPermission(data) {
  return request.get('/sys/permission', {
    params: data
  })
}
// 添加权限点
export function addPermission(data) {
  return request.post('/sys/permission', data)
}
// 删除权限点
export function delPermission(id) {
  return request.delete(`/sys/permission/${id}`)
}
// 更新权限点
export function updataPermission(data) {
  return request.put(`/sys/permission/${data.id}`, data)
}
