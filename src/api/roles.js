import request from '@/utils/request'

// 获取角色列表
export function getRolesList(data) {
  return request.get('/sys/role', {
    params: data
  })
}
// 添加角色
export function addRole(data) {
  return request.post('/sys/role', data)
}
// 删除角色
export function delRole(id) {
  return request.delete(`/sys/role/${id}`)
}
// 编辑更新角色
export function editRole(data) {
  return request.put(`/sys/role/${data.id}`, data)
}
// 分配角色
export function assignRole(data) {
  return request.put(`/sys/user/assignRoles`, data)
}
// 获取角色详情
export function getRoleDetail(id) {
  return request.get(`/sys/role/${id}`)
}
// 角色分配权限
export function assignPerm(data) {
  return request.put(`/sys/role/assignPrem`, data)
}
