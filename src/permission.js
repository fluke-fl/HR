import router from '@/router'
import store from '@/store'

const wList = ['/login', '/404']
router.beforeEach((to, from, next) => {
  if (store.getters.token) {
    to.path === '/login' ? next('/') : next()
  } else {
    wList.indexOf(to.path) > -1 ? next() : next('/login')
  }
})
router.afterEach()
