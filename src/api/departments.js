import request from '@/utils/request'

// 获取部门列表
export function getDepartmentList() {
  return request.get('/company/department')
}
// 删除部门
export function delDepartment(id) {
  return request.delete(`/company/department/${id}`)
}
// 添加部门
export function addDepartmentList(data) {
  return request.post('/company/department', data)
}
// 部门详情
export function departmentDetail(id) {
  return request.get(`/company/department/${id}`)
}
// 编辑部门
export function editDepartment(data) {
  return request.put(`/company/department/${data.id}`, data)
}
