import request from '@/utils/request'

// 登录
export function login(data) {
  return request.post('/sys/login', data)
}
// 获取用户信息
export function getInfo() {
  return request.post('/sys/profile')
}
// 获取用户详情
export function getUserDetailById(id) {
  return request({
    url: `/sys/user/${id}`
  })
}
export function logout() {}
