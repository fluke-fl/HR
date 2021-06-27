import { getToken, setToken, removeToken, setTimeStamp } from '@/utils/auth'
import { login, getInfo, getUserDetailById } from '@/api/user'
export default {
  namespaced: true,
  state: {
    token: getToken(),
    userInfo: {}
  },
  mutations: {
    setToken(state, payload) {
      state.token = payload
      setToken(state.token)
    },
    removeToken(state) {
      state.token = null
      removeToken()
    },
    setInfo(state, payload) {
      state.userInfo = payload
    },
    removeInfo(state) {
      state.userInfo = {}
    }
  },
  actions: {
    async login({ commit }, data) {
      const res = await login(data)
      commit('setToken', res)
      setTimeStamp()
    },
    async getInfo({ commit }) {
      const info = await getInfo()
      const avatar = await getUserDetailById(info.userId)
      const res = { ...info, ...avatar }
      commit('setInfo', res)
      return res
    },
    loginout({ commit }) {
      commit('removeToken')
      commit('removeInfo')
    }
  }
}
