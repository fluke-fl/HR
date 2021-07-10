import router from '@/router'
import store from '@/store'
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'

const wList = ['/login', '/404']
router.beforeEach(async(to, from, next) => {
  nprogress.start()
  if (store.getters.token) {
    // 有token 是login页面直接跳转首页
    if (to.path === '/login') {
      next('/')
    } else {
      // 没有用户id才获取用户信息
      if (!store.getters.userId) {
        const { roles } = await store.dispatch('user/getInfo')
        const routes = await store.dispatch(
          'permission/filterRoutes',
          roles.menus
        )
        router.addRoutes([
          ...routes,
          { path: '*', redirect: '/404', hidden: true }
        ])
        next(to.path) // 相当于跳到对应的地址  相当于多做一次跳转 为什么要多做一次跳转
        // 进门了，但是进门之后我要去的地方的路还没有铺好，直接走，掉坑里，多做一次跳转，再从门外往里进一次，
        // 跳转之前 把路铺好，再次进来的时候，路就铺好了
      } else {
        next()
      }
    }
  } else {
    if (wList.indexOf(to.path) > -1) {
      next()
    } else {
      next('/login')
    }
  }
  nprogress.done()
})

router.afterEach(() => {
  nprogress.done()
})
