import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'
import { getTimeStamp } from './auth'
import router from '@/router'
const timeOut = 3500

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000
})
// 请求拦截器
service.interceptors.request.use(
  config => {
    if (store.getters.token) {
      if (checkTime()) {
        store.dispatch('user/loginout')
        router.push('/login')
        return Promise.reject(new Error('密钥过期了'))
      }
      config.headers['Authorization'] = `Bearer ${store.getters.token}`
    }
    return config
  },
  error => {
    if (
      error.response &&
      error.response.data & (error.response.data.code === 1002)
    ) {
      store.dispatch('user/loginout')
      router.push('/login')
    } else {
      Message.error(error.message)
    }
    return Promise.reject(error)
  }
)
// 响应拦截器
service.interceptors.response.use(
  response => {
    const { success, data, message } = response.data
    if (success) {
      return data
    } else {
      Message.error(message)
      return Promise.reject(new Error(message))
    }
  },
  error => {
    Message.error(error.message)
    return Promise.reject(error)
  }
)
function checkTime() {
  const currentTime = Date.now()
  const timeStamp = getTimeStamp()
  return (currentTime - timeStamp) / 1000 > timeOut
}
export default service
