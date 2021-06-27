import request from '@/utils/request'

export function login(data) {
  return request.post('/sys/login', data)
}

export function getInfo() {
  return request.post('/sys/profile')
}

export function getUserDetailById(id) {
  return request({
    url: `/sys/user/${id}`
  })
}
export function logout() {}
