// 动态路由
import Layout from '@/layout'
export default {
  path: '/permission',
  name: 'permissions',
  // 需要layout的布局 所以组件为layout
  component: Layout,
  children: [
    {
      // 二级路由不写路径则默认为一级路由的路径
      path: '',
      component: () => import('@/views/permission'),
      name: 'permissions',
      meta: { title: '权限管理', icon: 'lock' }
    }
  ]
}
