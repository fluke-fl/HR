import { constantRoutes, asyncRoutes } from '@/router'

// 任何用户都拥有的默认静态路由
const state = {
  routes: constantRoutes
}

// 获取到用户的动态路由 拼凑为一个新路由数组
const mutations = {
  setRoutes(state, newRoutes) {
    // state为所有用户的静态路由 newRoutes为用户匹配到的动态路由
    // 静态路由是完全不变的因此不能使用state.routes 而是应使用constantRoutes
    // state.routes = [...state.routes, ...newRoutes]
    state.routes = [...constantRoutes, ...newRoutes]
    // console.log(state.routes)
  }
}

//
const actions = {
  filterRoutes({ commit }, menus) {
    const routes = []
    menus.forEach(key => {
      routes.push(...asyncRoutes.filter(item => item.name === key))
    })
    commit('setRoutes', routes)
    return routes
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
