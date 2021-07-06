import request from '@/utils/request'

// 获取用户简单信息
export function getUserSimple(id) {
  return request.get(`/sys/user/simple`)
}
// 获取员工列表
export function getEmployeesList(data) {
  return request.get('/sys/user', {
    params: data
  })
}
// 删除员工
export function delEmployee(id) {
  return request.delete(`/sys/user/${id}`)
}
// 添加员工
export function addEmployee(data) {
  return request.post(`/sys/user`, data)
}
// 根据id获取员工信息
export function getEmployee(id) {
  return request.get(`/sys/user/${id}`)
}
// 导入excel文件
export function importEmployee(data) {
  return request.post('/sys/user/batch', data)
}
// 更新员工数据
export function updataEmployee(data) {
  return request.put(`/sys/user/${data.id}`, data)
}
// 获取员工个人信息
export function getPersonInfo(id) {
  return request.get(`/employees/${id}/personalInfo`)
}
// 更新员工个人信息
export function putPersonInfo(data) {
  return request.put(`/employees/${data.userId}/personalInfo`, data)
}
// 获取员工岗位信息
export function getPersonJob(id) {
  return request.get(`/employees/${id}/jobs`)
}
// 更新员工岗位信息
export function putPersonJob(data) {
  return request.put(`/employees/${data.userId}/jobs`, data)
}
